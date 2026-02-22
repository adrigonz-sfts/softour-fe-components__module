import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CustomTable from '../CustomTable/CustomTable.vue';
import CustomTablePanel from './CustomTablePanel.vue';

const headingRows = ['Company', 'Name', 'Country'];
const dataRows = Array.from({ length: 20 }).map((_, index) => [
    `${index + 1}`,
    `Company ${index + 1}`,
    index % 2 === 0 ? 'Spain' : 'Italy',
]);

const meta = {
    title: 'Table/CustomTablePanel',
    component: CustomTablePanel,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        title: 'Companies',
        subTitle: 'Demo table component',
    },
} satisfies Meta<typeof CustomTablePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { CustomTablePanel, CustomTable },
        setup() {
            return { args, headingRows, dataRows };
        },
        template: `
            <div style="padding: 24px;">
                <CustomTablePanel v-bind="args">
                    <template #filters>
                        <div style="display: flex; gap: 8px;">
                            <input placeholder="Search" style="padding: 8px;" />
                            <button type="button" style="padding: 8px 12px;">Apply</button>
                        </div>
                    </template>
                    <template #table>
                        <CustomTable :headingRows="headingRows" :dataRows="dataRows" />
                    </template>
                </CustomTablePanel>
            </div>
        `,
    }),
};
