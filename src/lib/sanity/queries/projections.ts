// Gemeinsame Projektionen für Sanity-Queries
// Diese definieren welche Felder aus Sanity geholt werden

// Basis Image Projektion
export const IMAGE_PROJECTION = `{
  'asset': {
    'url': asset->url,
    'altText': asset->altText
  },
  'hotspot': hotspot
}`;

// SEO Projektion
export const SEO_PROJECTION = `{
  title,
  description,
  'image': image ${IMAGE_PROJECTION}
}`;

// Post Projektion für konsistente Datenstruktur
export const POST_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  'excerpt': description,
  publishedAt,
  isFeatured,
  'featuredImage': mainImage ${IMAGE_PROJECTION},
  'categories': categories[]-> {
    title,
    'slug': slug.current
  },
  'tags': tags[],
  'content': body
}`;

// Page Projektion für konsistente Datenstruktur
export const PAGE_PROJECTION = `{
  title,
  'slug': slug.current,
  description,
  seo ${SEO_PROJECTION},
  'sections': sections[]-> {
    _type,
    _id,
    title,
    subtitle,
    description,
    
    // Gemeinsame Felder für alle Section-Typen
    'image': image ${IMAGE_PROJECTION},
    
    // Hero-Sektion spezifische Felder
    layout,
    ctaText,
    ctaLink,
    
    // Media-Sektion spezifische Felder
    'media': media ${IMAGE_PROJECTION},
    videoUrl,
    aspectRatio,
    
    // Quote-Sektion spezifische Felder
    quote,
    author,
    role,
    
    // FAQ-Sektion spezifische Felder
    'faqs': faqs[] {
      question,
      answer,
      category
    },
    
    // Grid-Sektion spezifische Felder
    columns,
    'items': items[] {
      title,
      description,
      'image': image ${IMAGE_PROJECTION},
      link
    },
    
    // CTA-Sektion spezifische Felder
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    },
    background {
      type,
      color,
      'image': image ${IMAGE_PROJECTION}
    }
  }
}`;

// Event Projektion für konsistente Datenstruktur
export const EVENT_PROJECTION = `{
  title,
  'slug': slug.current,
  description,
  longDescription,
  'featuredImage': featuredImage ${IMAGE_PROJECTION},
  eventType,
  'eventCategory': eventCategory-> {
    title,
    'slug': slug.current,
    description,
    icon,
    color
  },
  startDate,
  endDate,
  isRecurring,
  recurrencePattern {
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    endRecurrence,
    occurrenceCount,
    recurrenceEndDate
  },
  location {
    type,
    'temple': temple-> {
      name,
      'slug': slug.current,
      address {
        street,
        city,
        postalCode,
        state,
        country
      },
      location {
        lat,
        lng
      }
    },
    onlineLink,
    externalVenue {
      name,
      address,
      coordinates {
        lat,
        lng
      }
    }
  },
  organizer {
    name,
    email,
    phone,
    bio,
    'image': image ${IMAGE_PROJECTION}
  },
  registration {
    required,
    deadline,
    maxParticipants,
    registrationLink,
    cost {
      amount,
      currency,
      description
    }
  },
  tags,
  isFeatured,
  isPublished,
  seo ${SEO_PROJECTION}
}`;

// Event Kalendar Projektion (optimiert für Kalender-Ansicht)
export const EVENT_CALENDAR_PROJECTION = `{
  title,
  'slug': slug.current,
  description,
  'featuredImage': featuredImage ${IMAGE_PROJECTION},
  eventType,
  'eventCategory': eventCategory-> {
    title,
    'slug': slug.current,
    description,
    icon,
    color
  },
  startDate,
  endDate,
  isRecurring,
  recurrencePattern {
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    endRecurrence,
    occurrenceCount,
    recurrenceEndDate
  },
  location {
    type,
    'temple': temple-> {
      name,
      'slug': slug.current
    },
    externalVenue {
      name
    }
  },
  isFeatured
}`;

// Featured Events Projektion (optimiert für Homepage)
export const EVENT_FEATURED_PROJECTION = `{
  title,
  'slug': slug.current,
  description,
  'featuredImage': featuredImage ${IMAGE_PROJECTION},
  eventType,
  'eventCategory': eventCategory-> {
    title,
    'slug': slug.current,
    description,
    icon,
    color
  },
  startDate,
  endDate,
  location {
    type,
    'temple': temple-> {
      name,
      'slug': slug.current
    },
    externalVenue {
      name
    }
  },
  tags
}`;

// Temple Projektion für GermanyMap-Integration
export const TEMPLE_PROJECTION = `{
  _id,
  name,
  'slug': slug.current,
  description,
  'mainImage': mainImage ${IMAGE_PROJECTION},
  address {
    street,
    city,
    postalCode,
    state,
    country
  },
  location {
    lat,
    lng
  },
  contact {
    phone,
    email,
    website
  },
  serviceHours[] {
    day,
    openTime,
    closeTime,
    isClosed
  },
  programs[] {
    title,
    description,
    time,
    frequency
  },
  facilities,
  president {
    name,
    'image': image ${IMAGE_PROJECTION},
    bio
  },
  isActive,
  featuredOnHomepage,
  seo ${SEO_PROJECTION}
}`;

// Temple Karten-Projektion (optimiert für Karten-Performance)
export const TEMPLE_MAP_PROJECTION = `{
  _id,
  name,
  'slug': slug.current,
  location {
    lat,
    lng
  },
  address {
    city,
    state
  },
  isActive,
  featuredOnHomepage
}`;

// Temple Übersichts-Projektion (für Listen und Grids)
export const TEMPLE_OVERVIEW_PROJECTION = `{
  _id,
  name,
  'slug': slug.current,
  description,
  'mainImage': mainImage ${IMAGE_PROJECTION},
  address {
    street,
    city,
    postalCode,
    state
  },
  contact {
    phone,
    email,
    website
  },
  facilities,
  isActive,
  featuredOnHomepage
}`;

// Homepage Teaser Projektion
export const HOMEPAGE_TEASER_PROJECTION = `{
  _id,
  _type,
  theme,
  headline,
  teaser,
  highlight,
  badge,
  image ${IMAGE_PROJECTION},
  ctaText,
  'ctaLink': ctaLink->slug.current,
  layout,
  displayMode,
  order
}`;

// Navigation Projektion
export const NAVIGATION_PROJECTION = `{
  title,
  categories[] {
    title,
    'slug': slug.current,
    icon,
    sections[] {
      title,
      items[] {
        title,
        'slug': slug.current,
        description,
        icon
      }
    },
    featured {
      title,
      description,
      'image': image.asset->url,
      href
    }
  }
}`;

// Erweiterte Post-Projektionen für Blog-Detail-Enhancement

// Autor Detail Projektion für erweiterte Autor-Informationen
export const AUTHOR_DETAIL_PROJECTION = `{
  _id,
  name,
  'slug': slug.current,
  bio,
  'image': image ${IMAGE_PROJECTION},
  socialLinks[] {
    platform,
    url
  }
}`;

// Kompakte Post Projektion für Sidebar (minimal, performance-optimiert)
export const POST_COMPACT_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  publishedAt,
  'featuredImage': mainImage ${IMAGE_PROJECTION},
  'readingTime': round(length(pt::text(body)) / 5 / 180),
  'categories': categories[]-> {
    title,
    'slug': slug.current
  }
}`;

