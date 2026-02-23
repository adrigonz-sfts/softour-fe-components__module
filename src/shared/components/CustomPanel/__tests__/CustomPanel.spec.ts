import { screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer.ts';
import CustomPanel from '../CustomPanel.vue';

describe('CustomPanel.vue', () => {
    it('renders the title and subtitle when provided', async () => {
        const render = customRenderer(CustomPanel).withProps({
            title: 'Main Title',
            subTitle: 'Subtitle',
        });
        await render.build();

        const titleElement = screen.getByText('Main Title');
        const subTitleElement = screen.getByText('Subtitle');

        expect(titleElement).toBeInTheDocument();
        expect(subTitleElement).toBeInTheDocument();
    });

    it('does not render filters and renders table by default', async () => {
        const render = customRenderer(CustomPanel)
            .withProps({
                title: 'Main Title',
            })
            .withSlots({
                filters: '<div>Default Slot Content</div>',
                table: '<div>Table Slot Content</div>',
            });

        await render.build();
        const slotFilters = screen.queryByText('Default Slot Content');
        const slotTable = screen.queryByText('Table Slot Content');

        expect(slotFilters).not.toBeInTheDocument();
        expect(slotTable).toBeInTheDocument();
    });

    it('toggles filters and collapse table content', async () => {
        const render = customRenderer(CustomPanel)
            .withProps({
                title: 'Main Title',
            })
            .withSlots({
                filters: '<div>Default Slot Content</div>',
                table: '<div>Table Slot Content</div>',
            });

        await render.build();

        const filterButton = screen.getByRole('button', { name: /open filters/i });
        const collapseButton = screen.getByRole('button', { name: /collapse/i });
        await userEvent.click(filterButton);
        const slotFilters = screen.getByText('Default Slot Content');

        await userEvent.click(collapseButton);
        const slotTable = screen.queryByText('Table Slot Content');

        expect(slotFilters).toBeInTheDocument();
        expect(slotTable).not.toBeInTheDocument();
    });

    it('Not renders filter button if not filter slot is present', async () => {
        const render = customRenderer(CustomPanel)
            .withProps({
                title: 'Main Title',
            })
            .withSlots({
                table: '<div>Table Slot Content</div>',
            });

        await render.build();

        const filterButton = screen.queryByRole('button', { name: /open filters/i });
        expect(filterButton).not.toBeInTheDocument();
    });
});
