import welcomeMessage from '../schemas/welcomeMessage'
import post from '../schemas/post'
import author from '../schemas/author'
import category from '../schemas/category'
import page from '../schemas/page'
import navigation from '../schemas/navigation'
// Neue ISKCON Schemas
import temple from '../schemas/temple'
import event from '../schemas/event'
import eventCategory from '../schemas/eventCategory'
import literature from '../schemas/literature'
import multimedia from '../schemas/multimedia'
import newsletter from '../schemas/newsletter'
import donation from '../schemas/donation'
// Homepage Schemas
import homepage from '../schemas/homepage'
import homepageTeaser from '../schemas/homepageTeaser'
// Movement/Bewegung Schemas
import bewegungPage, { timelineItem, principle, statItem } from '../schemas/bewegung'

export const schemaTypes = [
  welcomeMessage,
  post,
  author,
  category,
  page,
  navigation,
  // Neue ISKCON Schemas
  temple,
  event,
  eventCategory,
  literature,
  multimedia,
  newsletter,
  donation,
  // Homepage Schemas
  homepage,
  homepageTeaser,
  // Movement/Bewegung Schemas
  bewegungPage,
  timelineItem,
  principle,
  statItem
]
