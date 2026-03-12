import { screen, within } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftTable from '../SoftTable.vue';

describe('SoftTable.vue', () => {
    it('renders heading row and data rows', async () => {
        const headingRows = ['Company', 'Name'];
        const dataRows = [
            ['1', 'Acme'],
            ['2', 'Globex'],
        ];

        await customRenderer(SoftTable)
            .withProps({ headingRows, dataRows })
            .build();

        const table = screen.getByRole('table', { name: 'Soft data table' });

        expect(table).toBeInTheDocument();
        expect(table).toHaveAttribute('aria-colcount', '2');
        expect(table).toHaveAttribute('aria-rowcount', '3');
        expect(within(table).getAllByRole('rowgroup')).toHaveLength(2);
        expect(within(table).getAllByRole('row')).toHaveLength(dataRows.length + 1);
        expect(within(table).getAllByRole('columnheader')).toHaveLength(2);
        expect(within(table).getAllByRole('cell')).toHaveLength(4);
        expect(within(table).getByText('Company')).toBeInTheDocument();
        expect(within(table).getByText('Name')).toBeInTheDocument();
        expect(within(table).getByText('Acme')).toBeInTheDocument();
        expect(within(table).getByText('Globex')).toBeInTheDocument();
    });

    it('renders default table data when props are not provided', async () => {
        await customRenderer(SoftTable).build();

        const table = screen.getByRole('table', { name: 'Soft data table' });

        expect(table).toHaveAttribute('aria-colcount', '3');
        expect(table).toHaveAttribute('aria-rowcount', '2');
        expect(within(table).getByText('Heading Row 1 - Cell 1')).toBeInTheDocument();
        expect(within(table).getByText('Row 1 - Cell 1')).toBeInTheDocument();
    });

    it('hides columns by index when hiddenColumns is provided', async () => {
        await customRenderer(SoftTable)
            .withProps({
                headingRows: ['Id', 'Company', 'Country'],
                dataRows: [
                    ['001', 'Acme', 'Spain'],
                    ['002', 'Globex', 'Germany'],
                ],
                hiddenColumns: [1],
            })
            .build();

        const table = screen.getByRole('table', { name: 'Soft data table' });

        expect(table).toHaveAttribute('aria-colcount', '2');
        expect(within(table).queryByText('Company')).not.toBeInTheDocument();
        expect(within(table).queryByText('Acme')).not.toBeInTheDocument();
        expect(within(table).getByText('Id')).toBeInTheDocument();
        expect(within(table).getByText('Country')).toBeInTheDocument();
        expect(within(table).getAllByRole('columnheader')).toHaveLength(2);
        expect(within(table).getAllByRole('cell')).toHaveLength(4);
    });
});
