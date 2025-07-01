export default {
  name: 'movementPage',
  title: 'Bewegung Seite',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      description: 'SEO Meta-Beschreibung'
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon-Name (z.B. "mdi:lotus")'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            }
          ]
        },
        {
          name: 'showScrollHint',
          title: 'Scroll-Hinweis anzeigen',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'introduction',
      title: 'Einführung',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            }
          ]
        },
        {
          name: 'title',
          title: 'Titel',
          type: 'string'
        },
        {
          name: 'leadText',
          title: 'Einleitungstext',
          type: 'text',
          rows: 4
        },
        {
          name: 'content',
          title: 'Inhalt',
          type: 'array',
          of: [{ type: 'block' }]
        },
        {
          name: 'infoBox',
          title: 'Info-Box',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string'
            },
            {
              name: 'subtitle',
              title: 'Untertitel',
              type: 'string'
            },
            {
              name: 'facts',
              title: 'Fakten',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'icon',
                    title: 'Icon',
                    type: 'string'
                  },
                  {
                    name: 'text',
                    title: 'Text',
                    type: 'string'
                  }
                ]
              }]
            }
          ]
        }
      ]
    },
    {
      name: 'statistics',
      title: 'Statistiken',
      type: 'reference',
      to: [{ type: 'movementStats' }]
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            }
          ]
        },
        {
          name: 'title',
          title: 'Titel',
          type: 'string'
        },
        {
          name: 'introText',
          title: 'Einleitungstext',
          type: 'text',
          rows: 3
        },
        {
          name: 'items',
          title: 'Timeline-Einträge',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'movementTimeline' }] }]
        },
        {
          name: 'ctaButton',
          title: 'Call-to-Action Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button-Text',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'reference',
              to: [{ type: 'page' }]
            }
          ]
        }
      ]
    },
    {
      name: 'philosophy',
      title: 'Philosophie & Praxis',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            }
          ]
        },
        {
          name: 'title',
          title: 'Titel',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Untertitel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschreibung',
          type: 'text',
          rows: 3
        },
        {
          name: 'principles',
          title: 'Prinzipien',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'movementPrinciple' }] }]
        },
        {
          name: 'ctaButtons',
          title: 'Call-to-Action Buttons',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'icon',
                title: 'Icon',
                type: 'string'
              },
              {
                name: 'text',
                title: 'Button-Text',
                type: 'string'
              },
              {
                name: 'link',
                title: 'Link',
                type: 'reference',
                to: [{ type: 'page' }]
              }
            ]
          }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    }
  }
}