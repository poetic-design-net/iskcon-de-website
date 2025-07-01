import { client } from '../src/lib/sanity/client.ts';

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

  } catch (error) {
    console.error('❌ Fehler bei Sanity-Debug:', error);
  }
}

debugSections();