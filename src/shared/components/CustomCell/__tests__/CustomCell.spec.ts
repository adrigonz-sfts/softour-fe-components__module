import { within, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import CustomCell from '../CustomCell.vue';

describe('CustomCell.vue', () => {
    it('renders slot content', async () => {
        await customRenderer(CustomCell).withSlots({ default: 'Company Name' }).build();

        const cell = screen.getByRole('cell');

        expect(cell).toHaveAttribute('role', 'cell');
        expect(within(cell).getByText('Company Name')).toBeInTheDocument();
    });

    it('adds heading modifier class when isHeading is true', async () => {
        await customRenderer(CustomCell)
            .withProps({ isHeading: true, colIndex: 2 })
            .withSlots({ default: 'Header Value' })
            .build();

        const cell = screen.getByRole('columnheader');

        expect(cell).toHaveClass('custom-cell--heading');
        expect(cell).toHaveAttribute('role', 'columnheader');
        expect(cell).toHaveAttribute('aria-colindex', '2');
        expect(within(cell).getByText('Header Value')).toBeInTheDocument();
    });
});
