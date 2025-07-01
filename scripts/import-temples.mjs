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

// Deutschland Bounds für Koordinaten-Validierung
const GERMANY_BOUNDS = {
  north: 55.05,
  south: 47.27,
  east: 15.04,
  west: 5.87
};

/**
 * Validiert ob Koordinaten innerhalb Deutschlands liegen
 */
function validateCoordinates(lat, lng) {
  return lat >= GERMANY_BOUNDS.south && 
         lat <= GERMANY_BOUNDS.north && 
         lng >= GERMANY_BOUNDS.west && 
         lng <= GERMANY_BOUNDS.east;
}

/**
 * Sample Tempel-Daten für deutsche ISKCON-Zentren
 */
const sampleTemples = [
  {
    name: 'ISKCON Berlin',
    slug: { _type: 'slug', current: 'iskcon-berlin' },
    description: 'Das Berliner ISKCON-Zentrum in Charlottenburg ist ein spiritueller Ort der Begegnung und Meditation im Herzen der deutschen Hauptstadt.',
    address: {
      street: 'Detmolder Str. 13',
      city: 'Berlin',
      postalCode: '10715',
      state: 'Berlin',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 52.4942,
      lng: 13.3233
    },
    contact: {
      phone: '+49 30 8644054',
      email: 'info@iskcon-berlin.de',
      website: 'https://www.iskcon-berlin.de'
    },
    serviceHours: [
      { day: 'monday', openTime: '16:00', closeTime: '20:00', isClosed: false },
      { day: 'tuesday', openTime: '16:00', closeTime: '20:00', isClosed: false },
      { day: 'wednesday', openTime: '16:00', closeTime: '20:00', isClosed: false },
      { day: 'thursday', openTime: '16:00', closeTime: '20:00', isClosed: false },
      { day: 'friday', openTime: '16:00', closeTime: '20:00', isClosed: false },
      { day: 'saturday', openTime: '10:00', closeTime: '20:00', isClosed: false },
      { day: 'sunday', openTime: '10:00', closeTime: '20:00', isClosed: false }
    ],
    programs: [
      {
        title: 'Mangala Arati',
        description: 'Morgendliche Zeremonie mit Mantras und Gebeten',
        time: '04:30',
        frequency: 'daily'
      },
      {
        title: 'Bhagavad Gita Kurs',
        description: 'Studium der heiligen Schrift mit Diskussion',
        time: '19:00',
        frequency: 'weekly'
      },
      {
        title: 'Sonntagsfest',
        description: 'Gemeinsame Feier mit Kirtan, Vortrag und Prasadam',
        time: '16:00',
        frequency: 'weekly'
      }
    ],
    facilities: ['parking', 'restaurant', 'library', 'bookstore'],
    president: {
      name: 'Sadbhuja das',
      bio: 'Tempelpresident von ISKCON Berlin seit über 10 Jahren'
    },
    isActive: true,
    featuredOnHomepage: true,
    seo: {
      title: 'ISKCON Berlin - Hare Krishna Tempel in Charlottenburg',
      description: 'Besuchen Sie das ISKCON Berlin Zentrum für spirituelle Praxis, Meditation und vedische Philosophie im Herzen Berlins.',
      keywords: ['ISKCON', 'Berlin', 'Hare Krishna', 'Tempel', 'Meditation', 'Yoga', 'Spiritualität']
    }
  },
  {
    name: 'ISKCON München',
    slug: { _type: 'slug', current: 'iskcon-muenchen' },
    description: 'Das ISKCON-Zentrum München bietet spirituelle Praxis und vedische Kultur in der bayerischen Hauptstadt.',
    address: {
      street: 'Detmoldstraße 24',
      city: 'München',
      postalCode: '81737',
      state: 'Bayern',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 48.1351,
      lng: 11.5820
    },
    contact: {
      phone: '+49 89 62509944',
      email: 'info@iskcon-muenchen.de',
      website: 'https://www.iskcon-muenchen.de'
    },
    serviceHours: [
      { day: 'monday', openTime: '17:00', closeTime: '20:00', isClosed: false },
      { day: 'tuesday', openTime: '17:00', closeTime: '20:00', isClosed: false },
      { day: 'wednesday', openTime: '17:00', closeTime: '20:00', isClosed: false },
      { day: 'thursday', openTime: '17:00', closeTime: '20:00', isClosed: false },
      { day: 'friday', openTime: '17:00', closeTime: '20:00', isClosed: false },
      { day: 'saturday', openTime: '10:00', closeTime: '20:00', isClosed: false },
      { day: 'sunday', openTime: '10:00', closeTime: '20:00', isClosed: false }
    ],
    programs: [
      {
        title: 'Morgenprogramm',
        description: 'Arati, Japa und Bhagavatam Kurs',
        time: '05:00',
        frequency: 'daily'
      },
      {
        title: 'Abendprogramm',
        description: 'Arati und Gita Studium',
        time: '19:00',
        frequency: 'daily'
      }
    ],
    facilities: ['parking', 'restaurant', 'bookstore'],
    isActive: true,
    featuredOnHomepage: true
  },
  {
    name: 'ISKCON Hamburg',
    slug: { _type: 'slug', current: 'iskcon-hamburg' },
    description: 'Das ISKCON-Zentrum Hamburg heißt alle Suchenden herzlich willkommen zur spirituellen Praxis.',
    address: {
      street: 'Bartelsstraße 30',
      city: 'Hamburg',
      postalCode: '20357',
      state: 'Hamburg',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 53.5511,
      lng: 9.9937
    },
    contact: {
      phone: '+49 40 4392142',
      email: 'info@iskcon-hamburg.de',
      website: 'https://www.iskcon-hamburg.de'
    },
    programs: [
      {
        title: 'Sonntagsfest',
        description: 'Kirtan, Vortrag und vegetarisches Festmahl',
        time: '15:00',
        frequency: 'weekly'
      }
    ],
    facilities: ['parking', 'restaurant'],
    isActive: true,
    featuredOnHomepage: false
  },
  {
    name: 'ISKCON Köln',
    slug: { _type: 'slug', current: 'iskcon-koeln' },
    description: 'Spirituelle Gemeinschaft in Köln für Meditation, Kirtan und vedische Philosophie.',
    address: {
      street: 'Ubierring 23',
      city: 'Köln',
      postalCode: '50678',
      state: 'Nordrhein-Westfalen',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 50.9375,
      lng: 6.9603
    },
    contact: {
      email: 'info@iskcon-koeln.de'
    },
    facilities: ['library', 'bookstore'],
    isActive: true,
    featuredOnHomepage: false
  },
  {
    name: 'ISKCON Frankfurt',
    slug: { _type: 'slug', current: 'iskcon-frankfurt' },
    description: 'Das ISKCON-Zentrum Frankfurt bietet spirituelle Praxis im Herzen von Hessen.',
    address: {
      street: 'Günthersburgallee 16',
      city: 'Frankfurt am Main',
      postalCode: '60316',
      state: 'Hessen',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 50.1109,
      lng: 8.6821
    },
    contact: {
      email: 'info@iskcon-frankfurt.de'
    },
    facilities: ['parking', 'library'],
    isActive: true,
    featuredOnHomepage: false
  },
  {
    name: 'ISKCON Jandelsbrunn Simhachalam Temple',
    slug: { _type: 'slug', current: 'iskcon-jandelsbrunn-simhachalam' },
    description: 'Das Simhachalam Temple in Jandelsbrunn ist ein traditioneller ISKCON-Tempel im bayerischen Wald, bekannt für seine friedliche Atmosphäre und spirituelle Praxis.',
    address: {
      street: 'Zielberg 20',
      city: 'Jandelsbrunn',
      postalCode: '94118',
      state: 'Bayern',
      country: 'Deutschland'
    },
    location: {
      _type: 'geopoint',
      lat: 48.74318185563101,
      lng: 13.706629736308894
    },
    contact: {
      phone: '+49 8583 1268',
      email: 'info@simhachalam.de',
      website: 'https://www.simhachalam.de'
    },
    serviceHours: [
      { day: 'monday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'tuesday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'wednesday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'thursday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'friday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'saturday', openTime: '04:30', closeTime: '21:00', isClosed: false },
      { day: 'sunday', openTime: '04:30', closeTime: '21:00', isClosed: false }
    ],
    programs: [
      {
        title: 'Mangala Arati',
        description: 'Morgendliche Verehrung der Gottheiten',
        time: '04:30',
        frequency: 'daily'
      },
      {
        title: 'Srimad Bhagavatam Kurs',
        description: 'Studium der heiligen Schriften',
        time: '08:30',
        frequency: 'daily'
      },
      {
        title: 'Sandhya Arati',
        description: 'Abendliche Zeremonie',
        time: '19:00',
        frequency: 'daily'
      },
      {
        title: 'Sonntagsfest',
        description: 'Wöchentliches Fest mit Kirtan, Vortrag und Prasadam',
        time: '15:00',
        frequency: 'weekly'
      }
    ],
    facilities: ['parking', 'restaurant', 'library', 'bookstore', 'guesthouse'],
    president: {
      name: 'Bhakti Chaitanya Swami',
      bio: 'Spiritueller Leiter und Gründer des Simhachalam Tempels'
    },
    isActive: true,
    featuredOnHomepage: true,
    seo: {
      title: 'ISKCON Simhachalam Temple Jandelsbrunn - Traditioneller Hare Krishna Tempel',
      description: 'Besuchen Sie das Simhachalam Temple in Jandelsbrunn für authentische vedische Spiritualität im bayerischen Wald.',
      keywords: ['ISKCON', 'Simhachalam', 'Jandelsbrunn', 'Hare Krishna', 'Tempel', 'Bayern', 'Spiritualität', 'Meditation']
    }
  }
];

/**
 * Erstellt ein Sanity-Document für einen Tempel
 */
function createTempleDocument(temple, placeholderImageId = null) {
  // Validiere Koordinaten
  if (!validateCoordinates(temple.location.lat, temple.location.lng)) {
    console.warn(`⚠️  Warnung: Koordinaten für ${temple.name} liegen außerhalb Deutschlands`);
  }

  // Erstelle eine eindeutige ID basierend auf dem Slug
  const documentId = `temple-${temple.slug.current}`;

  const document = {
    _id: documentId,
    _type: 'temple',
    name: temple.name,
    slug: temple.slug,
    description: temple.description,
    address: temple.address,
    location: temple.location,
    contact: temple.contact,
    serviceHours: temple.serviceHours || [],
    programs: temple.programs || [],
    facilities: temple.facilities || [],
    president: temple.president,
    isActive: temple.isActive !== false,
    featuredOnHomepage: temple.featuredOnHomepage || false,
    seo: temple.seo
  };

  // Füge mainImage hinzu, wenn Platzhalter-Bild verfügbar
  if (placeholderImageId) {
    document.mainImage = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: placeholderImageId
      }
    };
  }

  return document;
}

