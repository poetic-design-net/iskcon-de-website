/**
 * Skript zum direkten Import von Demo-Inhalten in Sanity
 * 
 * Dieses Skript verwendet den Sanity-Client, um Demo-Inhalte direkt in Sanity einzufügen
 * und dabei echte Bilder zu verwenden.
 * 
 * Voraussetzungen:
 * - Node.js installiert
 * - @sanity/client installiert (npm install @sanity/client)
 * - Sanity-Projekt mit entsprechenden Schemas
 */

// Umgebungsvariablen laden
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Lade Umgebungsvariablen aus der .env-Datei
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// ESM-Modul: Wir verwenden process.cwd() für Pfade

// Sanity-Konfiguration aus Umgebungsvariablen laden
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_TOKEN;

// Überprüfe, ob alle erforderlichen Umgebungsvariablen vorhanden sind
if (!projectId || !dataset || !apiVersion || !token) {
  console.error('Fehler: Nicht alle erforderlichen Umgebungsvariablen sind definiert.');
  console.error('Bitte stelle sicher, dass die folgenden Variablen in der .env-Datei definiert sind:');
  console.error('- PUBLIC_SANITY_PROJECT_ID');
  console.error('- PUBLIC_SANITY_DATASET');
  console.error('- PUBLIC_SANITY_API_VERSION');
  console.error('- SANITY_TOKEN');
  process.exit(1);
}

// Konfiguration für den Sanity-Client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

// Hilfsfunktion zur Generierung eines Slugs aus einem Titel
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Verwende Bilder aus dem static/img-Verzeichnis
// Verwende path.resolve mit process.cwd() für absolute Pfade
const staticImagesDir = path.resolve(process.cwd(), 'static/img');
const demoImagePaths = [
  path.resolve(staticImagesDir, 'hero_nature.webp'),
  path.resolve(staticImagesDir, 'logo.jpg'),
  path.resolve(staticImagesDir, 'logo.png'),
  path.resolve(staticImagesDir, 'logo.webp')
];

// Funktion zum Hochladen eines Bildes in Sanity
async function uploadImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      }
    };
  } catch (error) {
    console.error(`Fehler beim Hochladen des Bildes ${imagePath}:`, error);
    // Fallback für den Fall, dass das Bild nicht hochgeladen werden kann
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-Placeholder-1000x1000-jpg'
      }
    };
  }
}

