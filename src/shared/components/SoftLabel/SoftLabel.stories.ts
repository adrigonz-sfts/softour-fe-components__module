import type { Meta, StoryFn } from '@storybook/vue3-vite';
import SoftLabel from './SoftLabel.vue';

const meta: Meta<typeof SoftLabel> = {
	title: 'Atoms/SoftLabel',
	component: SoftLabel,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Form label that associates text with a control via the `for` prop. Use with inputs, dropdowns, or any focusable form element. Supports visually hidden label (e.g. for SoftInput with `hideLabel`) while staying accessible.',
			},
		},
	},
	argTypes: {
		for: {
			description: 'The ID of the form control this label is associated with.',
			control: 'text',
		},
	},
	args: {
		for: 'input-id',
	},
};

export default meta;

export const Default: StoryFn<typeof SoftLabel> = (args) => ({
	components: { SoftLabel },
	setup() {
		return { args };
	},
	template: `
		<SoftLabel :for="args.for">
			{{ args.default }}
		</SoftLabel>
	`,
	args: {
		default: 'Input label',
	},
});
