export default {
  name: 'welcomeMessage',
  title: 'Willkommensnachrichten',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Sprache',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'text',
      title: 'Begrüßungstext',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }
  ],
  preview: {
    select: {
      title: 'language',
      subtitle: 'text'
    }
  }
}