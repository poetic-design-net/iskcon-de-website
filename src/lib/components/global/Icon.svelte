<script lang="ts">
  export let name: string;
  export let size: string | number = 24;
  export let color: string = 'currentColor';
  
  // Additional props for styling
  let className = '';
  export { className as class };
  
  // Convert size to proper CSS value
  $: sizeValue = typeof size === 'number' ? `${size}px` : size;
  
  // Simple fallback icons for common cases
  function getFallbackIcon(iconName: string): string {
    const fallbackIcons: Record<string, string> = {
      'mdi:chevron-down': '▼',
      'mdi:chevron-up': '▲', 
      'mdi:chevron-left': '◀',
      'mdi:chevron-right': '▶',
      'mdi:menu': '☰',
      'mdi:close': '✕',
      'mdi:heart': '♥',
      'mdi:star': '★',
      'mdi:home': '🏠',
      'mdi:email': '✉',
      'mdi:phone': '📞',
      'mdi:calendar': '📅',
      'mdi:clock': '🕐',
      'mdi:location': '📍',
      'mdi:link': '🔗',
      'mdi:share': '↗',
      'mdi:play': '▶',
      'mdi:pause': '⏸',
      'mdi:search': '🔍',
      'mdi:filter': '🔽',
      'mdi:settings': '⚙',
      'mdi:user': '👤',
      'mdi:bell': '🔔',
      'mdi:check': '✓',
      'mdi:plus': '+',
      'mdi:minus': '-',
      'mdi:edit': '✏',
      'mdi:delete': '🗑',
      'mdi:download': '⬇',
      'mdi:upload': '⬆',
      'mdi:external-link': '↗'
    };
    
    return fallbackIcons[iconName] || '?';
  }
</script>

<span 
  class="inline-flex items-center justify-center {className}"
  style="width: {sizeValue}; height: {sizeValue}; color: {color}; font-size: calc({sizeValue} * 0.8);"
  title={name}
  aria-label={name}
>
  {getFallbackIcon(name)}
</span>

<style>
  span {
    vertical-align: middle;
  }
</style>