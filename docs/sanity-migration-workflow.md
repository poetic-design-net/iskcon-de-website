# Sanity CMS Migration Workflow

## Philosophie: Static-First, Sanity-Ready Development

### Rule: Building New Svelte Routes with Sanity in Mind

Wenn wir eine neue Seite oder Route in Svelte erstellen, beginnen wir **immer** mit statischen (hardcodierten) Platzhalter-Inhalten — aber wir bauen sie so auf, dass sie vollständig für eine spätere Integration mit Sanity vorbereitet sind.

Das bedeutet:

1. **Datenstruktur definieren**: Wir definieren eine Datenstruktur (`pageData`), die von Tag eins an dem erwarteten Sanity-Schema entspricht — z.B. `{ title, subtitle, sections, images }`.

2. **Props-basierte Komponenten**: Komponenten werden so geschrieben, dass sie ihren Inhalt als Props oder von einem lokalen Mock-Objekt erhalten, genau wie sie es später tun werden, wenn Daten von Sanity abgerufen werden.

3. **Klare Markierungen**: Alle Inhalte sind klar mit Kommentaren wie `// TODO: Replace with Sanity content` markiert, sodass das spätere Umstellen nahtlos ist.

4. **Schnelle Iteration**: Dies ermöglicht es uns, schnell zu iterieren, Layout und Logik früh zu testen und die UX zu verfeinern — ohne auf CMS-Inhalte zu warten.

5. **Einfacher Übergang**: Sobald Sanity bereit ist, müssen wir nur die statische Datenquelle durch Live-Queries ersetzen — die Komponentenstruktur bleibt unverändert.

Ein reales Beispiel für diesen Ansatz ist in der `/bewegung` Route zu sehen.

---

## Kompletter Migration Workflow

### Phase 1: Statische Implementierung (bereits vorhanden)

**Beispiel: `/bewegung` Route**

```typescript
// src/routes/bewegung/+page.server.ts
export const load: PageServerLoad = async () => {
  return {
    page: {
      title: "Die Hare Krishna Bewegung",
      subtitle: "Über ISKCON Deutschland",
      description: "Erfahren Sie mehr über die Geschichte..."
    },
    stats: {
      practitioners: 6000,
      centers: 25,
      dailyMeals: 1500000
    },
    timeline: [
      {
        year: "1965",
        title: "Die mutige Reise",
        description: "A.C. Bhaktivedanta Swami Prabhupada...",
        expanded: false
      }
      // ... weitere Timeline-Einträge
    ],
    principles: [
      {
        title: "Monotheistische Tradition",
        description: "Krishna-Bewusstsein basiert auf...",
        icon: "🕉️"
      }
      // ... weitere Prinzipien
    ]
  };
};
```

### Phase 2: Sanity Schema Development

**2.1 Schema-Datei erstellen**

```typescript
// studio-iskcon.de/schemas/bewegung.ts
import { defineType, defineField } from 'sanity'

// Hauptseiten-Schema
export default defineType({
  name: 'bewegungPage',
  title: 'Bewegung Seite',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    }),
    defineField({
      name: 'stats',
      title: 'Statistiken',
      type: 'object',
      fields: [
        { name: 'practitioners', title: 'Praktizierende', type: 'number' },
        { name: 'centers', title: 'Zentren', type: 'number' },
        { name: 'dailyMeals', title: 'Tägliche Mahlzeiten', type: 'number' }
      ]
    }),
    defineField({
      name: 'timelineItems',
      title: 'Timeline Einträge',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'timelineItem' }] }]
    }),
    defineField({
      name: 'principles',
      title: 'Prinzipien',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'principle' }] }]
    })
  ]
})

// Timeline-Item Schema
export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline Eintrag',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Jahr',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    })
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})

// Prinzip Schema
export const principle = defineType({
  name: 'principle',
  title: 'Prinzip',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      validation: Rule => Rule.required()
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
          { title: 'Lila', value: 'purple' }
        ]
      }
    })
  ]
})
```

**2.2 Schemas registrieren**

```typescript
// studio-iskcon.de/schemaTypes/index.ts
import bewegungPage, { timelineItem, principle } from '../schemas/bewegung'

export const schemaTypes = [
  // ... andere schemas
  // Movement/Bewegung Schemas
  bewegungPage,
  timelineItem,
  principle
]
```

### Phase 3: Query Development

**3.1 Query-Datei erstellen**

