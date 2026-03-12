import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftLabel from '../SoftLabel.vue';

describe('SoftLabel', () => {
	it('renders slot text successfully', async () => {
		await customRenderer(SoftLabel)
			.withProps({ for: 'random-id' })
			.withSlots({ default: 'Input label' })
			.build();

		const label = screen.getByText('Input label');

		expect(label).toBeInTheDocument();
	});

	it('applies for attribute to locate related input', async () => {
		const TestComponent = {
			template: `
				<div>
					<SoftLabel for="inputId">Input label</SoftLabel>
					<input id="inputId" />
				</div>
			`,
			components: { SoftLabel },
		};
		await customRenderer(TestComponent).build();

		const input = screen.getByLabelText('Input label');

		expect(input).toBeInTheDocument();
	});
});
