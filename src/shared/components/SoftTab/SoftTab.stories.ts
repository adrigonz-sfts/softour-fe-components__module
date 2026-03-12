import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SoftTab from './SoftTab.vue';

const meta: Meta<typeof SoftTab> = {
    title: 'Atoms/SoftTab',
    component: SoftTab,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The \`SoftTab\` component is a navigation element that represents a single tab within a tabbed interface.
It provides a clickable link or button with an icon (Heroicons) and text label, supporting active and disabled states.

### Usage
- Main navigation menus
- Tabbed content areas

### States
- **Default**: Inactive and enabled
- **Active**: Currently selected
- **Disabled**: Non-clickable
				`,
            },
        },
    },
    argTypes: {
        iconName: {
            description: 'Heroicons icon name (e.g. home, speakerWave, cog6Tooth).',
            control: 'text',
        },
        variant: {
            description: 'Visual tab style (underline or filled background).',
            control: 'select',
            options: ['underline', 'filled'],
        },
        text: { description: 'The text label displayed in the tab.', control: 'text' },
        isActive: {
            description: 'Whether the tab is currently active/selected.',
            control: 'boolean',
        },
        disabled: {
            description: 'Whether the tab is disabled and non-clickable.',
            control: 'boolean',
        },
        to: { description: 'The route destination (router-link when set).', control: 'text' },
    },
    args: {
        iconName: 'home',
        variant: 'underline',
        text: 'Home',
        isActive: false,
        disabled: false,
        to: '/',
    },
};

export default meta;

export const Default: StoryFn<typeof SoftTab> = (args) => ({
    components: { SoftTab },
    setup() {
        return { args };
    },
    template: `
		<SoftTab
			:icon-name="args.iconName"
			:variant="args.variant"
			:text="args.text"
			:is-active="args.isActive"
			:disabled="args.disabled"
			:to="args.to"
		/>
	`,
});

export const Active: StoryFn<typeof SoftTab> = Default.bind({});
Active.args = {
    iconName: 'speakerWave',
    variant: 'underline',
    text: 'Sounds',
    isActive: true,
    to: '/sounds',
};

export const Filled: StoryFn<typeof SoftTab> = Default.bind({});
Filled.args = {
    iconName: 'speakerWave',
    variant: 'filled',
    text: 'Sounds',
    isActive: false,
    to: '/sounds',
};

export const FilledActive: StoryFn<typeof SoftTab> = Default.bind({});
FilledActive.args = {
    iconName: 'speakerWave',
    variant: 'filled',
    text: 'Sounds',
    isActive: true,
    to: '/sounds',
};

export const Disabled: StoryFn<typeof SoftTab> = Default.bind({});
Disabled.args = {
    iconName: 'speakerWave',
    text: 'Sounds',
    isActive: false,
    disabled: true,
    to: '/sounds',
};

export const ActiveDisabled: StoryFn<typeof SoftTab> = Default.bind({});
ActiveDisabled.args = {
    iconName: 'speakerWave',
    text: 'Sounds',
    isActive: true,
    disabled: true,
    to: '/sounds',
};

export const AsAButton: StoryFn<typeof SoftTab> = Default.bind({});
AsAButton.args = {
    iconName: 'speakerWave',
    text: 'Sounds',
    isActive: false,
    to: undefined,
};

export const TabGroup: StoryFn<typeof SoftTab> = (args) => ({
    components: { SoftTab },
    setup() {
        const activeTab = ref<string>('home');

        const handleTabClick = (tabName: string) => {
            if (tabName !== 'settings') {
                activeTab.value = tabName;
            }
        };

        return { args, activeTab, handleTabClick };
    },
    template: `
		<div style="display: flex; gap: 8px; padding: 16px; background: var(--color-surface-base);">
			<SoftTab
				icon-name="home"
				text="Home"
				:is-active="activeTab === 'home'"
				to="/"
				@click="handleTabClick('home')"
			/>
			<SoftTab
				icon-name="speakerWave"
				text="Sounds"
				:is-active="activeTab === 'sounds'"
				to="/sounds"
				@click="handleTabClick('sounds')"
			/>
			<SoftTab
				icon-name="cog6Tooth"
				text="Settings"
				:is-active="activeTab === 'settings'"
				:disabled="true"
				to="/settings"
				@click="handleTabClick('settings')"
			/>
			<SoftTab
				icon-name="home"
				text="Button"
				:is-active="activeTab === 'home'"
				@click="handleTabClick('home')"
			/>
			<SoftTab
				icon-name="squares2x2"
				text="Button"
				:is-active="activeTab === 'settings'"
				@click="handleTabClick('settings')"
			/>
			<SoftTab
				icon-name="speakerWave"
				text="Button"
				:disabled="true"
				:is-active="activeTab === 'sounds'"
				@click="handleTabClick('sounds')"
			/>
		</div>
	`,
});
TabGroup.parameters = {
    docs: {
        description: {
            story: 'An interactive group of tabs demonstrating different states. The Settings tab is disabled and cannot be activated.',
        },
    },
};
