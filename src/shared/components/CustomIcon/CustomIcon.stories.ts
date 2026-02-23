import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CustomIcon from './CustomIcon.vue';

const meta = {
    title: 'Icons/CustomIcon',
    component: CustomIcon,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
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
} satisfies Meta<typeof CustomIcon>;

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
        components: { CustomIcon },
        template: `
            <div style="display: flex; align-items: center; gap: 24px;">
                <CustomIcon name="pencil" label="Extra small" size="xs" />
                <CustomIcon name="pencil" label="Small" size="sm" />
                <CustomIcon name="pencil" label="Medium" size="md" />
                <CustomIcon name="pencil" label="Large" size="lg" />
            </div>
        `,
    }),
};

export const CommonIcons: Story = {
    render: () => ({
        components: { CustomIcon },
        template: `
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <CustomIcon name="pencil" label="Edit" />
                <CustomIcon name="trash" label="Delete" />
                <CustomIcon name="plus" label="Add" />
                <CustomIcon name="funnel" label="Filter" />
                <CustomIcon name="chevronDown" label="Expand" />
                <CustomIcon name="chevronUp" label="Collapse" />
            </div>
        `,
    }),
};
