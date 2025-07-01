/**
 * Skript zur Generierung von Demo-Inhalten für ISKCON.DE Website
 * 
 * Dieses Skript erstellt Demo-Inhalte für Seiten und Sektionen,
 * die in Sanity importiert werden können.
 */

// Hilfsfunktion zur Generierung einer zufälligen ID
function generateId(prefix = '') {
  return `${prefix}${Math.random().toString(36).substring(2, 10)}`;
}

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

// Demo-Bilder (Platzhalter-URLs)
const demoImages = [
  {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-1234567890-1000x1000-jpg'
    }
  },
  {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-0987654321-1000x1000-jpg'
    }
  },
  {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-1122334455-1000x1000-jpg'
    }
  }
];

// Funktion zur Generierung eines zufälligen Bildes
function getRandomImage() {
  return demoImages[Math.floor(Math.random() * demoImages.length)];
}

// Funktion zur Generierung einer Hero-Sektion
function generateHeroSection() {
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

  return {
    _id: generateId('hero'),
    _type: 'heroSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    subtitle,
    image: getRandomImage(),
    layout,
    ctaText,
    ctaLink
  };
}

// Funktion zur Generierung einer Grid-Sektion
function generateGridSection() {
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
    
    items.push({
      title: itemTitles[i % itemTitles.length],
      description: itemDescriptions[i % itemDescriptions.length],
      image: Math.random() > 0.3 ? getRandomImage() : undefined,
      link: Math.random() > 0.5 ? `/${generateSlug(itemTitles[i % itemTitles.length])}` : undefined
    });
  }
  
  return {
    _id: generateId('grid'),
    _type: 'gridSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    description,
    items,
    columns
  };
}

// Funktion zur Generierung einer Media-Sektion
function generateMediaSection() {
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
  
  return {
    _id: generateId('media'),
    _type: 'mediaSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    description,
    mediaType,
    image: mediaType === 'image' ? getRandomImage() : undefined,
    videoUrl: mediaType === 'video' ? videoUrls[Math.floor(Math.random() * videoUrls.length)] : undefined,
    aspectRatio
  };
}

// Funktion zur Generierung einer Quote-Sektion
function generateQuoteSection() {
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
  
  const backgroundColor = Math.random() > 0.5 ? 'light' : 'dark';
  
  return {
    _id: generateId('quote'),
    _type: 'quoteSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    quote,
    author,
    role,
    avatar: Math.random() > 0.5 ? getRandomImage() : undefined,
    backgroundColor
  };
}

// Funktion zur Generierung einer FAQ-Sektion
function generateFaqSection() {
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
  
  return {
    _id: generateId('faq'),
    _type: 'faqSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    description,
    faqs: selectedFaqs,
    layout
  };
}

// Funktion zur Generierung einer CTA-Sektion
function generateCtaSection() {
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
  
  const background = {
    type: backgroundType,
    color: backgroundType === 'color' ? backgroundColors[Math.floor(Math.random() * backgroundColors.length)] : undefined,
    image: backgroundType === 'image' ? getRandomImage() : undefined
  };
  
  return {
    _id: generateId('cta'),
    _type: 'ctaSection',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    description,
    primaryButton,
    secondaryButton,
    background
  };
}

// Funktion zur Generierung einer Demo-Seite
function generatePage(index) {
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
  const sections = [];
  
  // Stelle sicher, dass jede Seite eine Hero-Sektion hat
  sections.push(generateHeroSection());
  
  // Füge weitere zufällige Sektionen hinzu
  const sectionGenerators = [
    generateGridSection,
    generateMediaSection,
    generateQuoteSection,
    generateFaqSection,
    generateCtaSection
  ];
  
  for (let i = 1; i < sectionCount; i++) {
    const generator = sectionGenerators[Math.floor(Math.random() * sectionGenerators.length)];
    sections.push(generator());
  }
  
  // Stelle sicher, dass jede Seite mit einer CTA-Sektion endet
  sections.push(generateCtaSection());
  
  return {
    _id: generateId('page'),
    _type: 'page',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    slug: {
      _type: 'slug',
      current: slug
    },
    description,
    seo: Math.random() > 0.5 ? {
      title: `${title} | ISKCON Deutschland`,
      description: description,
      image: Math.random() > 0.5 ? getRandomImage() : undefined
    } : undefined,
    sections: sections.map(section => ({
      _type: 'reference',
      _ref: section._id
    }))
  };
}

