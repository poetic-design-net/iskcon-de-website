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
 * Hilfsfunktion um Datum zu erstellen
 */
function createDate(daysFromNow, hours = 18, minutes = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

/**
 * Sample Event-Daten für ISKCON Events
 */
const sampleEvents = [
  {
    title: 'Janmashtami Festival - Krishna Geburtsfest',
    slug: { _type: 'slug', current: 'janmashtami-festival-2024' },
    description: 'Das wichtigste Festival des Jahres! Feiern Sie mit uns die Geburt von Lord Krishna mit traditionellen Ritualen, Kirtan, spirituellen Vorträgen und köstlichem Prasadam. Ein unvergessliches Erlebnis für die ganze Familie.',
    startDate: createDate(15, 16, 0),
    endDate: createDate(15, 22, 0),
    eventType: 'festival',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-berlin'
      }
    },
    isFeatured: true,
    isRecurring: false,
    registration: {
      required: true,
      deadline: createDate(10),
      maxParticipants: 200,
      currentParticipants: 45,
      fee: 0
    },
    organizer: 'ISKCON Berlin',
    tags: ['festival', 'krishna', 'janmashtami', 'familie', 'traditional'],
    category: {
      title: 'Festivals',
      slug: 'festivals'
    }
  },
  {
    title: 'Wöchentlicher Bhagavad Gita Kurs',
    slug: { _type: 'slug', current: 'bhagavad-gita-kurs-weekly' },
    description: 'Tauchen Sie ein in die zeitlose Weisheit der Bhagavad Gita. In diesem wöchentlichen Kurs studieren wir gemeinsam die Verse und diskutieren ihre praktische Anwendung im modernen Leben.',
    startDate: createDate(3, 19, 0),
    endDate: createDate(3, 20, 30),
    eventType: 'gita_class',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-berlin'
      }
    },
    isFeatured: false,
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['wednesday']
    },
    registration: {
      required: false
    },
    organizer: 'ISKCON Berlin',
    tags: ['gita', 'studium', 'philosophie', 'weekly'],
    category: {
      title: 'Bildung',
      slug: 'education'
    }
  },
  {
    title: 'Kirtan Abend - Mantra Meditation',
    slug: { _type: 'slug', current: 'kirtan-abend-meditation' },
    description: 'Entspannen Sie bei harmonischen Klängen und heiligen Mantras. Unser Kirtan-Abend bietet eine friedliche Atmosphäre für Meditation und spirituelle Erhebung. Keine Vorerfahrung notwendig.',
    startDate: createDate(7, 18, 30),
    endDate: createDate(7, 20, 0),
    eventType: 'kirtan',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-muenchen'
      }
    },
    isFeatured: true,
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['friday']
    },
    registration: {
      required: false
    },
    organizer: 'ISKCON München',
    tags: ['kirtan', 'meditation', 'musik', 'entspannung'],
    category: {
      title: 'Spirituelle Praxis',
      slug: 'spiritual-practice'
    }
  },
  {
    title: 'Online Srimad Bhagavatam Kurs',
    slug: { _type: 'slug', current: 'online-bhagavatam-kurs' },
    description: 'Nehmen Sie bequem von zu Hause an unserem Bhagavatam-Studium teil. Wir erkunden die spirituellen Geschichten und Lehren des Srimad Bhagavatam in einer interaktiven Online-Umgebung.',
    startDate: createDate(2, 20, 0),
    endDate: createDate(2, 21, 0),
    eventType: 'lecture',
    location: {
      type: 'online',
      onlineDetails: {
        platform: 'Zoom',
        meetingId: '123-456-789',
        password: 'Krishna123'
      }
    },
    isFeatured: false,
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['tuesday']
    },
    registration: {
      required: true,
      deadline: createDate(1),
      maxParticipants: 50,
      currentParticipants: 23,
      fee: 0
    },
    organizer: 'ISKCON Deutschland Online',
    tags: ['online', 'bhagavatam', 'vortrag', 'studium'],
    category: {
      title: 'Online Events',
      slug: 'online-events'
    }
  },
  {
    title: 'Govardhan Puja Festival',
    slug: { _type: 'slug', current: 'govardhan-puja-festival' },
    description: 'Feiern Sie das Govardhan Puja Festival, das Krishna\'s Schutz der Bewohner von Vrindavan ehrt. Mit traditionellen Ritualen, Berg aus Süßigkeiten und gemeinschaftlichem Prasadam.',
    startDate: createDate(25, 15, 0),
    endDate: createDate(25, 21, 0),
    eventType: 'festival',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-jandelsbrunn-simhachalam'
      }
    },
    isFeatured: true,
    isRecurring: false,
    registration: {
      required: false
    },
    organizer: 'ISKCON Simhachalam',
    tags: ['govardhan', 'festival', 'traditional', 'prasadam'],
    category: {
      title: 'Festivals',
      slug: 'festivals'
    }
  },
  {
    title: 'Vegetarisches Kochworkshop',
    slug: { _type: 'slug', current: 'vegetarischer-kochworkshop' },
    description: 'Lernen Sie die Kunst der vedischen Küche! In diesem praktischen Workshop bereiten wir gemeinsam traditionelle vegetarische Gerichte zu und lernen über die spirituellen Aspekte des Kochens.',
    startDate: createDate(12, 14, 0),
    endDate: createDate(12, 18, 0),
    eventType: 'workshop',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-hamburg'
      }
    },
    isFeatured: false,
    isRecurring: false,
    registration: {
      required: true,
      deadline: createDate(10),
      maxParticipants: 15,
      currentParticipants: 8,
      fee: 25
    },
    organizer: 'ISKCON Hamburg',
    tags: ['kochen', 'workshop', 'vegetarisch', 'praktisch'],
    category: {
      title: 'Workshops',
      slug: 'workshops'
    }
  },
  {
    title: 'Meditation & Pranayama Retreat',
    slug: { _type: 'slug', current: 'meditation-pranayama-retreat' },
    description: 'Ein intensives Wochenend-Retreat für tiefe Meditation und Atemübungen. Ideal für alle, die ihre spirituelle Praxis vertiefen möchten. Unterkunft und vegetarische Mahlzeiten inklusive.',
    startDate: createDate(30, 18, 0),
    endDate: createDate(32, 12, 0),
    eventType: 'retreat',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-jandelsbrunn-simhachalam'
      }
    },
    isFeatured: true,
    isRecurring: false,
    registration: {
      required: true,
      deadline: createDate(25),
      maxParticipants: 20,
      currentParticipants: 12,
      fee: 150
    },
    organizer: 'ISKCON Simhachalam',
    tags: ['retreat', 'meditation', 'pranayama', 'wochenende'],
    category: {
      title: 'Retreats',
      slug: 'retreats'
    }
  },
  {
    title: 'Sonntagsfest mit Kirtan und Prasadam',
    slug: { _type: 'slug', current: 'sonntagsfest-kirtan-prasadam' },
    description: 'Unser wöchentliches Sonntagsfest! Beginnen Sie den Tag mit inspirierendem Kirtan, einem spirituellen Vortrag und köstlichem Prasadam. Perfekt für Familien und alle Altersgruppen.',
    startDate: createDate(5, 16, 0),
    endDate: createDate(5, 19, 0),
    eventType: 'kirtan',
    location: {
      type: 'temple',
      temple: {
        _type: 'reference',
        _ref: 'temple-iskcon-koeln'
      }
    },
    isFeatured: false,
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['sunday']
    },
    registration: {
      required: false
    },
    organizer: 'ISKCON Köln',
    tags: ['sonntagsfest', 'kirtan', 'prasadam', 'familie'],
    category: {
      title: 'Regelmäßige Events',
      slug: 'regular-events'
    }
  }
];

