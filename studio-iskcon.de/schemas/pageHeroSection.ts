import { defineType } from 'sanity'

export default defineType({
  name: 'modernHeroSection',
  title: 'Modern Hero Section',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Inhalt',
      default: true
    },
    {
      name: 'visual',
      title: 'Visuelles'
    },
    {
      name: 'stats',
      title: 'Statistiken'
    },
    {
      name: 'cta',
      title: 'Call-to-Action'
    }
  ],
  fields: [
    // Content Group
    {
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
          validation: Rule => Rule.max(30)
        },
        {
          name: 'pulseAnimation',
          title: 'Puls-Animation',
          type: 'boolean',
          initialValue: false
        }
      ],
      group: 'content'
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Der Titel wird automatisch in zwei Hälften geteilt - die zweite Hälfte bekommt den Gradient-Effekt',
      validation: Rule => Rule.required().max(120),
      group: 'content'
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(300),
      group: 'content'
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ]
          }
        }
      ],
      group: 'content'
    },

    // Visual Group
    {
      name: 'image',
      title: 'Hauptbild',
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
      ],
      validation: Rule => Rule.required(),
      group: 'visual'
    },
    {
      name: 'floatingCard',
      title: 'Schwebende Info-Karte',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Material Design Icon Name (z.B. mdi:lightning-bolt)',
          initialValue: 'mdi:lightning-bolt'
        },
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          validation: Rule => Rule.required().max(20)
        },
        {
          name: 'description',
          title: 'Beschreibung',
          type: 'string',
          validation: Rule => Rule.required().max(40)
        }
      ],
      group: 'visual'
    },
    {
      name: 'techIndicators',
      title: 'Tech-Indikatoren',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Anzeigen',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'colors',
          title: 'Farben',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Grün', value: 'green' },
                  { title: 'Gelb', value: 'yellow' },
                  { title: 'Grau', value: 'gray' },
                  { title: 'Blau', value: 'blue' },
                  { title: 'Rot', value: 'red' }
                ]
              }
            }
          ],
          initialValue: ['green', 'yellow', 'gray'],
          validation: Rule => Rule.max(3)
        }
      ],
      group: 'visual'
    },

    // Stats Group
    {
      name: 'stats',
      title: 'Statistiken',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'z.B. "10k+", "98%", "24/7"',
              validation: Rule => Rule.required().max(10)
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'z.B. "Aktive Nutzer"',
              validation: Rule => Rule.required().max(20)
            },
            {
              name: 'gradientDirection',
              title: 'Stil',
              type: 'string',
              options: {
                list: [
                  { title: 'Standard', value: 'default' },
                  { title: 'Umgekehrt', value: 'reverse' },
                  { title: 'Akzent', value: 'accent' }
                ]
              },
              initialValue: 'default'
            }
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label'
            }
          }
        }
      ],
      validation: Rule => Rule.max(3).min(3),
      group: 'stats'
    },
    {
      name: 'showStatsDivider',
      title: 'Trennlinie über Statistiken anzeigen',
      type: 'boolean',
      initialValue: false,
      group: 'stats'
    },

    // CTA Group
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button-Text',
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
              name: 'style',
              title: 'Button-Stil',
              type: 'string',
              options: {
                list: [
                  { title: 'Primär (Gradient)', value: 'primary' },
                  { title: 'Sekundär (Glass)', value: 'secondary' }
                ]
              },
              initialValue: 'primary'
            },
            {
              name: 'showArrow',
              title: 'Pfeil anzeigen',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'openInNewTab',
              title: 'In neuem Tab öffnen',
              type: 'boolean',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'style'
            }
          }
        }
      ],
      validation: Rule => Rule.max(2),
      group: 'cta'
    },

    // Additional Settings
    {
      name: 'backgroundEffects',
      title: 'Hintergrund-Effekte',
      type: 'object',
      fields: [
        {
          name: 'showGrid',
          title: 'Geometrisches Grid anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'primaryColor',
          title: 'Farbschema',
          type: 'string',
          options: {
            list: [
              { title: 'Neutral (Grau)', value: 'gray' },
              { title: 'Warm (Bernstein)', value: 'amber' },
              { title: 'Kalt (Blau)', value: 'blue' },
              { title: 'Natur (Grün)', value: 'green' }
            ]
          },
          initialValue: 'gray'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      badge: 'badge.text'
    },
    prepare({ title, subtitle, media, badge }) {
      return {
        title: title || 'Modern Hero Section',
        subtitle: badge ? `[${badge}] ${subtitle || ''}` : subtitle,
        media
      }
    }
  }
})