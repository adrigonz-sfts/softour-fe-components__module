import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftTag from '../SoftTag.vue';

describe('SoftTag', () => {
	it('renders the tag with the correct variant and label', async () => {
		await customRenderer(SoftTag)
			.withProps({ variant: 'success', label: 'Success' })
			.build();

		const tagElement = screen.getByText(/Success/i);

		expect(tagElement).toBeInTheDocument();
		expect(tagElement).toHaveClass('soft-tag', 'soft-tag--success');
	});
});
