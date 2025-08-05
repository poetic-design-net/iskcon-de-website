export default {
  name: 'page',
  title: 'Seite',
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
      rows: 3
    },
    {
      name: 'parent',
      title: 'Übergeordnete Seite',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Wählen Sie die übergeordnete Seite für die Hierarchie'
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Sortierreihenfolge innerhalb der gleichen Ebene',
      validation: (Rule: any) => Rule.min(0)
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
          description: 'Überschreibt den Seitentitel für SEO'
        },
        {
          name: 'description',
          title: 'SEO Beschreibung',
          type: 'text',
          rows: 2,
          description: 'Überschreibt die Seitenbeschreibung für SEO'
        },
        {
          name: 'image',
          title: 'SEO Bild',
          type: 'image',
          description: 'Bild für soziale Medien'
        }
      ]
    },
    {
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'}
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
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      parent: 'parent.title',
      slug: 'slug.current'
    },
    prepare({ title, subtitle, parent, slug }: any) {
      // Für die Anzeige in Listen nur den Titel verwenden
      return {
        title: title,
        subtitle: subtitle || 'Keine Beschreibung'
      }
    }
  },
  orderings: [
    {
      title: 'Hierarchie',
      name: 'hierarchyAsc',
      by: [
        { field: 'parent._ref', direction: 'asc' },
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Alphabetisch',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
}