// Generiere 8 Demo-Seiten
const pages = [];
const sections = [];

for (let i = 0; i < 8; i++) {
  const page = generatePage(i);
  pages.push(page);
  
  // Extrahiere die Referenzen auf Sektionen
  const sectionRefs = page.sections.map(section => section._ref);
  
  // Generiere die entsprechenden Sektionen
  for (let j = 0; j < sectionRefs.length; j++) {
    const sectionId = sectionRefs[j];
    let section;
    
    if (sectionId.startsWith('hero')) {
      section = generateHeroSection();
    } else if (sectionId.startsWith('grid')) {
      section = generateGridSection();
    } else if (sectionId.startsWith('media')) {
      section = generateMediaSection();
    } else if (sectionId.startsWith('quote')) {
      section = generateQuoteSection();
    } else if (sectionId.startsWith('faq')) {
      section = generateFaqSection();
    } else if (sectionId.startsWith('cta')) {
      section = generateCtaSection();
    }
    
    if (section) {
      section._id = sectionId;
      sections.push(section);
    }
  }
}

// ===== BLOG-DEMO-CONTENT =====

// Funktion zur Generierung von Demo-Authors
function generateAuthor(index) {
  const authorNames = [
    'Radhanath Swami',
    'Sacinandana Swami',
    'Sivarama Swami'
  ];
  
  const authorBios = [
    'Radhanath Swami ist ein spiritueller Lehrer und Autor, der für seine inspirierenden Vorträge über Bhakti Yoga bekannt ist.',
    'Sacinandana Swami ist ein ISKCON Guru und Autor, der sich auf Meditation und spirituelle Praxis spezialisiert hat.',
    'Sivarama Swami ist ein langjähriger ISKCON Lehrer und Experte für vedische Philosophie und Landwirtschaft.'
  ];
  
  const name = authorNames[index];
  const slug = generateSlug(name);
  
  return {
    _id: generateId('author'),
    _type: 'author',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    name,
    slug: {
      _type: 'slug',
      current: slug
    },
    image: getRandomImage(),
    bio: authorBios[index]
  };
}

// Funktion zur Generierung von Blog-Categories
function generateBlogCategory(index) {
  const categoryNames = [
    'Spirituelle Praxis',
    'Vedische Philosophie',
    'Bhakti Yoga',
    'Tempelgemeinschaft',
    'Festivals & Events'
  ];
  
  const categoryDescriptions = [
    'Artikel über tägliche spirituelle Praktiken und Meditation',
    'Tiefere Einblicke in die vedische Philosophie und Weisheit',
    'Anleitungen und Inspiration für den Pfad der liebenden Hingabe',
    'Leben und Gemeinschaft in ISKCON Tempeln',
    'Berichte über Festivals, Veranstaltungen und Feiern'
  ];
  
  const name = categoryNames[index];
  const slug = generateSlug(name);
  
  return {
    _id: generateId('category'),
    _type: 'category',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: name,
    slug: {
      _type: 'slug',
      current: slug
    },
    description: categoryDescriptions[index]
  };
}

