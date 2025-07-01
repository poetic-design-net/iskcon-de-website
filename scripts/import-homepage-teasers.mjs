import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_TOKEN, // Korrigiert: SANITY_TOKEN statt SANITY_AUTH_TOKEN
  apiVersion: '2024-01-01',
  useCdn: false
});

const homepageTeasers = [
  {
    _type: 'homepageTeaser',
    _id: 'homepage-teaser-hare-krishna',
    theme: 'hare-krishna',
    layout: 'imageRight',
    headline: 'Hare Krishna - Das Maha Mantra',
    teaser: 'Entdecken Sie die transformative Kraft des Hare Krishna Mantras. Seit Jahrtausenden praktiziert, öffnet dieses heilige Mantra die Tür zu innerem Frieden und spiritueller Erfüllung.',
    highlight: 'Das wichtigste Mantra unserer Zeit',
    badge: 'Mantra des Herzens',
    ctaText: 'Mehr über das Mantra erfahren',
    // ctaLink wird später in Sanity Studio gesetzt
    order: 1
    // image wird später in Sanity Studio hochgeladen
  },
  {
    _type: 'homepageTeaser',
    _id: 'homepage-teaser-bhakti-yoga',
    theme: 'bhakti-yoga',
    layout: 'imageLeft',
    headline: 'Bhakti Yoga - Der Pfad der Hingabe',
    teaser: 'Bhakti Yoga ist der direkte Weg zu Gott durch liebevolle Hingabe. Erfahren Sie, wie diese uralte Praxis Ihr Leben mit Freude, Sinn und spiritueller Verbindung erfüllen kann.',
    highlight: 'Der natürliche Weg der Seele',
    ctaText: 'Bhakti Yoga entdecken',
    // ctaLink wird später in Sanity Studio gesetzt
    order: 2
    // image wird später in Sanity Studio hochgeladen
  },
  {
    _type: 'homepageTeaser',
    _id: 'homepage-teaser-mantra-meditation',
    theme: 'mantra-meditation',
    layout: 'imageFull',
    headline: 'Mantra-Meditation für inneren Frieden',
    teaser: 'In unserer hektischen Welt bietet die Mantra-Meditation einen Anker der Ruhe. Lernen Sie verschiedene Meditationstechniken kennen, die Ihnen helfen, Stress abzubauen und innere Klarheit zu finden.',
    badge: 'Täglich praktiziert',
    ctaText: 'Meditation lernen',
    // ctaLink wird später in Sanity Studio gesetzt
    order: 3
    // image wird später in Sanity Studio hochgeladen
  },
  {
    _type: 'homepageTeaser',
    _id: 'homepage-teaser-tempel-besuchen',
    theme: 'tempel-besuchen',
    layout: 'imageRight',
    headline: 'Besuchen Sie unsere Tempel',
    teaser: 'Unsere Tempel sind Oasen der Spiritualität, offen für alle Menschen. Erleben Sie die friedvolle Atmosphäre, nehmen Sie an Zeremonien teil und genießen Sie vegetarisches Prasadam.',
    highlight: 'Alle sind herzlich willkommen',
    ctaText: 'Tempel in Ihrer Nähe finden',
    // ctaLink wird später in Sanity Studio gesetzt
    order: 4
    // image wird später in Sanity Studio hochgeladen
  }
];

async function importHomepageTeasers() {
  console.log('🏠 Importiere Homepage Teaser...');
  
  for (const teaser of homepageTeasers) {
    try {
      // Prüfe ob Teaser bereits existiert
      const existing = await client.fetch(
        `*[_type == "homepageTeaser" && _id == $id][0]`,
        { id: teaser._id }
      );
      
      if (existing) {
        console.log(`📝 Aktualisiere Teaser: ${teaser.headline}`);
        await client
          .patch(teaser._id)
          .set(teaser)
          .commit();
      } else {
        console.log(`✨ Erstelle neuen Teaser: ${teaser.headline}`);
        await client.create(teaser);
      }
      
    } catch (error) {
      console.error(`❌ Fehler beim Importieren von "${teaser.headline}":`, error);
    }
  }
  
  console.log('✅ Homepage Teaser Import abgeschlossen!');
}

// Führe Import aus
importHomepageTeasers().catch(console.error);