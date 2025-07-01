import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
					50: '#fdf3f2',
					100: '#fbe4e2',
					200: '#f7ccc8',
					300: '#f1a9a2',
					400: '#e77a6e',
					500: '#B84234',
					600: '#a93a2f',
					700: '#8d2f26',
					800: '#752823',
					900: '#622320',
					950: '#350f0d'
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
        		},
        		// Spirituelle Farben
				spiritual: {
					saffron: {
							50:  '#fef5f3',
							100: '#fbe7e3',
							200: '#f5cfc9',
							300: '#e9aaa3',
							400: '#db8079',
							500: '#c06357', // Hauptton
							600: '#a5534a',
							700: '#88433e',
							800: '#6d352f',
							900: '#592b26',
							950: '#2f1511',
							},	

					blue: {
						50: '#eff6ff',
						100: '#dbeafe',
						200: '#bfdbfe',
						300: '#93c5fd',
						400: '#60a5fa',
						500: '#3b82f6',
						600: '#2563eb',
						700: '#1d4ed8',
						800: '#1e40af',
						900: '#1e3a8a', // Haupt-Tiefblau
						950: '#172554'
					},
					gold: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#ffd700', // Haupt-Goldgelb
						600: '#d97706',
						700: '#b45309',
						800: '#92400e',
						900: '#78350f',
						950: '#451a03'
					},
					earth: {
						50: '#faf9f7',
						100: '#f3f1ed',
						200: '#e6e0d8',
						300: '#d6cbb8',
						400: '#c4b194',
						500: '#b59976',
						600: '#a8896b',
						700: '#8c715a',
						800: '#735e4d',
						900: '#5d4e41',
						950: '#312821'
					}
				}
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: ['source-sans-pro', 'sans-serif', ...fontFamily.sans],
				'spiritual': ['Crimson Text', 'serif'],
				'garamond': ['adobe-garamond-pro', 'serif'],
				'source-sans': ['source-sans-pro', 'sans-serif'],
				'sanskrit': ['Noto Sans Devanagari', 'serif'],
				'body': ['source-sans-pro', 'sans-serif']
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--bits-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--bits-accordion-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
        		"accordion-down": "accordion-down 0.2s ease-out",
        		"accordion-up": "accordion-up 0.2s ease-out",
       			"caret-blink": "caret-blink 1.25s ease-out infinite",
      		},
		},
	},
	plugins: [typography, forms, aspectRatio],
};

export default config;
