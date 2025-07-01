export default {
  name: 'multimedia',
  title: 'Multimedia',
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
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 4
    },
    {
      name: 'mediaType',
      title: 'Media Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Audio', value: 'audio' },
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Live Stream', value: 'livestream' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'contentType',
      title: 'Inhalts Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Kirtan', value: 'kirtan' },
          { title: 'Bhajan', value: 'bhajan' },
          { title: 'Mantra', value: 'mantra' },
          { title: 'Vortrag', value: 'lecture' },
          { title: 'Bhagavad Gita Klasse', value: 'gita_class' },
          { title: 'Srimad Bhagavatam Klasse', value: 'bhagavatam_class' },
          { title: 'Festival Aufnahme', value: 'festival' },
          { title: 'Interview', value: 'interview' },
          { title: 'Meditation', value: 'meditation' },
          { title: 'Philosophie', value: 'philosophy' },
          { title: 'Anleitung', value: 'instruction' },
          { title: 'Sonstiges', value: 'other' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'thumbnail',
      title: 'Vorschaubild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'media',
      title: 'Media Dateien',
      type: 'object',
      fields: [
        {
          name: 'primarySource',
          title: 'Hauptquelle',
          type: 'object',
          fields: [
            {
              name: 'sourceType',
              title: 'Quellen Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Upload', value: 'upload' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'SoundCloud', value: 'soundcloud' },
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'Externe URL', value: 'external' },
                  { title: 'Live Stream', value: 'livestream' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'file',
              title: 'Datei',
              type: 'file',
              hidden: ({ parent }: any) => parent?.sourceType !== 'upload'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.sourceType === 'upload'
            },
            {
              name: 'embedId',
              title: 'Embed ID',
              type: 'string',
              description: 'YouTube Video ID, Vimeo ID, etc.',
              hidden: ({ parent }: any) => !['youtube', 'vimeo', 'soundcloud'].includes(parent?.sourceType)
            }
          ]
        },
        {
          name: 'alternativeSources',
          title: 'Alternative Quellen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'sourceType',
                  title: 'Quellen Typ',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Upload', value: 'upload' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'Vimeo', value: 'vimeo' },
                      { title: 'SoundCloud', value: 'soundcloud' },
                      { title: 'Spotify', value: 'spotify' },
                      { title: 'Externe URL', value: 'external' }
                    ]
                  }
                },
                {
                  name: 'file',
                  title: 'Datei',
                  type: 'file',
                  hidden: ({ parent }: any) => parent?.sourceType !== 'upload'
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  hidden: ({ parent }: any) => parent?.sourceType === 'upload'
                },
                {
                  name: 'embedId',
                  title: 'Embed ID',
                  type: 'string',
                  hidden: ({ parent }: any) => !['youtube', 'vimeo', 'soundcloud'].includes(parent?.sourceType)
                },
                {
                  name: 'quality',
                  title: 'Qualität',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Niedrig', value: 'low' },
                      { title: 'Mittel', value: 'medium' },
                      { title: 'Hoch', value: 'high' },
                      { title: 'HD', value: 'hd' },
                      { title: '4K', value: '4k' }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'duration',
      title: 'Dauer',
      type: 'object',
      fields: [
        {
          name: 'minutes',
          title: 'Minuten',
          type: 'number',
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'seconds',
          title: 'Sekunden',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(59)
        }
      ]
    },
    {
      name: 'speaker',
      title: 'Sprecher/Künstler',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'spiritualName',
          title: 'Spiritueller Name',
          type: 'string'
        },
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          placeholder: 'z.B. His Holiness, Prabhu, Mataji'
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
      name: 'recordingInfo',
      title: 'Aufnahme Informationen',
      type: 'object',
      fields: [
        {
          name: 'recordedAt',
          title: 'Aufgenommen am',
          type: 'date'
        },
        {
          name: 'location',
          title: 'Aufnahmeort',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Ort Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Tempel', value: 'temple' },
                  { title: 'Festival', value: 'festival' },
                  { title: 'Studio', value: 'studio' },
                  { title: 'Extern', value: 'external' }
                ]
              }
            },
            {
              name: 'temple',
              title: 'Tempel',
              type: 'reference',
              to: [{ type: 'temple' }],
              hidden: ({ parent }: any) => parent?.type !== 'temple'
            },
            {
              name: 'event',
              title: 'Event',
              type: 'reference',
              to: [{ type: 'event' }],
              hidden: ({ parent }: any) => parent?.type !== 'festival'
            },
            {
              name: 'customLocation',
              title: 'Benutzerdefinierter Ort',
              type: 'string',
              hidden: ({ parent }: any) => ['temple', 'festival'].includes(parent?.type)
            }
          ]
        },
        {
          name: 'occasion',
          title: 'Anlass',
          type: 'string',
          description: 'z.B. Janmashtami, Gaura Purnima, regulärer Satsang'
        }
      ]
    },
    {
      name: 'transcription',
      title: 'Transkription',
      type: 'object',
      fields: [
        {
          name: 'hasTranscription',
          title: 'Transkription verfügbar',
          type: 'boolean',
          initialValue: false
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
          hidden: ({ parent }: any) => !parent?.hasTranscription
        },
        {
          name: 'content',
          title: 'Transkription',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }: any) => !parent?.hasTranscription
        },
        {
          name: 'timestampedSegments',
          title: 'Zeitgestempelte Segmente',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'timestamp',
                  title: 'Zeitstempel',
                  type: 'string',
                  placeholder: '00:05:30'
                },
                {
                  name: 'text',
                  title: 'Text',
                  type: 'text'
                },
                {
                  name: 'sanskritTerms',
                  title: 'Sanskrit Begriffe',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: {
                    layout: 'tags'
                  }
                }
              ]
            }
          ],
          hidden: ({ parent }: any) => !parent?.hasTranscription
        }
      ]
    },
    {
      name: 'musicInfo',
      title: 'Musik Informationen',
      type: 'object',
      hidden: ({ document }: any) => !['kirtan', 'bhajan', 'mantra'].includes(document?.contentType),
      fields: [
        {
          name: 'mantras',
          title: 'Mantras',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'mantra',
                  title: 'Mantra Text',
                  type: 'string'
                },
                {
                  name: 'translation',
                  title: 'Übersetzung',
                  type: 'text'
                },
                {
                  name: 'timestamp',
                  title: 'Zeitstempel',
                  type: 'string',
                  placeholder: '00:05:30'
                }
              ]
            }
          ]
        },
        {
          name: 'instruments',
          title: 'Instrumente',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Mridanga', value: 'mridanga' },
                  { title: 'Kartals', value: 'kartals' },
                  { title: 'Harmonium', value: 'harmonium' },
                  { title: 'Tabla', value: 'tabla' },
                  { title: 'Gong', value: 'gong' },
                  { title: 'Gitarre', value: 'guitar' },
                  { title: 'Flöte', value: 'flute' },
                  { title: 'Sonstiges', value: 'other' }
                ]
              }
            }
          ]
        },
        {
          name: 'tempo',
          title: 'Tempo',
          type: 'string',
          options: {
            list: [
              { title: 'Langsam', value: 'slow' },
              { title: 'Mittel', value: 'medium' },
              { title: 'Schnell', value: 'fast' },
              { title: 'Variierend', value: 'varying' }
            ]
          }
        },
        {
          name: 'style',
          title: 'Stil',
          type: 'string',
          options: {
            list: [
              { title: 'Traditionell', value: 'traditional' },
              { title: 'Modern', value: 'modern' },
              { title: 'Fusionsmusik', value: 'fusion' },
              { title: 'A cappella', value: 'acappella' }
            ]
          }
        }
      ]
    },
    {
      name: 'relatedContent',
      title: 'Verwandter Inhalt',
      type: 'object',
      fields: [
        {
          name: 'literature',
          title: 'Literatur',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'literature' }]
            }
          ]
        },
        {
          name: 'events',
          title: 'Events',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'event' }]
            }
          ]
        },
        {
          name: 'relatedMultimedia',
          title: 'Ähnliche Multimedia',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'multimedia' }]
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
      name: 'isPublic',
      title: 'Öffentlich',
      type: 'boolean',
      initialValue: true,
      description: 'Ist dieses Medium öffentlich verfügbar?'
    },
    {
      name: 'isFeatured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
      description: 'Wird dieses Medium auf der Homepage hervorgehoben?'
    },
    {
      name: 'downloadable',
      title: 'Downloadbar',
      type: 'boolean',
      initialValue: false,
      description: 'Können Benutzer diese Datei herunterladen?'
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
          description: 'Überschreibt den Titel für SEO'
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
      subtitle: 'speaker.name',
      media: 'thumbnail'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `von ${subtitle}` : 'Kein Sprecher angegeben',
        media
      }
    }
  },
  orderings: [
    {
      title: 'Titel A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Aufnahmedatum (neueste zuerst)',
      name: 'recordingDateDesc',
      by: [{ field: 'recordingInfo.recordedAt', direction: 'desc' }]
    },
    {
      title: 'Sprecher A-Z',
      name: 'speakerAsc',
      by: [{ field: 'speaker.name', direction: 'asc' }]
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
      title: 'Nach Inhalts Typ',
      name: 'contentType',
      by: [
        { field: 'contentType', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Nach Media Typ',
      name: 'mediaType',
      by: [
        { field: 'mediaType', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}