// Related Posts Projektion (optimiert für ähnliche Posts)
export const POST_RELATED_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  'excerpt': description,
  publishedAt,
  'featuredImage': mainImage ${IMAGE_PROJECTION},
  'readingTime': round(length(pt::text(body)) / 5 / 180),
  'categories': categories[]-> {
    title,
    'slug': slug.current
  },
  'tags': tags[],
  'author': author-> {
    name,
    'slug': slug.current
  }
}`;

// Navigation Post Projektion (für Previous/Next)
export const POST_NAVIGATION_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  'excerpt': description,
  'featuredImage': mainImage ${IMAGE_PROJECTION}
}`;

// Post Detail Projektion mit erweiterten Autor-Details
export const POST_DETAIL_WITH_AUTHOR_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  'excerpt': description,
  publishedAt,
  isFeatured,
  'featuredImage': mainImage ${IMAGE_PROJECTION},
  'categories': categories[]-> {
    title,
    'slug': slug.current
  },
  'tags': tags[],
  'content': body,
  'author': author-> ${AUTHOR_DETAIL_PROJECTION}
}`;

// Literature Projektionen für religiöse Texte und Bücher

// Sanskrit-Begriff Projektion
export const SANSKRIT_TERM_PROJECTION = `{
  _id,
  sanskrit,
  transliteration,
  translation,
  definition,
  etymology,
  'pronunciation': pronunciation,
  'category': category,
  relatedTerms[]-> {
    sanskrit,
    transliteration,
    translation
  }
}`;

// Literature Autor Projektion
export const LITERATURE_AUTHOR_PROJECTION = `{
  _id,
  name,
  'slug': slug.current,
  bio,
  'image': image ${IMAGE_PROJECTION},
  birthDate,
  deathDate,
  tradition,
  titles[],
  majorWorks[]-> {
    title,
    'slug': slug.current
  }
}`;

// Literature Basis Projektion (für Übersichten und Listen)
export const LITERATURE_BASE_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  subtitle,
  description,
  'coverImage': coverImage ${IMAGE_PROJECTION},
  bookType,
  difficulty,
  'author': author-> ${LITERATURE_AUTHOR_PROJECTION},
  'translator': translator-> ${LITERATURE_AUTHOR_PROJECTION},
  publishedAt,
  'estimatedReadingTime': estimatedReadingTime,
  'chapterCount': count(chapters),
  'verseCount': count(chapters[]->verses),
  'availability': availability {
    isAvailable,
    formats,
    price {
      amount,
      currency
    },
    purchaseLinks[] {
      vendor,
      url,
      format
    },
    freeDownloadLink
  },
  'languages': languages[],
  'tags': tags[],
  isFeatured,
  'featuredImage': featuredImage ${IMAGE_PROJECTION}
}`;

