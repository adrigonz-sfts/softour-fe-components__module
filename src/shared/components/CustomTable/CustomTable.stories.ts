import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CustomTable from './CustomTable.vue';

const meta = {
    title: 'Table/CustomTable',
    component: CustomTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        headingRows: ['Company', 'Name', 'Country'],
        dataRows: [
            ['001', 'Acme Corp', 'Spain'],
            ['002', 'Globex', 'Germany'],
            ['003', 'Initech', 'France'],
        ],
    },
} satisfies Meta<typeof CustomTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyRows: Story = {
    args: {
        headingRows: ['Company', 'Name', 'Country'],
        dataRows: Array.from({ length: 40 }).map((_, index) => [
            `${index + 1}`,
            `Company ${index + 1}`,
            index % 2 === 0 ? 'Spain' : 'Portugal',
        ]),
    },
};

export const HiddenColumn: Story = {
    args: {
        headingRows: ['Id', 'Company', 'Country'],
        dataRows: [
            ['001', 'Acme Corp', 'Spain'],
            ['002', 'Globex', 'Germany'],
            ['003', 'Initech', 'France'],
        ],
        hiddenColumns: [1],
    },
};
