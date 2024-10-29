import Select from '.';
import groupedJobs from '../assets/mock_data/jobs_grouped.json';
import groupedThreeDigits from '../assets/mock_data/jobs_3.json';
import groupedFourDigits from '../assets/mock_data/jobs_4.json';

export default {
	title: 'Input Components/Select',
	component: Select,
	// FIXME: remove this manual documentation when autodocs are fixed
	// TODO: finish documentation
	parameters: {
		docs: {
			description: {
				component:
					'This component is a select input with search feature and various options such as grouped items, multi-select etc. based on https://github.com/rob-balfre/svelte-select'
			}
		}
	},
	argTypes: {
		inputId: {
			description: "The input field's ID",
			control: 'text',
			type: { name: 'string', required: false },
			defaultValue: 'select'
		},
		placeholder: {
			description: "The input field's placeholder text",
			control: 'text',
			type: { name: 'string', required: false },
			defaultValue: 'Bitte auswählen'
		}
		// items (interface)
		// groupHeaderSelectable
	}
};

export const Simple = {
	args: {
		items: [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'cake', label: 'Cake' },
			{ value: 'ice-cream', label: 'Ice Cream' }
		]
	}
};

export const Grouped = {
	args: {
		items: [
			{ value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
			{ value: 'pizza', label: 'Pizza', group: 'Savory' },
			{ value: 'cake', label: 'Cake', group: 'Sweet' },
			{ value: 'chips', label: 'Chips', group: 'Savory' },
			{ value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' }
		]
	}
};

export const JobsThreeDigits = {
	args: {
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedThreeDigits
	}
};

export const JobsFourDigits = {
	args: {
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedFourDigits
	}
};

export const JobsGrouped = {
	args: {
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedJobs,
		groupHeaderSelectable: false
	}
};

export const JobsGroupedGroupSelectable = {
	args: {
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedJobs,
		groupHeaderSelectable: true
	}
};
