export default {
  name: 'gridSection',
  title: 'Grid Sektion',
  type: 'document',
  icon: () => '🎨',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    },
    {
      name: 'items',
      title: 'Grid Elemente',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'gridItem',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule: any) => Rule.required()
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
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Absolute oder relative URL (z.B. https://example.com oder /kontakt)',
              validation: (Rule: any) =>
                Rule.custom((value: string) => {
                  if (!value) return true; // Optional
                  
                  // Prüfen auf absolute URL (beginnt mit http:// oder https://)
                  const absoluteUrlPattern = /^https?:\/\//;
                  
                  // Prüfen auf relative URL (beginnt mit / oder ./)
                  const relativeUrlPattern = /^(\/|\.\/).*/;
                  
                  if (absoluteUrlPattern.test(value) || relativeUrlPattern.test(value)) {
                    return true;
                  }
                  
                  return 'Bitte geben Sie eine gültige URL ein (absolut oder relativ)';
                })
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'columns',
      title: 'Spalten',
      type: 'number',
      options: {
        list: [
          { title: '2 Spalten', value: 2 },
          { title: '3 Spalten', value: 3 },
          { title: '4 Spalten', value: 4 }
        ]
      },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
      columns: 'columns'
    },
    prepare({ title, items, columns }: any) {
      const itemCount = items ? items.length : 0
      const columnInfo = columns ? `${columns} Spalten` : 'Grid'
      return {
        title: title || 'Grid Sektion',
        subtitle: `${itemCount} Elemente • ${columnInfo} • Layout & Struktur`,
        badge: '🎨 Grid'
      }
    }
  }
}