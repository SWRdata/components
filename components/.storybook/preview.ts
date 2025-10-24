import type { Preview } from '@storybook/sveltekit';
import { themes } from 'storybook/theming';

const preview: Preview = {
	parameters: {
		backgrounds: {
			options: [
				{ name: 'dark', value: '#0C0C0C' }, // tokens.pageFill.dark
				{ name: 'light', value: '#fff' } // tokens.pageFill.light
			]
		},
		initialGlobals: {
			backgrounds: { value: 'dark' }
		},
		options: {
			storySort: {
				order: [
					'About',
					'Design Tokens',
					'Typography',
					['Headline', 'Copy', 'Caption'],
					'Layout',
					'Display',
					'Chart',
					['ChartHeader'],
					'Maplibre',
					[
						'Map',
						'MapStyle',
						'Source',
						'Layer',
						'Control',
						[
							'ScaleControl',
							'GeocoderControl',
							'AttributionControl',
							'NavigationControl',
							'MapControl'
						],
						'Style',
						'Tooltip'
					],
					'Form',
					'Meta',
					'Deprecated'
				]
			}
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		darkMode: {
			dark: { ...themes.dark },
			light: { ...themes.normal },
			stylePreview: true
		}
	},

	decorators: [],
	tags: ['autodocs']
};

export default preview;
