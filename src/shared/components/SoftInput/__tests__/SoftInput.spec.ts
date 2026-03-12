import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import { SoftInput } from '../index';

describe('SoftInput', () => {
	it('renders the input', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input).toBeInTheDocument();
	});

	it('should render the value passed via prop', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: 'value',
				hasError: true,
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input).toHaveValue('value');
	});

	it('should render input with the specified variant', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
				variant: 'bold',
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input.parentElement).toHaveClass('soft-input__control--bold');
	});

	it('should apply sm size', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
				size: 'sm',
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input.parentElement?.parentElement).toHaveClass('soft-input--sm');
	});

	it('should render error state', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
				hasError: true,
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input.parentElement).toHaveClass('soft-input__control--has-error');
	});

	it('should render input as disabled', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
				disabled: true,
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute('aria-disabled', 'true');
	});

	it('should render input placeholder', async () => {
		await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
				placeholder: 'Placeholder text',
			})
			.build();

		const input = screen.getByPlaceholderText('Placeholder text');
		expect(input).toBeInTheDocument();
	});

	it('should emit the clear event', async () => {
		const { emitted } = await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: 'value',
				isClearable: true,
				clearLabel: 'Clear input',
			})
			.build();

		const clearButton = screen.getByLabelText('Clear input');
		expect(clearButton).toBeInTheDocument();
		await userEvent.click(clearButton);
		await waitFor(() => expect(emitted()).toHaveProperty('clear', [['']]));
	});

	it('should emit events with typed value on input', async () => {
		const { emitted } = await customRenderer(SoftInput)
			.withProps({
				id: 'input',
				label: 'Input label',
				value: '',
			})
			.build();

		const input = screen.getByRole('textbox', { name: 'Input label' });
		await userEvent.type(input, 'value');
		expect(emitted()).toHaveProperty('input');
	});
});
