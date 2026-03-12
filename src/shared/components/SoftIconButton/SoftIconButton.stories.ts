import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftIconButton from './SoftIconButton.vue';

const meta = {
    title: 'Buttons/SoftIconButton',
    component: SoftIconButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Icon-only button with Heroicon and accessible label. Use for toolbar actions (edit, delete, filter). Variants: icon (color on hover) or button (background on hover). Always set `label` for screen readers.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['icon', 'button'],
            description: 'icon = color change on hover; button = background change on hover',
        },
        iconName: {
            control: 'text',
            description: 'Heroicon name (e.g. pencil, plus, trash, funnel)',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
        },
        type: {
            control: 'radio',
            options: ['outline', 'solid'],
        },
    },
    args: {
        iconName: 'pencil',
        label: 'Edit',
        variant: 'icon',
        size: 'md',
        type: 'outline',
        disabled: false,
    },
} satisfies Meta<typeof SoftIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        iconName: 'pencil',
        label: 'Edit',
    },
};

export const IconVariant: Story = {
    args: {
        iconName: 'funnel',
        label: 'Open filters',
        variant: 'icon',
    },
};

export const ButtonVariant: Story = {
    args: {
        iconName: 'plus',
        label: 'Add new',
        variant: 'button',
    },
};

export const Sizes: Story = {
    render: () => ({
        components: { SoftIconButton },
        template: `
            <div style="display: flex; align-items: center; gap: 16px;">
                <SoftIconButton iconName="pencil" label="Extra small" size="xs" />
                <SoftIconButton iconName="pencil" label="Small" size="sm" />
                <SoftIconButton iconName="pencil" label="Medium" size="md" />
                <SoftIconButton iconName="pencil" label="Large" size="lg" />
            </div>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        iconName: 'trash',
        label: 'Delete',
        disabled: true,
    },
};

export const SolidIcon: Story = {
    args: {
        iconName: 'chevronDown',
        label: 'Expand',
        type: 'solid',
    },
};
