<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import type { PageTemplate, ContentBlock } from '$lib/components/master-template/types';
  
  // Dynamische Imports für bessere Fehlerbehandlung
  let ContentRenderer: any = null;
  let isLoaded = false;
  let loadError: string | null = null;
  
  // Master Template Konfiguration
  const templateConfig: PageTemplate = {
    type: 'master',
    config: {
      theme: 'spiritual',
      layout: {
        header: true,
        footer: true,
        sidebar: 'none'
      },
      seo: {
        title: 'Master Template Demo',
        description: 'Demonstration der Master Template System Funktionalität'
      },
      performance: {
        lazyLoading: true,
        imageOptimization: true,
        caching: {
          strategy: 'default'
        },
        bundleSplitting: true
      }
    },
    metadata: {
      name: 'Master Template Demo',
      description: 'Demo für das neue Master Template System',
      version: '1.0.0'
    }
  };
  
  // Demo Content Blocks
  const demoBlocks: ContentBlock[] = [
    // Hero Text Block
    {
      id: 'hero-text',
      type: 'text',
      data: {
        content: {
          title: [
            {
              _type: 'block',
              _key: 'block-1',
              style: 'h1',
              children: [
                {
                  _type: 'span',
                  _key: 'span-1',
                  text: 'Master Template System',
                  marks: []
                }
              ]
            }
          ],
          subtitle: [
            {
              _type: 'block',
              _key: 'block-2',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'span-2',
                  text: 'Flexible Content Blocks für moderne Webentwicklung'
                }
              ]
            }
          ],
          body: [
            {
              _type: 'block',
              _key: 'block-3',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'span-3',
                  text: 'Diese Demo zeigt die Funktionalität des neuen Master Template Systems, das die rigide Section-basierte Architektur durch flexible Content Blocks ersetzt.'
                }
              ]
            }
          ]
        },
        typography: {
          titleLevel: 'h1',
          titleStyle: {
            size: 'heading-hero',
            weight: 'bold',
            color: 'spiritual-saffron-600',
            lineHeight: 'tight'
          },
          bodyStyle: {
            size: 'body-large',
            weight: 'normal',
            color: 'spiritual-blue-900',
            lineHeight: 'relaxed'
          },
          alignment: 'center'
        },
        decoration: {
          badge: {
            text: 'Neu',
            variant: 'spiritual',
            size: 'md'
          },
          divider: {
            type: 'decorative',
            position: 'bottom',
            color: 'spiritual-saffron-400',
            width: '2',
            spacing: 'section-compact'
          }
        }
      },
      layout: {
        container: {
          size: 'wide',
          padding: 'section-spacious'
        },
        arrangement: {
          type: 'single'
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        responsive: {}
      },
      styling: {
        background: {
          type: 'gradient',
          value: {
            direction: 'to right',
            stops: [
              { color: 'spiritual-saffron-50', position: 0 },
              { color: 'spiritual-blue-50', position: 100 }
            ]
          },
          overlay: {
            type: 'color',
            value: 'spiritual-blue-900',
            opacity: 0.1
          }
        },
        spacing: {
          padding: {
            top: 'section-spacious',
            bottom: 'section-spacious'
          },
          margin: {}
        },
        borders: {},
        shadows: {
          type: 'none'
        },
        theme: 'spiritual'
      }
    },

    // Feature Image Block
    {
      id: 'feature-image',
      type: 'media',
      data: {
        media: {
          type: 'image',
          primary: {
            type: 'image',
            asset: {
              url: 'https://picsum.photos/1200/600?random=1'
            },
            alt: 'Master Template System Demonstration'
          }
        },
        display: {
          aspectRatio: '16:9',
          objectFit: 'cover',
          borderRadius: 'lg',
          overlay: {
            type: 'gradient',
            value: {
              direction: 'to bottom',
              stops: [
                { color: 'transparent', position: 0 },
                { color: 'spiritual-blue-900', position: 100 }
              ]
            },
            opacity: 0.3
          }
        },
        interaction: {
          lightbox: true
        },
        accessibility: {
          alt: 'Demo-Bild für Master Template',
          caption: 'Beispiel für Media Block Integration'
        }
      },
      layout: {
        container: {
          size: 'normal',
          padding: 'section-normal'
        },
        arrangement: {
          type: 'single'
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        responsive: {}
      },
      styling: {
        background: {
          type: 'none'
        },
        spacing: {
          padding: {},
          margin: {}
        },
        borders: {},
        shadows: {
          type: 'lg',
          color: 'spiritual-blue-500'
        },
        theme: 'accent'
      }
    },

    // Accordion Block
    {
      id: 'tech-details',
      type: 'accordion',
      data: {
        items: [
          {
            id: 'block-system',
            title: 'Block System Architektur',
            content: [
              {
                _type: 'block',
                _key: 'block-4',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'span-4',
                    text: 'Das Master Template System verwendet eine flexible Block-basierte Architektur, die es ermöglicht, Inhalte modular zu organisieren und dynamisch zu rendern.'
                  }
                ]
              }
            ]
          },
          {
            id: 'performance',
            title: 'Performance Optimierungen',
            content: [
              {
                _type: 'block',
                _key: 'block-5',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'span-5',
                    text: 'Lazy Loading, Image Optimization und Component-basiertes Bundle Splitting sorgen für optimale Performance.'
                  }
                ]
              }
            ]
          },
          {
            id: 'styling',
            title: 'Style Engine',
            content: [
              {
                _type: 'block',
                _key: 'block-6',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: 'span-6',
                    text: 'Die Style Engine generiert CSS-Klassen dynamisch basierend auf Design Tokens und Theme-Konfigurationen.'
                  }
                ]
              }
            ]
          }
        ],
        behavior: {
          allowMultiple: true,
          defaultOpen: ['block-system']
        },
        style: {
          variant: 'bordered',
          spacing: 'section-normal',
          animationDuration: 300
        }
      },
      layout: {
        container: {
          size: 'normal',
          padding: 'section-normal'
        },
        arrangement: {
          type: 'single'
        },
        alignment: {
          horizontal: 'left',
          vertical: 'top'
        },
        responsive: {}
      },
      styling: {
        background: {
          type: 'color',
          value: 'card'
        },
        spacing: {
          padding: {
            top: 'section-normal',
            bottom: 'section-normal'
          },
          margin: {}
        },
        borders: {
          width: '1',
          style: 'solid',
          color: 'border',
          radius: 'lg'
        },
        shadows: {
          type: 'sm'
        },
        theme: 'warm'
      }
    },

    // Gallery Block
    {
      id: 'gallery-demo',
      type: 'media',
      data: {
        media: {
          type: 'gallery',
          primary: {
            type: 'image',
            asset: {
              url: 'https://picsum.photos/800/600?random=1'
            },
            alt: 'Haupt-Galerie-Bild'
          },
          gallery: [
            {
              type: 'image',
              asset: {
                url: 'https://picsum.photos/800/600?random=2'
              },
              alt: 'Galerie Bild 2'
            },
            {
              type: 'image',
              asset: {
                url: 'https://picsum.photos/800/600?random=3'
              },
              alt: 'Galerie Bild 3'
            },
            {
              type: 'image',
              asset: {
                url: 'https://picsum.photos/800/600?random=4'
              },
              alt: 'Galerie Bild 4'
            }
          ]
        },
        display: {
          aspectRatio: '4:3',
          objectFit: 'cover',
          borderRadius: 'md'
        },
        interaction: {
          lightbox: true
        },
        accessibility: {
          alt: 'Spirituelle Bildergalerie',
          caption: 'Eine spirituelle Bildergalerie',
          description: 'Sammlung inspirierender Bilder aus dem ISKCON-Kontext'
        }
      },
      layout: {
        container: {
          size: 'wide',
          padding: 'section-normal'
        },
        arrangement: {
          type: 'grid',
          columns: {
            mobile: 1,
            tablet: 2,
            desktop: 3
          },
          gap: '6'
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        responsive: {}
      },
      styling: {
        background: {
          type: 'none'
        },
        spacing: {
          padding: {},
          margin: {}
        },
        borders: {},
        shadows: {
          type: 'none'
        },
        theme: 'default'
      }
    },

    // Spacer Block
    {
      id: 'section-spacer',
      type: 'spatial',
      data: {
        type: 'divider',
        spacing: {
          height: 'section-normal'
        },
        divider: {
          style: 'line',
          color: 'border',
          width: '1'
        }
      },
      layout: {
        container: {
          size: 'full',
          padding: 'section-normal'
        },
        arrangement: {
          type: 'single'
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        responsive: {}
      },
      styling: {
        background: {
          type: 'none'
        },
        spacing: {
          padding: {},
          margin: {}
        },
        borders: {},
        shadows: {
          type: 'none'
        },
        theme: 'light'
      }
    }
  ];

  // Template Context für Child Components
  setContext('templateConfig', templateConfig);
  
  // Statistiken für Debug
  let renderStats = {
    totalBlocks: demoBlocks.length,
    loadedComponents: 0,
    renderTime: 0
  };

  // Component Loading
  onMount(async () => {
    const startTime = performance.now();
    
    try {
      const module = await import('$lib/components/master-template/ContentRenderer.svelte');
      ContentRenderer = module.default;
      isLoaded = true;
      renderStats.loadedComponents = 1;
    } catch (error) {
      console.error('Fehler beim Laden des ContentRenderer:', error);
      loadError = error instanceof Error ? error.message : 'Unbekannter Fehler';
    }
    
    renderStats.renderTime = performance.now() - startTime;
  });
</script>

<svelte:head>
  <title>Master Template Demo | ISKCON.DE</title>
  <meta name="description" content="Demonstration des Master Template Systems mit flexiblen Content Blocks" />
</svelte:head>

<!-- Debug Header -->
<div class="bg-spiritual-blue-900 text-white p-4 text-sm">
  <div class="container mx-auto flex justify-between items-center">
    <div>
      <strong>Master Template Demo</strong> - 
      System Status: {isLoaded ? '✅ Geladen' : '⏳ Lädt...'}
    </div>
    <div class="text-right">
      <div>Blocks: {renderStats.totalBlocks}</div>
      <div>Render-Zeit: {renderStats.renderTime.toFixed(2)}ms</div>
    </div>
  </div>
</div>

<!-- Main Content -->
<main class="min-h-screen">
  {#if loadError}
    <div class="container mx-auto px-4 py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 class="text-red-800 font-medium mb-2">Component Loading Fehler</h2>
        <p class="text-red-600">{loadError}</p>
        <details class="mt-4">
          <summary class="cursor-pointer text-red-700">Debug Informationen</summary>
          <pre class="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">{JSON.stringify({
            templateConfig,
            blockCount: demoBlocks.length,
            timestamp: new Date().toISOString()
          }, null, 2)}</pre>
        </details>
      </div>
    </div>
  {:else if isLoaded && ContentRenderer}
    <!-- Template-basierter Content Renderer -->
    <svelte:component this={ContentRenderer} content={demoBlocks} />
  {:else}
    <!-- Loading State -->
    <div class="container mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 rounded mb-4"></div>
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-64 bg-gray-300 rounded"></div>
      </div>
    </div>
  {/if}
</main>

<!-- Debug Footer -->
<footer class="bg-gray-100 border-t p-4 text-xs text-gray-600">
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h4 class="font-medium mb-1">Template Info</h4>
        <div>Version: {templateConfig.metadata?.version}</div>
        <div>Theme: {templateConfig.config?.theme}</div>
      </div>
      <div>
        <h4 class="font-medium mb-1">Performance</h4>
        <div>Lazy Loading: {templateConfig.config?.performance.lazyLoading ? '✅' : '❌'}</div>
        <div>Image Opt: {templateConfig.config?.performance.imageOptimization ? '✅' : '❌'}</div>
      </div>
      <div>
        <h4 class="font-medium mb-1">Block System</h4>
        <div>Total Blocks: {demoBlocks.length}</div>
        <div>Block Types: {[...new Set(demoBlocks.map(b => b.type))].join(', ')}</div>
      </div>
    </div>
  </div>
</footer>