/**
 * Erstellt ein Sanity-Document für ein Event
 */
function createEventDocument(event) {
  const documentId = `event-${event.slug.current}`;

  return {
    _id: documentId,
    _type: 'event',
    title: event.title,
    slug: event.slug,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventType: event.eventType,
    location: event.location,
    isFeatured: event.isFeatured || false,
    isRecurring: event.isRecurring || false,
    recurringPattern: event.recurringPattern,
    registration: event.registration,
    organizer: event.organizer,
    tags: event.tags || [],
    category: event.category
  };
}

/**
 * Erstellt ein Platzhalter-Bild für Events
 */
async function createEventPlaceholderImage() {
  try {
    const existing = await client.fetch(`*[_id == "image-event-placeholder"][0]`);
    if (existing) {
      console.log('📷 Event-Platzhalter-Bild bereits vorhanden');
      return 'image-event-placeholder';
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#B74233;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#D4A574;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#grad1)"/>
      <circle cx="400" cy="200" r="80" fill="none" stroke="white" stroke-width="3" opacity="0.7"/>
      <circle cx="400" cy="200" r="50" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>
      <text x="400" y="210" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">
        ISKCON Event
      </text>
      <text x="400" y="340" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.8">
        🕉️ Spirituelle Gemeinschaft 🕉️
      </text>
    </svg>`;
    
    const buffer = Buffer.from(svgContent);
    
    const asset = await client.assets.upload('image', buffer, {
      filename: 'event-placeholder.svg',
      contentType: 'image/svg+xml'
    });

    console.log('📷 Event-Platzhalter-Bild erstellt:', asset._id);
    return asset._id;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Event-Platzhalter-Bildes:', error.message);
    return null;
  }
}

/**
 * Importiert alle Event-Daten in Sanity
 */
async function importEvents() {
  console.log('🎉 Starte Event Import...\n');

  const placeholderImageId = await createEventPlaceholderImage();
  if (!placeholderImageId) {
    console.error('❌ Konnte kein Platzhalter-Bild erstellen. Import abgebrochen.');
    return;
  }

  const transaction = client.transaction();
  let successful = 0;
  let failed = 0;

  for (const event of sampleEvents) {
    try {
      console.log(`🎪 Importiere: ${event.title}`);
      console.log(`   Typ: ${event.eventType}`);
      console.log(`   Datum: ${new Date(event.startDate).toLocaleString('de-DE')}`);
      console.log(`   Ort: ${event.location.type}`);
      
      const document = createEventDocument(event);
      
      // Füge Platzhalter-Bild hinzu
      document.featuredImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: placeholderImageId
        }
      };
      
      transaction.createOrReplace(document);
      
      successful++;
      console.log(`   ✅ Vorbereitet für Import\n`);
    } catch (error) {
      console.error(`   ❌ Fehler bei ${event.title}:`, error.message);
      failed++;
    }
  }

  // Führe die Transaktion aus
  try {
    console.log('🚀 Führe Batch-Import aus...');
    await transaction.commit();
    console.log(`\n✅ Import erfolgreich abgeschlossen!`);
    console.log(`📊 Statistik:`);
    console.log(`   - Erfolgreich: ${successful} Events`);
    console.log(`   - Fehlgeschlagen: ${failed} Events`);
    
    if (successful > 0) {
      console.log(`\n🎉 ${successful} Events wurden erfolgreich in Sanity importiert!`);
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
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('🕉️  ISKCON Event Import Script');
    console.log('===============================\n');
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "event"])');
      console.log(`📊 Aktuelle Events in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    // Starte Import
    await importEvents();
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importEvents, createEventDocument };