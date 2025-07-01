export default {
  name: 'movementStats',
  title: 'Bewegung Statistiken',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Interner Titel für diese Statistik-Gruppe',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'practitioners',
      title: 'Praktizierende',
      type: 'number',
      description: 'Anzahl der Praktizierenden in der DACH-Region',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'centers',
      title: 'Zentren',
      type: 'number',
      description: 'Anzahl der Tempel und Zentren',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'yearEstablished',
      title: 'Gründungsjahr',
      type: 'number',
      description: 'Jahr der Gründung in Deutschland',
      initialValue: 1969,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'dailyMeals',
      title: 'Tägliche Mahlzeiten',
      type: 'number',
      description: 'Anzahl der täglich weltweit verteilten Mahlzeiten',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      description: 'Sind diese Statistiken aktuell aktiv?',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      practitioners: 'practitioners',
      centers: 'centers',
      active: 'active'
    },
    prepare({ title, practitioners, centers, active }: any) {
      return {
        title: title || 'Bewegung Statistiken',
        subtitle: `${practitioners?.toLocaleString('de-DE')} Praktizierende, ${centers} Zentren ${!active ? '(Inaktiv)' : ''}`
      }
    }
  }
}