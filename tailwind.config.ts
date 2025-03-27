import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["selector", "class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Roboto',
					'sans-serif'
				]
			},
			colors: {
				primary: {
					'50': '#E6EDFF',
					'100': '#CCE0FF',
					'200': '#99C2FF',
					'300': '#66A3FF',
					'400': '#3385FF',
					'500': '#044AEF',
					'600': '#0336B3',
					'700': '#022580',
					'800': '#01134D',
					'900': '#00051A',
					DEFAULT: 'hsl(var(--primary))',
					light: '#2E69FF',
					dark: '#0336B3',
					foreground: 'hsl(var(--primary-foreground))'
				},
				text: {
					primary: '#2D3338',
					secondary: '#696E72'
				},
				tremor: {
					brand: {
						faint: '#eff6ff',
						muted: '#bfdbfe',
						subtle: '#60a5fa',
						DEFAULT: '#044AEF',
						emphasis: '#0336B3',
						inverted: '#ffffff'
					},
					background: {
						muted: '#f9fafb',
						subtle: '#f3f4f6',
						DEFAULT: '#ffffff',
						emphasis: '#374151'
					},
					border: {
						DEFAULT: '#e5e7eb'
					},
					ring: {
						DEFAULT: '#e5e7eb'
					},
					content: {
						subtle: '#9ca3af',
						DEFAULT: '#6b7280',
						emphasis: '#374151',
						strong: '#111827',
						inverted: '#ffffff'
					}
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			keyframes: {
				hide: {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				},
				slideDownAndFade: {
					from: {
						opacity: '0',
						transform: 'translateY(-6px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideLeftAndFade: {
					from: {
						opacity: '0',
						transform: 'translateX(6px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideUpAndFade: {
					from: {
						opacity: '0',
						transform: 'translateY(6px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideRightAndFade: {
					from: {
						opacity: '0',
						transform: 'translateX(-6px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				dialogOverlayShow: {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				dialogContentShow: {
					from: {
						opacity: '0',
						transform: 'translate(-50%, -45%) scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'translate(-50%, -50%) scale(1)'
					}
				},
				drawerSlideLeftAndFade: {
					from: {
						opacity: '0',
						transform: 'translateX(50%)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideLeftAndFade: 'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideRightAndFade: 'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				drawerSlideLeftAndFade: 'drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				dialogOverlayShow: 'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				dialogContentShow: 'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
			},
			boxShadow: {
				'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
			},
			borderRadius: {
				'tremor-small': '0.375rem',
				'tremor-default': '0.5rem',
				'tremor-full': '9999px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1.03)',
			},
		}
	},
	safelist: [
		{
			pattern: /^(bg|text|border|ring)-tremor-/,
		}
	],
	plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
}
export default config
