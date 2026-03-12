import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftSkeleton from '../SoftSkeleton.vue';

describe('SoftSkeleton', () => {
	it('renders slot contents', async () => {
		await customRenderer(SoftSkeleton)
			.withSlots({ default: 'SLOT CONTENT' })
			.build();

		expect(screen.getByText('SLOT CONTENT')).toBeInTheDocument();
	});
});