// Literature Detail Projektion (für Buch-Detail-Seiten)
export const LITERATURE_DETAIL_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  subtitle,
  description,
  'coverImage': coverImage ${IMAGE_PROJECTION},
  bookType,
  difficulty,
  'author': author-> ${LITERATURE_AUTHOR_PROJECTION},
  'translator': translator-> ${LITERATURE_AUTHOR_PROJECTION},
  publishedAt,
  'estimatedReadingTime': estimatedReadingTime,
  'content': content,
  'chapters': chapters[]-> {
    _id,
    title,
    'slug': slug.current,
    chapterNumber,
    description,
    'verseCount': count(verses),
    'estimatedReadingTime': estimatedReadingTime
  },
  'availability': availability {
    isAvailable,
    formats,
    price {
      amount,
      currency
    },
    purchaseLinks[] {
      vendor,
      url,
      format
    },
    freeDownloadLink
  },
  'publishingInfo': publishingInfo {
    publisher,
    publishedYear,
    edition,
    language,
    pages
  },
  isbn,
  'languages': languages[],
  'tags': tags[],
  'sanskritTerms': sanskritTerms[]-> ${SANSKRIT_TERM_PROJECTION},
  'relatedBooks': relatedBooks[]-> ${LITERATURE_BASE_PROJECTION},
  isFeatured,
  'featuredImage': featuredImage ${IMAGE_PROJECTION},
  seo ${SEO_PROJECTION}
}`;

// Literature Kapitel Projektion
export const LITERATURE_CHAPTER_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  chapterNumber,
  description,
  'content': content,
  'book': book-> {
    _id,
    title,
    'slug': slug.current,
    bookType,
    'author': author-> {
      name,
      'slug': slug.current
    }
  },
  'verses': verses[]-> {
    _id,
    verseNumber,
    'slug': slug.current,
    'sanskrit': sanskrit,
    'transliteration': transliteration,
    'translation': translation,
    'purport': purport
  },
  'estimatedReadingTime': estimatedReadingTime,
  'sanskritTerms': sanskritTerms[]-> ${SANSKRIT_TERM_PROJECTION},
  'previousChapter': previousChapter-> {
    _id,
    title,
    'slug': slug.current,
    chapterNumber
  },
  'nextChapter': nextChapter-> {
    _id,
    title,
    'slug': slug.current,
    chapterNumber
  },
  seo ${SEO_PROJECTION}
}`;

// Literature Vers Projektion
export const LITERATURE_VERSE_PROJECTION = `{
  _id,
  verseNumber,
  'slug': slug.current,
  'sanskrit': sanskrit,
  'transliteration': transliteration,
  'translation': translation,
  'purport': purport,
  'wordForWord': wordForWord[] {
    sanskrit,
    transliteration,
    meaning
  },
  'chapter': chapter-> {
    _id,
    title,
    'slug': slug.current,
    chapterNumber,
    'book': book-> {
      _id,
      title,
      'slug': slug.current,
      bookType
    }
  },
  'sanskritTerms': sanskritTerms[]-> ${SANSKRIT_TERM_PROJECTION},
  'previousVerse': previousVerse-> {
    _id,
    verseNumber,
    'slug': slug.current
  },
  'nextVerse': nextVerse-> {
    _id,
    verseNumber,
    'slug': slug.current
  },
  'audio': audio {
    'asset': asset->url,
    duration
  },
  seo ${SEO_PROJECTION}
}`;

// Literature Featured Projektion (für Homepage und Featured-Listen)
export const LITERATURE_FEATURED_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  description,
  subtitle,
  'coverImage': coverImage ${IMAGE_PROJECTION},
  bookType,
  difficulty,
  'author': author-> {
    name,
    'slug': slug.current
  },
  'chapterCount': count(chapters),
  'estimatedReadingTime': estimatedReadingTime,
  'availability': availability {
    physical,
    digital,
    audio
  },
  isFeatured
}`;

// Literature Compact Projektion (für Sidebar und kleine Listen)
export const LITERATURE_COMPACT_PROJECTION = `{
  _id,
  title,
  'slug': slug.current,
  'coverImage': coverImage ${IMAGE_PROJECTION},
  bookType,
  'author': author-> {
    name,
    'slug': slug.current
  },
  'chapterCount': count(chapters),
  difficulty
}`;