export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Interner Titel für die Navigation (z.B. "Hauptnavigation")',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      description: 'Nur eine Navigation kann gleichzeitig aktiv sein',
      initialValue: true
    },
    {
      name: 'items',
      title: 'Navigations-Items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'navItem',
        title: 'Navigations-Element',
        fields: [
          {
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'type',
            title: 'Typ',
            type: 'string',
            options: {
              list: [
                { title: 'Einfacher Link', value: 'link' },
                { title: 'Dropdown Menü', value: 'dropdown' },
                { title: 'Mega Menü', value: 'megamenu' }
              ]
            },
            initialValue: 'link',
            validation: (Rule: any) => Rule.required()
          },
          
          // Felder für einfachen Link
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            hidden: ({ parent }: any) => parent?.type !== 'link',
            fields: [
              {
                name: 'type',
                title: 'Link-Typ',
                type: 'string',
                options: {
                  list: [
                    { title: 'Interne Seite', value: 'internal' },
                    { title: 'Externe URL', value: 'external' },
                    { title: 'Dokument-Referenz', value: 'reference' }
                  ]
                },
                initialValue: 'internal'
              },
              {
                name: 'url',
                title: 'URL',
                type: 'string',
                hidden: ({ parent }: any) => parent?.type === 'reference',
                description: 'Für interne Links: /uber-uns, für externe: https://...'
              },
              {
                name: 'reference',
                title: 'Seiten-Referenz',
                type: 'reference',
                to: [
                  { type: 'page' },
                  { type: 'post' },
                  { type: 'event' },
                  { type: 'temple' },
                  { type: 'literature' }
                ],
                hidden: ({ parent }: any) => parent?.type !== 'reference'
              },
              {
                name: 'openInNewTab',
                title: 'In neuem Tab öffnen',
                type: 'boolean',
                initialValue: false
              }
            ]
          },
          
          // Felder für Dropdown
          {
            name: 'dropdown',
            title: 'Dropdown Items',
            type: 'array',
            hidden: ({ parent }: any) => parent?.type !== 'dropdown',
            of: [{
              type: 'object',
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
                  type: 'string'
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Icon-Name (z.B. "calendar", "book", "users")'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
                      title: 'Link-Typ',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Interne Seite', value: 'internal' },
                          { title: 'Externe URL', value: 'external' },
                          { title: 'Dokument-Referenz', value: 'reference' }
                        ]
                      },
                      initialValue: 'internal'
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                      hidden: ({ parent }: any) => parent?.type === 'reference'
                    },
                    {
                      name: 'reference',
                      title: 'Referenz',
                      type: 'reference',
                      to: [
                        { type: 'page' },
                        { type: 'post' },
                        { type: 'event' },
                        { type: 'temple' },
                        { type: 'literature' }
                      ],
                      hidden: ({ parent }: any) => parent?.type !== 'reference'
                    }
                  ]
                }
              ]
            }]
          },
          
          // Felder für Mega Menu
          {
            name: 'megamenu',
            title: 'Mega Menu Konfiguration',
            type: 'object',
            hidden: ({ parent }: any) => parent?.type !== 'megamenu',
            fields: [
              {
                name: 'columns',
                title: 'Spalten',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Spalten-Titel',
                      type: 'string'
                    },
                    {
                      name: 'items',
                      title: 'Items',
                      type: 'array',
                      of: [{
                        type: 'object',
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
                            type: 'string'
                          },
                          {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string'
                          },
                          {
                            name: 'link',
                            title: 'Link',
                            type: 'object',
                            fields: [
                              {
                                name: 'type',
                                title: 'Link-Typ',
                                type: 'string',
                                options: {
                                  list: [
                                    { title: 'Interne Seite', value: 'internal' },
                                    { title: 'Externe URL', value: 'external' },
                                    { title: 'Dokument-Referenz', value: 'reference' }
                                  ]
                                },
                                initialValue: 'internal'
                              },
                              {
                                name: 'url',
                                title: 'URL',
                                type: 'string',
                                hidden: ({ parent }: any) => parent?.type === 'reference'
                              },
                              {
                                name: 'reference',
                                title: 'Referenz',
                                type: 'reference',
                                to: [
                                  { type: 'page' },
                                  { type: 'post' },
                                  { type: 'event' },
                                  { type: 'temple' },
                                  { type: 'literature' }
                                ],
                                hidden: ({ parent }: any) => parent?.type !== 'reference'
                              }
                            ]
                          }
                        ]
                      }]
                    }
                  ]
                }]
              },
              {
                name: 'featured',
                title: 'Featured Content',
                type: 'object',
                fields: [
                  {
                    name: 'enabled',
                    title: 'Featured Content anzeigen',
                    type: 'boolean',
                    initialValue: false
                  },
                  {
                    name: 'title',
                    title: 'Titel',
                    type: 'string',
                    hidden: ({ parent }: any) => !parent?.enabled
                  },
                  {
                    name: 'description',
                    title: 'Beschreibung',
                    type: 'text',
                    rows: 2,
                    hidden: ({ parent }: any) => !parent?.enabled
                  },
                  {
                    name: 'image',
                    title: 'Bild',
                    type: 'image',
                    options: {
                      hotspot: true
                    },
                    hidden: ({ parent }: any) => !parent?.enabled
                  },
                  {
                    name: 'link',
                    title: 'Link',
                    type: 'object',
                    hidden: ({ parent }: any) => !parent?.enabled,
                    fields: [
                      {
                        name: 'type',
                        title: 'Link-Typ',
                        type: 'string',
                        options: {
                          list: [
                            { title: 'Interne Seite', value: 'internal' },
                            { title: 'Externe URL', value: 'external' },
                            { title: 'Dokument-Referenz', value: 'reference' }
                          ]
                        },
                        initialValue: 'internal'
                      },
                      {
                        name: 'url',
                        title: 'URL',
                        type: 'string',
                        hidden: ({ parent }: any) => parent?.type === 'reference'
                      },
                      {
                        name: 'reference',
                        title: 'Referenz',
                        type: 'reference',
                        to: [
                          { type: 'page' },
                          { type: 'post' },
                          { type: 'event' },
                          { type: 'temple' },
                          { type: 'literature' }
                        ],
                        hidden: ({ parent }: any) => parent?.type !== 'reference'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          
          // Erweiterte Optionen
          {
            name: 'highlight',
            title: 'Hervorheben',
            type: 'boolean',
            description: 'Element visuell hervorheben (z.B. andere Farbe)',
            initialValue: false
          },
          {
            name: 'badge',
            title: 'Badge',
            type: 'string',
            description: 'Kleiner Text-Badge (z.B. "NEU", "BELIEBT")'
          }
        ],
        preview: {
          select: {
            title: 'title',
            type: 'type',
            badge: 'badge'
          },
          prepare({ title, type, badge }: any) {
            const types: Record<string, string> = {
              link: '🔗',
              dropdown: '📁',
              megamenu: '🗂️'
            }
            return {
              title: badge ? `${title} [${badge}]` : title,
              subtitle: types[type] || type
            }
          }
        }
      }]
    },
    
    // Zusätzliche Einstellungen
    {
      name: 'settings',
      title: 'Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'showDonateButton',
          title: 'Spenden-Button anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'donateButtonText',
          title: 'Spenden-Button Text',
          type: 'string',
          initialValue: 'Spenden',
          hidden: ({ parent }: any) => !parent?.showDonateButton
        },
        {
          name: 'donateButtonLink',
          title: 'Spenden-Button Link',
          type: 'string',
          hidden: ({ parent }: any) => !parent?.showDonateButton
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      items: 'items'
    },
    prepare({ title, isActive, items }: any) {
      const itemCount = items?.length || 0
      return {
        title,
        subtitle: `${isActive ? '✅ Aktiv' : '❌ Inaktiv'} • ${itemCount} Items`
      }
    }
  }
}