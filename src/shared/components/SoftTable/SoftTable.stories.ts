import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftTable from './SoftTable.vue';

const meta = {
    title: 'Table/SoftTable',
    component: SoftTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Data table with heading and data rows. Use for tabular data with consistent semantics (role="table", rowgroup, row, cell). Supports optional hidden columns via `hiddenColumns`.',
            },
        },
    },
    args: {
        headingRows: ['Company', 'Name', 'Country'],
        dataRows: [
            ['001', 'Acme Corp', 'Spain'],
            ['002', 'Globex', 'Germany'],
            ['003', 'Initech', 'France'],
        ],
    },
} satisfies Meta<typeof SoftTable>;

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
