import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftToggleSwitch from '../SoftToggleSwitch.vue';

describe('SoftToggleSwitch', () => {
	it('renders correctly', async () => {
		await customRenderer(SoftToggleSwitch)
			.withProps({
				id: 'inputId',
				isChecked: false,
				label: 'Toggle switch',
			})
			.build();

		const toggle = screen.getByRole('switch', { name: 'Toggle switch' });

		expect(toggle).toBeInTheDocument();
		expect(toggle).not.toBeChecked();
		expect(screen.queryByText('Toggle switch')).not.toBeInTheDocument();
	});

	it('renders as checked when isChecked is true', async () => {
		await customRenderer(SoftToggleSwitch)
			.withProps({
				id: 'switchId',
				isChecked: true,
				label: 'Toggle switch',
			})
			.build();

		const toggle = screen.getByRole('switch', { name: 'Toggle switch' });

		expect(toggle).toHaveAttribute('aria-checked', 'true');
		expect(toggle).toBeChecked();
	});

	it('renders the label when isLabelVisible is true', async () => {
		await customRenderer(SoftToggleSwitch)
			.withProps({
				id: 'switchId',
				isChecked: false,
				label: 'Toggle switch',
				isLabelVisible: true,
			})
			.build();

		const label = screen.getByText('Toggle switch');

		expect(label).toBeInTheDocument();
		expect(label).toHaveClass('soft-toggle-switch__label');
	});

	it('applies label position class', async () => {
		await customRenderer(SoftToggleSwitch)
			.withProps({
				id: 'switchId',
				isChecked: false,
				label: 'Toggle switch',
				labelPosition: 'left',
				isLabelVisible: true,
			})
			.build();

		const label = screen.getByText('Toggle switch');

		expect(label).toHaveClass(/soft-toggle-switch__label--left/);
	});

	it('renders slot content', async () => {
		await customRenderer(SoftToggleSwitch)
			.withProps({
				id: 'switchId',
				isChecked: false,
				label: 'Toggle switch',
				labelPosition: 'left',
				isLabelVisible: true,
			})
			.withSlots({ default: 'Input label' })
			.build();

		expect(screen.getByText('Input label')).toBeInTheDocument();
	});
});
