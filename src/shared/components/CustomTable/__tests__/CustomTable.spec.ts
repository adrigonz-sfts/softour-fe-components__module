import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import CustomTable from '../CustomTable.vue';

describe('CustomTable.vue', () => {
    it('renders heading row and data rows', async () => {
        const headingRows = ['Company', 'Name'];
        const dataRows = [
            ['1', 'Acme'],
            ['2', 'Globex'],
        ];

        const render = customRenderer(CustomTable).withProps({
            headingRows,
            dataRows,
        });

        await render.build();

        const table = screen.getByRole('table', { name: 'Custom data table' });
        expect(table).toBeInTheDocument();
        expect(table).toHaveAttribute('aria-colcount', '2');
        expect(table).toHaveAttribute('aria-rowcount', '3');
        expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
        expect(screen.getAllByRole('row')).toHaveLength(3);
        expect(screen.getAllByRole('columnheader')).toHaveLength(2);
        expect(screen.getAllByRole('cell')).toHaveLength(4);
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Acme')).toBeInTheDocument();
        expect(screen.getByText('Globex')).toBeInTheDocument();
        expect(document.querySelectorAll('.custom-row')).toHaveLength(dataRows.length + 1);
    });

    it('renders default table data when props are not provided', async () => {
        const render = customRenderer(CustomTable);
        await render.build();

        const table = screen.getByRole('table', { name: 'Custom data table' });
        expect(table).toHaveAttribute('aria-colcount', '3');
        expect(table).toHaveAttribute('aria-rowcount', '2');
        expect(screen.getByText('Heading Row 1 - Cell 1')).toBeInTheDocument();
        expect(screen.getByText('Row 1 - Cell 1')).toBeInTheDocument();
    });

    it('hides columns by index when hiddenColumns is provided', async () => {
        const render = customRenderer(CustomTable).withProps({
            headingRows: ['Id', 'Company', 'Country'],
            dataRows: [
                ['001', 'Acme', 'Spain'],
                ['002', 'Globex', 'Germany'],
            ],
            hiddenColumns: [1],
        });

        await render.build();

        const table = screen.getByRole('table', { name: 'Custom data table' });
        expect(table).toHaveAttribute('aria-colcount', '2');
        expect(screen.queryByText('Company')).not.toBeInTheDocument();
        expect(screen.queryByText('Acme')).not.toBeInTheDocument();
        expect(screen.getByText('Id')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(2);
        expect(screen.getAllByRole('cell')).toHaveLength(4);
    });
});
