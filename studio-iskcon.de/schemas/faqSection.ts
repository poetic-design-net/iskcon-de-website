export default {
  name: 'faqSection',
  title: 'FAQ Sektion',
  type: 'document',
  icon: () => '📝',
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
      name: 'faqs',
      title: 'Fragen und Antworten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            {
              name: 'question',
              title: 'Frage',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'answer',
              title: 'Antwort',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'category',
              title: 'Kategorie',
              type: 'string'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Akkordeon', value: 'accordion' },
          { title: 'Liste', value: 'list' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs'
    },
    prepare({ title, faqs }: any) {
      const faqCount = faqs ? faqs.length : 0
      return {
        title: title || 'FAQ Sektion',
        subtitle: `${faqCount} Fragen`,
        badge: '📝 FAQ'
      }
    }
  }
}