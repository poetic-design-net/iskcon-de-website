export default {
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Newsletter Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      description: 'Kurze Beschreibung des Newsletters für Anmeldung'
    },
    {
      name: 'newsletterType',
      title: 'Newsletter Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Hauptnewsletter', value: 'main' },
          { title: 'Event Updates', value: 'events' },
          { title: 'Spirituelle Reflexionen', value: 'spiritual' },
          { title: 'Tempel News', value: 'temple_news' },
          { title: 'Literatur Updates', value: 'literature' },
          { title: 'Multimedia Updates', value: 'multimedia' },
          { title: 'Spendenaufrufe', value: 'donations' },
          { title: 'Spezial Newsletter', value: 'special' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'frequency',
      title: 'Frequenz',
      type: 'string',
      options: {
        list: [
          { title: 'Wöchentlich', value: 'weekly' },
          { title: 'Zweiwöchentlich', value: 'biweekly' },
          { title: 'Monatlich', value: 'monthly' },
          { title: 'Vierteljährlich', value: 'quarterly' },
          { title: 'Bei Bedarf', value: 'on_demand' },
          { title: 'Einmalig', value: 'one_time' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Können sich Benutzer für diesen Newsletter anmelden?'
    },
    {
      name: 'gdprCompliance',
      title: 'DSGVO Compliance',
      type: 'object',
      fields: [
        {
          name: 'purposeStatement',
          title: 'Zweckbestimmung',
          type: 'text',
          rows: 4,
          validation: (Rule: any) => Rule.required(),
          description: 'Erklärung, wofür die E-Mail-Adresse verwendet wird',
          initialValue: 'Ihre E-Mail-Adresse wird ausschließlich für den Versand unseres Newsletters verwendet. Sie können sich jederzeit wieder abmelden.'
        },
        {
          name: 'dataRetentionPeriod',
          title: 'Datenspeicherungsdauer',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          description: 'Wie lange werden die Daten gespeichert?',
          initialValue: '24 Monate nach letzter Aktivität'
        },
        {
          name: 'legalBasis',
          title: 'Rechtsgrundlage',
          type: 'string',
          options: {
            list: [
              { title: 'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)', value: 'consent' },
              { title: 'Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)', value: 'legitimate_interest' },
              { title: 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)', value: 'contract' }
            ]
          },
          initialValue: 'consent',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'consentText',
          title: 'Einverständniserklärung',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
          description: 'Text für die Checkbox bei der Anmeldung',
          initialValue: 'Ich stimme zu, dass meine E-Mail-Adresse für den Newsletter-Versand gespeichert und verarbeitet wird. Ich kann diese Einwilligung jederzeit widerrufen.'
        },
        {
          name: 'privacyPolicyLink',
          title: 'Link zur Datenschutzerklärung',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
          description: 'Link zur vollständigen Datenschutzerklärung'
        }
      ]
    },
    {
      name: 'subscriptionSettings',
      title: 'Anmelde-Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'requireDoubleOptIn',
          title: 'Double-Opt-In erforderlich',
          type: 'boolean',
          initialValue: true,
          description: 'Müssen Benutzer ihre Anmeldung per E-Mail bestätigen?'
        },
        {
          name: 'confirmationEmailSubject',
          title: 'Betreff Bestätigungs-E-Mail',
          type: 'string',
          hidden: ({ parent }: any) => !parent?.requireDoubleOptIn,
          initialValue: 'Bitte bestätigen Sie Ihre Newsletter-Anmeldung'
        },
        {
          name: 'confirmationEmailTemplate',
          title: 'Bestätigungs-E-Mail Vorlage',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }: any) => !parent?.requireDoubleOptIn
        },
        {
          name: 'welcomeEmailSubject',
          title: 'Betreff Willkommens-E-Mail',
          type: 'string',
          initialValue: 'Willkommen bei unserem Newsletter!'
        },
        {
          name: 'welcomeEmailTemplate',
          title: 'Willkommens-E-Mail Vorlage',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'unsubscribeText',
          title: 'Abmelde-Text',
          type: 'string',
          initialValue: 'Sie erhalten diese E-Mail, weil Sie sich für unseren Newsletter angemeldet haben. Sie können sich jederzeit abmelden.'
        }
      ]
    },
    {
      name: 'contentSettings',
      title: 'Inhalts-Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'defaultSender',
          title: 'Standard Absender',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Absender Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              initialValue: 'ISKCON Deutschland'
            },
            {
              name: 'email',
              title: 'Absender E-Mail',
              type: 'email',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'replyTo',
              title: 'Antwort an',
              type: 'email',
              description: 'Optional: Andere E-Mail-Adresse für Antworten'
            }
          ]
        },
        {
          name: 'emailTemplate',
          title: 'E-Mail Vorlage',
          type: 'object',
          fields: [
            {
              name: 'headerImage',
              title: 'Header Bild',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'footerContent',
              title: 'Footer Inhalt',
              type: 'array',
              of: [{ type: 'block' }]
            },
            {
              name: 'socialMediaLinks',
              title: 'Social Media Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'platform',
                      title: 'Plattform',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Facebook', value: 'facebook' },
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'YouTube', value: 'youtube' },
                          { title: 'Twitter', value: 'twitter' },
                          { title: 'Website', value: 'website' }
                        ]
                      }
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'categories',
          title: 'Kategorien',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Events', value: 'events' },
                  { title: 'Spirituelle Reflexionen', value: 'spiritual' },
                  { title: 'Tempel News', value: 'temple_news' },
                  { title: 'Neue Literatur', value: 'literature' },
                  { title: 'Multimedia', value: 'multimedia' },
                  { title: 'Community Updates', value: 'community' },
                  { title: 'Spenden', value: 'donations' },
                  { title: 'Ankündigungen', value: 'announcements' }
                ]
              }
            }
          ],
          description: 'Welche Inhalts-Kategorien werden in diesem Newsletter behandelt?'
        }
      ]
    },
    {
      name: 'automationSettings',
      title: 'Automatisierungs-Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'autoIncludeNewEvents',
          title: 'Neue Events automatisch einschließen',
          type: 'boolean',
          initialValue: false,
          description: 'Sollen neue Events automatisch in den Newsletter aufgenommen werden?'
        },
        {
          name: 'autoIncludeNewLiterature',
          title: 'Neue Literatur automatisch einschließen',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'autoIncludeNewMultimedia',
          title: 'Neue Multimedia automatisch einschließen',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'eventFilter',
          title: 'Event Filter',
          type: 'object',
          hidden: ({ parent }: any) => !parent?.autoIncludeNewEvents,
          fields: [
            {
              name: 'eventTypes',
              title: 'Event Typen',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'featuredOnly',
              title: 'Nur hervorgehobene Events',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    },
    {
      name: 'targetAudience',
      title: 'Zielgruppe',
      type: 'object',
      fields: [
        {
          name: 'language',
          title: 'Sprache',
          type: 'string',
          options: {
            list: [
              { title: 'Deutsch', value: 'de' },
              { title: 'Englisch', value: 'en' },
              { title: 'Mehrsprachig', value: 'multilingual' }
            ]
          },
          initialValue: 'de'
        },
        {
          name: 'audienceLevel',
          title: 'Zielgruppen Level',
          type: 'string',
          options: {
            list: [
              { title: 'Alle Interessierte', value: 'general' },
              { title: 'Neue Devotees', value: 'beginners' },
              { title: 'Erfahrene Devotees', value: 'experienced' },
              { title: 'Tempel Gemeinde', value: 'temple_community' },
              { title: 'Spender', value: 'donors' },
              { title: 'Freiwillige', value: 'volunteers' }
            ]
          },
          initialValue: 'general'
        },
        {
          name: 'geoTargeting',
          title: 'Geografische Ausrichtung',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Deutschland', value: 'germany' },
                  { title: 'Österreich', value: 'austria' },
                  { title: 'Schweiz', value: 'switzerland' },
                  { title: 'International', value: 'international' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'trackOpens',
          title: 'Öffnungen verfolgen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'trackClicks',
          title: 'Klicks verfolgen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'trackUnsubscribes',
          title: 'Abmeldungen verfolgen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'googleAnalyticsTracking',
          title: 'Google Analytics UTM Parameter',
          type: 'object',
          fields: [
            {
              name: 'source',
              title: 'UTM Source',
              type: 'string',
              initialValue: 'newsletter'
            },
            {
              name: 'medium',
              title: 'UTM Medium',
              type: 'string',
              initialValue: 'email'
            },
            {
              name: 'campaign',
              title: 'UTM Campaign',
              type: 'string',
              placeholder: 'z.B. monthly_newsletter'
            }
          ]
        }
      ]
    },
    {
      name: 'integrations',
      title: 'Integrationen',
      type: 'object',
      fields: [
        {
          name: 'emailProvider',
          title: 'E-Mail Anbieter',
          type: 'string',
          options: {
            list: [
              { title: 'Mailchimp', value: 'mailchimp' },
              { title: 'SendGrid', value: 'sendgrid' },
              { title: 'ConvertKit', value: 'convertkit' },
              { title: 'Mailgun', value: 'mailgun' },
              { title: 'Custom SMTP', value: 'smtp' }
            ]
          }
        },
        {
          name: 'apiSettings',
          title: 'API Einstellungen',
          type: 'object',
          fields: [
            {
              name: 'listId',
              title: 'Liste/Audience ID',
              type: 'string',
              description: 'ID der E-Mail-Liste beim Anbieter'
            },
            {
              name: 'webhookUrl',
              title: 'Webhook URL',
              type: 'url',
              description: 'URL für Newsletter-Events'
            }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Titel',
          type: 'string',
          description: 'Titel für Newsletter-Anmeldseite'
        },
        {
          name: 'description',
          title: 'SEO Beschreibung',
          type: 'text',
          rows: 2,
          description: 'Beschreibung für Newsletter-Anmeldseite'
        },
        {
          name: 'keywords',
          title: 'Schlüsselwörter',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'frequency',
      media: 'contentSettings.emailTemplate.headerImage'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      const frequencyMap: { [key: string]: string } = {
        weekly: 'Wöchentlich',
        biweekly: 'Zweiwöchentlich',
        monthly: 'Monatlich',
        quarterly: 'Vierteljährlich',
        on_demand: 'Bei Bedarf',
        one_time: 'Einmalig'
      }
      return {
        title,
        subtitle: frequencyMap[subtitle] || subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Newsletter Typ',
      name: 'typeAsc',
      by: [{ field: 'newsletterType', direction: 'asc' }]
    },
    {
      title: 'Frequenz',
      name: 'frequency',
      by: [{ field: 'frequency', direction: 'asc' }]
    },
    {
      title: 'Aktive zuerst',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}