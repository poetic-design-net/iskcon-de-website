import type { ComponentType } from 'svelte';
import type { BlockType } from '../types';

// Import der Block-Komponenten für bessere TypeScript-Unterstützung
import TextBlock from '../blocks/TextBlock.svelte';
import MediaBlock from '../blocks/MediaBlock.svelte';
import FallbackBlock from '../blocks/FallbackBlock.svelte';

// Statische Komponenten-Map für bessere Performance und TypeScript-Support
const componentMap: Record<BlockType, ComponentType> = {
  text: TextBlock,
  media: MediaBlock,
  grid: FallbackBlock,     // Wird später implementiert
  cta: FallbackBlock,      // Wird später implementiert
  quote: FallbackBlock,    // Wird später implementiert
  accordion: FallbackBlock, // Wird später implementiert
  form: FallbackBlock,     // Wird später implementiert
  spatial: FallbackBlock   // Wird später implementiert
};

// Hauptfunktion: Gibt die entsprechende Komponente für einen Block-Typ zurück
export function createBlockComponent(blockType: BlockType): ComponentType {
  const component = componentMap[blockType];
  
  if (!component) {
    console.warn(`Block type "${blockType}" not found, using fallback`);
    return FallbackBlock;
  }
  
  return component;
}

// Hilfsfunktion: Prüft ob ein Block-Typ unterstützt wird
export function isBlockTypeSupported(blockType: BlockType): boolean {
  return blockType in componentMap;
}

// Hilfsfunktion: Gibt verfügbare Block-Typen zurück
export function getAvailableBlockTypes(): BlockType[] {
  return Object.keys(componentMap) as BlockType[];
}

// Hilfsfunktion: Gibt implementierte Block-Typen zurück (nicht Fallback)
export function getImplementedBlockTypes(): BlockType[] {
  return Object.entries(componentMap)
    .filter(([, component]) => component !== FallbackBlock)
    .map(([type]) => type as BlockType);
}