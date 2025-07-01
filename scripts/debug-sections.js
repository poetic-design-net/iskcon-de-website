import { client } from '../src/lib/sanity/client.js';

async function debugSections() {
  console.log('🔍 Debug: Teste Sanity-Verbindung und Section-Daten...\n');
  
  try {
    // 1. Teste grundlegende Verbindung
    const basicTest = await client.fetch('*[_type == "page"][0]');
    console.log('✅ Grundlegende Sanity-Verbindung funktioniert');
    console.log('📄 Erste Seite gefunden:', basicTest?.title || 'Keine Titel');

    // 2. Teste alle Pages
    const allPages = await client.fetch(`
      *[_type == "page"] {
        title,
        'slug': slug.current,
        'sectionCount': count(sections),
        'sectionRefs': sections[]._ref
      }
    `);
    console.log('\n📚 Alle Seiten:');
    allPages.forEach((page, i) => {
      console.log(`${i+1}. "${page.title}" (/${page.slug}) - ${page.sectionCount || 0} Sections`);
      if (page.sectionRefs?.length > 0) {
        console.log(`   Referenzen: ${page.sectionRefs.join(', ')}`);
      }
    });

    // 3. Teste Section-Referenzen-Auflösung
    console.log('\n🔗 Teste Section-Referenzen-Auflösung...');
    const pageWithSections = await client.fetch(`
      *[_type == "page" && count(sections) > 0][0] {
        title,
        'slug': slug.current,
        'sections': sections[]-> {
          _id,
          _type,
          title
        }
      }
    `);
    
    if (pageWithSections) {
      console.log(`📄 Seite "${pageWithSections.title}" hat ${pageWithSections.sections?.length || 0} aufgelöste Sections:`);
      pageWithSections.sections?.forEach((section, i) => {
        console.log(`   ${i+1}. ${section._type}: "${section.title}" (${section._id})`);
      });
    } else {
      console.log('❌ Keine Seite mit Sections gefunden');
    }

    // 4. Teste individuelle Section-Typen
    console.log('\n📦 Teste individuelle Section-Typen...');
    const sectionTypes = ['heroSection', 'mediaSection', 'gridSection', 'ctaSection', 'faqSection', 'quoteSection'];
    
    for (const type of sectionTypes) {
      const count = await client.fetch(`count(*[_type == "${type}"])`);
      console.log(`   ${type}: ${count} Dokumente`);
    }

    // 5. Teste komplette GROQ-Query aus queries.ts
    console.log('\n🎯 Teste komplette PAGE_PROJECTION Query...');
    const testSlug = allPages[0]?.slug;
    if (testSlug) {
      const fullQuery = `*[_type == "page" && slug.current == "${testSlug}"][0] {
        title,
        'slug': slug.current,
        description,
        seo {
          title,
          description,
          'image': {
            'asset': {
              'url': image.asset->url
            }
          }
        },
        'sections': sections[]-> {
          _type,
          _id,
          title,
          subtitle,
          description,
          
          // Gemeinsame Felder für alle Section-Typen
          'image': {
            'asset': {
              'url': image.asset->url
            },
            'hotspot': image.hotspot
          },
          
          // Hero-Sektion spezifische Felder
          layout,
          ctaText,
          ctaLink,
          
          // Media-Sektion spezifische Felder
          'media': {
            'asset': {
              'url': media.asset->url
            },
            'hotspot': media.hotspot
          },
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
            'image': {
              'asset': {
                'url': image.asset->url
              },
              'hotspot': image.hotspot
            },
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
            'image': image {
              'asset': {
                'url': asset->url
              },
              'hotspot': hotspot
            }
          }
        }
      }`;
      
      const result = await client.fetch(fullQuery);
      console.log(`📄 Vollständiges Ergebnis für "${testSlug}":`);
      console.log('   Titel:', result?.title);
      console.log('   Sections:', result?.sections?.length || 0);
      if (result?.sections?.length > 0) {
        result.sections.forEach((section, i) => {
          console.log(`   ${i+1}. ${section._type}: "${section.title}"`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Fehler bei Sanity-Debug:', error);
  }
}

debugSections();