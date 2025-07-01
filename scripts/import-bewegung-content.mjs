#!/usr/bin/env node

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent für __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lade Environment Variablen
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Sanity Client konfigurieren
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'katiyukp',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Timeline-Daten basierend auf der bestehenden +page.server.ts
const timelineData = [
  {
    _type: 'timelineItem',
    year: '1965',
    title: 'Die mutige Reise',
    description: 'Mit 69 Jahren wagte Srila Prabhupada die gefährliche 35-tägige Seereise nach Amerika. Trotz zwei Herzanfällen auf See erreichte er New York mit einer klaren Mission.',
    details: '',
    quote: '',
    image: null,
    link: '',
    linkText: '',
    currentStats: [],
    expanded: true,
    order: 1
  },
  {
    _type: 'timelineItem',
    year: '1966',
    title: 'Geburt von ISKCON',
    description: 'Am 13. Juli gründete Prabhupada ISKCON offiziell in New York. Der kleine Tempel in der Second Avenue wurde zum Ausgangspunkt einer spirituellen Revolution.',
    details: 'Im Tompkins Square Park leitete er das erste öffentliche Kirtan im Westen - ein historischer Moment unter einer Ulme.',
    quote: '',
    image: null,
    link: '',
    linkText: '',
    currentStats: [],
    expanded: false,
    order: 2
  },
  {
    _type: 'timelineItem',
    year: '1968',
    title: 'Der Beatles-Effekt',
    description: 'George Harrison begrüßte die Devotees mit: "Hare Krishna. Wo wart ihr? Ich habe Jahre darauf gewartet." Die "Hare Krishna Mantra" Single erreichte Platz 11 der britischen Charts.',
    details: '',
    quote: 'Die Auftritte bei Top of the Pops machten das Maha-Mantra zu einem kulturellen Phänomen.',
    image: null,
    link: '',
    linkText: '',
    currentStats: [],
    expanded: false,
    order: 3
  },
  {
    _type: 'timelineItem',
    year: '1969',
    title: 'Ankunft in Deutschland',
    description: 'Prabhupada besuchte Deutschland vom 25. August bis 11. September. Hamburg wurde zum Geburtsort der deutschen ISKCON-Bewegung, gefolgt von Berlin.',
    details: '',
    quote: '',
    image: null,
    link: '/geschichte/deutschland',
    linkText: 'Die deutsche Geschichte im Detail →',
    currentStats: [],
    expanded: false,
    order: 4
  },
  {
    _type: 'timelineItem',
    year: '1974',
    title: 'Die erste große Prüfung',
    description: 'Eine Polizeirazzia auf Schloss Rettershof löste eine Medienkampagne aus. Trotz massiver Diffamierung überstand die Bewegung diese Krise und wuchs weiter.',
    details: '',
    quote: '',
    image: null,
    link: '',
    linkText: '',
    currentStats: [],
    expanded: false,
    order: 5
  },
  {
    _type: 'timelineItem',
    year: '1980',
    title: 'Expansion in die Schweiz',
    description: 'Junge Schweizer Devotees eröffneten den Tempel in Zürich. Die Krishna Gemeinschaft Schweiz wurde zu einem Modell erfolgreicher Integration.',
    details: '',
    quote: '',
    image: null,
    link: '',
    linkText: '',
    currentStats: [],
    expanded: false,
    order: 6
  },
  {
    _type: 'timelineItem',
    year: 'Heute',
    title: 'Moderne Bewegung',
    description: 'Mit 11 Zentren in Deutschland, stabiler Präsenz in der Schweiz und Beharrlichkeit in Österreich hat sich ISKCON zu einem respektierten Teil der religiösen Landschaft entwickelt.',
    details: '',
    quote: '',
    image: null,
    link: '',
    linkText: '',
    currentStats: ['15+ Zentren', '6.000+ Praktizierende', '40+ Jahre Präsenz'],
    expanded: false,
    order: 7
  }
];

// Prinzipien-Daten
const principlesData = [
  {
    _type: 'principle',
    icon: '🕉️',
    title: 'Monotheistische Tradition',
    text: 'Krishna als höchste Persönlichkeit Gottes',
    description: 'Die Gaudiya-Vaishnava-Tradition lehrt die persönliche Beziehung zu Krishna als dem höchsten Gott.',
    link: '/philosophie/theologie',
    color: 'orange',
    order: 1
  },
  {
    _type: 'principle',
    icon: '📿',
    title: 'Die vier Prinzipien',
    text: 'Ethisches Fundament der Praxis',
    description: 'Keine Gewalt gegen Tiere, keine Rauschmittel, kein Glücksspiel, keine unerlaubten sexuellen Beziehungen.',
    link: '/philosophie/prinzipien',
    color: 'blue',
    order: 2
  },
  {
    _type: 'principle',
    icon: '🧘',
    title: 'Tägliche Sadhana',
    text: 'Spirituelle Praxis im Alltag',
    description: 'Regelmäßiges Chanten des Hare Krishna Mantras und Studium der heiligen Schriften.',
    link: '/praxis/sadhana',
    color: 'green',
    order: 3
  },
  {
    _type: 'principle',
    icon: '📚',
    title: 'Heilige Schriften',
    text: 'Bhagavad-gita & Srimad-Bhagavatam',
    description: 'Die zeitlosen Weisheiten der vedischen Literatur als Leitfaden für spirituelles Leben.',
    link: '/philosophie/schriften',
    color: 'purple',
    order: 4
  }
];

