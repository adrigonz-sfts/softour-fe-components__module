import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftCell from './SoftCell.vue';

const meta = {
    title: 'Table/SoftCell',
    component: SoftCell,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Single table cell with optional heading role. Use inside SoftRow to build table body or header. Renders as `cell` or `columnheader` for accessibility.',
            },
        },
    },
    args: {
        isHeading: false,
    },
} satisfies Meta<typeof SoftCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { SoftCell },
        setup() {
            return { args };
        },
        template: '<SoftCell v-bind="args">Cell content</SoftCell>',
    }),
};

export const Heading: Story = {
    args: {
        isHeading: true,
    },
    render: (args) => ({
        components: { SoftCell },
        setup() {
            return { args };
        },
        template: '<SoftCell v-bind="args">Heading cell</SoftCell>',
    }),
};
