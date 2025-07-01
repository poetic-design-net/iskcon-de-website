export default {
  name: 'donation',
  title: 'Spenden',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Spenden Titel',
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
      rows: 4,
      description: 'Kurze Beschreibung des Spendenzwecks'
    },
    {
      name: 'longDescription',
      title: 'Detaillierte Beschreibung',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      name: 'featuredImage',
      title: 'Hauptbild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Bildergalerie',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'donationType',
      title: 'Spenden Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Allgemeine Spende', value: 'general' },
          { title: 'Tempel Bau/Renovierung', value: 'temple_construction' },
          { title: 'Prasadam Sponsoring', value: 'prasadam' },
          { title: 'Festival Unterstützung', value: 'festival' },
          { title: 'Literatur Distribution', value: 'literature' },
          { title: 'Pilgerfahrt Unterstützung', value: 'pilgrimage' },
          { title: 'Bildungsprogramme', value: 'education' },
          { title: 'Soziale Projekte', value: 'social_projects' },
          { title: 'Notfallhilfe', value: 'emergency' },
          { title: 'Unterhalt', value: 'maintenance' },
          { title: 'Spezial Projekt', value: 'special_project' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Einmalige Spende', value: 'one_time' },
          { title: 'Wiederkehrende Spende', value: 'recurring' },
          { title: 'Kampagne', value: 'campaign' },
          { title: 'Dringend', value: 'urgent' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'fundingGoal',
      title: 'Spendenziel',
      type: 'object',
      fields: [
        {
          name: 'hasGoal',
          title: 'Hat Spendenziel',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'targetAmount',
          title: 'Zielbetrag',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
          hidden: ({ parent }: any) => !parent?.hasGoal
        },
        {
          name: 'currency',
          title: 'Währung',
          type: 'string',
          options: {
            list: [
              { title: 'Euro (€)', value: 'EUR' },
              { title: 'US Dollar ($)', value: 'USD' }
            ]
          },
          initialValue: 'EUR',
          hidden: ({ parent }: any) => !parent?.hasGoal
        },
        {
          name: 'deadline',
          title: 'Deadline',
          type: 'date',
          hidden: ({ parent }: any) => !parent?.hasGoal
        },
        {
          name: 'currentAmount',
          title: 'Aktueller Betrag',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
          hidden: ({ parent }: any) => !parent?.hasGoal,
          description: 'Wird automatisch aktualisiert, kann manuell überschrieben werden'
        }
      ]
    },
    {
      name: 'suggestedAmounts',
      title: 'Vorgeschlagene Beträge',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'amount',
              title: 'Betrag',
              type: 'number',
              validation: (Rule: any) => Rule.min(1)
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'string',
              placeholder: 'z.B. "Finanziert eine Mahlzeit für 5 Personen"'
            },
            {
              name: 'impact',
              title: 'Auswirkung',
              type: 'text',
              rows: 2,
              description: 'Was bewirkt diese Spende konkret?'
            }
          ]
        }
      ]
    },
    {
      name: 'paymentSettings',
      title: 'Zahlungseinstellungen',
      type: 'object',
      fields: [
        {
          name: 'enabledProviders',
          title: 'Aktivierte Zahlungsanbieter',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'PayPal', value: 'paypal' },
                  { title: 'Stripe', value: 'stripe' },
                  { title: 'SEPA Lastschrift', value: 'sepa' },
                  { title: 'Überweisung', value: 'bank_transfer' },
                  { title: 'Klarna', value: 'klarna' },
                  { title: 'Sofortüberweisung', value: 'sofort' },
                  { title: 'Apple Pay', value: 'apple_pay' },
                  { title: 'Google Pay', value: 'google_pay' },
                  { title: 'Kreditkarte', value: 'credit_card' }
                ]
              }
            }
          ],
          validation: (Rule: any) => Rule.min(1)
        },
        {
          name: 'minimumAmount',
          title: 'Mindestbetrag',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
          initialValue: 5
        },
        {
          name: 'maximumAmount',
          title: 'Höchstbetrag',
          type: 'number',
          validation: (Rule: any) => Rule.min(1),
          description: 'Optional: Maximaler Spendenbetrag'
        },
        {
          name: 'allowCustomAmount',
          title: 'Freie Beträge erlauben',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'recurringOptions',
          title: 'Wiederkehrende Optionen',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Monatlich', value: 'monthly' },
                  { title: 'Vierteljährlich', value: 'quarterly' },
                  { title: 'Halbjährlich', value: 'semi_annually' },
                  { title: 'Jährlich', value: 'annually' }
                ]
              }
            }
          ]
        },
        {
          name: 'processingFees',
          title: 'Bearbeitungsgebühren',
          type: 'object',
          fields: [
            {
              name: 'passFeesToDonor',
              title: 'Gebühren an Spender weitergeben',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'feeStructure',
              title: 'Gebührenstruktur',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'provider',
                      title: 'Anbieter',
                      type: 'string'
                    },
                    {
                      name: 'fixedFee',
                      title: 'Feste Gebühr',
                      type: 'number'
                    },
                    {
                      name: 'percentageFee',
                      title: 'Prozentuale Gebühr',
                      type: 'number',
                      description: 'Als Dezimalzahl (z.B. 0.029 für 2.9%)'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'beneficiary',
      title: 'Begünstigter',
      type: 'object',
      fields: [
        {
          name: 'organization',
          title: 'Organisation',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          initialValue: 'ISKCON Deutschland e.V.'
        },
        {
          name: 'temple',
          title: 'Spezifischer Tempel',
          type: 'reference',
          to: [{ type: 'temple' }],
          description: 'Optional: Wenn die Spende einem bestimmten Tempel zugute kommt'
        },
        {
          name: 'project',
          title: 'Projekt',
          type: 'string',
          description: 'Spezifisches Projekt oder Verwendungszweck'
        },
        {
          name: 'responsiblePerson',
          title: 'Verantwortliche Person',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'role',
              title: 'Rolle',
              type: 'string'
            },
            {
              name: 'email',
              title: 'E-Mail',
              type: 'email'
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'taxDeductibility',
      title: 'Steuerliche Absetzbarkeit',
      type: 'object',
      fields: [
        {
          name: 'isDeductible',
          title: 'Steuerlich absetzbar',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'taxExemptionNumber',
          title: 'Freistellungsbescheid Nummer',
          type: 'string',
          hidden: ({ parent }: any) => !parent?.isDeductible
        },
        {
          name: 'receiptSettings',
          title: 'Spendenquittung Einstellungen',
          type: 'object',
          hidden: ({ parent }: any) => !parent?.isDeductible,
          fields: [
            {
              name: 'autoSendReceipt',
              title: 'Automatisch Quittung versenden',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'receiptTemplate',
              title: 'Quittungsvorlage',
              type: 'string',
              description: 'Name der zu verwendenden Vorlage'
            },
            {
              name: 'thresholdForReceipt',
              title: 'Schwellenwert für Quittung',
              type: 'number',
              initialValue: 200,
              description: 'Ab welchem Betrag wird eine Quittung erstellt?'
            }
          ]
        }
      ]
    },
    {
      name: 'donorCommunication',
      title: 'Spender Kommunikation',
      type: 'object',
      fields: [
        {
          name: 'thankYouMessage',
          title: 'Dankesnachricht',
          type: 'text',
          rows: 4,
          validation: (Rule: any) => Rule.required(),
          description: 'Nachricht die dem Spender nach der Spende angezeigt wird'
        },
        {
          name: 'thankYouEmail',
          title: 'Dankes-E-Mail',
          type: 'object',
          fields: [
            {
              name: 'sendEmail',
              title: 'E-Mail versenden',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'subject',
              title: 'Betreff',
              type: 'string',
              hidden: ({ parent }: any) => !parent?.sendEmail,
              initialValue: 'Vielen Dank für Ihre Spende!'
            },
            {
              name: 'template',
              title: 'E-Mail Vorlage',
              type: 'array',
              of: [{ type: 'block' }],
              hidden: ({ parent }: any) => !parent?.sendEmail
            }
          ]
        },
        {
          name: 'updateFrequency',
          title: 'Update Häufigkeit',
          type: 'string',
          options: {
            list: [
              { title: 'Keine Updates', value: 'none' },
              { title: 'Bei Projektabschluss', value: 'completion' },
              { title: 'Monatlich', value: 'monthly' },
              { title: 'Vierteljährlich', value: 'quarterly' },
              { title: 'Bei wichtigen Meilensteinen', value: 'milestones' }
            ]
          },
          initialValue: 'completion'
        },
        {
          name: 'publicThankYou',
          title: 'Öffentliche Danksagung',
          type: 'object',
          fields: [
            {
              name: 'allowPublicRecognition',
              title: 'Öffentliche Anerkennung erlauben',
              type: 'boolean',
              initialValue: false,
              description: 'Dürfen wir Spender öffentlich erwähnen?'
            },
            {
              name: 'recognitionThreshold',
              title: 'Schwellenwert für Anerkennung',
              type: 'number',
              hidden: ({ parent }: any) => !parent?.allowPublicRecognition,
              description: 'Ab welchem Betrag wird öffentlich gedankt?'
            }
          ]
        }
      ]
    },
    {
      name: 'transparency',
      title: 'Transparenz',
      type: 'object',
      fields: [
        {
          name: 'showProgress',
          title: 'Fortschritt anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showDonorCount',
          title: 'Spender Anzahl anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showRecentDonations',
          title: 'Aktuelle Spenden anzeigen',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'progressUpdates',
          title: 'Fortschritts Updates',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'date',
                  title: 'Datum',
                  type: 'date'
                },
                {
                  name: 'title',
                  title: 'Titel',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Beschreibung',
                  type: 'text'
                },
                {
                  name: 'image',
                  title: 'Bild',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                },
                {
                  name: 'amountUsed',
                  title: 'Verwendeter Betrag',
                  type: 'number'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'campaignSettings',
      title: 'Kampagnen Einstellungen',
      type: 'object',
      hidden: ({ document }: any) => document?.category !== 'campaign',
      fields: [
        {
          name: 'startDate',
          title: 'Startdatum',
          type: 'date'
        },
        {
          name: 'endDate',
          title: 'Enddatum',
          type: 'date'
        },
        {
          name: 'urgencyLevel',
          title: 'Dringlichkeitsstufe',
          type: 'string',
          options: {
            list: [
              { title: 'Niedrig', value: 'low' },
              { title: 'Mittel', value: 'medium' },
              { title: 'Hoch', value: 'high' },
              { title: 'Kritisch', value: 'critical' }
            ]
          },
          initialValue: 'medium'
        },
        {
          name: 'matchingFund',
          title: 'Matching Fund',
          type: 'object',
          fields: [
            {
              name: 'hasMatching',
              title: 'Hat Matching Fund',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'matchingRatio',
              title: 'Matching Verhältnis',
              type: 'string',
              hidden: ({ parent }: any) => !parent?.hasMatching,
              placeholder: 'z.B. 1:1, 1:2'
            },
            {
              name: 'matchingLimit',
              title: 'Matching Limit',
              type: 'number',
              hidden: ({ parent }: any) => !parent?.hasMatching
            },
            {
              name: 'sponsor',
              title: 'Sponsor',
              type: 'string',
              hidden: ({ parent }: any) => !parent?.hasMatching
            }
          ]
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Ist diese Spendenmöglichkeit aktiv?'
    },
    {
      name: 'isFeatured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
      description: 'Wird diese Spende prominent angezeigt?'
    },
    {
      name: 'sortOrder',
      title: 'Sortierreihenfolge',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
      description: 'Niedrigere Zahlen werden zuerst angezeigt'
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
          description: 'Überschreibt den Spendentitel für SEO'
        },
        {
          name: 'description',
          title: 'SEO Beschreibung',
          type: 'text',
          rows: 2,
          description: 'Beschreibung für Suchmaschinen'
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
      subtitle: 'donationType',
      media: 'featuredImage'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      const typeMap: { [key: string]: string } = {
        general: 'Allgemeine Spende',
        temple_construction: 'Tempel Bau',
        prasadam: 'Prasadam',
        festival: 'Festival',
        literature: 'Literatur',
        pilgrimage: 'Pilgerfahrt',
        education: 'Bildung',
        social_projects: 'Soziales',
        emergency: 'Notfall',
        maintenance: 'Unterhalt',
        special_project: 'Spezial Projekt'
      }
      return {
        title,
        subtitle: typeMap[subtitle] || subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Sortierreihenfolge',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Hervorgehoben zuerst',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'sortOrder', direction: 'asc' }
      ]
    },
    {
      title: 'Nach Spenden Typ',
      name: 'donationType',
      by: [
        { field: 'donationType', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Nach Kategorie',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
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