```typescript
// src/lib/sanity/queries/bewegung.ts
import { client } from '$lib/sanity/client'

// Haupt-Query für Bewegung-Seite
export const bewegungPageQuery = `
  *[_type == "bewegungPage"][0] {
    title,
    subtitle,
    description,
    stats,
    timelineItems[] -> {
      _id,
      year,
      title,
      description,
      image {
        asset -> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      order
    } | order(order asc),
    principles[] -> {
      _id,
      title,
      description,
      icon,
      color
    }
  }
`

// Query-Funktionen
export async function getBewegungPage() {
  try {
    return await client.fetch(bewegungPageQuery)
  } catch (error) {
    console.error('Error fetching bewegung page:', error)
    return null
  }
}

// Separate Queries für Komponenten
export const allTimelineItemsQuery = `
  *[_type == "timelineItem"] | order(order asc) {
    _id,
    year,
    title,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata { dimensions, lqip }
      },
      alt
    },
    order
  }
`

export const allPrinciplesQuery = `
  *[_type == "principle"] {
    _id,
    title,
    description,
    icon,
    color
  }
`

export async function getAllTimelineItems() {
  try {
    return await client.fetch(allTimelineItemsQuery)
  } catch (error) {
    console.error('Error fetching timeline items:', error)
    return []
  }
}

export async function getAllPrinciples() {
  try {
    return await client.fetch(allPrinciplesQuery)
  } catch (error) {
    console.error('Error fetching principles:', error)
    return []
  }
}
```

**3.2 Queries in index registrieren**

```typescript
// src/lib/sanity/queries/index.ts
export * from './bewegung'
```

### Phase 4: Content Migration Script

**4.1 Import-Script erstellen**

```javascript
// scripts/import-bewegung-content.mjs
import 'dotenv/config'
import { createClient } from '@sanity/client'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity Client mit korrekter dotenv-Pfad-Behandlung
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-05-03'
})

const timelineData = [
  {
    year: "1965",
    title: "Die mutige Reise",
    description: "A.C. Bhaktivedanta Swami Prabhupada verlässt Indien mit sieben Dollar...",
    order: 1
  },
  // ... weitere Timeline-Einträge
]

const principlesData = [
  {
    title: "🕉️ Monotheistische Tradition",
    description: "Krishna-Bewusstsein basiert auf der Verehrung...",
    icon: "🕉️",
    color: "orange"
  },
  // ... weitere Prinzipien
]

async function importContent() {
  console.log('🕉️  ISKCON Bewegung Import Script')
  console.log('==================================\n')

  try {
    // 1. Timeline-Einträge importieren
    console.log('🕐 Importiere Timeline-Einträge...')
    const timelineRefs = []
    
    for (const item of timelineData) {
      const doc = await client.createOrReplace({
        _type: 'timelineItem',
        _id: `timeline-${item.year.toLowerCase().replace(/\s+/g, '-')}`,
        ...item
      })
      timelineRefs.push({ _type: 'reference', _ref: doc._id })
      console.log(`✅ Timeline-Eintrag erstellt: ${item.year} - ${item.title}`)
    }

    // 2. Prinzipien importieren
    console.log('\n📿 Importiere Prinzipien...')
    const principleRefs = []
    
    for (const principle of principlesData) {
      const slug = principle.title.toLowerCase()
        .replace(/[🕉️📿📚]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      try {
        const doc = await client.createOrReplace({
          _type: 'principle',
          _id: `principle-${slug}`,
          ...principle
        })
        principleRefs.push({ _type: 'reference', _ref: doc._id })
        console.log(`✅ Prinzip erstellt: ${principle.title}`)
      } catch (error) {
        console.log(`❌ Fehler beim Erstellen des Prinzips ${principle.title}: ${error.message}`)
      }
    }

    // 3. Hauptseite erstellen
    console.log('\n📄 Importiere Bewegung-Hauptseite...')
    await client.createOrReplace({
      _type: 'bewegungPage',
      _id: 'bewegung-main-page',
      title: 'Die Hare Krishna Bewegung',
      subtitle: 'Über ISKCON Deutschland',
      description: 'Erfahren Sie mehr über die Geschichte und Philosophie...',
      stats: {
        practitioners: 6000,
        centers: 25,
        dailyMeals: 1500000
      },
      timelineItems: timelineRefs,
      principles: principleRefs
    })

    console.log('✅ Bewegung-Seite erstellt/aktualisiert: bewegung-main-page')
    
    console.log('\n🎉 Import erfolgreich abgeschlossen!')
    console.log('📊 Statistiken:')
    console.log(`   - ${timelineRefs.length} Timeline-Einträge`)
    console.log(`   - ${principleRefs.length} Prinzipien`)
    console.log('   - 1 Bewegung-Seite')
    console.log('\n🌐 Inhalte sind jetzt im Sanity Studio verfügbar!')

  } catch (error) {
    console.error('❌ Import fehlgeschlagen:', error)
    process.exit(1)
  }
}

importContent()
```

**4.2 Script ausführen**

```bash
node scripts/import-bewegung-content.mjs
```

