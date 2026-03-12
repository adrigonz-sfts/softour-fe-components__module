import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { ComponentProps } from 'vue-component-type-helpers';
import SoftTag from './SoftTag.vue';
import { SoftTagVariant } from './types/SoftTagVariant';

type SoftTagPropsAndCustomArgs = ComponentProps<typeof SoftTag>;

const tagVariants: SoftTagVariant[] = [
	'primary',
	'secondary',
	'neutral',
	'success',
	'warning',
	'error',
	'info',
];

const meta: Meta<SoftTagPropsAndCustomArgs> = {
	title: 'Atoms/SoftTag',
	component: SoftTag,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftTag\` component is a badge that uses only design tokens. Variants map to semantic colors.

#### Variants (token-based)
- **primary**: Brand default
- **secondary**: Brand secondary (darker)
- **neutral**: Light brand canvas, dark text
- **success**: Success semantic
- **warning**: Warning semantic
- **error**: Error semantic
- **info**: Info semantic
				`,
			},
		},
	},
	argTypes: {
		variant: {
			description: 'Visual style from design tokens.',
			control: 'select',
			options: tagVariants,
		},
		label: {
			description: 'Text content displayed within the tag.',
			control: 'text',
		},
	},
	args: {
		variant: 'primary',
		label: 'Label',
	},
	render: (args) => ({
		components: { SoftTag },
		setup() {
			return { args };
		},
		template: `
	    <SoftTag :variant="args.variant" :label="args.label" />`,
	}),
};
export default meta;

type Story = StoryObj<SoftTagPropsAndCustomArgs>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		label: 'Primary',
	},
};

export const AllVariants: Story = {
	render: () => ({
		components: { SoftTag },
		template: `
			<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
				<SoftTag variant="primary" label="Primary" />
				<SoftTag variant="secondary" label="Secondary" />
				<SoftTag variant="neutral" label="Neutral" />
				<SoftTag variant="success" label="Success" />
				<SoftTag variant="warning" label="Warning" />
				<SoftTag variant="error" label="Error" />
				<SoftTag variant="info" label="Info" />
			</div>
		`,
	}),
};
