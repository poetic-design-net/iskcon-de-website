import welcomeMessage from '../schemas/welcomeMessage'
import post from '../schemas/post'
import author from '../schemas/author'
import category from '../schemas/category'
import page from '../schemas/page'
import heroSection from '../schemas/heroSection'
import gridSection from '../schemas/gridSection'
import mediaSection from '../schemas/mediaSection'
import quoteSection from '../schemas/quoteSection'
import faqSection from '../schemas/faqSection'
import ctaSection from '../schemas/ctaSection'
// Neue ISKCON Schemas
import temple from '../schemas/temple'
import event from '../schemas/event'
import eventCategory from '../schemas/eventCategory'
import literature from '../schemas/literature'
import multimedia from '../schemas/multimedia'
import newsletter from '../schemas/newsletter'
import donation from '../schemas/donation'
// Homepage Schemas
import homepageTeaser from '../schemas/homepageTeaser'
// Movement/Bewegung Schemas
import bewegungPage, { timelineItem, principle, statItem } from '../schemas/bewegung'

export const schemaTypes = [
  welcomeMessage,
  post,
  author,
  category,
  page,
  heroSection,
  gridSection,
  mediaSection,
  quoteSection,
  faqSection,
  ctaSection,
  // Neue ISKCON Schemas
  temple,
  event,
  eventCategory,
  literature,
  multimedia,
  newsletter,
  donation,
  // Homepage Schemas
  homepageTeaser,
  // Movement/Bewegung Schemas
  bewegungPage,
  timelineItem,
  principle,
  statItem
]
