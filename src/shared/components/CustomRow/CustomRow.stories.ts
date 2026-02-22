import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CustomRow from './CustomRow.vue';

const meta = {
    title: 'Table/CustomRow',
    component: CustomRow,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    args: {
        cells: ['Company', 'Name', 'Country'],
        isHeading: false,
        rowIndex: 2,
    },
} satisfies Meta<typeof CustomRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Heading: Story = {
    args: {
        cells: ['Header 1', 'Header 2', 'Header 3'],
        isHeading: true,
        rowIndex: 1,
    },
};
