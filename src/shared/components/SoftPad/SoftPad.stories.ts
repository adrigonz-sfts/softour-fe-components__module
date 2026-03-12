import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftPad from './SoftPad.vue';
import type { SoftPadProps } from './types/SoftPadProps';

type StoryArgs = SoftPadProps;

const DEFAULT_PAD_VALUE = 50;

const meta: Meta<StoryArgs> = {
	title: 'Molecules/SoftPad',
	component: SoftPad,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'2D pad for X/Y values (e.g. pan/tilt, position). Drag or click to set; optional number inputs. Use for camera controls, mixers, or any dual-axis input.',
			},
		},
	},
	args: {
		id: 'storybook-soft-pad',
		value: [DEFAULT_PAD_VALUE, DEFAULT_PAD_VALUE],
		label: ['X', 'Y'],
		hideInputs: false,
	},
	decorators: [
		() => ({
			template: '<div style="width:100%;min-height:350px;display:grid;place-items:center;padding:2rem"><div style="width:300px"><story /></div></div>',
		}),
	],
};

export default meta;

type Story = StoryObj<StoryArgs>;

function makeRender() {
	return (args: StoryArgs) => ({
		components: { SoftPad },
		setup() {
			const value = ref<[number, number]>(args.value);
			return {
				args,
				value,
				onUpdate: (px: number, py: number) => { value.value = [px, py]; },
				onChange: (px: number, py: number) => { value.value = [px, py]; },
			};
		},
		template: '<SoftPad :id="args.id" :value="value" :label="args.label" :hide-inputs="args.hideInputs" @update="onUpdate" @change="onChange" />',
	});
}

export const Default: Story = { render: makeRender() };
export const CustomLabels: Story = {
	render: makeRender(),
	args: {
		id: 'custom-pad',
		value: [DEFAULT_PAD_VALUE, DEFAULT_PAD_VALUE],
		label: ['Pan', 'Tilt'],
	},
};
export const HiddenInputs: Story = {
	render: makeRender(),
	args: {
		id: 'hidden-pad',
		value: [DEFAULT_PAD_VALUE, DEFAULT_PAD_VALUE],
		hideInputs: true,
	},
};
