import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SoftPillElevation } from './types/SoftPillElevation';
import { SoftPillSize } from './types/SoftPillSize';
import SoftPill from './SoftPill.vue';

const pillSize: SoftPillSize[] = ['sm', 'md', 'lg'];
const pillElevation: SoftPillElevation[] = ['strong', 'bold'];

const meta: Meta<typeof SoftPill> = {
	title: 'Atoms/SoftPill',
	component: SoftPill,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Pill/chip for filters, tags, or selected counts. Supports sizes, elevation (strong, bold), optional icon, and optional router link. Use for “All results”, category filters, or removable tags.',
			},
		},
	},
	argTypes: {
		size: { control: 'select', options: pillSize },
		elevation: { control: 'select', options: pillElevation },
		isSelected: { control: 'boolean' },
		to: { control: 'object' },
		iconName: { control: 'text' },
	},
	args: {
		default: 'All results',
	},
	render: (args) => ({
		components: { SoftPill },
		setup() {
			return { args };
		},
		template: `
			<SoftPill
				:size="args.size"
				:elevation="args.elevation"
				:isSelected="args.isSelected"
				:to="args.to"
				:iconName="args.iconName"
				:iconLabel="args.iconLabel"
				:iconPosition="args.iconPosition"
			>
				{{ args.default }}
			</SoftPill>
		`,
	}),
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: 'sm' },
};

export const Medium: Story = {
	args: { size: 'md' },
};

export const Large: Story = {
	args: { size: 'lg' },
};

export const Bold: Story = {
	args: { size: 'sm', elevation: 'bold' },
};

export const PillAsLink: Story = {
	args: {
		size: 'sm',
		to: { path: '/' },
	},
};

export const Selected: Story = {
	args: {
		size: 'sm',
		isSelected: true,
	},
};

export const PillWithIcon: Story = {
	args: {
		size: 'sm',
		iconName: 'funnel',
		iconLabel: 'Filter',
		default: 'Filters',
	},
};