/**
 * Erstellt ein Platzhalter-Bild-Asset in Sanity
 */
async function createPlaceholderImage() {
  try {
    // Prüfe ob Platzhalter-Bild bereits existiert
    const existing = await client.fetch(`*[_id == "image-placeholder"][0]`);
    if (existing) {
      console.log('📷 Platzhalter-Bild bereits vorhanden');
      return 'image-placeholder';
    }

    // Erstelle ein einfaches SVG-Platzhalter-Bild
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f0f0f0"/>
      <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">
        Tempel Foto folgt
      </text>
    </svg>`;
    
    const buffer = Buffer.from(svgContent);
    
    // Lade das Bild zu Sanity hoch
    const asset = await client.assets.upload('image', buffer, {
      filename: 'temple-placeholder.svg',
      contentType: 'image/svg+xml'
    });

    console.log('📷 Platzhalter-Bild erstellt:', asset._id);
    return asset._id;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Platzhalter-Bildes:', error.message);
    return null;
  }
}

/**
 * Importiert alle Tempel-Daten in Sanity
 */
async function importTemples() {
  console.log('🏛️  Starte Temple Import...\n');

  // Erstelle zuerst ein Platzhalter-Bild
  const placeholderImageId = await createPlaceholderImage();
  if (!placeholderImageId) {
    console.error('❌ Konnte kein Platzhalter-Bild erstellen. Import abgebrochen.');
    return;
  }

  const transaction = client.transaction();
  let successful = 0;
  let failed = 0;

  for (const temple of sampleTemples) {
    try {
      console.log(`📍 Importiere: ${temple.name}`);
      console.log(`   Adresse: ${temple.address.street}, ${temple.address.city}`);
      console.log(`   Koordinaten: ${temple.location.lat}, ${temple.location.lng}`);
      
      const document = createTempleDocument(temple, placeholderImageId);
      transaction.createOrReplace(document);
      
      successful++;
      console.log(`   ✅ Vorbereitet für Import\n`);
    } catch (error) {
      console.error(`   ❌ Fehler bei ${temple.name}:`, error.message);
      failed++;
    }
  }

  // Führe die Transaktion aus
  try {
    console.log('🚀 Führe Batch-Import aus...');
    await transaction.commit();
    console.log(`\n✅ Import erfolgreich abgeschlossen!`);
    console.log(`📊 Statistik:`);
    console.log(`   - Erfolgreich: ${successful} Tempel`);
    console.log(`   - Fehlgeschlagen: ${failed} Tempel`);
    
    if (successful > 0) {
      console.log(`\n🎉 ${successful} Tempel wurden erfolgreich in Sanity importiert!`);
      console.log(`🌐 Sie sind jetzt im Sanity Studio verfügbar: https://iskcon-de.sanity.studio`);
    }
  } catch (error) {
    console.error('\n❌ Batch-Import fehlgeschlagen:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Konvertiert Adresse zu Koordinaten (Platzhalter für Geocoding API)
 */
async function addressToCoordinates(address) {
  // In einer echten Implementierung würde hier eine Geocoding API verwendet
  // z.B. Google Maps Geocoding API oder OpenStreetMap Nominatim
  console.log('⚠️  Geocoding nicht implementiert. Verwende manuelle Koordinaten.');
  return null;
}

/**
 * Lädt Tempel-Daten aus CSV-Datei (optional)
 */
async function loadTemplesFromCSV(csvPath) {
  console.log('📄 CSV Import noch nicht implementiert');
  // Hier könnte CSV-Parsing implementiert werden
  return [];
}

/**
 * Lädt Tempel-Daten aus JSON-Datei (optional)
 */
async function loadTemplesFromJSON(jsonPath) {
  console.log('📄 JSON Import noch nicht implementiert');
  // Hier könnte JSON-Loading implementiert werden
  return [];
}

/**
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('🕉️  ISKCON Tempel Import Script');
    console.log('==================================\n');
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "temple"])');
      console.log(`📊 Aktuelle Tempel in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    // Starte Import
    await importTemples();
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importTemples, createTempleDocument, validateCoordinates };
