import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftSlider from './SoftSlider.vue';
import type { SoftSliderProps } from './types/SoftSliderProps';

type StoryArgs = SoftSliderProps;

const meta: Meta<StoryArgs> = {
	title: 'Molecules/SoftSlider',
	component: SoftSlider,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Range slider with optional label, number input, and icon. Variants: default, compact, or effect (with reset-to-min). Use for volume, brightness, or any bounded numeric value.',
			},
		},
	},
	argTypes: {
		variant: { control: 'select', options: ['default', 'compact', 'effect'] },
		elevation: { control: 'select', options: ['bold', 'strong', 'deep'] },
	},
	args: {
		id: 'default-slider',
		label: 'Input label',
		min: 0,
		max: 100,
		value: 50,
		variant: 'default',
		showInput: true,
		showLabel: true,
		isDisabled: false,
		elevation: 'deep',
		step: 1,
		fullWidth: true,
	},
};

export default meta;

type Story = StoryObj<StoryArgs>;

const renderWithValue = (args: StoryArgs) => ({
	components: { SoftSlider },
	setup() {
		const value = ref(args.value);
		return { args, value, onUpdate: (v: number) => { value.value = v; }, onChange: (v: number) => { value.value = v; } };
	},
	template: '<SoftSlider :id="args.id" :label="args.label" :min="args.min" :max="args.max" :value="value" :variant="args.variant" :show-input="args.showInput" :show-label="args.showLabel" :is-disabled="args.isDisabled" :elevation="args.elevation" :step="args.step" :icon-name="args.iconName" :full-width="args.fullWidth" @update="onUpdate" @change="onChange" />',
});

export const Default: Story = { render: renderWithValue };
export const Compact: Story = { render: renderWithValue, args: { id: 'compact-slider', variant: 'compact', label: 'Input label', min: 0, max: 100, value: 50 } };
export const Effect: Story = { render: renderWithValue, args: { id: 'effect-slider', variant: 'effect', iconName: 'arrowPath', label: 'Input label', min: 0, max: 100, value: 50 } };
export const EffectWithBorders: Story = { render: renderWithValue, args: { id: 'effect-borders', variant: 'effect', fullWidth: false, label: 'Input label', min: 0, max: 100, value: 50 } };
