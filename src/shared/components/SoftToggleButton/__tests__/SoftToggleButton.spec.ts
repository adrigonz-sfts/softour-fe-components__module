import { within, screen  } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftToggleButton from '../SoftToggleButton.vue';

describe('SoftToggleButton', () => {
	it('renders the toggle button', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button' })
			.build();

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('applies variant class correctly', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button', variant: 'primary' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-toggle-button--primary');
	});

	it('does not render state indicator when state is none', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button', state: 'none' })
			.build();

		const btn = screen.getByRole('button');
		expect(within(btn).queryByRole('presentation')).not.toBeInTheDocument();
	});

	it('renders state indicator when state is danger', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button', state: 'danger' })
			.build();

		const btn = screen.getByRole('button');
		const stateIndicator = within(btn).queryByRole('presentation');
		expect(stateIndicator).toHaveClass('soft-toggle-button__state--danger');
	});

	it('reflects isActive via aria-pressed', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button', isActive: true })
			.build();

		expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
	});

	it('renders disabled state correctly', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button', isDisabled: true })
			.build();

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('renders content in the icon slot', async () => {
		await customRenderer(SoftToggleButton)
			.withProps({ label: 'Toggle Button' })
			.withSlots({ icon: '<span data-testid="slot-icon">Icon</span>' })
			.build();

		expect(screen.getByTestId('slot-icon')).toBeInTheDocument();
	});
});
