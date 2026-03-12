import type { Meta, StoryFn } from '@storybook/vue3-vite';
import SoftToggleButton from './SoftToggleButton.vue';

const meta: Meta<typeof SoftToggleButton> = {
	title: 'Atoms/SoftToggleButton',
	component: SoftToggleButton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftToggleButton\` is a toggle button that uses the same variants as \`SoftButton\`: **primary** (filled) and **secondary** (outline). Used for settings, filters, and mode switches.

When \`iconName\` is set, the icon shows **outline** when inactive and **solid** when \`isActive\` is true.

### Variants (match SoftButton)
- **primary**: Same as SoftButton primary
- **secondary**: Same as SoftButton secondary

### State indicator
Optional dot: **warning**, **danger**, **success**, or **none**.
				`,
			},
		},
	},
	argTypes: {
		variant: { control: 'select', options: ['primary', 'secondary'] },
		state: { control: 'select', options: ['none', 'warning', 'danger', 'success'] },
		isActive: { control: 'boolean' },
		isDisabled: { control: 'boolean' },
		label: { control: 'text' },
		iconName: { control: 'text', description: 'Heroicon name; outline when inactive, solid when active' },
	},
	args: {
		variant: 'primary',
		state: 'none',
		isActive: false,
		isDisabled: false,
		label: 'Toggle Button',
		iconName: 'speakerWave',
	},
};

export default meta;

export const Default: StoryFn<typeof SoftToggleButton> = (args) => ({
	components: { SoftToggleButton },
	setup() {
		return { args };
	},
	template: `
		<SoftToggleButton
			:variant="args.variant"
			:state="args.state"
			:is-active="args.isActive"
			:is-disabled="args.isDisabled"
			:label="args.label"
			:icon-name="args.iconName"
		/>
	`,
});

export const Pressed: StoryFn<typeof SoftToggleButton> = Default.bind({});
Pressed.args = {
	label: 'Active Toggle',
	isActive: true,
};

export const Secondary: StoryFn<typeof SoftToggleButton> = Default.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'Secondary Toggle',
};

export const Disabled: StoryFn<typeof SoftToggleButton> = Default.bind({});
Disabled.args = {
	label: 'Disabled Toggle',
	isDisabled: true,
};

export const PressedDisabled: StoryFn<typeof SoftToggleButton> = Default.bind({});
PressedDisabled.args = {
	label: 'Active Disabled Toggle',
	isActive: true,
	isDisabled: true,
};

export const WithStateIndicator: StoryFn<typeof SoftToggleButton> = Default.bind({});
WithStateIndicator.args = {
	label: 'Toggle with danger state',
	state: 'danger',
};
