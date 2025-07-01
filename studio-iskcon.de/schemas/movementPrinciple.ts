export default {
  name: 'movementPrinciple',
  title: 'Bewegung Prinzipien',
  type: 'document',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji oder Icon-Name für dieses Prinzip',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'text',
      title: 'Beschreibung',
      type: 'string',
      description: 'Kurze Beschreibung des Prinzips',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'link',
      title: 'Weiterführender Link',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Link zu einer detaillierten Seite'
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Anzeigereihenfolge'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      icon: 'icon'
    },
    prepare({ title, subtitle, icon }: any) {
      return {
        title: `${icon} ${title}`,
        subtitle
      }
    }
  },
  orderings: [
    {
      title: 'Nach Reihenfolge',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}