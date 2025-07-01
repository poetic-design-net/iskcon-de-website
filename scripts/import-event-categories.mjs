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

const eventCategories = [
  {
    _type: 'eventCategory',
    title: 'Festivals',
    slug: { current: 'festivals' },
    description: 'Große spirituelle Feste mit Musik, Tanz, vegetarischem Essen und Gemeinschaft.',
    icon: 'mdi:festival',
    color: 'spiritual-gold',
    isActive: true,
    sortOrder: 10
  },
  {
    _type: 'eventCategory',
    title: 'Kirtan',
    slug: { current: 'kirtan' },
    description: 'Meditative Gesangsabende mit traditionellen Sanskrit-Mantras.',
    icon: 'mdi:music-note',
    color: 'spiritual-saffron',
    isActive: true,
    sortOrder: 20
  },
  {
    _type: 'eventCategory',
    title: 'Vorträge',
    slug: { current: 'vortraege' },
    description: 'Spirituelle Diskurse über vedische Philosophie und Lebenspraxis.',
    icon: 'mdi:account-voice',
    color: 'spiritual-blue',
    isActive: true,
    sortOrder: 30
  },
  {
    _type: 'eventCategory',
    title: 'Bhagavad Gita Klassen',
    slug: { current: 'bhagavad-gita-klassen' },
    description: 'Studium der zeitlosen Weisheit der Bhagavad Gita in Gruppenformat.',
    icon: 'mdi:book-open-variant',
    color: 'spiritual-blue',
    isActive: true,
    sortOrder: 40
  },
  {
    _type: 'eventCategory',
    title: 'Workshops',
    slug: { current: 'workshops' },
    description: 'Praktische Seminare zu Meditation, Kochen, Kunst und mehr.',
    icon: 'mdi:hammer-wrench',
    color: 'spiritual-earth',
    isActive: true,
    sortOrder: 50
  },
  {
    _type: 'eventCategory',
    title: 'Retreats',
    slug: { current: 'retreats' },
    description: 'Mehrtägige spirituelle Rückzüge für tiefere Praxis und Reflexion.',
    icon: 'mdi:meditation',
    color: 'spiritual-blue',
    isActive: true,
    sortOrder: 60
  },
  {
    _type: 'eventCategory',
    title: 'Prasadam',
    slug: { current: 'prasadam' },
    description: 'Gemeinsame vegetarische Mahlzeiten als spirituelle Praxis.',
    icon: 'mdi:food',
    color: 'spiritual-lotus',
    isActive: true,
    sortOrder: 70
  },
  {
    _type: 'eventCategory',
    title: 'Pilgerfahrten',
    slug: { current: 'pilgerfahrten' },
    description: 'Spirituelle Reisen zu heiligen Orten und Tempeln.',
    icon: 'mdi:map-marker-path',
    color: 'spiritual-gold',
    isActive: true,
    sortOrder: 80
  }
];

async function importEventCategories() {
  try {
    console.log('🚀 Importiere Event-Kategorien...\n');
    
    // Prüfen ob bereits Event-Kategorien existieren
    const existingCategories = await client.fetch('*[_type == "eventCategory"]');
    
    if (existingCategories.length > 0) {
      console.log(`ℹ️  ${existingCategories.length} Event-Kategorien bereits vorhanden - überspringe Import`);
      return;
    }
    
    // Event-Kategorien erstellen
    const transaction = client.transaction();
    let successful = 0;
    
    eventCategories.forEach(category => {
      console.log(`📋 Importiere: ${category.title}`);
      console.log(`   Icon: ${category.icon}`);
      console.log(`   Farbe: ${category.color}`);
      console.log(`   Sortierung: ${category.sortOrder}\n`);
      
      transaction.createOrReplace({
        _id: `eventCategory-${category.slug.current}`,
        ...category
      });
      successful++;
    });
    
    console.log('🚀 Führe Batch-Import aus...');
    const result = await transaction.commit();
    
    console.log('\n✅ Event-Kategorien erfolgreich importiert!');
    console.log(`📊 Statistik:`);
    console.log(`   - Erfolgreich: ${successful} Kategorien`);
    
    if (successful > 0) {
      console.log(`\n🎉 ${successful} Event-Kategorien wurden erfolgreich in Sanity importiert!`);
      console.log(`🌐 Sie sind jetzt im Sanity Studio verfügbar: https://iskcon-de.sanity.studio`);
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Importieren der Event-Kategorien:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    process.exit(1);
  }
}

/**
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('📋 ISKCON Event-Kategorien Import Script');
    console.log('=========================================\n');
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "eventCategory"])');
      console.log(`📊 Aktuelle Event-Kategorien in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    // Starte Import
    await importEventCategories();
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importEventCategories };