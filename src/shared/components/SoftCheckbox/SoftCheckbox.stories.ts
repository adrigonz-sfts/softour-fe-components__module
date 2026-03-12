import type { Meta, StoryFn } from '@storybook/vue3-vite';
import type { ComponentProps } from 'vue-component-type-helpers';
import { SoftCheckboxIcon } from './types/SoftCheckboxIcon';
import { SoftCheckboxSize } from './types/SoftCheckboxSize';
import SoftCheckbox from './SoftCheckbox.vue';

type SoftCheckboxPropsAndCustomArgs = ComponentProps<typeof SoftCheckbox> & {
	default: string;
};

const checkboxSize: SoftCheckboxSize[] = ['sm', 'md'];
const checkboxVariant: SoftCheckboxIcon[] = ['default', 'indeterminate'];

const meta: Meta<SoftCheckboxPropsAndCustomArgs> = {
	title: 'Atoms/SoftCheckbox',
	component: SoftCheckbox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftCheckbox\` component is a form control that allows users to select one or more options from a set. It supports different states, sizes, and variants.

### Usage
The \`SoftCheckbox\` component can be used in forms, settings panels, or anywhere a binary choice needs to be made. It supports both checked and indeterminate states.

### A11y Suggestions
- Upon implementation use the \`@keydown.space\`  along with the \`@click\` event to toggle the checkbox state when the user presses the space key.

### Features
- **Checkbox Position**: The checkbox can be positioned to the left or right of the label through the \`checkboxPosition\` prop
- **Size Variants**: Available in small (sm) and medium (md) sizes
- **Error State**: Visual feedback for validation errors through the \`hasError\` prop
- **Disabled State**: Support for disabled state with appropriate styling through the \`isDisabled\` prop

### Related Components
- **SoftIcon**: Used to display the check and minus icons
                `,
			},
		},
	},
	argTypes: {
		default: {
			description: 'The label text displayed next to the checkbox.',
			control: 'text',
		},
		isChecked: {
			description: 'Controls whether the checkbox is checked or not.',
			control: 'boolean',
		},
		isDisabled: {
			description: 'Disables the checkbox when set to true.',
			control: 'boolean',
		},
		hasError: {
			description: 'Shows error state styling when set to true.',
			control: 'boolean',
		},
		id: {
			description: 'Unique identifier for the checkbox input.',
			control: 'text',
		},
		variant: {
			description:
				'The visual variant of the checkbox (default or indeterminate).',
			control: 'select',
			options: checkboxVariant,
		},
		size: {
			description: 'The size of the checkbox (small or medium).',
			control: 'select',
			options: checkboxSize,
		},
		checkboxPosition: {
			description: 'The position of the checkbox (left or right).',
			control: 'select',
			options: ['left', 'right'],
		},
	},
	args: {
		default: 'Input label',
		id: 'default-checkbox',
		isChecked: false,
		isDisabled: false,
		hasError: false,
		variant: 'default',
		size: 'md',
		checkboxPosition: 'left',
	},
	decorators: [
		(): { template: string } => ({
			template: `
        <div style="width: 100%; height: 100px; display: grid; place-items: center;">
          <div>
            <story/>
          </div>
        </div>
      `,
		}),
	],
};
export default meta;

export const EmptyActive: StoryFn<typeof SoftCheckbox> = (args) => ({
	components: { SoftCheckbox },
	setup() {
		return { args };
	},
	template: `
        <SoftCheckbox
            :id="args.id"
            :is-checked="args.isChecked"
            :is-disabled="args.isDisabled"
            :has-error="args.hasError"
            :variant="args.variant"
						:checkbox-position="args.checkboxPosition"
            :size="args.size"
            @click="() => {args.isChecked = !args.isChecked}"
						@keydown.space="() => {args.isChecked = !args.isChecked}"
        >
            {{ args.default }}
        </SoftCheckbox>
    `,
});

export const CheckedActiveDefault = EmptyActive.bind({});
CheckedActiveDefault.args = {
	id: 'default-checkbox',
	variant: 'default',
	isChecked: true,
	isDisabled: false,
	hasError: false,
	default: 'Input label',
};

export const CheckedActiveIndeterminate = EmptyActive.bind({});
CheckedActiveIndeterminate.args = {
	id: 'default-checkbox',
	variant: 'indeterminate',
	isChecked: true,
	isDisabled: false,
	hasError: false,
	default: 'Input label',
};

export const EmptyDisabled = EmptyActive.bind({});
EmptyDisabled.args = {
	id: 'default-checkbox',
	variant: 'default',
	isChecked: false,
	isDisabled: true,
	hasError: false,
	default: 'Input label',
};

export const RightPosition = EmptyActive.bind({});
RightPosition.args = {
	id: 'default-checkbox',
	checkboxPosition: 'right',
};

export const CheckedDisabledDefault = EmptyActive.bind({});
CheckedDisabledDefault.args = {
	id: 'default-checkbox',
	variant: 'default',
	isChecked: true,
	isDisabled: true,
	hasError: false,
	default: 'Input label',
};

export const CheckedDisabledIndeterminate = EmptyActive.bind({});
CheckedDisabledIndeterminate.args = {
	id: 'default-checkbox',
	variant: 'indeterminate',
	isChecked: true,
	isDisabled: true,
	hasError: false,
	default: 'Input label',
};

export const WithError = EmptyActive.bind({});
WithError.args = {
	id: 'default-checkbox',
	variant: 'default',
	isChecked: false,
	isDisabled: false,
	hasError: true,
	default: 'Input label',
};

export const SmallSize = EmptyActive.bind({});
SmallSize.args = {
	id: 'default-checkbox',
	isChecked: false,
	isDisabled: false,
	hasError: false,
	default: 'Input label',
	size: 'sm',
};
