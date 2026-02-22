import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import CustomCell from '../CustomCell.vue';

describe('CustomCell.vue', () => {
    it('renders slot content', async () => {
        const render = customRenderer(CustomCell).withSlots({
            default: 'Company Name',
        });

        await render.build();

        const content = screen.getByText('Company Name');
        const cell = content.closest('.custom-cell');

        expect(content).toBeInTheDocument();
        expect(cell).toHaveAttribute('role', 'cell');
    });

    it('adds heading modifier class when isHeading is true', async () => {
        const render = customRenderer(CustomCell)
            .withProps({ isHeading: true, colIndex: 2 })
            .withSlots({ default: 'Header Value' });

        await render.build();

        const content = screen.getByText('Header Value');
        const cell = content.closest('.custom-cell');

        expect(cell).toHaveClass('custom-cell--heading');
        expect(cell).toHaveAttribute('role', 'columnheader');
        expect(cell).toHaveAttribute('aria-colindex', '2');
    });
});
