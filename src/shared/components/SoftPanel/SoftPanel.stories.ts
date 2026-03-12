import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftTable from '../SoftTable/SoftTable.vue';
import SoftPanel from './SoftPanel.vue';

const headingRows = ['Company', 'Name', 'Country'];
const dataRows = Array.from({ length: 20 }).map((_, index) => [
    `${index + 1}`,
    `Company ${index + 1}`,
    index % 2 === 0 ? 'Spain' : 'Italy',
]);

const meta = {
    title: 'Table/SoftPanel',
    component: SoftPanel,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Container panel with optional title, subtitle, filters slot, and table slot. Use to wrap data tables or list views with a consistent header and toolbar area.',
            },
        },
    },
    args: {
        title: 'Companies',
        subTitle: 'Demo table component',
    },
} satisfies Meta<typeof SoftPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { SoftPanel, SoftTable },
        setup() {
            return { args, headingRows, dataRows };
        },
        template: `
            <div style="padding: 24px;">
                <SoftPanel v-bind="args">
                    <template #filters>
                        <div style="display: flex; gap: 8px;">
                            <input placeholder="Search" style="padding: 8px;" />
                            <button type="button" style="padding: 8px 12px;">Apply</button>
                        </div>
                    </template>
                    <template #table>
                        <SoftTable :headingRows="headingRows" :dataRows="dataRows" />
                    </template>
                </SoftPanel>
            </div>
        `,
    }),
};
