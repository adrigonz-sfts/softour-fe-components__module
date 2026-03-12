import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftIcon from './SoftIcon.vue';

const meta = {
    title: 'Icons/SoftIcon',
    component: SoftIcon,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Heroicon wrapper (outline or solid) with size and accessible `label`. Use inside buttons, inputs, or standalone when the icon has meaning. Decorative icons can use an empty label and sit in a container with role="presentation".',
            },
        },
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Heroicon name (e.g. pencil, trash, plus, funnel, chevronDown)',
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
        name: 'pencil',
        label: 'Edit',
        size: 'md',
        type: 'outline',
    },
} satisfies Meta<typeof SoftIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'pencil',
        label: 'Edit',
    },
};

export const Outline: Story = {
    args: {
        name: 'pencil',
        label: 'Edit',
        type: 'outline',
    },
};

export const Solid: Story = {
    args: {
        name: 'pencil',
        label: 'Edit',
        type: 'solid',
    },
};

export const Sizes: Story = {
    render: () => ({
        components: { SoftIcon },
        template: `
            <div style="display: flex; align-items: center; gap: 24px;">
                <SoftIcon name="pencil" label="Extra small" size="xs" />
                <SoftIcon name="pencil" label="Small" size="sm" />
                <SoftIcon name="pencil" label="Medium" size="md" />
                <SoftIcon name="pencil" label="Large" size="lg" />
            </div>
        `,
    }),
};

export const CommonIcons: Story = {
    render: () => ({
        components: { SoftIcon },
        template: `
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <SoftIcon name="pencil" label="Edit" />
                <SoftIcon name="trash" label="Delete" />
                <SoftIcon name="plus" label="Add" />
                <SoftIcon name="funnel" label="Filter" />
                <SoftIcon name="chevronDown" label="Expand" />
                <SoftIcon name="chevronUp" label="Collapse" />
            </div>
        `,
    }),
};
