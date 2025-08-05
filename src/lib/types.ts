export type SanityCategory = {
  title: string;
  slug: string;
};

type SanityBlock = {
  _type: string;
  children: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  style?: string;
};

// Basis-Type für alle Sanity Dokumente
export type SanityDocument = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
};

export type SanityPost = {
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description: string;
  publishedAt: string;
  isFeatured?: boolean;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  featuredImage?: {
    asset: {
      url: string;
    };
  };
  categories: SanityCategory[];
  tags: string[];
  body?: SanityBlock[];
  content?: SanityBlock[];
  excerpt?: string;
};

// Type für projizierte Posts (entspricht POST_PROJECTION Query)
export type SanityPostProjected = {
  _id: string;
  title: string;
  slug: string; // Vereinfachter slug ohne _type structure
  excerpt?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  // Zusätzliche Properties für Server-Kompatibilität
  mainImage?: {
    asset?: {
      url: string;
      altText?: string | null;
    } | null;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    } | null | undefined;
  } | null;
  featuredImage?: {
    asset?: {
      url: string;
      altText?: string | null;
    } | null;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    } | null | undefined;
  } | null;
  body?: SanityBlock[];
  categories?: SanityCategory[];
  tags?: string[];
  content?: SanityBlock[];
  // Für Kompatibilität mit FeaturedBlogCard
  description?: string;
  author?: {
    name: string;
    image?: {
      asset?: {
        url: string;
        altText?: string | null;
      } | null;
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      } | null | undefined;
    } | null;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: {
      asset?: {
        url: string;
        altText?: string | null;
      } | null;
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      } | null | undefined;
    } | null;
  };
};

export type SanityImage = {
  asset: {
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  } | undefined;
};

// Homepage Types
export type SanityHomepageTeaser = SanityDocument & {
  _type: 'homepageTeaser';
  theme: 'hare-krishna' | 'bhakti-yoga' | 'mantra-meditation' | 'tempel-besuchen';
  headline: string;
  teaser: string;
  highlight?: string;
  image: SanityImage;
  badge?: string;
  ctaText?: string;
  ctaLink?: string; // Wird in der Query als ctaLink->slug.current aufgelöst
  layout: 'imageLeft' | 'imageRight' | 'imageFull';
  displayMode?: 'slider' | 'single';
  order?: number;
};


export type SanityPageSEO = {
  title?: string;
  description?: string;
  image?: SanityImage;
};


