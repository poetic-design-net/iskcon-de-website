export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Titel',
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
      rows: 4
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
      title: 'Event Bild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'eventCategory',
      title: 'Event Kategorie',
      type: 'reference',
      to: [{ type: 'eventCategory' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'startDate',
      title: 'Startdatum',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'endDate',
      title: 'Enddatum',
      type: 'datetime',
      validation: (Rule: any) => Rule.min(Rule.valueOfField('startDate'))
    },
    {
      name: 'isRecurring',
      title: 'Wiederkehrendes Event',
      type: 'boolean',
      initialValue: false
    },
    // Legacy-Feld für Import-Kompatibilität
    {
      name: 'recurringPattern',
      title: 'Wiederholungsmuster (Legacy)',
      type: 'object',
      hidden: ({ parent }: any) => !parent?.isRecurring,
      description: 'Legacy-Feld für Import-Kompatibilität',
      fields: [
        {
          name: 'frequency',
          title: 'Häufigkeit',
          type: 'string',
          options: {
            list: [
              { title: 'Täglich', value: 'daily' },
              { title: 'Wöchentlich', value: 'weekly' },
              { title: 'Zweiwöchentlich', value: 'biweekly' },
              { title: 'Monatlich', value: 'monthly' },
              { title: 'Jährlich', value: 'yearly' }
            ]
          }
        },
        {
          name: 'interval',
          title: 'Intervall',
          type: 'number',
          initialValue: 1
        },
        {
          name: 'daysOfWeek',
          title: 'Wochentage',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Montag', value: 'monday' },
                  { title: 'Dienstag', value: 'tuesday' },
                  { title: 'Mittwoch', value: 'wednesday' },
                  { title: 'Donnerstag', value: 'thursday' },
                  { title: 'Freitag', value: 'friday' },
                  { title: 'Samstag', value: 'saturday' },
                  { title: 'Sonntag', value: 'sunday' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'recurrencePattern',
      title: 'Wiederholungsmuster',
      type: 'object',
      hidden: ({ parent }: any) => !parent?.isRecurring,
      fields: [
        {
          name: 'frequency',
          title: 'Häufigkeit',
          type: 'string',
          options: {
            list: [
              { title: 'Täglich', value: 'daily' },
              { title: 'Wöchentlich', value: 'weekly' },
              { title: 'Zweiwöchentlich', value: 'biweekly' },
              { title: 'Monatlich', value: 'monthly' },
              { title: 'Jährlich', value: 'yearly' }
            ]
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'interval',
          title: 'Intervall',
          type: 'number',
          description: 'Alle X Einheiten (z.B. alle 2 Wochen = Intervall 2)',
          initialValue: 1,
          validation: (Rule: any) => Rule.min(1).max(52)
        },
        {
          name: 'daysOfWeek',
          title: 'Wochentage',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Montag', value: 'monday' },
                  { title: 'Dienstag', value: 'tuesday' },
                  { title: 'Mittwoch', value: 'wednesday' },
                  { title: 'Donnerstag', value: 'thursday' },
                  { title: 'Freitag', value: 'friday' },
                  { title: 'Samstag', value: 'saturday' },
                  { title: 'Sonntag', value: 'sunday' }
                ]
              }
            }
          ],
          hidden: ({ parent }: any) => parent?.frequency !== 'weekly' && parent?.frequency !== 'biweekly'
        },
        {
          name: 'dayOfMonth',
          title: 'Tag des Monats',
          type: 'number',
          description: 'An welchem Tag des Monats (1-31)',
          validation: (Rule: any) => Rule.min(1).max(31),
          hidden: ({ parent }: any) => parent?.frequency !== 'monthly'
        },
        {
          name: 'endRecurrence',
          title: 'Wiederholung beenden',
          type: 'string',
          options: {
            list: [
              { title: 'Niemals', value: 'never' },
              { title: 'Nach X Terminen', value: 'count' },
              { title: 'Bis zu einem Datum', value: 'until' }
            ]
          },
          initialValue: 'never'
        },
        {
          name: 'occurrenceCount',
          title: 'Anzahl Termine',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(1000),
          hidden: ({ parent }: any) => parent?.endRecurrence !== 'count'
        },
        {
          name: 'recurrenceEndDate',
          title: 'Enddatum Wiederholung',
          type: 'date',
          hidden: ({ parent }: any) => parent?.endRecurrence !== 'until'
        }
      ]
    },
    {
      name: 'location',
      title: 'Veranstaltungsort',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Ort Typ',
          type: 'string',
          options: {
            list: [
              { title: 'Tempel', value: 'temple' },
              { title: 'Online', value: 'online' },
              { title: 'Extern', value: 'external' }
            ]
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'temple',
          title: 'Tempel',
          type: 'reference',
          to: [{ type: 'temple' }],
          hidden: ({ parent }: any) => parent?.type !== 'temple'
        },
        {
          name: 'onlineLink',
          title: 'Online Link',
          type: 'url',
          hidden: ({ parent }: any) => parent?.type !== 'online'
        },
        {
          name: 'onlineDetails',
          title: 'Online Meeting Details',
          type: 'object',
          hidden: ({ parent }: any) => parent?.type !== 'online',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Zoom', value: 'Zoom' },
                  { title: 'Google Meet', value: 'Google Meet' },
                  { title: 'Microsoft Teams', value: 'Microsoft Teams' },
                  { title: 'Andere', value: 'other' }
                ]
              }
            },
            {
              name: 'meetingId',
              title: 'Meeting ID',
              type: 'string'
            },
            {
              name: 'password',
              title: 'Passwort',
              type: 'string'
            }
          ]
        },
        {
          name: 'externalVenue',
          title: 'Externer Veranstaltungsort',
          type: 'object',
          hidden: ({ parent }: any) => parent?.type !== 'external',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'address',
              title: 'Adresse',
              type: 'text'
            },
            {
              name: 'coordinates',
              title: 'Koordinaten',
              type: 'geopoint'
            }
          ]
        }
      ]
    },
    {
      name: 'organizer',
      title: 'Veranstalter',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'email',
          title: 'E-Mail',
          type: 'email'
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string'
        },
        {
          name: 'bio',
          title: 'Biografie',
          type: 'text'
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
    },
    {
      name: 'registration',
      title: 'Anmeldung',
      type: 'object',
      fields: [
        {
          name: 'required',
          title: 'Anmeldung erforderlich',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'deadline',
          title: 'Anmeldeschluss',
          type: 'datetime',
          hidden: ({ parent }: any) => !parent?.required
        },
        {
          name: 'maxParticipants',
          title: 'Maximale Teilnehmerzahl',
          type: 'number',
          hidden: ({ parent }: any) => !parent?.required
        },
        {
          name: 'registrationLink',
          title: 'Anmelde-Link',
          type: 'url',
          hidden: ({ parent }: any) => !parent?.required
        },
        {
          name: 'currentParticipants',
          title: 'Aktuelle Teilnehmerzahl',
          type: 'number',
          description: 'Anzahl der bereits angemeldeten Teilnehmer',
          hidden: ({ parent }: any) => !parent?.required,
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'fee',
          title: 'Teilnahmegebühr',
          type: 'number',
          description: 'Kosten in Euro (0 = kostenlos)',
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'cost',
          title: 'Erweiterte Kosten',
          type: 'object',
          description: 'Detaillierte Kosteninformationen (optional)',
          fields: [
            {
              name: 'amount',
              title: 'Betrag',
              type: 'number'
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
              initialValue: 'EUR'
            },
            {
              name: 'description',
              title: 'Kostenbeschreibung',
              type: 'text',
              placeholder: 'z.B. Spende erbeten, Materialkosten, etc.'
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'isFeatured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
      description: 'Wird dieses Event auf der Homepage hervorgehoben?'
    },
    {
      name: 'isPublished',
      title: 'Veröffentlicht',
      type: 'boolean',
      initialValue: true
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
          description: 'Überschreibt den Event-Titel für SEO'
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
      subtitle: 'startDate',
      media: 'featuredImage'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      const formattedDate = subtitle ? new Date(subtitle).toLocaleDateString('de-DE') : ''
      return {
        title,
        subtitle: formattedDate,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Datum (aufsteigend)',
      name: 'dateAsc',
      by: [{ field: 'startDate', direction: 'asc' }]
    },
    {
      title: 'Datum (absteigend)',
      name: 'dateDesc',
      by: [{ field: 'startDate', direction: 'desc' }]
    },
    {
      title: 'Hervorgehoben zuerst',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'startDate', direction: 'asc' }
      ]
    },
    {
      title: 'Event Typ',
      name: 'eventType',
      by: [
        { field: 'eventType', direction: 'asc' },
        { field: 'startDate', direction: 'asc' }
      ]
    }
  ]
}