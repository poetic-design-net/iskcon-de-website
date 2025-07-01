import React from 'react'
import { Card, Text, Stack, Flex, Box } from '@sanity/ui'

const sectionCategories: Record<string, { emoji: string; label: string; color: string }> = {
  heroSection: { emoji: '🏔️', label: 'Hero & Einstieg', color: 'blue' },
  mediaSection: { emoji: '📝', label: 'Inhalt & Text', color: 'green' },
  quoteSection: { emoji: '💬', label: 'Inhalt & Text', color: 'green' },
  faqSection: { emoji: '❓', label: 'Inhalt & Text', color: 'green' },
  gridSection: { emoji: '🎨', label: 'Layout & Struktur', color: 'purple' },
  ctaSection: { emoji: '⚡', label: 'Interaktion & Aktion', color: 'orange' }
}

export default function SectionPreview(props: any) {
  const { value, renderDefault, document } = props
  
  if (!value?._ref) {
    return renderDefault(props)
  }

  // Extrahiere den Section-Typ aus der Referenz
  const sectionType = value._type || 'unknown'
  const category = sectionCategories[sectionType] || {
    emoji: '📄',
    label: 'Section',
    color: 'gray'
  }

  // Versuche den Titel aus der referenzierten Section zu bekommen
  const sectionTitle = value.title || value.heading || `${category.label} (Referenz)`

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Flex gap={3} align="center">
        <Box>
          <Text size={3}>{category.emoji}</Text>
        </Box>
        <Stack space={2} flex={1}>
          <Text size={1} muted>{category.label}</Text>
          <Text size={2} weight="medium">
            {sectionTitle}
          </Text>
          {value._ref && (
            <Text size={1} muted>
              Referenz: {value._ref.slice(0, 8)}...
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}