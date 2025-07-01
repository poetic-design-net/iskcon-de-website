import { client } from '../client'

export const bewegungPageQuery = `
  *[_type == "bewegungPage"][0] {
    _id,
    title,
    subtitle,
    description,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    stats[]->{
      _id,
      title,
      value,
      unit,
      category,
      color,
      icon,
      description,
      featured
    },
    timeline[]->{
      _id,
      year,
      title,
      description,
      details,
      quote,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      link,
      linkText,
      currentStats,
      expanded,
      order
    } | order(order asc),
    principles[]->{
      _id,
      icon,
      title,
      text,
      description,
      link,
      color,
      order
    } | order(order asc),
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }
`

// Neue dynamische Stats Query - lädt alle verfügbaren statItem Dokumente
export const featuredStatsQuery = `
  *[_type == "statItem"] {
    _id,
    title,
    value,
    unit,
    category,
    color,
    icon,
    description,
    featured
  } | order(featured desc, category asc, title asc)
`

export const allTimelineItemsQuery = `
  *[_type == "timelineItem"] | order(order asc) {
    _id,
    year,
    title,
    description,
    details,
    quote,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    link,
    linkText,
    currentStats,
    expanded,
    order
  }
`

export const allPrinciplesQuery = `
  *[_type == "principle"] | order(order asc) {
    _id,
    icon,
    title,
    text,
    description,
    link,
    color,
    order
  }
`

// Query für ein einzelnes Timeline-Item
export const timelineItemByIdQuery = `
  *[_type == "timelineItem" && _id == $id][0] {
    _id,
    year,
    title,
    description,
    details,
    quote,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    link,
    linkText,
    currentStats,
    expanded,
    order
  }
`

// Query für ein einzelnes Prinzip
export const principleByIdQuery = `
  *[_type == "principle" && _id == $id][0] {
    _id,
    icon,
    title,
    text,
    description,
    link,
    color,
    order
  }
`

// Query um zu prüfen ob Bewegung-Content existiert
export const bewegungContentExistsQuery = `
  {
    "pageExists": count(*[_type == "bewegungPage"]) > 0,
    "timelineItemsCount": count(*[_type == "timelineItem"]),
    "principlesCount": count(*[_type == "principle"])
  }
`