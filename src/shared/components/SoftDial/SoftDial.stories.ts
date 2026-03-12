import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftDial from './SoftDial.vue';
import type { SoftDialProps } from './types/SoftDialProps';

type StoryArgs = SoftDialProps & { value: number };

const meta: Meta<StoryArgs> = {
	title: 'Molecules/SoftDial',
	component: SoftDial,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
\`SoftDial\` is a circular dial for adjusting numerical values (wheel, drag, click-to-set, editable input).

- **id**, **label**, **min**, **max**, **value** (required)
- **step**, **originValue**, **defaultValue**, **size** ('sm' | 'lg'), **hoverable**, **hideInput**, **hideLabel**
- Events: **update**, **change**, **dragStateChange**
				`,
			},
		},
	},
	argTypes: {
		size: { control: 'select', options: ['sm', 'lg'] },
	},
	args: {
		id: 'storybook-soft-dial',
		label: 'Dial Label',
		min: 0,
		max: 100,
		step: 1,
		value: 0,
		originValue: 0,
		defaultValue: 0,
		size: 'lg',
		hoverable: false,
		hideInput: false,
		hideLabel: false,
	},
	decorators: [
		() => ({
			template: `
				<div style="width: 100%; min-height: 200px; display: grid; place-items: center;">
					<story />
				</div>
			`,
		}),
	],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
	render: (args) => ({
		components: { SoftDial },
		setup() {
			const value = ref(args.value);
			return {
				args,
				value,
				onUpdate: (v: number) => { value.value = v; },
				onChange: (v: number) => { value.value = v; },
			};
		},
		template: `
			<SoftDial
				:id="args.id"
				:label="args.label"
				:min="args.min"
				:max="args.max"
				:step="args.step"
				:value="value"
				:origin-value="args.originValue"
				:default-value="args.defaultValue"
				:size="args.size"
				:hoverable="args.hoverable"
				:hide-input="args.hideInput"
				:hide-label="args.hideLabel"
				@update="onUpdate"
				@change="onChange"
			/>
		`,
	}),
};

export const SmallSize: Story = {
	...Default,
	args: { ...Default.args, size: 'sm', value: 50, label: 'Small Dial' },
};

export const Hoverable: Story = {
	...Default,
	args: { ...Default.args, hoverable: true, value: 50, label: 'Hoverable Dial' },
};

export const HiddenInput: Story = {
	...Default,
	args: { ...Default.args, hideInput: true, value: 50, label: 'Hidden Input' },
};

export const HiddenLabel: Story = {
	...Default,
	args: { ...Default.args, hideLabel: true, value: 50 },
};

export const CustomRange: Story = {
	...Default,
	args: { ...Default.args, min: -100, max: 100, value: 0, label: 'Custom Range' },
};
