interface ColourMap {
	[index: string]: ColourPalette | ColourList;
}
interface ColourPalette {
	[index: string]: string;
}
interface ColourList {
	[index: number]: string;
}

const shades: ColourMap = {
	violet: {
		light5: '#f3eefa',
		light4: '#e5dbf5',
		light3: '#d4c5ee',
		light2: '#bba4e5',
		light1: '#9670db',
		base: '#8257D1',
		dark1: '#7f4cdf',
		dark2: '#6830cf',
		dark3: '#441993',
		dark4: '#301268',
		dark5: '#1D0B40'
	},
	red: {
		light5: '#ffcfcc',
		light4: '#FFB9A8',
		light3: '#FF9B82',
		light2: '#FF7957',
		light1: '#FF4D20',
		base: '#E92F02',
		dark1: '#C52A04',
		dark2: '#A22406',
		dark3: '#801F09',
		dark4: '#5F1A0B',
		dark5: '#3F150D'
	},
	teal: {
		light5: '#E5FBFF',
		light4: '#B9EDF6',
		light3: '#8CDEEC',
		light2: '#5BCFE1',
		light1: '#26BED6',
		base: '#07ABC5',
		dark1: '#0698B0',
		dark2: '#04859C',
		dark3: '#037389',
		dark4: '#016275',
		dark5: '#005163'
	},
	yellow: {
		light5: '#FFFDB2',
		light4: '#FEF67C',
		light3: '#FDEF3E',
		light2: '#FAE617',
		light1: '#F5DF13',
		base: '#EFD710',
		dark1: '#E3CA0D',
		dark2: '#DCC10A',
		dark3: '#D1B406',
		dark4: '#C9AC03',
		dark5: '#C2A300'
	},
	forest: {
		light5: '#EFFBE9',
		light4: '#CEE9D1',
		light3: '#ADD6BA',
		light2: '#8CC4A3',
		light1: '#6BB28B',
		base: '#499F73',
		dark1: '#278D5B',
		dark2: '#137848',
		dark3: '#0C643A',
		dark4: '#06502D',
		dark5: '#003D20'
	},
	pink: {
		light5: '#FFCCF5',
		light4: '#FFADE7',
		light3: '#FF8CD7',
		light2: '#FF66C6',
		light1: '#FF30AC',
		base: '#E9028D',
		dark1: '#C7047F',
		dark2: '#A50771',
		dark3: '#830963',
		dark4: '#620B55',
		dark5: '#400E47'
	},

	orange: {
		light5: '#FFEECC',
		light4: '#FFD584',
		light3: '#FFBA35',
		light2: '#F4A101',
		light1: '#DA8F03',
		base: '#C17D05',
		dark1: '#A86C07',
		dark2: '#905B09',
		dark3: '#794B0B',
		dark4: '#623B0D',
		dark5: '#4C2C0F'
	},

	plum: {
		light5: '#F1CCFF',
		light4: '#E9AEFF',
		light3: '#E08EFF',
		light2: '#D76CFF',
		light1: '#CB42FF',
		base: '#B600FB',
		dark1: '#9903D4',
		dark2: '#7C05AE',
		dark3: '#610889',
		dark4: '#450A65',
		dark5: '#400E47'
	},
	apple: {
		light5: '#EFFBEA',
		light4: '#C5F0B1',
		light3: '#98E472',
		light2: '#65D62B',
		light1: '#5BC128',
		base: '#53AD26',
		dark1: '#4A9825',
		dark2: '#438523',
		dark3: '#3B7122',
		dark4: '#335E20',
		dark5: '#2C4C1F'
	},
	blue: {
		light5: '#CCDCFF',
		light4: '#B1C5F9',
		light3: '#97AEF2',
		light2: '#7D97EC',
		light1: '#6280E5',
		base: '#4768DF',
		dark1: '#2F51D2',
		dark2: '#2A3FAC',
		dark3: '#262D87',
		dark4: '#211C64',
		dark5: '#1D0B40'
	},
	gray: {
		light5: '#f2f2f3',
		light4: '#e2e3e4',
		light3: '#cacbce',
		light2: '#b1b2b4',
		light1: '#97989b',
		base: '#7d7e82',
		dark1: '#646568',
		dark2: '#4b4b4e',
		dark3: '#323234',
		dark4: '#19191a',
		dark5: '#0d0d0d'
	}
};

const semantics: ColourMap = {
	copyPrimary: {
		light: '#0c0c0c',
		dark: '#f8f7f5'
	},
	copySecondary: {
		light: shades.gray.base,
		dark: '#a3a3a3'
	},
	copySecondaryHover: {
		light: shades.gray.dark1,
		dark: '#b4b4b4'
	},
	logoFill: {
		light: shades.gray.light3,
		dark: shades.gray.base
	},
	surfaceFill: {
		dark: '#222325',
		light: '#f1eeeb'
	},
	pageFill: {
		dark: '#0C0C0C',
		light: '#fff'
	}
};

const scales: ColourMap = {
	red_blue: [...Object.values(shades.red).reverse(), ...Object.values(shades.blue)],
	red_violet: [...Object.values(shades.red).reverse(), ...Object.values(shades.violet)],
	violet_teal: [...Object.values(shades.violet).reverse(), ...Object.values(shades.teal)],
	orange_teal: [...Object.values(shades.orange).reverse(), ...Object.values(shades.teal)],
	red_forest: [...Object.values(shades.red).reverse(), ...Object.values(shades.forest)],
	red_apple: [...Object.values(shades.red).reverse(), ...Object.values(shades.apple)],
	red_teal: [...Object.values(shades.red).reverse(), ...Object.values(shades.violet)],
	violet_orange: [...Object.values(shades.violet).reverse(), ...Object.values(shades.orange)],
	orange_blue: [...Object.values(shades.orange).reverse(), ...Object.values(shades.blue)],
	teal_pink: [...Object.values(shades.teal).reverse(), ...Object.values(shades.pink)],
	blue_pink: [...Object.values(shades.blue).reverse(), ...Object.values(shades.pink)],
	apple_plum: [...Object.values(shades.apple).reverse(), ...Object.values(shades.plum)],
	forest_plum: [...Object.values(shades.forest).reverse(), ...Object.values(shades.plum)]
};

const typography = {
	wide: {
		sizes: {
			'fs-small-3': '0.75rem',
			'fs-small-2': '0.875rem',
			'fs-small-1': '1rem',
			'fs-base': '1.25rem',
			'fs-large-1': '1.5rem',
			'fs-large-2': '2rem',
			'fs-large-3': '3rem',
			'fs-large-4': '3.5rem'
		}
	}
};

export { shades, scales, typography, semantics };
