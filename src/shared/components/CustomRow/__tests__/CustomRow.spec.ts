import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import CustomRow from '../CustomRow.vue';

describe('CustomRow.vue', () => {
    it('renders one cell per value', async () => {
        const cells = ['A', 'B', 'C'];

        const render = customRenderer(CustomRow).withProps({ cells });
        await render.build();

        const row = document.querySelector('.custom-row');
        expect(row).toHaveAttribute('role', 'row');
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
        expect(document.querySelectorAll('[role="cell"]')).toHaveLength(cells.length);
        expect(document.querySelectorAll('.custom-cell')).toHaveLength(cells.length);
    });

    it('adds heading class when isHeading is true', async () => {
        const render = customRenderer(CustomRow).withProps({
            cells: ['Header'],
            isHeading: true,
        });

        await render.build();

        const row = document.querySelector('.custom-row');
        expect(row).toHaveClass('custom-row--heading');
        expect(screen.getByRole('columnheader', { name: 'Header' })).toBeInTheDocument();
    });

    it('hides cells by index when hiddenColumns is provided', async () => {
        const render = customRenderer(CustomRow).withProps({
            cells: ['A', 'B', 'C'],
            hiddenColumns: [1],
        });

        await render.build();

        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.queryByText('B')).not.toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
        expect(document.querySelectorAll('[role="cell"]')).toHaveLength(2);
    });
});
