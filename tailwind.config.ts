import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		'delay-[600ms]',
		'duration-[1200ms]',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom brand colors
				"brand-purple": "#8E44AD",
				"brand-pink": "#F06292",
				"brand-dark": "#121212",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				"scroll": {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' }
				},
				"fade-in": {
					"0%": { opacity: '0', transform: 'translateY(10px)' },
					"100%": { opacity: '1', transform: 'translateY(0)' }
				},
				"fade-out": {
					"0%": { opacity: '1', transform: 'translateY(0)' },
					"100%": { opacity: '0', transform: 'translateY(10px)' }
				},
				"scale-in": {
					"0%": { transform: 'scale(0.95)', opacity: '0' },
					"100%": { transform: 'scale(1)', opacity: '1' }
				},
				'star-movement-bottom': {
					'0%': { transform: 'translate(0%, 0%)', opacity: '1' },
					'100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
				},
				'star-movement-top': {
					'0%': { transform: 'translate(0%, 0%)', opacity: '1' },
					'100%': { transform: 'translate(100%, 0%)', opacity: '0' },
				},
				shine: {
					'0%': { 'background-position': '100%' },
					'100%': { 'background-position': '-100%' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"scroll": "scroll 20s linear infinite",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
				'star-movement-top': 'star-movement-top linear infinite alternate',
				shine: 'shine 5s linear infinite',
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"hero-gradient": "linear-gradient(135deg, #8E44AD 0%, #F06292 100%)",
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
