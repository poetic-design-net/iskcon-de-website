# ISKCON.DE Website Architecture: Sanity CMS & SvelteKit Integration

## Übersicht

Die ISKCON.DE Website ist als modernes Headless CMS System aufgebaut, das Sanity CMS für Content Management und SvelteKit für das Frontend verwendet. Diese Dokumentation beschreibt die Architektur, Datenflüsse und Komponentenstruktur.

## Projektstruktur

```
/website/
├── src/                    # SvelteKit Frontend-Anwendung
├── studio-iskcon.de/       # Sanity CMS Studio
├── scripts/                # Import- und Utility-Skripte
├── docs/                   # Projektdokumentation
├── static/                 # Statische Assets
└── [config files]          # Verschiedene Konfigurationsdateien
```

## Sanity CMS Architektur

### Schema-Organisation

Die Sanity-Schemas befinden sich in `/studio-iskcon.de/schemas/` und sind nach Inhaltstypen organisiert:

#### Hauptinhaltstypen

1. **Page Schema** (`page.ts`)
   - Dynamische Seiten mit modularen Sektionen
   - Verwendet ein referenzbasiertes Sektionssystem
   - Unterstützt SEO-Overrides und flexible Layouts

2. **Content Schemas**
   - `post.ts` - Blog-Artikel mit Rich-Text-Editor
   - `event.ts` - Komplexes Event-Management mit Wiederholungen
   - `temple.ts` - Tempel-Informationen mit Standortdaten
   - `literature.ts` - Bücher/Literatur mit Sanskrit-Support
   - `multimedia.ts` - Audio/Video-Inhalte mit Transkriptionen
   - `donation.ts` - Spendenverwaltung mit Payment-Integration
   - `newsletter.ts` - Newsletter-Abonnements mit GDPR-Compliance

#### Sektionstypen

Modulare Inhaltsblöcke für dynamische Seitenerstellung:

- `heroSection` - Hero-Banner mit verschiedenen Layouts
- `gridSection` - Grid-Layouts für Karten/Items
- `mediaSection` - Bild/Video-Sektionen
- `quoteSection` - Zitat/Testimonial-Blöcke
- `faqSection` - FAQ-Akkordeons
- `ctaSection` - Call-to-Action Sektionen

### Schema-Beziehungen

```
Page
 └── Sections (Referenzen)
      ├── heroSection
      ├── mediaSection
      ├── quoteSection
      ├── faqSection
      ├── gridSection
      └── ctaSection

Post
 ├── Author (Referenz)
 └── Categories (Referenzen)

Event
 ├── EventCategory (Referenz)
 ├── Temple (Referenz für Standort)
 └── Event (Selbst-Referenz für verwandte Events)
```

### Design-Prinzipien

1. **Referenzbasierte Sektionen**: Wiederverwendbare Inhaltsblöcke
2. **Umfassende SEO-Unterstützung**: SEO-Override-Felder in allen Haupttypen
3. **GDPR-Konformität**: Datenschutzfelder in Newsletter und Spenden
4. **Lokalisierungsbereit**: Mehrsprachige Inhaltsunterstützung
5. **Feature Flags**: `isActive`, `isFeatured`, `isPublished` für Kontrolle
6. **Komplexe Validierung**: Umfangreiche Validierungsregeln
7. **Rich Preview**: Angepasste Vorschau-Konfigurationen

## SvelteKit Frontend Architektur

### Komponentenstruktur

```
/src/lib/components/
├── global/          # Globale/geteilte Komponenten
│   ├── Navbar.svelte
│   ├── Footer.svelte
│   └── SanityImage.svelte
├── sections/        # Seitenabschnitt-Komponenten
│   ├── PageHeroSection.svelte
│   ├── PageGridSection.svelte
│   └── homepage/    # Homepage-spezifische Sektionen
├── blog/            # Blog-spezifische Komponenten
├── literature/      # Literatur-Komponenten
├── master-template/ # Fortgeschrittenes Template-System
└── ui/              # UI-Komponentenbibliothek (shadcn)
```

### Sanity-Integration

```
/src/lib/sanity/
├── client.ts        # Sanity Client-Konfiguration
└── queries/         # Organisierte Query-Module
    ├── projections.ts    # Wiederverwendbare Query-Projektionen
    ├── posts.ts          # Blog-Queries
    ├── events.ts         # Event-Queries
    ├── temples.ts        # Tempel-Queries
    └── validation.ts     # Datenvalidierung
```

## Datenfluss-Architektur

### Kompletter Datenfluss

```
Sanity CMS → Client/Queries → Server-Side Data Fetching → Page Components → UI
```

