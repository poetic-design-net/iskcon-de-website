export default {
  name: 'movementTimeline',
  title: 'Bewegung Timeline',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Jahr',
      type: 'string',
      description: 'Jahr oder Zeitperiode (z.B. "1965", "Heute")',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
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
      name: 'details',
      title: 'Details',
      type: 'text',
      rows: 3,
      description: 'Zusätzliche Details (optional)'
    },
    {
      name: 'quote',
      title: 'Zitat',
      type: 'string',
      description: 'Ein relevantes Zitat (optional)'
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
      title: 'Weiterführender Link',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'string'
        },
        {
          name: 'text',
          title: 'Link-Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'currentStats',
      title: 'Aktuelle Statistiken',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste von Statistiken für "Heute" Einträge'
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Sortierreihenfolge in der Timeline'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Nach Jahr',
      name: 'yearAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}