export default {
  name: 'page',
  title: 'Seite',
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
      rows: 3
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Titel',
          type: 'string',
          description: 'Überschreibt den Seitentitel für SEO'
        },
        {
          name: 'description',
          title: 'SEO Beschreibung',
          type: 'text',
          rows: 2,
          description: 'Überschreibt die Seitenbeschreibung für SEO'
        },
        {
          name: 'image',
          title: 'SEO Bild',
          type: 'image',
          description: 'Bild für soziale Medien'
        }
      ]
    },
    {
      name: 'sections',
      title: 'Sektionen',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'heroSection' },
            { type: 'mediaSection' },
            { type: 'quoteSection' },
            { type: 'faqSection' },
            { type: 'gridSection' },
            { type: 'ctaSection' }
          ],
          options: {
            disableNew: true
          }
        }
      ],
      group: 'sections'
    }
  ],
  groups: [
    {
      name: 'sections',
      title: 'Sektionen',
      default: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      sections: 'sections'
    },
    prepare({ title, subtitle, sections }: any) {
      const totalSections = sections?.length || 0
      
      // Erstelle eine Liste der Section-Typen für bessere Übersicht
      const sectionTypes: Record<string, string> = {
        heroSection: '🏔️ Hero',
        mediaSection: '📝 Media',
        quoteSection: '💬 Quote',
        faqSection: '❓ FAQ',
        gridSection: '🎨 Grid',
        ctaSection: '⚡ CTA'
      }
      
      const sectionSummary = sections?.map((section: any) =>
        sectionTypes[section._type] || section._type
      ).join(', ') || ''
      
      return {
        title,
        subtitle: subtitle || (totalSections > 0 ? `${totalSections} Sections: ${sectionSummary}` : 'Keine Sections')
      }
    }
  }
}