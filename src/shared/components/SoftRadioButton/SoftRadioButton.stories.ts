import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftRadioButton from './SoftRadioButton.vue';
import { SoftRadioButtonSize } from './types/SoftRadioButtonSize';

const meta: Meta<typeof SoftRadioButton> = {
	title: 'Atoms/SoftRadioButton',
	component: SoftRadioButton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftRadioButton\` component is a form control that allows users to select one option from a group of mutually exclusive choices.

### Usage
- Form selections (gender, preferences, etc.)
- Filter options

### Sizes
- **Small (sm)**: Default size for most use cases
- **Extra Small (xs)**: Compact size for space-constrained layouts

### States
- **Default**: Unchecked and enabled
- **Checked**: Selected and enabled
- **Disabled**: Non-clickable, disabled styling
- **Error**: Invalid state with error styling
				`,
			},
		},
	},
	argTypes: {
		id: { description: 'Unique identifier for the radio input.', control: 'text' },
		name: { description: 'Name attribute for grouping radio buttons.', control: 'text' },
		isChecked: { description: 'Whether the radio button is selected.', control: 'boolean' },
		isDisabled: { description: 'Whether the radio button is disabled.', control: 'boolean' },
		hasError: { description: 'Whether the radio button is in an error state.', control: 'boolean' },
		size: { description: 'The size of the radio button.', control: 'select', options: ['sm', 'xs'] as SoftRadioButtonSize[] },
		default: { description: 'The label text (slot content).', control: 'text' },
	},
	args: {
		id: 'default-radio-button',
		name: 'radio-group',
		isChecked: false,
		isDisabled: false,
		hasError: false,
		size: 'sm' as SoftRadioButtonSize,
		default: 'Input label',
	},
};

export default meta;

export const Default: StoryFn<typeof SoftRadioButton> = (args) => ({
	components: { SoftRadioButton },
	setup() {
		return { args };
	},
	template: `
		<SoftRadioButton
			:id="args.id"
			:name="args.name"
			:is-checked="args.isChecked"
			:is-disabled="args.isDisabled"
			:has-error="args.hasError"
			:size="args.size"
		>
			{{ args.default }}
		</SoftRadioButton>
	`,
});

export const Checked: StoryFn<typeof SoftRadioButton> = Default.bind({});
Checked.args = {
	id: 'checked-radio-button',
	name: 'radio-checked',
	isChecked: true,
	default: 'Selected option',
};

export const Disabled: StoryFn<typeof SoftRadioButton> = Default.bind({});
Disabled.args = {
	id: 'disabled-radio-button',
	name: 'radio-disabled',
	isDisabled: true,
	default: 'Disabled option',
};

export const CheckedDisabled: StoryFn<typeof SoftRadioButton> = Default.bind({});
CheckedDisabled.args = {
	id: 'checked-disabled-radio-button',
	name: 'radio-checked-disabled',
	isChecked: true,
	isDisabled: true,
	default: 'Selected disabled option',
};

export const WithError: StoryFn<typeof SoftRadioButton> = Default.bind({});
WithError.args = {
	id: 'error-radio-button',
	name: 'radio-error',
	hasError: true,
	default: 'Option with error',
};

export const ExtraSmall: StoryFn<typeof SoftRadioButton> = Default.bind({});
ExtraSmall.args = {
	id: 'xs-radio-button',
	name: 'radio-xs',
	size: 'xs',
	default: 'Extra small option',
};

export const RadioGroup: StoryFn<typeof SoftRadioButton> = (args) => ({
	components: { SoftRadioButton },
	setup() {
		const selectedValue = ref('option1');

		return { args, selectedValue };
	},
	template: `
		<div style="display: flex; flex-direction: column; gap: 12px;">
			<SoftRadioButton
				id="option1"
				name="example-group"
				:is-checked="selectedValue === 'option1'"
				@change="selectedValue = 'option1'"
			>
				Option 1
			</SoftRadioButton>
			<SoftRadioButton
				id="option2"
				name="example-group"
				:is-checked="selectedValue === 'option2'"
				@change="selectedValue = 'option2'"
			>
				Option 2
			</SoftRadioButton>
			<SoftRadioButton
				id="option3"
				name="example-group"
				:is-checked="selectedValue === 'option3'"
				@change="selectedValue = 'option3'"
				:is-disabled="true"
			>
				Option 3 (Disabled)
			</SoftRadioButton>
		</div>
	`,
});
RadioGroup.parameters = {
	docs: {
		description: {
			story:
				'A group of radio buttons demonstrating how they work together. Only one option can be selected at a time.',
		},
	},
};
