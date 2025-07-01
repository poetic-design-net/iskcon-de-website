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
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'cbaalziw',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-04-06',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

/**
 * Erweiterte ISKCON Statistiken basierend auf der Hare Krishna Bewegung Dokumentation
 * Kategorien: community, history, tradition, practice, service, sustainability, digital, culture, architecture, vision
 */
const enhancedISKCONStats = [
  // Community/Gemeinschaft Statistiken
  {
    _id: 'stat-dach-praktizierende',
    title: 'Praktizierende DACH-Region',
    value: 6000,
    unit: 'Devotees',
    category: 'community',
    color: 'blue',
    icon: 'users',
    description: 'Aktive Praktizierende in Deutschland, Österreich und der Schweiz'
  },
  {
    _id: 'stat-deutschland-praktizierende',
    title: 'Praktizierende Deutschland',
    value: 5150,
    unit: 'Devotees',
    category: 'community',
    color: 'blue',
    icon: 'user-group',
    description: 'Aktive Krishna-Bewusstsein Praktizierende in Deutschland'
  },
  {
    _id: 'stat-deutschland-zentren',
    title: 'Aktive Zentren Deutschland',
    value: 11,
    unit: 'Zentren',
    category: 'community',
    color: 'green',
    icon: 'building',
    description: 'Etablierte ISKCON-Zentren und Tempel in Deutschland'
  },
  {
    _id: 'stat-gbc-mitglieder',
    title: 'GBC-Mitglieder weltweit',
    value: 35,
    unit: 'Mitglieder',
    category: 'community',
    color: 'purple',
    icon: 'users',
    description: 'Governing Body Commission Mitglieder der weltweiten Führung'
  },

  // History/Geschichte Statistiken
  {
    _id: 'stat-gruendungsjahr-iskcon',
    title: 'ISKCON Gründung',
    value: 1966,
    unit: 'Jahr',
    category: 'history',
    color: 'amber',
    icon: 'calendar',
    description: 'Offizielle Gründung von ISKCON in New York durch Prabhupada'
  },
  {
    _id: 'stat-prabhupada-ankunft',
    title: 'Prabhupadas Amerika-Ankunft',
    value: 1965,
    unit: 'Jahr',
    category: 'history',
    color: 'amber',
    icon: 'ship',
    description: 'Ankunft von A.C. Bhaktivedanta Swami Prabhupada in Amerika'
  },
  {
    _id: 'stat-deutschland-beginn',
    title: 'Deutschland Krishna-Predigt',
    value: 1968,
    unit: 'Jahr',
    category: 'history',
    color: 'amber',
    icon: 'microphone',
    description: 'Erste Krishna-Predigt in Deutschland (Berlin)'
  },
  {
    _id: 'stat-schweiz-beginn',
    title: 'Schweizer Gemeinschaft',
    value: 1980,
    unit: 'Jahr',
    category: 'history',
    color: 'amber',
    icon: 'flag',
    description: 'Beginn der Krishna Gemeinschaft Schweiz in Zürich'
  },

  // Digital/Moderne Entwicklungen
  {
    _id: 'stat-mayapur-tv-zuschauer',
    title: 'MayapurTV Zuschauer',
    value: 20000,
    unit: 'Registrierte',
    category: 'digital',
    color: 'red',
    icon: 'video',
    description: 'Registrierte Zuschauer auf der primären Live-Streaming-Plattform'
  },
  {
    _id: 'stat-online-festival-teilnehmer',
    title: 'Online-Festival Teilnehmer',
    value: 2000,
    unit: 'Haushalte',
    category: 'digital',
    color: 'red',
    icon: 'monitor',
    description: 'Simultane Teilnehmer bei großen Online-Festivals wie Gaura Purnima'
  },
  {
    _id: 'stat-online-bildung-verfuegbarkeit',
    title: 'Online-Bildung Verfügbarkeit',
    value: 24,
    unit: 'Stunden/Tag',
    category: 'digital',
    color: 'red',
    icon: 'clock',
    description: '24/7 Verfügbarkeit der Online-Bildungsinitiativen'
  },

  // Service/Dienst Statistiken
  {
    _id: 'stat-food-for-life-mahlzeiten',
    title: 'Food for Life Mahlzeiten',
    value: 1000000,
    unit: 'Täglich',
    category: 'service',
    color: 'orange',
    icon: 'utensils',
    description: 'Täglich servierte vegetarische Mahlzeiten weltweit'
  },
  {
    _id: 'stat-food-for-life-laender',
    title: 'Food for Life Länder',
    value: 65,
    unit: 'Länder',
    category: 'service',
    color: 'orange',
    icon: 'globe',
    description: 'Länder mit aktiven Food for Life Programmen'
  },

  // Sustainability/Nachhaltigkeit
  {
    _id: 'stat-oeko-doerfer-weltweit',
    title: 'ISKCON Öko-Dörfer',
    value: 40,
    unit: 'Dörfer',
    category: 'sustainability',
    color: 'green',
    icon: 'leaf',
    description: 'Weltweite Öko-Dörfer die Spiritualität mit Umweltbewusstsein verbinden'
  },
  {
    _id: 'stat-simhachalam-hektar',
    title: 'Simhachalam Farmgemeinschaft',
    value: 17,
    unit: 'Hektar',
    category: 'sustainability',
    color: 'green',
    icon: 'tree',
    description: 'Größe der biodynamischen Farmgemeinschaft im Bayerischen Wald'
  },

  // Practice/Praxis Statistiken
  {
    _id: 'stat-regulative-prinzipien',
    title: 'Regulative Prinzipien',
    value: 4,
    unit: 'Prinzipien',
    category: 'practice',
    color: 'indigo',
    icon: 'book',
    description: 'Ethische Grundprinzipien des Krishna-Bewusstseins'
  },
  {
    _id: 'stat-japa-wiederholungen',
    title: 'Tägliche Japa Runden',
    value: 1728,
    unit: 'Mantras',
    category: 'practice',
    color: 'indigo',
    icon: 'refresh',
    description: 'Mantra-Wiederholungen bei 16 Runden Japa-Meditation'
  },
  {
    _id: 'stat-hingabungsvolle-prozesse',
    title: 'Hingabungsvolle Prozesse',
    value: 9,
    unit: 'Prozesse',
    category: 'practice',
    color: 'indigo',
    icon: 'heart',
    description: 'Neun Wege des Bhakti-Yoga zur spirituellen Verwirklichung'
  },

  // Culture/Kultur Statistiken
  {
    _id: 'stat-beatles-single-verkaeufe',
    title: 'Hare Krishna Single (Tag 1)',
    value: 70000,
    unit: 'Verkäufe',
    category: 'culture',
    color: 'pink',
    icon: 'music',
    description: 'Verkaufte Exemplare der Beatles-Krishna Kollaboration am ersten Tag'
  },

  // Architecture/Architektur
  {
    _id: 'stat-tovp-hoehe',
    title: 'Temple of Vedic Planetarium',
    value: 107,
    unit: 'Meter',
    category: 'architecture',
    color: 'cyan',
    icon: 'building',
    description: 'Höhe des größten ISKCON-Tempels weltweit in Mayapur'
  }
];

