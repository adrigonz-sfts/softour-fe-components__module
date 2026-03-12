import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftToggleSwitch from './SoftToggleSwitch.vue';

const meta: Meta<typeof SoftToggleSwitch> = {
	title: 'Atoms/SoftToggleSwitch',
	component: SoftToggleSwitch,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftToggleSwitch\` is an accessible switch for binary on/off states. Use for settings or preferences.

- **Label**: Use \`isLabelVisible\` and \`labelPosition\` (left/right).
- **Full width**: \`isFull\` for full-width layout.
- **Disabled**: Use the \`disabled\` prop.
				`,
			},
		},
	},
	argTypes: {
		id: { control: 'text' },
		isChecked: { control: 'boolean' },
		label: { control: 'text' },
		isLabelVisible: { control: 'boolean' },
		labelPosition: { control: 'select', options: ['left', 'right'] },
		isFull: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: {
		id: 'default-toggle',
		isChecked: false,
		label: 'Toggle switch',
		isLabelVisible: false,
		labelPosition: 'right',
		isFull: false,
		disabled: false,
	},
};

export default meta;

interface DefaultArgs {
	id: string;
	isChecked: boolean;
	label: string;
	isLabelVisible: boolean;
	labelPosition: 'left' | 'right';
	isFull: boolean;
	disabled: boolean;
}

export const Default: StoryFn<typeof SoftToggleSwitch> = (args: DefaultArgs) => ({
	components: { SoftToggleSwitch },
	setup() {
		const isChecked = ref<boolean>(args.isChecked);
		const toggle = () => {
			isChecked.value = !isChecked.value;
		};
		return { args, isChecked, toggle };
	},
	template: `
		<SoftToggleSwitch
			:id="args.id"
			:is-checked="isChecked"
			:label="args.label"
			:is-label-visible="args.isLabelVisible"
			:label-position="args.labelPosition"
			:is-full="args.isFull"
			:disabled="args.disabled"
			@click="toggle"
		/>
	`,
});

export const WithRightLabel: StoryFn<typeof SoftToggleSwitch> = (_args) => ({
	components: { SoftToggleSwitch },
	setup() {
		const isChecked = ref(false);
		return { isChecked, toggle: () => (isChecked.value = !isChecked.value) };
	},
	template: `
		<SoftToggleSwitch
			id="right-label-toggle"
			:is-checked="isChecked"
			label="Right label toggle switch"
			:is-label-visible="true"
			label-position="right"
			@click="toggle"
		/>
	`,
});

export const WithLeftLabel: StoryFn<typeof SoftToggleSwitch> = (_args) => ({
	components: { SoftToggleSwitch },
	setup() {
		const isChecked = ref(false);
		return { isChecked, toggle: () => (isChecked.value = !isChecked.value) };
	},
	template: `
		<SoftToggleSwitch
			id="left-label-toggle"
			:is-checked="isChecked"
			label="Left label toggle switch"
			:is-label-visible="true"
			label-position="left"
			@click="toggle"
		/>
	`,
});

export const Disabled: StoryFn<typeof SoftToggleSwitch> = (_args) => ({
	components: { SoftToggleSwitch },
	setup() {
		return {};
	},
	template: `
		<SoftToggleSwitch
			id="disabled-toggle"
			:is-checked="false"
			label="Disabled toggle switch"
			:disabled="true"
		/>
	`,
});

export const WithSlot: StoryFn<typeof SoftToggleSwitch> = (_args) => ({
	components: { SoftToggleSwitch },
	setup() {
		const isChecked = ref(false);
		return { isChecked, toggle: () => (isChecked.value = !isChecked.value) };
	},
	template: `
		<SoftToggleSwitch
			id="slot-toggle"
			:is-checked="isChecked"
			label="Toggle switch"
			:is-label-visible="true"
			label-position="left"
			@click="toggle"
		>
			Input label
		</SoftToggleSwitch>
	`,
});
