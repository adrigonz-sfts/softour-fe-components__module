import type { Meta, StoryObj, StoryFn } from '@storybook/vue3-vite';
import type { ComponentProps } from 'vue-component-type-helpers';
import SoftSkeleton from './SoftSkeleton.vue';

type SoftSkeletonProps = ComponentProps<typeof SoftSkeleton>;

const skeletonColors: SoftSkeletonProps['color'][] = ['light', 'default', 'medium', 'strong'];
const skeletonRadii: SoftSkeletonProps['radius'][] = ['sm', 'md', 'lg', 'xl', 'circle'];

const meta: Meta<SoftSkeletonProps> = {
	title: 'Atoms/SoftSkeleton',
	component: SoftSkeleton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
\`SoftSkeleton\` is a placeholder for loading states. Uses design tokens for color and radius.

- **color**: light | default | medium | strong (token-based)
- **radius**: sm | md | lg | xl | circle
- **width** / **height**: CSS values (e.g. \`100%\`, \`24px\`)
- **default slot**: Optional inner content (e.g. nested skeletons)
				`,
			},
		},
	},
	argTypes: {
		label: { control: 'text' },
		width: { control: 'text' },
		height: { control: 'text' },
		color: { control: 'select', options: skeletonColors },
		radius: { control: 'select', options: skeletonRadii },
	},
	args: {
		label: 'Loading',
		width: '100%',
		height: '24px',
		color: 'default',
		radius: 'sm',
	},
};

export default meta;

type Story = StoryObj<SoftSkeletonProps>;

export const Box: Story = {
	args: {
		label: 'Loading',
		width: '200px',
		height: '300px',
		color: 'default',
		radius: 'sm',
	},
};

export const WithNestedSkeletons: StoryFn = () => ({
	components: { SoftSkeleton },
	template: `
		<div style="padding: 16px; border: 1px solid var(--border-color-subtle); border-radius: var(--border-radius-md); width: 300px;">
			<SoftSkeleton
				label="Loading user card"
				width="100%"
				height="auto"
				color="light"
				radius="sm"
				style="gap: 12px; padding: 8px;"
			>
				<SoftSkeleton
					label="Avatar"
					width="48px"
					height="48px"
					color="medium"
					radius="circle"
				/>
				<SoftSkeleton
					label="User info"
					width="100%"
					height="auto"
					color="light"
					radius="sm"
					style="flex-direction: column; gap: 8px; padding: 4px;"
				>
					<SoftSkeleton label="Name" width="120px" height="16px" color="strong" radius="sm" />
					<SoftSkeleton label="Email" width="180px" height="14px" color="medium" radius="sm" />
				</SoftSkeleton>
			</SoftSkeleton>
		</div>
	`,
});