// Funktion zur Generierung einer Hero-Sektion
async function generateHeroSection() {
  const title = [
    'Willkommen bei ISKCON Deutschland',
    'Entdecke spirituelles Wissen',
    'Gemeinsam auf dem Weg zu Krishna',
    'Bhakti Yoga für jeden',
    'Vedische Kultur erleben'
  ][Math.floor(Math.random() * 5)];

  const subtitle = [
    'Erfahre mehr über die Internationale Gesellschaft für Krishna-Bewusstsein',
    'Tauche ein in die Welt des Bhakti Yoga und der vedischen Philosophie',
    'Entdecke die zeitlose Weisheit der Bhagavad-gita und des Srimad-Bhagavatam',
    'Finde inneren Frieden und spirituelle Erfüllung durch Krishna-Bewusstsein',
    'Verbinde dich mit einer weltweiten Gemeinschaft von Praktizierenden'
  ][Math.floor(Math.random() * 5)];

  const layout = Math.random() > 0.5 ? 'left-image' : 'right-image';
  
  const ctaText = Math.random() > 0.3 ? 'Mehr erfahren' : undefined;
  const ctaLink = ctaText ? '/ueber-uns' : undefined;

  // Zufälliges Bild hochladen
  const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
  const image = await uploadImage(imagePath);

  const heroSection = {
    _type: 'heroSection',
    title,
    subtitle,
    image,
    layout,
    ctaText,
    ctaLink
  };

  // In Sanity speichern
  const result = await client.create(heroSection);
  console.log(`Hero-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer Grid-Sektion
async function generateGridSection() {
  const titles = [
    'Unsere Angebote',
    'Entdecke unsere Tempel',
    'Spirituelle Bücher',
    'Kommende Veranstaltungen',
    'Unsere Philosophie'
  ];
  
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  const descriptions = [
    'Hier findest du einen Überblick über unsere verschiedenen Angebote und Aktivitäten.',
    'Entdecke die Vielfalt unserer spirituellen Gemeinschaft und finde, was dich inspiriert.',
    'Wir bieten verschiedene Möglichkeiten, um Krishna-Bewusstsein in deinem Leben zu praktizieren.',
    'Lerne mehr über die verschiedenen Aspekte der vedischen Kultur und Philosophie.'
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const columns = [2, 3, 4][Math.floor(Math.random() * 3)];
  
  const itemCount = Math.floor(Math.random() * 4) + 2; // 2-5 Items
  
  const items = [];
  
  for (let i = 0; i < itemCount; i++) {
    const itemTitles = [
      'Bhakti Yoga',
      'Meditation',
      'Vegetarische Küche',
      'Kirtan',
      'Tempelbesuche',
      'Festivals',
      'Bücher',
      'Philosophie',
      'Gemeinschaft',
      'Retreats'
    ];
    
    const itemDescriptions = [
      'Der Pfad der liebenden Hingabe zu Krishna, der durch verschiedene spirituelle Praktiken kultiviert wird.',
      'Erfahre inneren Frieden und Klarheit durch regelmäßige Meditation und Mantra-Rezitation.',
      'Entdecke die Freude am Kochen und Genießen von sattvischen, vegetarischen Speisen.',
      'Tauche ein in die Klänge des Heiligen Namens durch gemeinschaftliches Singen und Musizieren.',
      'Besuche unsere Tempel und erlebe die spirituelle Atmosphäre und Gemeinschaft.',
      'Nimm teil an unseren regelmäßigen Festivals und Feierlichkeiten zu besonderen Anlässen.',
      'Vertiefe dein Wissen durch das Studium der vedischen Schriften und spirituellen Bücher.',
      'Verstehe die tiefgründige Philosophie des Krishna-Bewusstseins und ihre praktische Anwendung.',
      'Werde Teil einer unterstützenden Gemeinschaft von Gleichgesinnten auf dem spirituellen Pfad.',
      'Ziehe dich zurück und vertiefe deine spirituelle Praxis in einer ruhigen, natürlichen Umgebung.'
    ];
    
    // Für einige Items Bilder hochladen
    let image;
    if (Math.random() > 0.3) {
      const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
      image = await uploadImage(imagePath);
    }
    
    items.push({
      title: itemTitles[i % itemTitles.length],
      description: itemDescriptions[i % itemDescriptions.length],
      image,
      link: Math.random() > 0.5 ? `/${generateSlug(itemTitles[i % itemTitles.length])}` : undefined
    });
  }
  
  const gridSection = {
    _type: 'gridSection',
    title,
    description,
    items,
    columns
  };
  
  // In Sanity speichern
  const result = await client.create(gridSection);
  console.log(`Grid-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer Media-Sektion
async function generateMediaSection() {
  const titles = [
    'Einblicke in unsere Gemeinschaft',
    'Krishna-Bewusstsein in Aktion',
    'Spirituelle Praxis im Alltag',
    'Unsere Tempel und Zentren',
    'Festivals und Feierlichkeiten'
  ];
  
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  const descriptions = [
    'Erhalte einen visuellen Eindruck von unseren Aktivitäten und Veranstaltungen.',
    'Bilder sagen mehr als tausend Worte - sieh selbst, wie Krishna-Bewusstsein gelebt wird.',
    'Entdecke die Schönheit und Tiefe der vedischen Kultur durch Bilder und Videos.',
    'Ein Blick hinter die Kulissen unserer spirituellen Gemeinschaft.'
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const mediaType = Math.random() > 0.3 ? 'image' : 'video';
  
  const videoUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://vimeo.com/123456789',
    'https://www.youtube.com/watch?v=abcdefghijk',
    'https://vimeo.com/987654321'
  ];
  
  const aspectRatio = ['16:9', '4:3', '1:1'][Math.floor(Math.random() * 3)];
  
  // Für Bilder ein Bild hochladen
  let image;
  if (mediaType === 'image') {
    const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
    image = await uploadImage(imagePath);
  }
  
  const mediaSection = {
    _type: 'mediaSection',
    title,
    description,
    mediaType,
    image,
    videoUrl: mediaType === 'video' ? videoUrls[Math.floor(Math.random() * videoUrls.length)] : undefined,
    aspectRatio
  };
  
  // In Sanity speichern
  const result = await client.create(mediaSection);
  console.log(`Media-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer Quote-Sektion
async function generateQuoteSection() {
  const quotes = [
    'Der höchste Zweck allen spirituellen Wissens ist es, reine Liebe zu Krishna zu entwickeln.',
    'Wahres Glück findet man nicht in materiellen Besitztümern, sondern in der Verbindung mit dem Göttlichen.',
    'Bhakti Yoga ist der direkteste Weg zur Selbstverwirklichung in diesem Zeitalter.',
    'Durch das Chanten des Heiligen Namens kann jeder spirituelle Vollkommenheit erreichen.',
    'Die Seele ist ewig, unveränderlich und unzerstörbar - nur der Körper unterliegt dem Wandel.'
  ];
  
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  
  const authors = [
    'Srila Prabhupada',
    'Bhaktivedanta Swami',
    'Krishna Das',
    'Radhanath Swami',
    'Bhakti Charu Swami'
  ];
  
  const author = authors[Math.floor(Math.random() * authors.length)];
  
  const roles = [
    'Gründer-Acharya der ISKCON',
    'Spiritueller Meister',
    'Bhakti Yoga Lehrer',
    'Autor und spiritueller Lehrer',
    'Sannyasi und Prediger'
  ];
  
  const role = Math.random() > 0.3 ? roles[Math.floor(Math.random() * roles.length)] : undefined;
  
  // Für einige Zitate ein Avatar-Bild hochladen
  let avatar;
  if (Math.random() > 0.5) {
    const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
    avatar = await uploadImage(imagePath);
  }
  
  const backgroundColor = Math.random() > 0.5 ? 'light' : 'dark';
  
  const quoteSection = {
    _type: 'quoteSection',
    quote,
    author,
    role,
    avatar,
    backgroundColor
  };
  
  // In Sanity speichern
  const result = await client.create(quoteSection);
  console.log(`Quote-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer FAQ-Sektion
async function generateFaqSection() {
  const titles = [
    'Häufig gestellte Fragen',
    'Fragen und Antworten',
    'Alles, was du wissen musst',
    'Deine Fragen beantwortet',
    'FAQ zum Krishna-Bewusstsein'
  ];
  
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  const descriptions = [
    'Hier findest du Antworten auf die häufigsten Fragen zum Krishna-Bewusstsein und zur ISKCON.',
    'Wir haben die wichtigsten Fragen zusammengestellt, die uns oft gestellt werden.',
    'Erfahre mehr über unsere Philosophie, Praktiken und Gemeinschaft durch diese FAQ.',
    'Hast du Fragen? Hier sind die Antworten, die dir helfen können, mehr zu verstehen.'
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const faqData = [
    {
      question: 'Was ist ISKCON?',
      answer: 'ISKCON (International Society for Krishna Consciousness) ist eine weltweite spirituelle Organisation, die 1966 von A.C. Bhaktivedanta Swami Prabhupada gegründet wurde, um das Wissen über Krishna-Bewusstsein zu verbreiten.',
      category: 'Allgemein'
    },
    {
      question: 'Was ist Krishna-Bewusstsein?',
      answer: 'Krishna-Bewusstsein ist die Praxis des Bhakti Yoga, des Pfades der liebenden Hingabe zu Krishna (Gott). Es beinhaltet verschiedene spirituelle Praktiken wie Mantra-Meditation, Studium der vedischen Schriften und einen bewussten Lebensstil.',
      category: 'Philosophie'
    },
    {
      question: 'Muss ich Hindu sein, um teilzunehmen?',
      answer: 'Nein, ISKCON ist offen für Menschen aller Glaubensrichtungen und Hintergründe. Die Prinzipien und Praktiken des Krishna-Bewusstseins sind universell und können von jedem angewendet werden, unabhängig von seiner religiösen Zugehörigkeit.',
      category: 'Teilnahme'
    },
    {
      question: 'Warum praktiziert ISKCON vegetarische Ernährung?',
      answer: 'Vegetarismus ist ein wichtiger Aspekt des Krishna-Bewusstseins und basiert auf dem Prinzip der Gewaltlosigkeit (Ahimsa). Wir glauben, dass eine vegetarische Ernährung förderlich für spirituelles Wachstum ist und das Mitgefühl für alle Lebewesen fördert.',
      category: 'Lebensstil'
    },
    {
      question: 'Was ist Prasadam?',
      answer: 'Prasadam (wörtlich "Barmherzigkeit") ist Nahrung, die Krishna geopfert wurde. Durch das Opfern der Nahrung wird sie spiritualisiert und bringt spirituellen Nutzen für diejenigen, die sie zu sich nehmen.',
      category: 'Praktiken'
    },
    {
      question: 'Was bedeutet das Chanten des Hare Krishna Mantras?',
      answer: 'Das Chanten des Hare Krishna Maha-Mantras (Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare / Hare Rama, Hare Rama, Rama Rama, Hare Hare) ist eine grundlegende spirituelle Praxis im Krishna-Bewusstsein. Es reinigt das Herz, beruhigt den Geist und erweckt die natürliche Liebe zu Gott.',
      category: 'Praktiken'
    },
    {
      question: 'Wie kann ich mich in der ISKCON engagieren?',
      answer: 'Es gibt viele Möglichkeiten, sich zu engagieren: Besuche einen Tempel in deiner Nähe, nimm an Programmen und Festivals teil, studiere die Bücher von Srila Prabhupada, praktiziere die Prinzipien des Krishna-Bewusstseins in deinem täglichen Leben oder engagiere dich in verschiedenen Diensten.',
      category: 'Teilnahme'
    },
    {
      question: 'Was sind die vier regulierenden Prinzipien?',
      answer: 'Die vier regulierenden Prinzipien sind: 1) Kein Fleisch, Fisch und Eier, 2) Keine Rauschmittel, 3) Kein Glücksspiel, 4) Keine außerehelichen sexuellen Beziehungen. Diese Prinzipien helfen, ein reines und bewusstes Leben zu führen.',
      category: 'Lebensstil'
    }
  ];
  
  const faqCount = Math.floor(Math.random() * 5) + 3; // 3-7 FAQs
  const selectedFaqs = [];
  
  for (let i = 0; i < faqCount; i++) {
    selectedFaqs.push(faqData[i % faqData.length]);
  }
  
  const layout = Math.random() > 0.5 ? 'accordion' : 'list';
  
  const faqSection = {
    _type: 'faqSection',
    title,
    description,
    faqs: selectedFaqs,
    layout
  };
  
  // In Sanity speichern
  const result = await client.create(faqSection);
  console.log(`FAQ-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer CTA-Sektion
async function generateCtaSection() {
  const titles = [
    'Werde Teil unserer Gemeinschaft',
    'Entdecke Krishna-Bewusstsein',
    'Beginne deine spirituelle Reise',
    'Finde inneren Frieden',
    'Verbinde dich mit uns'
  ];
  
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  const descriptions = [
    'Tritt unserer wachsenden Gemeinschaft bei und entdecke die transformative Kraft des Krishna-Bewusstseins in deinem Leben.',
    'Wir laden dich ein, mehr über Krishna-Bewusstsein zu erfahren und Teil unserer spirituellen Familie zu werden.',
    'Egal wo du dich auf deinem spirituellen Weg befindest, wir sind hier, um dich zu unterstützen und zu inspirieren.',
    'Finde Gleichgesinnte, die deine Werte teilen und dich auf deinem spirituellen Weg begleiten.'
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const primaryButtonTexts = [
    'Jetzt beitreten',
    'Mehr erfahren',
    'Kontakt aufnehmen',
    'Tempel besuchen',
    'Newsletter abonnieren'
  ];
  
  const primaryButtonText = primaryButtonTexts[Math.floor(Math.random() * primaryButtonTexts.length)];
  
  const primaryButtonLinks = [
    '/kontakt',
    '/ueber-uns',
    '/tempel',
    '/newsletter',
    '/veranstaltungen'
  ];
  
  const primaryButtonLink = primaryButtonLinks[Math.floor(Math.random() * primaryButtonLinks.length)];
  
  const primaryButton = {
    text: primaryButtonText,
    link: primaryButtonLink
  };
  
  const secondaryButton = Math.random() > 0.5 ? {
    text: 'Mehr erfahren',
    link: '/ueber-uns'
  } : undefined;
  
  const backgroundType = Math.random() > 0.5 ? 'color' : 'image';
  
  const backgroundColors = ['primary', 'secondary', 'light', 'dark'];
  
  // Für Hintergrundbilder ein Bild hochladen
  let backgroundImage;
  if (backgroundType === 'image') {
    const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
    backgroundImage = await uploadImage(imagePath);
  }
  
  const background = {
    type: backgroundType,
    color: backgroundType === 'color' ? backgroundColors[Math.floor(Math.random() * backgroundColors.length)] : undefined,
    image: backgroundImage
  };
  
  const ctaSection = {
    _type: 'ctaSection',
    title,
    description,
    primaryButton,
    secondaryButton,
    background
  };
  
  // In Sanity speichern
  const result = await client.create(ctaSection);
  console.log(`CTA-Sektion erstellt mit ID: ${result._id}`);
  
  return result._id;
}

// Funktion zur Generierung einer Demo-Seite
async function generatePage(index) {
  const pageTitles = [
    'Über uns',
    'Unsere Philosophie',
    'Tempel & Zentren',
    'Veranstaltungen',
    'Bhakti Yoga',
    'Bücher & Medien',
    'Vegetarische Küche',
    'Kontakt'
  ];
  
  const title = pageTitles[index % pageTitles.length];
  const slug = generateSlug(title);
  
  const descriptions = [
    'Erfahre mehr über die Internationale Gesellschaft für Krishna-Bewusstsein und unsere Mission.',
    'Entdecke die tiefgründige Philosophie des Krishna-Bewusstseins und ihre praktische Anwendung im Alltag.',
    'Finde ISKCON-Tempel und -Zentren in deiner Nähe und erfahre mehr über ihre Angebote und Programme.',
    'Informiere dich über kommende Veranstaltungen, Festivals und Retreats in der ISKCON-Gemeinschaft.',
    'Lerne mehr über Bhakti Yoga, den Pfad der liebenden Hingabe, und wie du ihn in deinem Leben praktizieren kannst.',
    'Entdecke die Vielfalt an spiritueller Literatur, Musik und anderen Medien zum Krishna-Bewusstsein.',
    'Tauche ein in die Welt der sattvischen, vegetarischen Küche und lerne, wie du bewusst kochen und essen kannst.',
    'Nimm Kontakt mit uns auf und erfahre, wie du dich in unserer Gemeinschaft engagieren kannst.'
  ];
  
  const description = descriptions[index % descriptions.length];
  
  // Generiere 3-5 zufällige Sektionen für die Seite
  const sectionCount = Math.floor(Math.random() * 3) + 3;
  const sectionRefs = [];
  
  // Stelle sicher, dass jede Seite eine Hero-Sektion hat
  const heroSectionId = await generateHeroSection();
  sectionRefs.push({
    _type: 'reference',
    _ref: heroSectionId
  });
  
  // Füge weitere zufällige Sektionen hinzu
  const sectionGenerators = [
    generateGridSection,
    generateMediaSection,
    generateQuoteSection,
    generateFaqSection
  ];
  
  for (let i = 1; i < sectionCount; i++) {
    const generatorIndex = Math.floor(Math.random() * sectionGenerators.length);
    const sectionId = await sectionGenerators[generatorIndex]();
    sectionRefs.push({
      _type: 'reference',
      _ref: sectionId
    });
  }
  
  // Stelle sicher, dass jede Seite mit einer CTA-Sektion endet
  const ctaSectionId = await generateCtaSection();
  sectionRefs.push({
    _type: 'reference',
    _ref: ctaSectionId
  });
  
  // Für einige Seiten ein SEO-Bild hochladen
  let seoImage;
  if (Math.random() > 0.5) {
    const imagePath = demoImagePaths[Math.floor(Math.random() * demoImagePaths.length)];
    seoImage = await uploadImage(imagePath);
  }
  
  const page = {
    _type: 'page',
    title,
    slug: {
      _type: 'slug',
      current: slug
    },
    description,
    seo: Math.random() > 0.5 ? {
      title: `${title} | ISKCON Deutschland`,
      description: description,
      image: seoImage
    } : undefined,
    sections: sectionRefs
  };
  
  // In Sanity speichern
  const result = await client.create(page);
  console.log(`Seite erstellt: ${title} (ID: ${result._id})`);
  
  return result._id;
}

// Hauptfunktion zum Generieren aller Demo-Inhalte
async function generateDemoContent() {
  console.log('Starte Generierung von Demo-Inhalten...');
  
  try {
    // Überprüfe, ob die statischen Bilder existieren
    if (!fs.existsSync(staticImagesDir)) {
      console.error(`Fehler: Das Verzeichnis ${staticImagesDir} existiert nicht.`);
      process.exit(1);
    }
    
    // Überprüfe, ob Bilder vorhanden sind
    const existingImages = demoImagePaths.filter(imagePath => fs.existsSync(imagePath));
    
    if (existingImages.length === 0) {
      console.error('Fehler: Keine Bilder gefunden. Bitte stelle sicher, dass die Bilder im static/img-Verzeichnis vorhanden sind.');
      process.exit(1);
    }
    
    console.log(`${existingImages.length} Bilder gefunden.`);
    
    // Generiere 8 Demo-Seiten
    for (let i = 0; i < 8; i++) {
      await generatePage(i);
    }
    
    console.log('Demo-Inhalte erfolgreich generiert!');
  } catch (error) {
    console.error('Fehler bei der Generierung von Demo-Inhalten:', error);
  }
}

// Führe die Hauptfunktion aus
generateDemoContent();