### Phase 5: Server-Side Integration

**5.1 PageServerLoad aktualisieren**

```typescript
// src/routes/bewegung/+page.server.ts
import type { PageServerLoad } from './$types'
import { getBewegungPage } from '$lib/sanity/queries/bewegung'

export const load: PageServerLoad = async () => {
  try {
    // Versuche Sanity-Daten zu laden
    const sanityData = await getBewegungPage()
    
    if (sanityData) {
      // Konvertiere Sanity-Daten in das erwartete Format
      return {
        page: {
          title: sanityData.title,
          subtitle: sanityData.subtitle,
          description: sanityData.description
        },
        stats: sanityData.stats || {
          practitioners: 6000,
          centers: 25,
          dailyMeals: 1500000
        },
        timeline: sanityData.timelineItems?.map(item => ({
          year: item.year,
          title: item.title,
          description: item.description,
          image: item.image?.asset?.url,
          expanded: false // Frontend-spezifisches Feld
        })) || [],
        principles: sanityData.principles?.map(principle => ({
          title: principle.title,
          description: principle.description,
          icon: principle.icon,
          color: principle.color || 'orange'
        })) || []
      }
    }
  } catch (error) {
    console.error('Error loading Sanity data:', error)
  }

  // Fallback zu statischen Daten
  return {
    page: {
      title: "Die Hare Krishna Bewegung",
      subtitle: "Über ISKCON Deutschland",
      description: "Erfahren Sie mehr über die Geschichte..."
    },
    stats: {
      practitioners: 6000,
      centers: 25,
      dailyMeals: 1500000
    },
    timeline: [
      // ... statische Timeline-Daten als Fallback
    ],
    principles: [
      // ... statische Prinzipien als Fallback
    ]
  }
}
```

### Phase 6: Frontend bleibt unverändert

Das Frontend in `src/routes/bewegung/+page.svelte` bleibt **komplett unverändert**, da die Datenstruktur identisch ist!

```svelte
<!-- src/routes/bewegung/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types'
  // ... andere Imports

  export let data: PageData
  // Keine Änderungen nötig - data.timeline, data.principles etc. funktionieren genauso!
</script>

<!-- Timeline Section -->
<Timeline items={data.timeline} on:expand={handleExpand} />

<!-- Principles Section -->
{#each data.principles as principle, index (principle.title)}
  <PrincipleCard {principle} {index} />
{/each}
```

---

## Best Practices

### 1. Datenstruktur-Konsistenz
- **Immer** die gleiche Datenstruktur zwischen statischen und Sanity-Daten verwenden
- Frontend-spezifische Felder (wie `expanded`) im Server-Load hinzufügen
- Fallback-Werte für alle kritischen Felder bereitstellen

### 2. Error Handling
- Graceful Fallback zu statischen Daten bei Sanity-Fehlern
- Logging von Fehlern für Debugging
- Nie die Seite komplett brechen lassen

### 3. Migration Strategy
- Schemas vor dem Import-Script entwickeln
- Import-Script basierend auf funktionierenden Beispielen aufbauen
- Schemas im Studio registrieren vor der ersten Verwendung

### 4. Query Optimization
- Spezifische Queries für verschiedene Use Cases
- Image-Metadaten für Performance einschließen
- Sortierung und Filterung in der Query, nicht im Frontend

---

## Troubleshooting

### Problem: "Schemas nicht im Studio sichtbar"
**Lösung**: Schemas in `studio-iskcon.de/schemaTypes/index.ts` registrieren und Studio neu starten

### Problem: "Import-Script ES-Module Fehler"
**Lösung**: 
- `.mjs` Extension verwenden
- Korrekte Import-Syntax: `import 'dotenv/config'`
- Pfad-Handling mit `fileURLToPath` und `path`

### Problem: "Document ID nicht gültig"
**Lösung**:
- Umlaute und Sonderzeichen in IDs vermeiden
- Slug-Generierung mit Regex-Bereinigung
- ID-Format: `prefix-kebab-case`

### Problem: "Frontend zeigt keine Sanity-Daten"
**Lösung**:
- Server-Load Logs überprüfen
- Fallback-Logik testen
- Query-Syntax validieren
- Client-Konfiguration überprüfen

---

## Fazit

Dieser Workflow ermöglicht es uns:

1. **Schnell zu iterieren** mit statischen Daten
2. **Sanity-Integration vorzubereiten** ohne Frontend-Änderungen
3. **Nahtlos zu migrieren** ohne Breaking Changes
4. **Robuste Fallbacks** für Produktionsumgebungen bereitzustellen

Das Bewegung-Beispiel zeigt, wie eine komplexe Seite mit mehreren Content-Typen erfolgreich migriert werden kann, während die Frontend-Komponenten völlig unverändert bleiben.