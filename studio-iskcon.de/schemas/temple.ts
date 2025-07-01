export default {
  name: 'temple',
  title: 'Tempel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tempel Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 4
    },
    {
      name: 'mainImage',
      title: 'Hauptbild',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Bildergalerie',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Straße',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'city',
          title: 'Stadt',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'postalCode',
          title: 'Postleitzahl',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'state',
          title: 'Bundesland',
          type: 'string'
        },
        {
          name: 'country',
          title: 'Land',
          type: 'string',
          initialValue: 'Deutschland'
        }
      ]
    },
    {
      name: 'location',
      title: 'Standort',
      type: 'geopoint',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string'
        },
        {
          name: 'email',
          title: 'E-Mail',
          type: 'email'
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url'
        }
      ]
    },
    {
      name: 'serviceHours',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Tag',
              type: 'string',
              options: {
                list: [
                  { title: 'Montag', value: 'monday' },
                  { title: 'Dienstag', value: 'tuesday' },
                  { title: 'Mittwoch', value: 'wednesday' },
                  { title: 'Donnerstag', value: 'thursday' },
                  { title: 'Freitag', value: 'friday' },
                  { title: 'Samstag', value: 'saturday' },
                  { title: 'Sonntag', value: 'sunday' }
                ]
              }
            },
            {
              name: 'openTime',
              title: 'Öffnungszeit',
              type: 'string',
              placeholder: '08:00'
            },
            {
              name: 'closeTime',
              title: 'Schließzeit',
              type: 'string',
              placeholder: '20:00'
            },
            {
              name: 'isClosed',
              title: 'Geschlossen',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    },
    {
      name: 'programs',
      title: 'Programme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Programmtitel',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'text'
            },
            {
              name: 'time',
              title: 'Zeit',
              type: 'string'
            },
            {
              name: 'frequency',
              title: 'Häufigkeit',
              type: 'string',
              options: {
                list: [
                  { title: 'Täglich', value: 'daily' },
                  { title: 'Wöchentlich', value: 'weekly' },
                  { title: 'Monatlich', value: 'monthly' },
                  { title: 'Speziell', value: 'special' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'facilities',
      title: 'Einrichtungen',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Parkplatz', value: 'parking' },
              { title: 'Restaurant', value: 'restaurant' },
              { title: 'Bibliothek', value: 'library' },
              { title: 'Buchhandlung', value: 'bookstore' },
              { title: 'Gästehaus', value: 'guesthouse' },
              { title: 'Barrierefreier Zugang', value: 'accessible' },
              { title: 'Kinderprogramm', value: 'children_program' }
            ]
          }
        }
      ]
    },
    {
      name: 'president',
      title: 'Tempelpräsident',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Foto',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'bio',
          title: 'Biografie',
          type: 'text'
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Deaktivieren Sie dies, um den Tempel temporär zu verbergen'
    },
    {
      name: 'featuredOnHomepage',
      title: 'Auf Homepage hervorheben',
      type: 'boolean',
      initialValue: false,
      description: 'Soll dieser Tempel auf der Homepage prominenter angezeigt werden?'
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
          description: 'Überschreibt den Tempelnamen für SEO'
        },
        {
          name: 'description',
          title: 'SEO Beschreibung',
          type: 'text',
          rows: 2,
          description: 'Beschreibung für Suchmaschinen'
        },
        {
          name: 'keywords',
          title: 'Schlüsselwörter',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      media: 'mainImage'
    }
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Stadt A-Z',
      name: 'cityAsc',
      by: [{ field: 'address.city', direction: 'asc' }]
    },
    {
      title: 'Hervorgehoben zuerst',
      name: 'featuredFirst',
      by: [
        { field: 'featuredOnHomepage', direction: 'desc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
}