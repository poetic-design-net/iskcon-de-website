export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark this post as featured to display it prominently',
      initialValue: false
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'URL zu einem Video (z.B. YouTube, Vimeo)',
      validation: (Rule: any) => Rule.custom((url: string) => {
        if (!url) return true // Optional field
        const videoPatterns = [
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
          /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/
        ]
        return videoPatterns.some(pattern => pattern.test(url))
          ? true
          : 'Bitte geben Sie eine gültige YouTube oder Vimeo URL ein'
      })
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image'
        },
        {
          name: 'video',
          type: 'object',
          title: 'Video',
          preview: {
            select: {
              url: 'url'
            },
            prepare({url}: {url: string}) {
              return {
                title: 'Video: ' + url
              }
            }
          },
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'URL zu einem Video (z.B. YouTube, Vimeo)',
              validation: (Rule: any) => Rule.custom((url: string) => {
                if (!url) return 'Video URL ist erforderlich'
                const videoPatterns = [
                  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                  /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/
                ]
                return videoPatterns.some(pattern => pattern.test(url))
                  ? true
                  : 'Bitte geben Sie eine gültige YouTube oder Vimeo URL ein'
              })
            }
          ]
        }
      ]
    }
  ]
}