// Funktion zur Generierung von Demo-Blog-Posts
function generateBlogPost(index, authors, categories) {
  const postTitles = [
    'Die Kraft des Mantras: Wie Chanten dein Leben transformiert',
    'Bhagavad Gita im Alltag: Spirituelle Weisheit für moderne Herausforderungen',
    'Vegetarische Küche als spirituelle Praxis',
    'Gemeinschaft und Seva: Dienst als Weg zur Selbstverwirklichung',
    'Janmashtami: Die Bedeutung von Krishnas Erscheinung'
  ];
  
  const postExcerpts = [
    'Entdecke die transformative Kraft des Hare Krishna Mantras und wie regelmäßiges Chanten Frieden und Klarheit in dein Leben bringt.',
    'Lerne, wie die zeitlosen Lehren der Bhagavad Gita praktische Lösungen für alltägliche Probleme und Entscheidungen bieten.',
    'Erfahre, wie bewusstes Kochen und Essen zu einer spirituellen Praxis werden kann, die Körper und Seele nährt.',
    'Verstehe die Bedeutung von selbstlosem Dienst (Seva) in der spirituellen Entwicklung und wie Gemeinschaft dabei hilft.',
    'Tauche ein in die tiefe Bedeutung von Krishnas Erscheinung und was wir von diesem heiligen Festival lernen können.'
  ];
  
  const postContents = [
    'Das Hare Krishna Mantra ist ein kraftvolles spirituelles Werkzeug, das seit Jahrhunderten von Praktizierenden verwendet wird. In diesem Artikel erforschen wir die Wissenschaft und Spiritualität hinter dieser uralten Praxis.',
    'Die Bhagavad Gita, gesprochen von Krishna zu Arjuna auf dem Schlachtfeld von Kurukshetra, enthält zeitlose Weisheit für jeden, der nach Sinn und Richtung im Leben sucht.',
    'Wenn wir Essen als Opfergabe an das Göttliche betrachten, verwandelt sich jede Mahlzeit in einen Akt der Hingabe und des Bewusstseins.',
    'Seva oder selbstloser Dienst ist ein fundamentaler Aspekt des Bhakti Yoga. Durch das Dienen anderer reinigen wir unser Herz und entwickeln Demut.',
    'Janmashtami feiert die Erscheinung von Krishna, der als Avatar gekommen ist, um Dharma wiederherzustellen und seinen Anhängern den Weg der Liebe zu zeigen.'
  ];
  
  const title = postTitles[index % postTitles.length];
  const slug = generateSlug(title);
  const excerpt = postExcerpts[index % postExcerpts.length];
  const content = postContents[index % postContents.length];
  
  // Wähle zufälligen Author und Category
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
  const randomCategories = categories.slice(0, Math.floor(Math.random() * 2) + 1); // 1-2 Kategorien
  
  // Generiere Tags
  const allTags = ['meditation', 'bhakti', 'krishna', 'mantra', 'spiritualität', 'vegetarisch', 'gemeinschaft', 'seva', 'gita', 'festival'];
  const selectedTags = allTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2); // 2-5 Tags
  
  // Generiere Veröffentlichungsdatum (letzte 6 Monate)
  const publishDate = new Date();
  publishDate.setMonth(publishDate.getMonth() - Math.floor(Math.random() * 6));
  
  return {
    _id: generateId('post'),
    _type: 'post',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title,
    slug: {
      _type: 'slug',
      current: slug
    },
    author: {
      _type: 'reference',
      _ref: randomAuthor._id
    },
    publishedAt: publishDate.toISOString(),
    excerpt,
    body: [
      {
        _type: 'block',
        _key: generateId('block'),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateId('span'),
            text: content,
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    categories: randomCategories.map(cat => ({
      _type: 'reference',
      _ref: cat._id
    })),
    tags: selectedTags,
    mainImage: getRandomImage(),
    featured: Math.random() > 0.7, // 30% Chance auf Featured
    readingTime: Math.floor(Math.random() * 8) + 3 // 3-10 Minuten
  };
}

// Generiere Blog-Demo-Content
const authors = [];
const blogCategories = [];
const blogPosts = [];

// Generiere 3 Authors
for (let i = 0; i < 3; i++) {
  authors.push(generateAuthor(i));
}

// Generiere 5 Blog-Categories
for (let i = 0; i < 5; i++) {
  blogCategories.push(generateBlogCategory(i));
}

// Generiere 5 Blog-Posts
for (let i = 0; i < 5; i++) {
  blogPosts.push(generateBlogPost(i, authors, blogCategories));
}

// Kombiniere alle Dokumente (inklusive Blog-Content)
const documents = [...pages, ...sections, ...authors, ...blogCategories, ...blogPosts];

// Ausgabe als JSON
console.log(JSON.stringify(documents, null, 2));

// Anleitung zur Verwendung
console.log(`
// ===== ANLEITUNG =====
// 
// 1. Speichere die Ausgabe in einer Datei, z.B. demo-content.json
// 2. Importiere die Datei in Sanity mit dem Sanity CLI:
//    sanity dataset import demo-content.json production
// 
// Alternativ kannst du die Daten auch über das Sanity Studio importieren:
// 1. Gehe zu https://www.sanity.io/manage
// 2. Wähle dein Projekt aus
// 3. Gehe zu "Datasets"
// 4. Wähle dein Dataset aus
// 5. Klicke auf "Import"
// 6. Wähle die demo-content.json Datei aus
// 
// ===== HINWEIS =====
// 
// Die Bild-Referenzen in diesem Demo-Content sind Platzhalter.
// Du musst echte Bild-Assets in Sanity hochladen und die Referenzen aktualisieren.
`);