/**
 * Erstellt ein Sanity-Document für eine Statistik
 */
function createStatDocument(stat) {
  return {
    _id: stat._id,
    _type: 'statItem',
    title: stat.title,
    value: stat.value,
    unit: stat.unit,
    category: stat.category,
    color: stat.color,
    icon: stat.icon,
    description: stat.description
  };
}

/**
 * Aktualisiert die Bewegung-Seite mit den wichtigsten Statistiken
 */
async function updateBewegungPageWithStats() {
  try {
    console.log('🔄 Verknüpfe wichtigste Stats mit der Bewegung-Seite...');
    
    // Die 6 wichtigsten Statistiken für die Bewegung-Seite auswählen
    const featuredStatsIds = [
      'stat-dach-praktizierende',
      'stat-deutschland-zentren',
      'stat-food-for-life-mahlzeiten',
      'stat-oeko-doerfer-weltweit',
      'stat-japa-wiederholungen',
      'stat-tovp-hoehe'
    ];

    const statsReferences = featuredStatsIds.map(id => ({
      _type: 'reference',
      _ref: id
    }));

    // Prüfe ob die Bewegung-Seite existiert
    const bewegungPage = await client.fetch(`*[_type == "bewegungPage"][0]`);
    
    if (bewegungPage) {
      // Update existierende Seite
      await client
        .patch(bewegungPage._id)
        .set({ stats: statsReferences })
        .commit();
      
      console.log('✅ Bewegung-Seite erfolgreich mit Stats verknüpft');
    } else {
      console.log('⚠️  Bewegung-Seite nicht gefunden - Stats werden nur importiert');
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Verknüpfen der Stats:', error.message);
  }
}

/**
 * Importiert alle erweiterten ISKCON-Statistiken in Sanity
 */
async function importEnhancedStats() {
  console.log('📊 Starte erweiterten ISKCON Stats Import...\n');

  const transaction = client.transaction();
  let successful = 0;
  let failed = 0;

  for (const stat of enhancedISKCONStats) {
    try {
      console.log(`📈 Importiere: ${stat.title}`);
      console.log(`   Wert: ${stat.value.toLocaleString('de-DE')} ${stat.unit}`);
      console.log(`   Kategorie: ${stat.category}`);
      console.log(`   Beschreibung: ${stat.description}`);
      
      const document = createStatDocument(stat);
      transaction.createOrReplace(document);
      
      successful++;
      console.log(`   ✅ Vorbereitet für Import\n`);
    } catch (error) {
      console.error(`   ❌ Fehler bei ${stat.title}:`, error.message);
      failed++;
    }
  }

  // Führe die Transaktion aus
  try {
    console.log('🚀 Führe Batch-Import aus...');
    await transaction.commit();
    console.log(`\n✅ Import erfolgreich abgeschlossen!`);
    console.log(`📊 Statistik:`);
    console.log(`   - Erfolgreich: ${successful} Stats`);
    console.log(`   - Fehlgeschlagen: ${failed} Stats`);
    
    if (successful > 0) {
      console.log(`\n📈 ${successful} ISKCON-Statistiken wurden erfolgreich importiert!`);
      console.log(`🌐 Sie sind jetzt im Sanity Studio verfügbar: https://iskcon-de.sanity.studio`);
      
      // Verknüpfe die wichtigsten Stats mit der Bewegung-Seite
      await updateBewegungPageWithStats();
    }
  } catch (error) {
    console.error('\n❌ Batch-Import fehlgeschlagen:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Zeigt eine Übersicht der zu importierenden Statistiken
 */
function showStatsOverview() {
  console.log('📋 Übersicht der zu importierenden ISKCON-Statistiken:\n');
  
  const categories = [...new Set(enhancedISKCONStats.map(stat => stat.category))];
  
  categories.forEach(category => {
    const categoryStats = enhancedISKCONStats.filter(stat => stat.category === category);
    console.log(`🏷️  ${category.toUpperCase()} (${categoryStats.length} Stats):`);
    categoryStats.forEach(stat => {
      console.log(`   • ${stat.title}: ${stat.value.toLocaleString('de-DE')} ${stat.unit}`);
    });
    console.log('');
  });
}

/**
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('🕉️  ISKCON Enhanced Stats Import Script');
    console.log('==========================================\n');
    
    // Zeige Übersicht
    showStatsOverview();
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "statItem"])');
      console.log(`📊 Aktuelle statItem Dokumente in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    // Starte Import
    await importEnhancedStats();
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importEnhancedStats, createStatDocument, enhancedISKCONStats };