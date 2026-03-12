import { within, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftRow from '../SoftRow.vue';

describe('SoftRow.vue', () => {
    it('renders one cell per value', async () => {
        const cells = ['A', 'B', 'C'];

        await customRenderer(SoftRow).withProps({ cells }).build();

        const row = screen.getByRole('row');

        expect(row).toBeInTheDocument();
        expect(within(row).getByText('A')).toBeInTheDocument();
        expect(within(row).getByText('B')).toBeInTheDocument();
        expect(within(row).getByText('C')).toBeInTheDocument();
        expect(within(row).getAllByRole('cell')).toHaveLength(cells.length);
    });

    it('adds heading class when isHeading is true', async () => {
        await customRenderer(SoftRow)
            .withProps({ cells: ['Header'], isHeading: true })
            .build();

        const row = screen.getByRole('row');

        expect(row).toHaveClass('soft-row--heading');
        expect(within(row).getByRole('columnheader', { name: 'Header' })).toBeInTheDocument();
    });

    it('hides cells by index when hiddenColumns is provided', async () => {
        await customRenderer(SoftRow)
            .withProps({ cells: ['A', 'B', 'C'], hiddenColumns: [1] })
            .build();

        const row = screen.getByRole('row');

        expect(within(row).getByText('A')).toBeInTheDocument();
        expect(within(row).queryByText('B')).not.toBeInTheDocument();
        expect(within(row).getByText('C')).toBeInTheDocument();
        expect(within(row).getAllByRole('cell')).toHaveLength(2);
    });
});
