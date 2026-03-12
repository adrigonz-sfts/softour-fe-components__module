import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import { SoftDropdown } from '../index';

describe('SoftDropdown', () => {
	it('renders the dropdown', async () => {
		await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				selectedOption: null,
				options: [
					{ id: 'option1', text: 'Option 1' },
					{ id: 'option2', text: 'Option 2' },
				],
			})
			.build();

		const dropdown = screen.getByRole('combobox', { name: 'Select' });

		expect(dropdown).toBeInTheDocument();
	});

	it('renders the small dropdown', async () => {
		await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				selectedOption: null,
				size: 'sm',
				options: [
					{ id: 'option1', text: 'Option 1' },
					{ id: 'option2', text: 'Option 2' },
				],
			})
			.build();

		const dropdownInput = screen.getByRole('combobox', { name: 'Select' });

		expect(dropdownInput).toHaveClass('soft-dropdown__input--sm');
	});

	it('displays a placeholder when the placeholder prop is passed', async () => {
		await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				placeholder: 'Choose',
				selectedOption: null,
				options: [
					{ id: 'option1', text: 'Option 1' },
					{ id: 'option2', text: 'Option 2' },
				],
			})
			.build();

		const placeholderText = screen.getByText('Choose');

		expect(placeholderText).toBeInTheDocument();
	});

	it('displays the options on click', async () => {
		await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				selectedOption: null,
				options: [
					{ id: 'option1', text: 'Option 1' },
					{ id: 'option2', text: 'Option 2' },
				],
			})
			.build();

		const dropdown = screen.getByRole('combobox', { name: 'Select' });

		await userEvent.click(dropdown);

		await waitFor(() => {
			expect(dropdown).toHaveAttribute('aria-expanded', 'true');
		});

		const options = screen.getAllByRole('option');

		expect(options[0]).toHaveAccessibleName('Option 1');
		expect(options[1]).toHaveAccessibleName('Option 2');
	});

	it('should emit selectOption event on option click', async () => {
		const { emitted } = await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				selectedOption: null,
				options: [
					{ id: 'option1', text: 'Option 1' },
					{ id: 'option2', text: 'Option 2' },
				],
			})
			.build();

		const dropdown = screen.getByRole('combobox', { name: 'Select' });
		await userEvent.click(dropdown);

		await waitFor(() => {
			expect(dropdown).toHaveAttribute('aria-expanded', 'true');
		});

		const option = screen.getByRole('option', { name: 'Option 1' });
		await userEvent.click(option);

		await waitFor(() => {
			expect(option).toHaveAttribute('aria-selected', 'true');
		});

		expect(emitted()).toHaveProperty('selectOption', [
			[{ id: 'option1', text: 'Option 1' }],
		]);
	});

	it('should render error message and state', async () => {
		await customRenderer(SoftDropdown)
			.withProps({
				id: 'dropdown',
				label: 'Select',
				selectedOption: null,
				options: [],
				hasWarningActive: true,
				warningText: 'Error message',
			})
			.build();

		const dropdown = screen.getByRole('combobox', { name: 'Select' });
		const errorMessage = screen.getByRole('alert');

		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveTextContent('Error message');
		expect(dropdown).toHaveAttribute('aria-invalid', 'true');
	});
});
