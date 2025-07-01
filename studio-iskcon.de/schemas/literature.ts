export default {
  name: 'literature',
  title: 'Literatur',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
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
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string'
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'originalName',
          title: 'Original Name (Sanskrit)',
          type: 'string',
          description: 'Sanskrit oder ursprünglicher Name des Autors'
        },
        {
          name: 'bio',
          title: 'Biografie',
          type: 'text'
        },
        {
          name: 'image',
          title: 'Autorenfoto',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'translator',
      title: 'Übersetzer',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'bio',
          title: 'Biografie',
          type: 'text'
        }
      ]
    },
    {
      name: 'bookType',
      title: 'Buch Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Bhagavad-gita', value: 'bhagavad_gita' },
          { title: 'Srimad-Bhagavatam', value: 'srimad_bhagavatam' },
          { title: 'Caitanya-caritamrta', value: 'caitanya_caritamrta' },
          { title: 'Nectar of Devotion', value: 'nectar_devotion' },
          { title: 'Nectar of Instruction', value: 'nectar_instruction' },
          { title: 'Sri Isopanishad', value: 'sri_isopanishad' },
          { title: 'Krishna Buch', value: 'krishna_book' },
          { title: 'Philosophie', value: 'philosophy' },
          { title: 'Biografie', value: 'biography' },
          { title: 'Anleitungen', value: 'instructions' },
          { title: 'Kommentar', value: 'commentary' },
          { title: 'Sonstiges', value: 'other' }
        ]
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
      name: 'coverImage',
      title: 'Buchcover',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'additionalImages',
      title: 'Zusätzliche Bilder',
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
      name: 'isbn',
      title: 'ISBN',
      type: 'string'
    },
    {
      name: 'publishingInfo',
      title: 'Verlagsinformationen',
      type: 'object',
      fields: [
        {
          name: 'publisher',
          title: 'Verlag',
          type: 'string',
          initialValue: 'The Bhaktivedanta Book Trust'
        },
        {
          name: 'publishedYear',
          title: 'Erscheinungsjahr',
          type: 'number'
        },
        {
          name: 'edition',
          title: 'Auflage',
          type: 'string'
        },
        {
          name: 'language',
          title: 'Sprache',
          type: 'string',
          options: {
            list: [
              { title: 'Deutsch', value: 'de' },
              { title: 'Englisch', value: 'en' },
              { title: 'Sanskrit', value: 'sa' }
            ]
          },
          initialValue: 'de'
        },
        {
          name: 'pages',
          title: 'Seitenzahl',
          type: 'number'
        }
      ]
    },
    {
      name: 'content',
      title: 'Inhalt',
      type: 'object',
      fields: [
        {
          name: 'chapters',
          title: 'Kapitel',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Kapiteltitel',
                  type: 'string'
                },
                {
                  name: 'sanskritTitle',
                  title: 'Sanskrit Titel',
                  type: 'string'
                },
                {
                  name: 'summary',
                  title: 'Zusammenfassung',
                  type: 'text'
                },
                {
                  name: 'verses',
                  title: 'Verse',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'number',
                          title: 'Vers Nummer',
                          type: 'string'
                        },
                        {
                          name: 'sanskrit',
                          title: 'Sanskrit Text',
                          type: 'text'
                        },
                        {
                          name: 'translation',
                          title: 'Übersetzung',
                          type: 'text'
                        },
                        {
                          name: 'purport',
                          title: 'Erläuterung',
                          type: 'array',
                          of: [{ type: 'block' }]
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
          name: 'introduction',
          title: 'Einführung',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'conclusion',
          title: 'Schlussfolgerung',
          type: 'array',
          of: [{ type: 'block' }]
        }
      ]
    },
    {
      name: 'sanskritTerms',
      title: 'Sanskrit Begriffe',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'term',
              title: 'Sanskrit Begriff',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'pronunciation',
              title: 'Aussprache',
              type: 'string',
              description: 'Phonetische Aussprache für deutsche Leser'
            },
            {
              name: 'definition',
              title: 'Definition',
              type: 'text',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'etymology',
              title: 'Etymologie',
              type: 'text',
              description: 'Herkunft und Wortbildung'
            },
            {
              name: 'usage',
              title: 'Verwendung',
              type: 'text',
              description: 'Wie und wo der Begriff verwendet wird'
            },
            {
              name: 'relatedTerms',
              title: 'Verwandte Begriffe',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              }
            }
          ],
          preview: {
            select: {
              title: 'term',
              subtitle: 'definition'
            }
          }
        }
      ]
    },
    {
      name: 'availability',
      title: 'Verfügbarkeit',
      type: 'object',
      fields: [
        {
          name: 'isAvailable',
          title: 'Verfügbar',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'formats',
          title: 'Verfügbare Formate',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Hardcover', value: 'hardcover' },
                  { title: 'Paperback', value: 'paperback' },
                  { title: 'eBook', value: 'ebook' },
                  { title: 'Hörbuch', value: 'audiobook' },
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Online kostenlos', value: 'online_free' }
                ]
              }
            }
          ]
        },
        {
          name: 'price',
          title: 'Preis',
          type: 'object',
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
            }
          ]
        },
        {
          name: 'purchaseLinks',
          title: 'Kauflinks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'vendor',
                  title: 'Anbieter',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'Link',
                  type: 'url'
                },
                {
                  name: 'format',
                  title: 'Format',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          name: 'freeDownloadLink',
          title: 'Kostenloser Download',
          type: 'url',
          description: 'Link zum kostenlosen PDF-Download'
        }
      ]
    },
    {
      name: 'difficulty',
      title: 'Schwierigkeitsgrad',
      type: 'string',
      options: {
        list: [
          { title: 'Anfänger', value: 'beginner' },
          { title: 'Fortgeschritten', value: 'intermediate' },
          { title: 'Experte', value: 'advanced' },
          { title: 'Gelehrte', value: 'scholarly' }
        ]
      },
      initialValue: 'beginner'
    },
    {
      name: 'recommendedFor',
      title: 'Empfohlen für',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'z.B. Neue Devotees, Studiengruppen, Philosophie-Interessierte'
    },
    {
      name: 'relatedBooks',
      title: 'Ähnliche Bücher',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'literature' }]
        }
      ]
    },
    {
      name: 'isFeatured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
      description: 'Wird dieses Buch auf der Homepage hervorgehoben?'
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
          description: 'Überschreibt den Buchtitel für SEO'
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
      subtitle: 'author.name',
      media: 'coverImage'
    }
  },
  orderings: [
    {
      title: 'Titel A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Autor A-Z',
      name: 'authorAsc',
      by: [{ field: 'author.name', direction: 'asc' }]
    },
    {
      title: 'Hervorgehoben zuerst',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Nach Buch Typ',
      name: 'bookType',
      by: [
        { field: 'bookType', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Schwierigkeitsgrad',
      name: 'difficulty',
      by: [
        { field: 'difficulty', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}