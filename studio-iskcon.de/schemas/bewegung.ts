import { defineType, defineField } from 'sanity'

// Statistik-Item Schema für wiederverwendbare Stats
export const statItem = defineType({
	name: 'statItem',
	title: 'Statistik',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Titel',
			type: 'string',
			validation: (Rule) => Rule.required().min(2).max(50)
		}),
		defineField({
			name: 'value',
			title: 'Wert',
			type: 'number',
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'suffix',
			title: 'Suffix (z.B. "+", "k", "M")',
			type: 'string',
			validation: (Rule) => Rule.max(5)
		}),
		defineField({
			name: 'icon',
			title: 'Icon (Iconify Name)',
			type: 'string',
			description: 'z.B. "mdi:account-group", "mdi:temple-hindu", "mdi:food"',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Beschreibung',
			type: 'string',
			validation: (Rule) => Rule.max(100)
		}),
		defineField({
			name: 'category',
			title: 'Kategorie',
			type: 'string',
			options: {
				list: [
					{ title: 'Menschen', value: 'people' },
					{ title: 'Orte', value: 'places' },
					{ title: 'Aktivitäten', value: 'activities' },
					{ title: 'Erreichte Ziele', value: 'achievements' },
					{ title: 'Zeit', value: 'time' }
				]
			}
		}),
		defineField({
			name: 'color',
			title: 'Icon-Farbe',
			type: 'string',
			options: {
				list: [
					{ title: 'Orange', value: 'orange-400' },
					{ title: 'Blau', value: 'blue-400' },
					{ title: 'Grün', value: 'green-400' },
					{ title: 'Violett', value: 'purple-400' },
					{ title: 'Rot', value: 'red-400' },
					{ title: 'Gelb', value: 'yellow-400' }
				]
			},
			initialValue: 'orange-400'
		})
	],
	preview: {
		select: {
			title: 'title',
			value: 'value',
			suffix: 'suffix',
			category: 'category'
		},
		prepare({ title, value, suffix, category }) {
			return {
				title,
				subtitle: `${value}${suffix || ''} • ${category || 'Unkategorisiert'}`
			}
		}
	}
})

// Hauptseiten-Schema für die Bewegung-Seite
export const bewegungPage = defineType({
	name: 'bewegungPage',
	title: 'Bewegung Hauptseite',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Seitentitel',
			type: 'string',
			validation: (Rule) => Rule.required().min(5).max(100)
		}),
		defineField({
			name: 'subtitle',
			title: 'Untertitel',
			type: 'string',
			validation: (Rule) => Rule.max(200)
		}),
		defineField({
			name: 'description',
			title: 'Beschreibung',
			type: 'text',
			validation: (Rule) => Rule.required().min(50).max(500)
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero-Hintergrundbild',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'stats',
			title: 'Statistiken',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'statItem' }] }],
			description: 'Wähle die Statistiken aus, die auf dieser Seite angezeigt werden sollen'
		}),
		defineField({
			name: 'timeline',
			title: 'Timeline-Einträge',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'timelineItem' }] }]
		}),
		defineField({
			name: 'principles',
			title: 'Prinzipien',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'principle' }] }]
		}),
		defineField({
			name: 'seo',
			title: 'SEO-Einstellungen',
			type: 'object',
			fields: [
				{
					name: 'metaTitle',
					title: 'Meta-Titel',
					type: 'string',
					validation: (Rule) => Rule.max(60)
				},
				{
					name: 'metaDescription',
					title: 'Meta-Beschreibung',
					type: 'text',
					validation: (Rule) => Rule.max(160)
				}
			],
			options: {
				collapsible: true,
				collapsed: true
			}
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle'
		}
	}
})

export const timelineItem = defineType({
	name: 'timelineItem',
	title: 'Zeitstrahl Eintrag',
	type: 'document',
	fields: [
		defineField({
			name: 'year',
			title: 'Jahr',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Titel',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Beschreibung',
			type: 'text',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'details',
			title: 'Details',
			type: 'text',
			description: 'Zusätzliche Details (optional)'
		}),
		defineField({
			name: 'quote',
			title: 'Zitat',
			type: 'text',
			description: 'Ein relevantes Zitat (optional)'
		}),
		defineField({
			name: 'image',
			title: 'Bild',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'link',
			title: 'Link',
			type: 'string',
			description: 'Relativer Link zu weiteren Informationen'
		}),
		defineField({
			name: 'linkText',
			title: 'Link Text',
			type: 'string',
			description: 'Text für den Link'
		}),
		defineField({
			name: 'currentStats',
			title: 'Aktuelle Statistiken',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Nur für "Heute" Einträge relevant'
		}),
		defineField({
			name: 'expanded',
			title: 'Standardmäßig erweitert',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'order',
			title: 'Reihenfolge',
			type: 'number',
			validation: (Rule) => Rule.required().min(0)
		})
	],
	orderings: [
		{
			title: 'Reihenfolge',
			name: 'orderAsc',
			by: [
				{ field: 'order', direction: 'asc' }
			]
		},
		{
			title: 'Jahr',
			name: 'yearAsc',
			by: [
				{ field: 'year', direction: 'asc' }
			]
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'year',
			media: 'image'
		},
		prepare(selection) {
			const { title, subtitle } = selection
			return {
				title,
				subtitle: `${subtitle} - ${title}`
			}
		}
	}
})

export const principle = defineType({
	name: 'principle',
	title: 'Prinzip',
	type: 'document',
	fields: [
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			validation: (Rule) => Rule.required(),
			description: 'Emoji oder Unicode Symbol'
		}),
		defineField({
			name: 'title',
			title: 'Titel',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Detaillierte Beschreibung',
			type: 'text',
			description: 'Erweiterte Beschreibung für Hover oder Modal'
		}),
		defineField({
			name: 'link',
			title: 'Link',
			type: 'string',
			description: 'Relativer Link zu weiteren Informationen'
		}),
		defineField({
			name: 'color',
			title: 'Farbe',
			type: 'string',
			options: {
				list: [
					{ title: 'Orange', value: 'orange' },
					{ title: 'Blau', value: 'blue' },
					{ title: 'Grün', value: 'green' },
					{ title: 'Lila', value: 'purple' },
					{ title: 'Rot', value: 'red' },
					{ title: 'Gelb', value: 'yellow' }
				]
			},
			initialValue: 'orange'
		}),
		defineField({
			name: 'order',
			title: 'Reihenfolge',
			type: 'number',
			validation: (Rule) => Rule.required().min(0)
		})
	],
	orderings: [
		{
			title: 'Reihenfolge',
			name: 'orderAsc',
			by: [
				{ field: 'order', direction: 'asc' }
			]
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'text',
			icon: 'icon'
		},
		prepare(selection) {
			const { title, subtitle, icon } = selection
			return {
				title: `${icon} ${title}`,
				subtitle
			}
		}
	}
})

export default bewegungPage