// Haupt-Bewegung-Seiten-Daten
const bewegungPageData = {
  _type: 'bewegungPage',
  _id: 'bewegung-main-page',
  title: 'Die Hare Krishna Bewegung',
  subtitle: 'Von einer Vision zur globalen spirituellen Gemeinschaft',
  description: 'Die Geschichte und Entwicklung der Hare Krishna Bewegung in der DACH-Region - von den bescheidenen Anfängen 1965 bis zur modernen spirituellen Gemeinschaft mit über 6.000 Praktizierenden.',
  heroImage: null, // Kann später hinzugefügt werden
  stats: {
    practitioners: 6000,
    centers: 15,
    yearsSince: new Date().getFullYear() - 1969,
    dailyMeals: 1000000
  },
  timeline: [], // Wird mit Referenzen gefüllt
  principles: [], // Wird mit Referenzen gefüllt
  seo: {
    metaTitle: 'Die Hare Krishna Bewegung - Geschichte und Entwicklung | ISKCON',
    metaDescription: 'Erfahren Sie mehr über die Geschichte der Hare Krishna Bewegung von 1965 bis heute. Von Srila Prabhupadas mutiger Reise bis zur modernen spirituellen Gemeinschaft.',
    keywords: ['Hare Krishna', 'ISKCON', 'spirituelle Bewegung', 'Prabhupada', 'Krishna Bewusstsein', 'vedische Tradition']
  }
};

async function importTimelineItems() {
  console.log('🕐 Importiere Timeline-Einträge...');
  const createdTimeline = [];
  
  for (const item of timelineData) {
    try {
      const documentId = `timeline-${item.year.toLowerCase()}`;
      const document = { ...item, _id: documentId };
      
      const result = await client.createOrReplace(document);
      console.log(`✅ Timeline-Eintrag erstellt: ${result.year} - ${result.title}`);
      createdTimeline.push({
        _type: 'reference',
        _ref: result._id
      });
    } catch (error) {
      console.error(`❌ Fehler beim Erstellen des Timeline-Eintrags ${item.year}:`, error.message);
    }
  }
  
  return createdTimeline;
}

async function importPrinciples() {
  console.log('📿 Importiere Prinzipien...');
  const createdPrinciples = [];
  
  for (const principle of principlesData) {
    try {
      const documentId = `principle-${principle.title.toLowerCase().replace(/\s+/g, '-')}`;
      const document = { ...principle, _id: documentId };
      
      const result = await client.createOrReplace(document);
      console.log(`✅ Prinzip erstellt: ${result.icon} ${result.title}`);
      createdPrinciples.push({
        _type: 'reference',
        _ref: result._id
      });
    } catch (error) {
      console.error(`❌ Fehler beim Erstellen des Prinzips ${principle.title}:`, error.message);
    }
  }
  
  return createdPrinciples;
}

async function importBewegungPage(timelineRefs, principleRefs) {
  console.log('📄 Importiere Bewegung-Hauptseite...');
  
  const pageData = {
    ...bewegungPageData,
    timeline: timelineRefs,
    principles: principleRefs
  };
  
  try {
    const result = await client.createOrReplace(pageData);
    console.log('✅ Bewegung-Seite erstellt/aktualisiert:', result._id);
    return result;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen der Bewegung-Seite:', error.message);
  }
}

/**
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('🕉️  ISKCON Bewegung Import Script');
    console.log('==================================\n');
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "bewegungPage"])');
      console.log(`📊 Aktuelle Bewegung-Seiten in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    console.log('🚀 Starte Import der Bewegung-Inhalte...\n');
    
    // Importiere Timeline-Einträge
    const timelineRefs = await importTimelineItems();
    console.log(`\n📈 ${timelineRefs.length} Timeline-Einträge erstellt\n`);
    
    // Importiere Prinzipien
    const principleRefs = await importPrinciples();
    console.log(`\n📋 ${principleRefs.length} Prinzipien erstellt\n`);
    
    // Importiere Haupt-Bewegung-Seite
    await importBewegungPage(timelineRefs, principleRefs);
    
    console.log('\n🎉 Import erfolgreich abgeschlossen!');
    console.log(`📊 Statistiken:`);
    console.log(`   - ${timelineRefs.length} Timeline-Einträge`);
    console.log(`   - ${principleRefs.length} Prinzipien`);
    console.log(`   - 1 Bewegung-Seite`);
    console.log(`\n🌐 Inhalte sind jetzt im Sanity Studio verfügbar!`);
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importTimelineItems, importPrinciples, importBewegungPage };