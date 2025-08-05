# ISKCON.DE Website - Theme & Design Guidelines

## Farbschema
- **Primärfarbe**: #C6695D (warmes Rot/Terrakotta) - Jetzt als primary-500 in Tailwind
- **Sekundärfarben**: 
  - primary-600: #B85A4F (Dunkleres Rot)
  - Weiß (#FFFFFF) - Haupthintergrund
  - Grautöne (#F3F4F6, #E5E7EB, #D1D5DB, #9CA3AF, #6B7280, #4B5563, #374151, #1F2937)
- **Keine hellen/bunten Farben** - elegant und seriös für offizielle ISKCON DACH Website
- **Overlays**: Neutrale dunkle Grautöne, Rot nur für Akzente
- **WICHTIG**: Keine hardcodierten Hex-Farben mehr verwenden - immer Tailwind primary-* Klassen nutzen!

## Design-Prinzipien
- **Modern und professionell**
- **Elegant und subtil** - keine grellen Farben
- **Individuelle Seitengestaltung** statt extremer Modularität
- **Mobile-first** Ansatz
- **Barrierefreiheit** beachten

## Komponenten-Stile
### Akkordeons
- Aktive Items: bg-gray-50 mit bg-gray-100 Header
- Hover-States: Subtile Grautöne
- Icons in Grautönen

### Bilder & Platzhalter
- SVG-Platzhalter mit sinnvollen Informationen
- Gradient-Overlays: from-black/60 via-transparent to-transparent
- Bei mehr Text: from-black/80 via-black/50 to-black/30

### Navigation
- Hover-Farbe: primary-500 mit bg-primary-500/10
- Mega-Menu mit subtilen Grautönen

## Entwicklungs-Workflow
1. Statische Seiten zuerst bauen
2. Dann zu dynamischen/Sanity-verwalteten Seiten konvertieren
3. Ähnliche Sektionen können global wiederverwendet werden (emergent während der Entwicklung)

## Befehle
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm test` (Playwright Tests)
- Tests UI: `npm run test:ui` (Interaktive Test-UI)
- Tests Headed: `npm run test:headed` (Tests im Browser)
- Test Report: `npm run test:report` (Test-Bericht anzeigen)

## Testing Setup
Playwright ist global installiert um Speicherplatz zu sparen. Die Browser sind gecacht in:
`/Users/frederikkarschuk/Library/Caches/ms-playwright/`

Zum Ausführen von Tests ohne lokale Playwright-Installation in neuen Projekten:
- `npx playwright test` verwenden
- Die globale Installation wird automatisch genutzt

## Projektstruktur & Routing

### Routing-Strategie (Hybrid)
1. **Statische Routen**: Spezielle Seiten mit eigener Funktionalität
   - `/` - Homepage
   - `/philosophie/*` - Alle Philosophie-Seiten (interaktive Komponenten)
   - `/events` - Events-Übersicht mit EventGrid
   - `/tempel` - Tempel-Übersicht
   - `/literature` - Literatur-Bibliothek
   - `/bewegung` - Über die Bewegung
   - `/style/*` - Style Guide

2. **Dynamische Route**: 
   - `/[slug]` - Für alle CMS-verwalteten Seiten aus Sanity

### Verzeichnisstruktur
- `/src/lib/components/sections/` - Globale wiederverwendbare Komponenten
- `/src/lib/components/ui/` - UI-Komponenten (Button, etc.)
- `/src/routes/philosophie/` - Philosophie-Seiten
- `/src/routes/style/` - Style Guide und Komponenten-Showcase
- `/tests/` - Playwright Test-Dateien
- `/studio-iskcon.de/` - Sanity Studio

## Globale Komponenten
- **HeroSection** - Hero-Bereiche mit Gradient-Hintergründen
- **FeatureGrid** - Grid-Layouts für Features/Konzepte
- **TabSection** - Tab-Navigations-Komponente
- **CTASection** - Call-to-Action Bereiche
- **NavigationSection** - Navigation zwischen verwandten Seiten
- **ConceptSelector** - Konzeptauswahl mit Icons
- **Button** - Globale Button-Komponente mit Varianten
- **QuoteCarousel** - Zitate-Karussell
- **Accordion** - Aufklappbare Inhalte

## Navigation-System
Die Navigation wird dynamisch aus Sanity CMS geladen via `getIntelligentNavigation()` in `/src/lib/sanity/navigation.ts`.

### Haupt-Navigationspunkte:
1. **Über uns** - ISKCON Information
2. **Philosophie** (NEU) - Alle Philosophie-Seiten:
   - Grundlagen: Krishna, Literatur (ehem. Vedische Schriften), Bhakti-Yoga
   - Vertiefung: Seele & Reinkarnation, Karma & Dharma, Die drei Erscheinungsweisen
   - Praxis: Vegetarismus & Prasadam, Guru & Schülernachfolge
3. **Events** - Veranstaltungen
4. **Tempel** - Standorte
5. **Literatur** - Literature/Bücher
6. **Spirituelle Praxis** - Tägliche Praxis und Lernen
7. **Community**

### Wichtige Hinweise:
- Die Navigation hat Fallback-Daten in `Navbar.svelte` falls Sanity nicht verfügbar ist
- Mobile Navigation und Desktop Mega-Menu verwenden dieselben Daten
- Icons werden in der `navigation.ts` definiert

## Sanity CMS Integration

### Schemas
- **page**: Basis-Schema für einfache Seiten mit PortableText
- **event**: Events mit umfangreichen Feldern
- **post**: Blog-Posts
- **temple**: Tempel-Informationen
- **person**: Personen/Devotees
- **navigation**: Navigation (meist überschrieben durch getIntelligentNavigation)

### Geplante Migration
Alle statischen Seiten sollen als Sanity Pages gespeichert werden:
- Beibehaltung der [slug] Route für dynamische Inhalte
- Erstellung von Page-Dokumenten für alle Hauptseiten
- Diese können dann als Referenzen in anderen Dokumenten genutzt werden

## Aktuelle TODOs
1. Migration aller statischen Seiten zu Sanity Pages
2. Tempel-Seite auf neues CI/CD umstellen
3. Events-Seite auf neues CI/CD umstellen
4. Bewegung-Seite auf neues CI/CD umstellen
5. Literature-Seite auf neues CI/CD umstellen
6. Style Guide vervollständigen

## Deployment
- Frontend: Vercel (automatisch)
- Sanity Studio: studio-iskcon.de
- Beide Deployments erfolgen bei Push auf main Branch