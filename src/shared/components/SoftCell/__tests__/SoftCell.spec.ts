import { within, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftCell from '../SoftCell.vue';

describe('SoftCell.vue', () => {
    it('renders slot content', async () => {
        await customRenderer(SoftCell).withSlots({ default: 'Company Name' }).build();

        const cell = screen.getByRole('cell');

        expect(cell).toHaveAttribute('role', 'cell');
        expect(within(cell).getByText('Company Name')).toBeInTheDocument();
    });

    it('adds heading modifier class when isHeading is true', async () => {
        await customRenderer(SoftCell)
            .withProps({ isHeading: true, colIndex: 2 })
            .withSlots({ default: 'Header Value' })
            .build();

        const cell = screen.getByRole('columnheader');

        expect(cell).toHaveClass('soft-cell--heading');
        expect(cell).toHaveAttribute('role', 'columnheader');
        expect(cell).toHaveAttribute('aria-colindex', '2');
        expect(within(cell).getByText('Header Value')).toBeInTheDocument();
    });
});
