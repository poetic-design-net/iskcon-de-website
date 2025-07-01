export default {
  name: 'ctaSection',
  title: 'CTA Sektion',
  type: 'document',
  icon: () => '⚡',
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
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'primaryButton',
      title: 'Primärer Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Sekundärer Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string'
        }
      ]
    },
    {
      name: 'background',
      title: 'Hintergrund',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Typ',
          type: 'string',
          options: {
            list: [
              { title: 'Farbe', value: 'color' },
              { title: 'Bild', value: 'image' }
            ],
            layout: 'radio'
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'color',
          title: 'Hintergrundfarbe',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Light', value: 'light' },
              { title: 'Dark', value: 'dark' }
            ]
          },
          hidden: ({parent}: {parent: any}) => parent?.type !== 'color'
        },
        {
          name: 'image',
          title: 'Hintergrundbild',
          type: 'image',
          options: {
            hotspot: true
          },
          hidden: ({parent}: {parent: any}) => parent?.type !== 'image'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      primaryButtonText: 'primaryButton.text',
      backgroundType: 'background.type'
    },
    prepare({ title, description, primaryButtonText, backgroundType }: any) {
      const backgroundInfo = backgroundType === 'image' ? '🖼️ Bild' : '🎨 Farbe'
      const buttonText = primaryButtonText ? `"${primaryButtonText}"` : 'Button'
      return {
        title: title || 'CTA Sektion',
        subtitle: `${buttonText} • ${backgroundInfo} • Interaktion & Aktion`,
        media: backgroundType === 'image' ? undefined : undefined,
        badge: '⚡ CTA'
      }
    }
  }
}