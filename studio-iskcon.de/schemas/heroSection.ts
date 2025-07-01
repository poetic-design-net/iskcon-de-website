export default {
  name: 'heroSection',
  title: 'Hero Sektion',
  type: 'document',
  icon: () => '🏔️',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'text'
    },
    {
      name: 'highlightedText',
      title: 'Hervorgehobener Text',
      type: 'string',
      description: 'Text der in einer anderen Farbe hervorgehoben wird'
    },
    {
      name: 'image',
      title: 'Hintergrundbild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'videoUrl',
      title: 'Video URL (Optional)',
      type: 'url',
      description: 'YouTube oder Vimeo URL für Hintergrundvideo'
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Transparenz',
      type: 'number',
      description: 'Transparenz des dunklen Overlays (0-100)',
      validation: (Rule: any) => Rule.min(0).max(100),
      initialValue: 30
    },
    {
      name: 'variant',
      title: 'Stil-Variante',
      type: 'string',
      options: {
        list: [
          { title: 'Vollbild mit Scroll-Effekt', value: 'fullscreen-scroll' },
          { title: 'Vollbild statisch', value: 'fullscreen-static' },
          { title: 'Split-Screen', value: 'split-screen' },
          { title: 'Minimal', value: 'minimal' }
        ],
        layout: 'radio'
      },
      initialValue: 'fullscreen-scroll',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'alignment',
      title: 'Text-Ausrichtung',
      type: 'string',
      options: {
        list: [
          { title: 'Zentriert', value: 'center' },
          { title: 'Links', value: 'left' },
          { title: 'Rechts', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'center'
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Button Text',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'link',
            title: 'Button Link',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'icon',
            title: 'Icon (Optional)',
            type: 'string',
            description: 'Icon Name (z.B. mdi:book-open)'
          },
          {
            name: 'variant',
            title: 'Button Stil',
            type: 'string',
            options: {
              list: [
                { title: 'Primär', value: 'primary' },
                { title: 'Sekundär', value: 'secondary' },
                { title: 'Outline', value: 'outline' }
              ]
            },
            initialValue: 'primary'
          }
        ]
      }]
    },
    {
      name: 'animationType',
      title: 'Animations-Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Fade In', value: 'fade' },
          { title: 'Slide Up', value: 'slide-up' },
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Keine Animation', value: 'none' }
        ]
      },
      initialValue: 'fade'
    },
    {
      name: 'scrollIndicator',
      title: 'Scroll-Indikator anzeigen',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'particleEffect',
      title: 'Partikel-Effekt aktivieren',
      type: 'boolean',
      description: 'Zeigt animierte Partikel im Hintergrund',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image'
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Hero Sektion',
        subtitle: subtitle || 'Hero Sektion',
        media,
        badge: '🏔️ Hero'
      }
    }
  }
}