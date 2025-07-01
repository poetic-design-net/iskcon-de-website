export default {
  name: 'mediaSection',
  title: 'Media Sektion',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    },
    {
      name: 'mediaType',
      title: 'Medientyp',
      type: 'string',
      options: {
        list: [
          { title: 'Bild', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({document}: {document: any}) => document?.mediaType !== 'image'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube oder Vimeo URL',
      hidden: ({document}: {document: any}) => document?.mediaType !== 'video'
    },
    {
      name: 'aspectRatio',
      title: 'Seitenverhältnis',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      videoUrl: 'videoUrl'
    },
    prepare({ title, media, videoUrl }: any) {
      const hasVideo = !!videoUrl
      return {
        title: title || 'Media Sektion',
        subtitle: `${hasVideo ? '🎥 Video' : '🖼️ Bild'}`,
        media,
        badge: '📝 Media'
      }
    }
  }
}