### 1. Client-Konfiguration

**Public Client** (Client-seitig):
- CDN aktiviert für Performance
- Bild-URL-Building Utilities

**Private Client** (Server-seitig):
- Token-Authentifizierung
- CDN deaktiviert für frische Daten

### 2. Query-System

Das System verwendet **projektionsbasierte Queries** für optimierte Datenabfragen:

```typescript
// Beispiel-Projektion
export const POST_LIST_PROJECTION = `{
  _id,
  _type,
  title,
  'slug': slug.current,
  publishedAt,
  excerpt,
  mainImage,
  'author': author->{name, image}
}`;
```

### 3. Server-Side Data Fetching

Jede Route hat eine `+page.server.ts` Datei:

```typescript
export const load = async ({ params }) => {
  const page = await getPageBySlug(params.slug);
  if (!page) throw error(404);
  return { page };
};
```

### 4. Komponenten-Rendering

Dynamisches Rendering basierend auf Sektionstypen:

```svelte
{#each page.sections as section}
  {#if section._type === 'heroSection'}
    <PageHeroSection {...section} />
  {:else if section._type === 'gridSection'}
    <PageGridSection {...section} />
  {/if}
{/each}
```

## Content-to-Component Mapping

| Sanity Schema | Svelte Component | Route |
|---------------|------------------|--------|
| `page` | Dynamische Sektionen | `/[slug]` |
| `post` | `BlogCard`, Blog-Detail | `/blog/[slug]` |
| `event` | `EventCard`, `EventModal` | `/events/[slug]` |
| `temple` | `GermanyMap`, Temple-Detail | `/tempel/[slug]` |
| `literature` | Literature-Komponenten | `/literature/[slug]` |
| `homepageTeaser` | `ThemeTeaserSection` | `/` (Homepage) |

## Template-System

### Aktuelles System: Sektionsbasierte Templates

- Strukturierter Ansatz für Content-Editoren
- Vordefinierte Sektionstypen
- Einfache Komposition durch Referenzen

### Zukünftiges System: Master Template

Ein flexibleres blockbasiertes System:
- Erweiterte Layout-Kontrollen
- Responsive Design-Tokens
- Animations-Konfigurationen
- Bedingte Rendering-Logik

## Typ-Sicherheit

### Zod-Schema-Validierung

```typescript
export const HeroSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('heroSection'),
  title: z.string(),
  subtitle: z.string().optional(),
  // weitere Felder...
});
```

### TypeScript-Integration

- Generierte Typen aus Zod-Schemas
- Strikte Typisierung für alle Datenflüsse
- Type Guards für Sektions-Diskriminierung

## Performance-Optimierungen

### Datenabfrage-Optimierungen

1. **CDN-Nutzung**: Public Client nutzt Sanity CDN
2. **Projektions-Queries**: Nur benötigte Felder abrufen
3. **Paralleles Laden**: `Promise.all()` für gleichzeitige Abfragen
4. **Optimiertes Bildladen**: Responsive Bildgrößen

### Komponenten-Optimierungen

1. **Lazy Loading**: Komponenten laden bei Bedarf
2. **Conditional Rendering**: Unsichtbare Blöcke überspringen
3. **CSS Containment**: `contain` Property für Performance
4. **Reduced Motion**: Respektiert Nutzereinstellungen

## Entwickler-Workflow

### Neue Inhaltstypen hinzufügen

1. Schema in `/studio-iskcon.de/schemas/` erstellen
2. Query-Funktionen in `/src/lib/sanity/queries/` hinzufügen
3. Svelte-Komponenten erstellen
4. Route mit Data Fetching einrichten

### Neue Sektionstypen

1. Sektions-Schema definieren
2. Sektions-Komponente erstellen
3. Zu Page-Rendering hinzufügen
4. In Sanity Studio konfigurieren

## Best Practices

1. **Separation of Concerns**: Klare Trennung von Daten, Validierung und Präsentation
2. **Wiederverwendbarkeit**: Komponenten und Queries modular gestalten
3. **Type Safety**: Zod-Schemas für Runtime-Validierung nutzen
4. **Performance**: Projektionen für optimierte Queries verwenden
5. **SEO**: Strukturierte Daten und Meta-Tags implementieren

## Zukünftige Erweiterungen

- Echtzeit-Updates via Sanity Preview API
- Erweiterte Caching-Strategien
- Mehrsprachige Inhalte
- A/B Testing Capabilities
- Analytics-Integration

Diese Architektur bietet eine solide Grundlage für eine inhaltsreiche Website mit exzellenter Performance, Typ-Sicherheit und Developer Experience.