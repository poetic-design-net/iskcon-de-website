export default {
  name: 'eventCategory',
  title: 'Event Kategorie',
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
      rows: 3,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Iconify Icon Name (z.B. mdi:festival)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'color',
      title: 'Farbe',
      type: 'string',
      options: {
        list: [
          { title: 'Saffron (Gold)', value: 'spiritual-saffron' },
          { title: 'Blue (Blau)', value: 'spiritual-blue' },
          { title: 'Gold', value: 'spiritual-gold' },
          { title: 'Earth (Erde)', value: 'spiritual-earth' },
          { title: 'Lotus (Rosa)', value: 'spiritual-lotus' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Soll diese Kategorie auf der Website angezeigt werden?'
    },
    {
      name: 'sortOrder',
      title: 'Sortierung',
      type: 'number',
      description: 'Niedrigere Zahlen erscheinen zuerst',
      initialValue: 100
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      icon: 'icon'
    },
    prepare(selection: any) {
      const { title, subtitle, icon } = selection
      return {
        title,
        subtitle,
        media: icon ? undefined : undefined // Could add icon preview later
      }
    }
  },
  orderings: [
    {
      title: 'Sortierung',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Titel',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
}