// Navigation Types
export type NavigationItem = {
  title: string;
  slug: string;
  description?: string;
  subtitle?: string;
  icon?: string;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

export type MegaMenuCategory = {
  title: string;
  slug: string;
  icon: string;
  subtitle?: string;
  sections?: NavigationSection[];
  featured?: {
    title: string;
    description: string;
    image?: string;
    href: string;
  };
  isActive?: boolean;
};

export type SanityNavigation = SanityDocument & {
  _type: 'navigation';
  title: string;
  categories: Array<{
    title: string;
    slug: string;
    icon: string;
    sections?: Array<{
      title: string;
      items: Array<{
        title: string;
        slug: string;
        description?: string;
        icon?: string;
      }>;
    }>;
    featured?: {
      title: string;
      description: string;
      image?: SanityImage;
      href: string;
    };
  }>;
};


export type SanityPage = SanityDocument & {
  title: string;
  slug: string;
  description?: string;
  seo?: SanityPageSEO;
  content?: SanityBlock[];
};

// Neue ISKCON Types
export type SanityTemple = SanityDocument & {
  _type: 'temple';
  name: string;
  slug: string;
  description?: string;
  mainImage: SanityImage;
  gallery?: SanityImage[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    state?: string;
    country?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  serviceHours?: Array<{
    day: string;
    openTime?: string;
    closeTime?: string;
    isClosed?: boolean;
  }>;
  programs?: Array<{
    title?: string;
    description?: string;
    time?: string;
    frequency?: string;
  }>;
  facilities?: string[];
  president?: {
    name?: string;
    image?: SanityImage;
    bio?: string;
  };
  isActive?: boolean;
  featuredOnHomepage?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type SanityEvent = SanityDocument & {
  _type: 'event';
  title: string;
  slug: string;
  description?: string;
  longDescription?: SanityBlock[];
  featuredImage: SanityImage;
  eventType?: string; // Legacy field
  eventCategory?: {
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  };
  startDate: string;
  endDate?: string;
  isRecurring?: boolean;
  recurrencePattern?: {
    frequency: string;
    interval?: number;
    daysOfWeek?: string[];
    dayOfMonth?: number;
    endRecurrence?: string;
    occurrenceCount?: number;
    recurrenceEndDate?: string;
  };
  location: {
    type: string;
    temple?: SanityTemple;
    onlineLink?: string;
    externalVenue?: {
      name?: string;
      address?: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  };
  organizer?: {
    name?: string;
    email?: string;
    phone?: string;
    bio?: string;
    image?: SanityImage;
  };
  registration?: {
    required?: boolean;
    deadline?: string;
    maxParticipants?: number;
    registrationLink?: string;
    cost?: {
      amount?: number;
      currency?: string;
      description?: string;
    };
  };
  tags?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type SanityLiterature = SanityDocument & {
  _type: 'literature';
  title: string;
  slug: string;
  subtitle?: string;
  author: {
    name: string;
    originalName?: string;
    bio?: string;
    image?: SanityImage;
  };
  translator?: {
    name?: string;
    bio?: string;
  };
  bookType: string;
  description?: string;
  coverImage: SanityImage;
  additionalImages?: SanityImage[];
  isbn?: string;
  publishingInfo?: {
    publisher?: string;
    publishedYear?: number;
    edition?: string;
    language?: string;
    pages?: number;
  };
  content?: {
    chapters?: Array<{
      title?: string;
      sanskritTitle?: string;
      summary?: string;
      verses?: Array<{
        number?: string;
        sanskrit?: string;
        translation?: string;
        purport?: SanityBlock[];
      }>;
    }>;
    introduction?: SanityBlock[];
    conclusion?: SanityBlock[];
  };
  sanskritTerms?: Array<{
    term: string;
    pronunciation?: string;
    definition: string;
    etymology?: string;
    usage?: string;
    relatedTerms?: string[];
  }>;
  availability?: {
    isAvailable?: boolean;
    formats?: string[];
    price?: {
      amount?: number;
      currency?: string;
    };
    purchaseLinks?: Array<{
      vendor?: string;
      url?: string;
      format?: string;
    }>;
    freeDownloadLink?: string;
  };
  difficulty?: string;
  recommendedFor?: string[];
  relatedBooks?: SanityLiterature[];
  isFeatured?: boolean;
  isPublished?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type SanityMultimedia = SanityDocument & {
  _type: 'multimedia';
  title: string;
  slug: string;
  description?: string;
  mediaType: string;
  contentType: string;
  thumbnail: SanityImage;
  media: {
    primarySource: {
      sourceType: string;
      file?: any;
      url?: string;
      embedId?: string;
    };
    alternativeSources?: Array<{
      sourceType: string;
      file?: any;
      url?: string;
      embedId?: string;
      quality?: string;
    }>;
  };
  duration?: {
    minutes?: number;
    seconds?: number;
  };
  speaker?: {
    name?: string;
    spiritualName?: string;
    title?: string;
    bio?: string;
    image?: SanityImage;
  };
  recordingInfo?: {
    recordedAt?: string;
    location?: {
      type: string;
      temple?: SanityTemple;
      event?: SanityEvent;
      customLocation?: string;
    };
    occasion?: string;
  };
  transcription?: {
    hasTranscription?: boolean;
    language?: string;
    content?: SanityBlock[];
    timestampedSegments?: Array<{
      timestamp?: string;
      text?: string;
      sanskritTerms?: string[];
    }>;
  };
  musicInfo?: {
    mantras?: Array<{
      mantra?: string;
      translation?: string;
      timestamp?: string;
    }>;
    instruments?: string[];
    tempo?: string;
    style?: string;
  };
  relatedContent?: {
    literature?: SanityLiterature[];
    events?: SanityEvent[];
    relatedMultimedia?: SanityMultimedia[];
  };
  tags?: string[];
  isPublic?: boolean;
  isFeatured?: boolean;
  downloadable?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type SanityNewsletter = SanityDocument & {
  _type: 'newsletter';
  title: string;
  slug: string;
  description?: string;
  newsletterType: string;
  frequency: string;
  isActive?: boolean;
  gdprCompliance: {
    purposeStatement: string;
    dataRetentionPeriod: string;
    legalBasis: string;
    consentText: string;
    privacyPolicyLink: string;
  };
  subscriptionSettings?: {
    requireDoubleOptIn?: boolean;
    confirmationEmailSubject?: string;
    confirmationEmailTemplate?: SanityBlock[];
    welcomeEmailSubject?: string;
    welcomeEmailTemplate?: SanityBlock[];
    unsubscribeText?: string;
  };
  contentSettings?: {
    defaultSender: {
      name: string;
      email: string;
      replyTo?: string;
    };
    emailTemplate?: {
      headerImage?: SanityImage;
      footerContent?: SanityBlock[];
      socialMediaLinks?: Array<{
        platform?: string;
        url?: string;
      }>;
    };
    categories?: string[];
  };
  automationSettings?: {
    autoIncludeNewEvents?: boolean;
    autoIncludeNewLiterature?: boolean;
    autoIncludeNewMultimedia?: boolean;
    eventFilter?: {
      eventTypes?: string[];
      featuredOnly?: boolean;
    };
  };
  targetAudience?: {
    language?: string;
    audienceLevel?: string;
    geoTargeting?: string[];
  };
  analytics?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    googleAnalyticsTracking?: {
      source?: string;
      medium?: string;
      campaign?: string;
    };
  };
  integrations?: {
    emailProvider?: string;
    apiSettings?: {
      listId?: string;
      webhookUrl?: string;
    };
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export type SanityDonation = SanityDocument & {
  _type: 'donation';
  title: string;
  slug: string;
  description?: string;
  longDescription?: SanityBlock[];
  featuredImage: SanityImage;
  gallery?: SanityImage[];
  donationType: string;
  category: string;
  fundingGoal?: {
    hasGoal?: boolean;
    targetAmount?: number;
    currency?: string;
    deadline?: string;
    currentAmount?: number;
  };
  suggestedAmounts?: Array<{
    amount?: number;
    description?: string;
    impact?: string;
  }>;
  paymentSettings: {
    enabledProviders: string[];
    minimumAmount?: number;
    maximumAmount?: number;
    allowCustomAmount?: boolean;
    recurringOptions?: string[];
    processingFees?: {
      passFeesToDonor?: boolean;
      feeStructure?: Array<{
        provider?: string;
        fixedFee?: number;
        percentageFee?: number;
      }>;
    };
  };
  beneficiary: {
    organization: string;
    temple?: SanityTemple;
    project?: string;
    responsiblePerson?: {
      name?: string;
      role?: string;
      email?: string;
      image?: SanityImage;
    };
  };
  taxDeductibility?: {
    isDeductible?: boolean;
    taxExemptionNumber?: string;
    receiptSettings?: {
      autoSendReceipt?: boolean;
      receiptTemplate?: string;
      thresholdForReceipt?: number;
    };
  };
  donorCommunication: {
    thankYouMessage: string;
    thankYouEmail?: {
      sendEmail?: boolean;
      subject?: string;
      template?: SanityBlock[];
    };
    updateFrequency?: string;
    publicThankYou?: {
      allowPublicRecognition?: boolean;
      recognitionThreshold?: number;
    };
  };
  transparency?: {
    showProgress?: boolean;
    showDonorCount?: boolean;
    showRecentDonations?: boolean;
    progressUpdates?: Array<{
      date?: string;
      title?: string;
      description?: string;
      image?: SanityImage;
      amountUsed?: number;
    }>;
  };
  campaignSettings?: {
    startDate?: string;
    endDate?: string;
    urgencyLevel?: string;
    matchingFund?: {
      hasMatching?: boolean;
      matchingRatio?: string;
      matchingLimit?: number;
      sponsor?: string;
    };
  };
  isActive?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};
// Erweiterte Location-Types für GermanyMap-Integration
export interface Location {
  id: string;
  name: string;
  x: number; // SVG X-Koordinate
  y: number; // SVG Y-Koordinate
}

export interface TempleLocation extends Location {
  lat: number;      // Geografische Latitude
  lng: number;      // Geografische Longitude
  slug?: string;    // Für Verlinkung zu Temple-Detail-Seite
  isActive?: boolean;
  featuredOnHomepage?: boolean;
  address?: {
    city: string;
    state?: string;
  };
}

// Koordinaten-Interfaces für coordinates.ts
export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface SVGCoordinates {
  x: number;
  y: number;
}

// PortableText type specifically for the PortableText component
export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
};

// Literature Query Types für erweiterte Literature-Funktionalität

// Vereinfachte Literature-Types für Query-Projektionen
export type Literature = {
  _id: string;
  title: string;
  slug: string; // Vereinfacht durch Projektion
  subtitle?: string;
  description?: string;
  coverImage?: SanityImage;
  featuredImage?: SanityImage;
  bookType: LiteratureBookType | string;
  difficulty?: LiteratureDifficulty | string;
  author?: LiteratureAuthor;
  translator?: LiteratureAuthor;
  publishedAt?: string;
  estimatedReadingTime?: number;
  chapterCount?: number;
  verseCount?: number;
  chapters?: Chapter[];
  content?: SanityBlock[];
  availability?: {
    isAvailable?: boolean;
    formats?: string[];
    price?: {
      amount?: number;
      currency?: string;
    };
    purchaseLinks?: Array<{
      vendor?: string;
      url?: string;
      format?: string;
    }>;
    freeDownloadLink?: string;
  };
  publishingInfo?: {
    publisher?: string;
    publishedYear?: number;
    edition?: string;
    language?: string;
    pages?: number;
  };
  isbn?: string;
  languages?: string[];
  tags?: string[];
  sanskritTerms?: SanskritTerm[];
  relatedBooks?: Literature[];
  isFeatured?: boolean;
  featured?: boolean; // Alias für isFeatured für Backward-Kompatibilität
  seo?: SanityPageSEO;
};

export type Chapter = {
  _id: string;
  title: string;
  slug: string;
  chapterNumber: number;
  description?: string;
  content?: SanityBlock[];
  book?: {
    _id: string;
    title: string;
    slug: string;
    bookType: string;
    author?: {
      name: string;
      slug: string;
    };
  };
  verses?: Verse[];
  estimatedReadingTime?: number;
  sanskritTerms?: SanskritTerm[];
  previousChapter?: {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
  };
  nextChapter?: {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
  };
  seo?: SanityPageSEO;
};

export type Verse = {
  _id: string;
  verseNumber: number;
  slug: string;
  sanskrit?: string;
  transliteration?: string;
  translation?: string;
  purport?: SanityBlock[];
  wordForWord?: Array<{
    sanskrit: string;
    transliteration: string;
    meaning: string;
  }>;
  chapter?: {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
    book?: {
      _id: string;
      title: string;
      slug: string;
      bookType: string;
    };
  };
  sanskritTerms?: SanskritTerm[];
  previousVerse?: {
    _id: string;
    verseNumber: number;
    slug: string;
  };
  nextVerse?: {
    _id: string;
    verseNumber: number;
    slug: string;
  };
  audio?: {
    asset: string;
    duration?: number;
  };
  seo?: SanityPageSEO;
};

export type SanskritTerm = {
  _id: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  definition: string;
  etymology?: string;
  pronunciation?: string;
  category?: string;
  term?: string; // Alias für sanskrit
  meaning?: string; // Alias für definition
  relatedTerms?: Array<{
    sanskrit: string;
    transliteration: string;
    translation: string;
  }>;
};

export type LiteratureAuthor = {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: SanityImage;
  birthDate?: string;
  deathDate?: string;
  tradition?: string;
  titles?: string[];
  majorWorks?: Array<{
    title: string;
    slug: string;
  }>;
};
// Literature Union Types
export type LiteratureBookType = 
  | 'scripture' 
  | 'commentary' 
  | 'biography' 
  | 'philosophy' 
  | 'devotional' 
  | 'children' 
  | 'audiobook'
  | 'magazine';

export type LiteratureDifficulty = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced' 
  | 'scholar';


export type LiteratureAvailability = {
  isAvailable?: boolean;
  formats?: string[];
  price?: {
    amount?: number;
    currency?: string;
  };
  purchaseLinks?: Array<{
    vendor?: string;
    url?: string;
    format?: string;
  }>;
  freeDownloadLink?: string;
};

// Filter-Availability für UI-Filter (separate von der Datenstruktur)
export type LiteratureFilterAvailability = {
  physical: boolean;
  digital: boolean;
  audio: boolean;
};

// Filter-Types für Literature-Queries
export type LiteratureFilters = {
  bookType?: string;
  difficulty?: string;
  author?: string;
  availability?: Array<'physical' | 'digital' | 'audio'>;
  languages?: string[];
  tags?: string[];
  isFeatured?: boolean;
};

export type LiteratureQueryOptions = {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type LiteratureStats = {
  totalBooks: number;
  totalChapters: number;
  totalVerses: number;
  booksByType: Array<{
    type: string;
    count: number;
  }>;
  booksByDifficulty: Array<{
    difficulty: string;
    count: number;
  }>;
  featuredBooksCount: number;
  availableLanguages: string[];
};

// ThemeTeaser Slider Types
export type LayoutType = 'imageLeft' | 'imageRight' | 'imageFull';
export type RenderMode = 'slider' | 'list';

export interface LayoutGroup {
  layout: LayoutType;
  items: SanityHomepageTeaser[];
  renderMode: RenderMode;
  sliderConfig?: SliderConfig;
}

export interface SliderConfig {
  itemsPerView: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  spacing: number;
  navigation: boolean;
  pagination: boolean;
  autoplay: boolean;
  autoplayDelay?: number;
}

export interface ThemeTeaserSliderOptions {
  minSliderCount: number;
  enableGrouping: boolean;
  fallbackToList: boolean;
  groupSpacing: 'compact' | 'normal' | 'spacious';
}