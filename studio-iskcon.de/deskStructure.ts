import {StructureResolver} from 'sanity/structure'
import {
  MdHome,
  MdArticle,
  MdEvent,
  MdLocationOn,
  MdBook,
  MdSettings,
  MdPerson,
  MdSchool,
  MdAutoAwesome,
  MdLightbulb,
  MdGroups,
  MdRecycling,
  MdFavorite,
  MdAccountTree,
  MdRestaurant,
  MdPersonPin,
  MdViewModule,
  MdCategory,
  MdImage,
  MdEmail,
  MdVolunteerActivism,
  MdList
} from 'react-icons/md'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      // Homepage
      S.listItem()
        .title('🏠 Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.listItem()
                .title('Homepage Einstellungen')
                .icon(MdHome)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('Homepage Teaser')
                .icon(MdViewModule)
                .child(
                  S.documentTypeList('homepageTeaser')
                    .title('Homepage Teaser')
                ),
            ])
        ),

      S.divider(),

      // Seiten
      S.listItem()
        .title('Bewegung')
        .icon(MdGroups)
        .child(
          S.document()
            .schemaType('page')
            .documentId('page-bewegung')
        ),

      // Philosophie - nur Unterseiten ohne Duplikate
      S.listItem()
        .title('Philosophie')
        .icon(MdSchool)
        .child(
          S.documentList()
            .title('Philosophie Seiten')
            .filter('_type == "page" && slug.current match "philosophie/*"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

      S.listItem()
        .title('Tempel')
        .icon(MdLocationOn)
        .child(
          S.document()
            .schemaType('page')
            .documentId('page-tempel')
        ),

      S.listItem()
        .title('Events')
        .icon(MdEvent)
        .child(
          S.document()
            .schemaType('page')
            .documentId('page-events')
        ),

      S.listItem()
        .title('Literatur')
        .icon(MdBook)
        .child(
          S.document()
            .schemaType('page')
            .documentId('page-literatur')
        ),

      S.divider(),

      // Content Types
      S.listItem()
        .title('Veranstaltungen')
        .icon(MdEvent)
        .child(
          S.documentTypeList('event')
            .title('Veranstaltungen')
        ),

      S.listItem()
        .title('Tempel (Orte)')
        .icon(MdLocationOn)
        .child(
          S.documentTypeList('temple')
            .title('Tempel')
        ),

      S.listItem()
        .title('Literatur (Bücher)')
        .icon(MdBook)
        .child(
          S.documentTypeList('literature')
            .title('Literatur')
        ),

      S.listItem()
        .title('Multimedia')
        .icon(MdImage)
        .child(
          S.documentTypeList('multimedia')
            .title('Multimedia')
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog')
        .icon(MdArticle)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Beiträge')
                .child(
                  S.documentTypeList('post')
                    .title('Beiträge')
                ),
              S.listItem()
                .title('Autoren')
                .icon(MdPerson)
                .child(
                  S.documentTypeList('author')
                    .title('Autoren')
                ),
              S.listItem()
                .title('Kategorien')
                .icon(MdCategory)
                .child(
                  S.documentTypeList('category')
                    .title('Kategorien')
                ),
            ])
        ),

      S.divider(),

      // System & Spezial
      S.listItem()
        .title('System & Spezial')
        .icon(MdSettings)
        .child(
          S.list()
            .title('System & Spezial')
            .items([
              S.listItem()
                .title('Navigation')
                .icon(MdSettings)
                .child(
                  S.documentTypeList('navigation')
                    .title('Navigation')
                ),
              S.listItem()
                .title('Newsletter')
                .icon(MdEmail)
                .child(
                  S.documentTypeList('newsletter')
                    .title('Newsletter')
                ),
              S.listItem()
                .title('Spenden')
                .icon(MdVolunteerActivism)
                .child(
                  S.documentTypeList('donation')
                    .title('Spenden')
                ),
              S.listItem()
                .title('Event Kategorien')
                .icon(MdCategory)
                .child(
                  S.documentTypeList('eventCategory')
                    .title('Event Kategorien')
                ),
              S.listItem()
                .title('Bewegung Spezial')
                .child(
                  S.documentTypeList('bewegungPage')
                    .title('Bewegung Spezial-Inhalt')
                ),
            ])
        ),

      S.divider(),

      // Alle Seiten Übersicht
      S.listItem()
        .title('📄 Alle Seiten')
        .icon(MdList)
        .child(
          S.documentTypeList('page')
            .title('Alle Seiten')
        ),

      // Alle anderen Dokumente, die nicht explizit aufgeführt sind
      ...S.documentTypeListItems().filter(
        (listItem) => {
          const id = listItem.getId()
          return ![
            'homepage',
            'homepageTeaser',
            'page',
            'event',
            'eventCategory',
            'temple',
            'author',
            'navigation',
            'post',
            'category',
            'literature',
            'multimedia',
            'newsletter',
            'donation',
            'bewegungPage',
            'timelineItem',
            'principle',
            'statItem',
            'welcomeMessage'
          ].includes(id!)
        }
      ),
    ])