import type { Meta, StoryFn } from '@storybook/vue3-vite';
import type { SoftDropdownSize } from './types/SoftDropdownSize';
import type { SoftDropdownVariant } from './types/SoftDropdownVariant';
import SoftDropdown from './SoftDropdown.vue';

const dropdownSize: SoftDropdownSize[] = ['sm', 'md'];
const dropdownVariant: SoftDropdownVariant[] = ['base', 'bold', 'deep'];

const meta: Meta<typeof SoftDropdown> = {
	title: 'Atoms/SoftDropdown',
	component: SoftDropdown,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'select', options: dropdownSize },
		variant: { control: 'select', options: dropdownVariant },
	},
	args: {
		id: 'default-dropdown',
		label: 'Select an option',
		placeholder: '',
		hideLabel: false,
		options: [
			{ text: 'microphone 1', id: 'mic1' },
			{ text: 'microphone 2', id: 'mic2' },
			{ text: 'microphone 3', id: 'mic3' },
			{ text: 'microphone 4', id: 'mic4' },
			{ text: 'microphone 5', id: 'mic5' },
		],
		selectedOption: null,
		size: 'md',
		variant: 'base',
		disabled: false,
		numVisibleOptions: 3,
		hasWarningActive: false,
		warningText: '',
	},
	parameters: {
		docs: {
			description: {
				component:
					'Single-select dropdown (combobox) with keyboard navigation. Use for picking one option from a list (e.g. device selection, filters). Supports variants (base, bold, deep), warning state, placeholder, and visible options count.',
			},
			story: {
				height: '240px',
			},
		},
	},
};

export default meta;

export const Default: StoryFn<typeof SoftDropdown> = (args) => ({
	components: { SoftDropdown },
	setup() {
		return { args };
	},
	template: `
		<div style="width: 300px; margin: 0 auto;">
			<SoftDropdown
				:id="args.id"
				:label="args.label"
				:placeholder="args.placeholder"
				:hide-label="args.hideLabel"
				:options="args.options"
				:selected-option="args.selectedOption"
				:size="args.size"
				:variant="args.variant"
				:disabled="args.disabled"
				:num-visible-options="args.numVisibleOptions"
				:has-warning-active="args.hasWarningActive"
				:warning-text="args.warningText"
				@select-option="args.selectedOption = $event"
			/>
		</div>
	`,
});

export const WithPlaceholder: StoryFn<typeof SoftDropdown> = Default.bind({});
WithPlaceholder.args = { placeholder: 'Select a microphone' };
WithPlaceholder.parameters = { docs: { description: { story: 'Custom placeholder when nothing is selected.' } } };

export const WithSelectedOption: StoryFn<typeof SoftDropdown> = Default.bind({});
WithSelectedOption.args = {
	variant: 'deep',
	selectedOption: { text: 'microphone 3', id: 'mic3' },
};
WithSelectedOption.parameters = { docs: { description: { story: 'Controlled selection via selectedOption prop.' } } };

export const WithWarning: StoryFn<typeof SoftDropdown> = Default.bind({});
WithWarning.args = {
	options: [
		{ text: 'microphone 1', id: 'mic1' },
		{ text: 'microphone 2', id: 'mic2' },
		{ text: 'microphone 3', id: 'mic3' },
		{ text: 'microphone 4', id: 'mic4' },
	],
	selectedOption: { text: 'microphone 3', id: 'mic3' },
	hasWarningActive: true,
	warningText: 'This is a warning message',
};
WithWarning.parameters = { docs: { description: { story: 'Warning state with border and alert message.' } } };

export const Disabled: StoryFn<typeof SoftDropdown> = Default.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = { docs: { description: { story: 'Disabled state; not focusable or openable.' } } };
