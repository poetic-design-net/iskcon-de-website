declare module 'svelte-leaflet' {
  import { SvelteComponentTyped } from 'svelte';
  import type L from 'leaflet';

  interface LeafletMapProps {
    center: [number, number];
    zoom: number;
    style?: string;
  }

  interface MarkerProps {
    latLng: [number, number];
    icon?: L.Icon;
  }

  // Popup akzeptiert beliebige Props
  type PopupProps = Record<string, unknown>;

  export class LeafletMap extends SvelteComponentTyped<LeafletMapProps> {
    getMap(): L.Map;
  }
  
  export class Marker extends SvelteComponentTyped<MarkerProps> {}
  
  export class Popup extends SvelteComponentTyped<PopupProps> {}
}