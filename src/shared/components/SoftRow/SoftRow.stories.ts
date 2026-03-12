import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftRow from './SoftRow.vue';

const meta = {
    title: 'Table/SoftRow',
    component: SoftRow,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Table row built from a list of cell values. Use with SoftTable; set `isHeading` for header rows. Exposes `role="row"` and passes heading flag to cells.',
            },
        },
    },
    args: {
        cells: ['Company', 'Name', 'Country'],
        isHeading: false,
        rowIndex: 2,
    },
} satisfies Meta<typeof SoftRow>;

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
