import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftRadioButton from '../SoftRadioButton.vue';

describe('SoftRadioButton', () => {
	it('renders the radio button with the content in the slot', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button' })
			.withSlots({ default: 'Input label' })
			.build();

		const radioButton = screen.getByRole('radio', { name: 'Input label' });

		expect(radioButton).not.toBeChecked();
		expect(radioButton).toBeEnabled();
		expect(radioButton).toBeInTheDocument();
	});

	it('is checked', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button', isChecked: true })
			.withSlots({ default: 'Input label' })
			.build();

		const radioButton = screen.getByRole('radio', { name: 'Input label' });

		expect(radioButton).toBeChecked();
		expect(radioButton).toBeEnabled();
	});

	it('should apply sm size', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button', size: 'sm' })
			.withSlots({ default: 'Input label' })
			.build();

		const label = screen.getByText('Input label');

		expect(label).toBeInTheDocument();
		expect(label.parentElement).toHaveClass('soft-radio-button--sm');
	});

	it('should apply xs size', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button', size: 'xs' })
			.withSlots({ default: 'Input label' })
			.build();

		const label = screen.getByText('Input label');

		expect(label.parentElement).toHaveClass('soft-radio-button--xs');
	});

	it('is disabled when isDisabled is true', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button', isDisabled: true })
			.withSlots({ default: 'Input label' })
			.build();

		const radioButton = screen.getByRole('radio', { name: 'Input label' });
		await userEvent.click(radioButton);

		expect(radioButton).toBeDisabled();
		expect(radioButton).not.toBeChecked();
	});

	it('applies error style correctly', async () => {
		await customRenderer(SoftRadioButton)
			.withProps({ id: 'default-radio-button', hasError: true })
			.withSlots({ default: 'Input label' })
			.build();

		const label = screen.getByText('Input label');

		expect(label.parentElement).toHaveClass('soft-radio-button--error');
	});
});
