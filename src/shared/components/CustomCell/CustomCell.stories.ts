import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CustomCell from './CustomCell.vue';

const meta = {
    title: 'Table/CustomCell',
    component: CustomCell,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    args: {
        isHeading: false,
    },
} satisfies Meta<typeof CustomCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { CustomCell },
        setup() {
            return { args };
        },
        template: '<CustomCell v-bind="args">Cell content</CustomCell>',
    }),
};

export const Heading: Story = {
    args: {
        isHeading: true,
    },
    render: (args) => ({
        components: { CustomCell },
        setup() {
            return { args };
        },
        template: '<CustomCell v-bind="args">Heading cell</CustomCell>',
    }),
};
