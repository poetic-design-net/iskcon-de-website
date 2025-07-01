# ISKCON.DE Refactoring & Erweiterungsplan

## Phase 1: Aufräumen & Konsolidieren

### 1.1 Komponenten-Reorganisation
```
src/lib/components/
├── sections/
│   ├── homepage/          # NEU: Homepage-spezifisch
│   │   ├── HeroTeaser.svelte
│   │   ├── ThemeTeaser.svelte
│   │   └── WelcomeSection.svelte
│   ├── page-builder/      # NEU: Modulare Sektionen
│   │   ├── Hero/
│   │   │   ├── HeroStandard.svelte
│   │   │   ├── HeroFullscreen.svelte
│   │   │   └── HeroMinimal.svelte
│   │   ├── Content/
│   │   │   ├── ContentTwoColumn.svelte
│   │   │   ├── ContentCentered.svelte
│   │   │   └── ContentWithSidebar.svelte
│   │   └── [weitere Module...]
│   └── specialized/       # Event, Tempel etc. bleiben
```

### 1.2 Schema-Erweiterungen
- Erweitere bestehende Schemas um mehr Layout-Optionen
- Füge "variant" Felder hinzu für verschiedene Darstellungen
- Erstelle neue Homepage-spezifische Schemas

## Phase 2: Homepage-Transformation

### 2.1 Neue Homepage-Struktur
```svelte
<!-- src/routes/+page.svelte -->
<HeroTeaser />
<WelcomeSection {welcomeData} />

<!-- Individuelle Teaser-Sektionen -->
<ThemeTeaser 
  theme="hare-krishna"
  layout="imageLeft"
  {content}
/>
<ThemeTeaser 
  theme="bhakti-yoga"
  layout="imageRight"
  {content}
/>
<!-- etc. -->

<HomepageEventGrid />
<TempleMap />
<Newsletter />
```

### 2.2 Neue Sanity Schemas
```typescript
// homepageTeaser.ts
{
  name: 'homepageTeaser',
  fields: [
    { name: 'theme', type: 'string' },
    { name: 'headline', type: 'string' },
    { name: 'teaser', type: 'text' },
    { name: 'highlight', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'cta', type: 'object', fields: [...] }
  ]
}
```

## Phase 3: Flexible Unterseiten

### 3.1 Template-System
```typescript
// Template-Definitionen
const templates = {
  'info-page': ['hero', 'content', 'faq', 'cta'],
  'event-page': ['hero', 'details', 'gallery', 'registration'],
  'temple-page': ['hero', 'info', 'schedule', 'contact', 'map']
}
```

### 3.2 Erweiterte Module mit Varianten
```typescript
// Hero mit mehreren Varianten
{
  name: 'heroSection',
  fields: [
    // Bestehende Felder...
    {
      name: 'variant',
      type: 'string',
      options: {
        list: [
          'standard',      // Zweispaltig
          'fullscreen',    // Vollbild mit Overlay
          'minimal',       // Nur Text, kein Bild
          'centered',      // Zentriert mit Bild oben
          'split'          // 50/50 Split
        ]
      }
    }
  ]
}
```

## Phase 4: Migration bestehender Inhalte

1. Behalte alle bestehenden Daten
2. Erweitere Schemas schrittweise
3. Migriere Seiten einzeln zum neuen System

## Vorteile dieser Strategie

✅ **Keine Breaking Changes** - Alles funktioniert weiter
✅ **Schrittweise Migration** - Du kannst Seite für Seite umstellen
✅ **Mehr Flexibilität** - Varianten für jeden Anwendungsfall
✅ **Bessere Organisation** - Klarere Trennung der Komponenten
✅ **Wiederverwendbarkeit** - Module können in verschiedenen Kontexten genutzt werden