import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Homepage Titel',
      type: 'string',
      description: 'Wird in den Browser-Tabs angezeigt',
      initialValue: 'ISKCON Deutschland-Österreich',
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hauptüberschrift',
          type: 'object',
          fields: [
            {
              name: 'line1',
              title: 'Erste Zeile',
              type: 'string',
              initialValue: 'Willkommen bei'
            },
            {
              name: 'line2',
              title: 'Zweite Zeile (farbig)',
              type: 'string',
              initialValue: 'ISKCON Deutschland-Österreich'
            }
          ]
        },
        {
          name: 'subtitle',
          title: 'Untertitel',
          type: 'text',
          rows: 2,
          initialValue: 'Wir gehören zur Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON) und freuen uns auf Ihren Besuch.'
        },
        {
          name: 'backgroundImage',
          title: 'Hintergrundbild',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        },
        {
          name: 'buttons',
          title: 'Buttons',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'text',
                title: 'Button Text',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'link',
                title: 'Link',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'icon',
                title: 'Icon',
                type: 'string',
                description: 'Material Design Icon Name (z.B. mdi:book-open)'
              },
              {
                name: 'variant',
                title: 'Button Stil',
                type: 'string',
                options: {
                  list: [
                    { title: 'Outline', value: 'outline' },
                    { title: 'Premium', value: 'premium' }
                  ]
                },
                initialValue: 'outline'
              }
            ],
            preview: {
              select: {
                title: 'text',
                subtitle: 'link'
              }
            }
          }],
          validation: Rule => Rule.max(2),
          initialValue: [
            {
              text: 'Mehr erfahren',
              link: '/philosophie',
              icon: 'mdi:book-open',
              variant: 'outline'
            },
            {
              text: 'Tempel besuchen',
              link: '/tempel',
              icon: 'mdi:temple-hindu',
              variant: 'premium'
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
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Titel für Suchmaschinen',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Beschreibung für Suchmaschinen',
          validation: Rule => Rule.max(160)
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Homepage Einstellungen'
      }
    }
  }
})