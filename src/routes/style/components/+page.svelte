<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
  import { Separator } from '$lib/components/ui/separator';
  import * as Accordion from "$lib/components/ui/accordion";

  let emailValue = '';
  let textareaValue = '';
  let accordionValue = "item-1";
</script>

<svelte:head>
  <title>Komponenten - ISKCON Design System</title>
  <meta name="description" content="UI-Komponenten und ihre Verwendung im ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">UI-Komponenten</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Alle UI-Komponenten des Design Systems mit Beispielen und Verwendungsrichtlinien.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Buttons -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Buttons</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-8">
          <!-- Button Variants -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Varianten</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <!-- Button Sizes -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Größen</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm">Klein</Button>
              <Button size="default">Standard</Button>
              <Button size="lg">Groß</Button>
              <Button size="xl">Extra Groß</Button>
              <Button size="icon" variant="outline">
                <Icon icon="mdi:heart" class="w-5 h-5" />
              </Button>
            </div>
          </div>

          <!-- Button States -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Zustände</h3>
            <div class="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Deaktiviert</Button>
              <Button variant="premium">
                <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
                Lädt...
              </Button>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">
              <strong>Verwendung:</strong> Buttons sind die primären Interaktionselemente. 
              Verwende "default" für primäre Aktionen, "outline" für sekundäre Aktionen.
              <a href="/style/button" class="text-primary-500 hover:text-primary-600 ml-2">Mehr Beispiele →</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Badges</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <Badge>Standard</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="default" class="bg-primary-500">Custom</Badge>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">
              <strong>Verwendung:</strong> Badges für Status-Anzeigen, Labels und kleine Hinweise.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cards -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Cards</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Standard Card</CardTitle>
            <CardDescription>Eine einfache Card-Komponente</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-gray-600">
              Cards sind Container für zusammengehörige Inhalte. Sie strukturieren 
              Informationen und machen sie leicht erfassbar.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Mehr erfahren</Button>
          </CardFooter>
        </Card>

        <Card class="border-primary-200 bg-primary-50/50">
          <CardHeader>
            <CardTitle class="text-primary-700">Highlight Card</CardTitle>
            <CardDescription>Mit angepassten Farben</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-gray-600">
              Cards können mit Tailwind-Klassen angepasst werden, um besondere 
              Inhalte hervorzuheben.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="premium" size="sm">Premium Aktion</Button>
          </CardFooter>
        </Card>
      </div>

      <div class="mt-6 bg-white rounded-lg shadow-sm p-6">
        <p class="text-sm text-gray-600">
          <strong>Verwendung:</strong> Cards für Inhaltsgruppierung, Produkt-Karten, 
          Feature-Übersichten und überall wo Inhalte visuell gruppiert werden sollen.
        </p>
      </div>
    </section>

    <!-- Forms -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Formulare</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-8">
          <!-- Input Fields -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Input-Felder</h3>
            <div class="space-y-4 max-w-md">
              <div>
                <label for="email" class="block text-sm font-medium mb-2">E-Mail</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@beispiel.de"
                  bind:value={emailValue}
                />
              </div>
              
              <div>
                <label for="disabled" class="block text-sm font-medium mb-2">Deaktiviert</label>
                <Input 
                  id="disabled" 
                  placeholder="Nicht editierbar" 
                  disabled 
                />
              </div>

              <div>
                <label for="error" class="block text-sm font-medium mb-2 text-red-600">Mit Fehler</label>
                <Input 
                  id="error" 
                  placeholder="Ungültige Eingabe" 
                  class="border-red-500 focus:ring-red-500"
                />
                <p class="text-sm text-red-600 mt-1">Bitte geben Sie eine gültige E-Mail ein</p>
              </div>
            </div>
          </div>

          <!-- Textarea -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Textarea</h3>
            <div class="max-w-md">
              <label for="message" class="block text-sm font-medium mb-2">Nachricht</label>
              <Textarea 
                id="message" 
                placeholder="Ihre Nachricht..."
                rows="4"
                bind:value={textareaValue}
              />
              <p class="text-sm text-gray-500 mt-1">{textareaValue.length} Zeichen</p>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">
              <strong>Verwendung:</strong> Konsistente Form-Elemente für alle Eingabefelder. 
              Verwende klare Labels und hilfreiche Platzhalter.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Alerts -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Alerts</h2>
      
      <div class="space-y-4">
        <Alert>
          <Icon icon="mdi:information" class="w-5 h-5" />
          <AlertTitle>Standard Alert</AlertTitle>
          <AlertDescription>
            Dies ist eine informative Nachricht für den Benutzer.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <Icon icon="mdi:alert-circle" class="w-5 h-5" />
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
          </AlertDescription>
        </Alert>

        <Alert class="border-green-200 bg-green-50 text-green-800">
          <Icon icon="mdi:check-circle" class="w-5 h-5" />
          <AlertTitle>Erfolg</AlertTitle>
          <AlertDescription>
            Ihre Anfrage wurde erfolgreich verarbeitet.
          </AlertDescription>
        </Alert>

        <Alert class="border-yellow-200 bg-yellow-50 text-yellow-800">
          <Icon icon="mdi:alert" class="w-5 h-5" />
          <AlertTitle>Warnung</AlertTitle>
          <AlertDescription>
            Bitte beachten Sie die folgenden Hinweise.
          </AlertDescription>
        </Alert>

        <div class="mt-6 bg-white rounded-lg shadow-sm p-6">
          <p class="text-sm text-gray-600">
            <strong>Verwendung:</strong> Alerts für wichtige Systemmeldungen, Bestätigungen, 
            Warnungen und Fehler. Verwende passende Farben und Icons.
          </p>
        </div>
      </div>
    </section>

    <!-- Accordion -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Accordion</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <Accordion.Root bind:value={accordionValue} class="w-full">
          <Accordion.Item value="item-1">
            <Accordion.Trigger class="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline">
              Was ist Krishna-Bewusstsein?
              <Icon icon="mdi:chevron-down" class="h-4 w-4 transition-transform duration-200" />
            </Accordion.Trigger>
            <Accordion.Content>
              <div class="pb-4 pt-0">
                Krishna-Bewusstsein ist das ursprüngliche Bewusstsein eines jeden Lebewesens. 
                Es bedeutet, sich seiner ewigen Beziehung zu Krishna (Gott) bewusst zu sein.
              </div>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item value="item-2">
            <Accordion.Trigger class="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline">
              Wie praktiziert man Bhakti-Yoga?
              <Icon icon="mdi:chevron-down" class="h-4 w-4 transition-transform duration-200" />
            </Accordion.Trigger>
            <Accordion.Content>
              <div class="pb-4 pt-0">
                Bhakti-Yoga wird durch neun Prozesse praktiziert: Hören, Chanten, Erinnern, 
                Dienen, Verehren, Beten, Ausführen, Freundschaft und völlige Hingabe.
              </div>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item value="item-3">
            <Accordion.Trigger class="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline">
              Was ist das Hare-Krishna-Mantra?
              <Icon icon="mdi:chevron-down" class="h-4 w-4 transition-transform duration-200" />
            </Accordion.Trigger>
            <Accordion.Content>
              <div class="pb-4 pt-0">
                Das Hare-Krishna-Mantra ist das Maha-Mantra (großes Mantra) für dieses Zeitalter: 
                Hare Krishna Hare Krishna Krishna Krishna Hare Hare / Hare Rama Hare Rama Rama Rama Hare Hare.
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Verwendung:</strong> Accordions für FAQs, aufklappbare Inhalte und 
            um lange Inhalte platzsparend zu organisieren.
          </p>
        </div>
      </div>
    </section>

    <!-- Separators -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Separators</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-semibold">Horizontal</h3>
            <Separator class="my-4" />
            <p class="text-gray-600">Standard horizontaler Separator</p>
          </div>

          <div>
            <h3 class="text-lg font-semibold">Mit Text</h3>
            <div class="relative">
              <Separator class="my-8" />
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                oder
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold">Vertikal</h3>
            <div class="flex items-center gap-4">
              <span>Option 1</span>
              <Separator orientation="vertical" class="h-6" />
              <span>Option 2</span>
              <Separator orientation="vertical" class="h-6" />
              <span>Option 3</span>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Verwendung:</strong> Separators um Inhalte visuell zu trennen und 
            Struktur zu schaffen.
          </p>
        </div>
      </div>
    </section>

    <!-- Component Guidelines -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Allgemeine Richtlinien</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-3">Konsistenz</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende immer die gleichen Komponenten für ähnliche Funktionen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Halte dich an die definierten Varianten und Größen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze die Farbpalette konsistent über alle Komponenten</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Barrierefreiheit</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Stelle sicher, dass alle interaktiven Elemente per Tastatur erreichbar sind</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende aussagekräftige Labels und ARIA-Attribute</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Achte auf ausreichenden Farbkontrast (WCAG AA)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Mobile Optimierung</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Alle Komponenten sind responsive und mobile-optimiert</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Touch-Targets sollten mindestens 44x44 Pixel groß sein</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Verwende ausreichend Abstand zwischen interaktiven Elementen</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>