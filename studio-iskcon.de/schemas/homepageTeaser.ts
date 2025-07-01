export default {
  name: 'homepageTeaser',
  title: 'Homepage Teaser',
  type: 'document',
  fields: [
    {
      name: 'theme',
      title: 'Thema',
      type: 'string',
      options: {
        list: [
          { title: 'Hare Krishna Bewegung', value: 'hare-krishna' },
          { title: 'Bhakti Yoga', value: 'bhakti-yoga' },
          { title: 'Mantra Meditation', value: 'mantra-meditation' },
          { title: 'Tempel besuchen', value: 'tempel-besuchen' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(80)
    },
    {
      name: 'teaser',
      title: 'Teaser-Text',
      type: 'text',
      rows: 3,
      description: '2-3 einladende Sätze, die das Thema vorstellen',
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'highlight',
      title: 'Highlight/Zitat',
      type: 'string',
      description: 'Ein inspirierendes Zitat oder besonderes Merkmal (optional)'
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'badge',
      title: 'Badge-Text',
      type: 'string',
      description: 'Kleines Label wie "Neu", "Beliebt" etc. (optional)'
    },
    {
      name: 'ctaText',
      title: 'Button-Text',
      type: 'string',
      initialValue: 'Mehr erfahren'
    },
    {
      name: 'ctaLink',
      title: 'Button-Link',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Bild links', value: 'imageLeft' },
          { title: 'Bild rechts', value: 'imageRight' },
          { title: 'Vollbild mit Overlay', value: 'imageFull' }
        ],
        layout: 'radio'
      },
      initialValue: 'imageLeft',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'displayMode',
      title: 'Anzeigemodus',
      type: 'string',
      description: 'Wie soll dieser Teaser angezeigt werden?',
      options: {
        list: [
          { title: 'Im Slider mit gleichen Layouts', value: 'slider' },
          { title: 'Einzeln (ohne Slider)', value: 'single' }
        ],
        layout: 'radio'
      },
      initialValue: 'slider'
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Bestimmt die Anzeigereihenfolge auf der Homepage'
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'theme',
      media: 'image'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      const themeLabels: { [key: string]: string } = {
        'hare-krishna': 'Hare Krishna',
        'bhakti-yoga': 'Bhakti Yoga',
        'mantra-meditation': 'Mantra Meditation',
        'tempel-besuchen': 'Tempel besuchen'
      };
      return {
        title,
        subtitle: themeLabels[subtitle] || subtitle,
        media
      };
    }
  }
}