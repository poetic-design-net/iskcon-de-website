export default {
  name: 'quoteSection',
  title: 'Zitat Sektion',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'quote',
      title: 'Zitat',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Rolle/Position',
      type: 'string'
    },
    {
      name: 'avatar',
      title: 'Autor Bild',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'string',
      options: {
        list: [
          { title: 'Hell', value: 'light' },
          { title: 'Dunkel', value: 'dark' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      source: 'source'
    },
    prepare({ quote, author, source }: any) {
      const preview = quote ? `"${quote.substring(0, 50)}..."` : 'Zitat Sektion'
      return {
        title: preview,
        subtitle: `${author || 'Autor'}`,
        badge: '📝 Zitat'
      }
    }
  }
}