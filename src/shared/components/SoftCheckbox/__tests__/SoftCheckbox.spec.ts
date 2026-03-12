import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftCheckbox from '../SoftCheckbox.vue';

describe('SoftCheckbox', () => {
	it('render the checkbox with the content in the slot', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({ id: 'default-checkbox' })
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });

		expect(checkbox).not.toBeChecked();
		expect(checkbox).toBeEnabled();
		expect(checkbox).toBeInTheDocument();
	});

	it('applies checked and default variant style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				isChecked: true,
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox checked');

		expect(checkbox).toBeChecked();
		expect(checkbox).toBeEnabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--checked');
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--md');
		expect(checkboxStyle.querySelector('svg')).toBeInTheDocument();
	});

	it('applies checked and indeterminate style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				isChecked: true,
				variant: 'indeterminate',
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox checked');

		expect(checkbox).toBeChecked();
		expect(checkbox).toBeEnabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--checked');
		expect(checkboxStyle.querySelector('svg')).toBeInTheDocument();
	});

	it('applies disabled and unchecked style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				isChecked: false,
				isDisabled: true,
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox unchecked');

		expect(checkbox).not.toBeChecked();
		expect(checkbox).toBeDisabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--disabled');
	});

	it('applies disabled and checked style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				isChecked: true,
				isDisabled: true,
				variant: 'indeterminate',
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox checked');

		expect(checkbox).toBeChecked();
		expect(checkbox).toBeDisabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--filled');
		expect(checkboxStyle.querySelector('svg')).toBeInTheDocument();
	});

	it('applies error style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				hasError: true,
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox unchecked');

		expect(checkbox).toBeEnabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--error');
	});

	it('applies size style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				size: 'sm',
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox unchecked');

		expect(checkbox).toBeEnabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--sm');
	});

	it('applies right position style correctly', async () => {
		await customRenderer(SoftCheckbox)
			.withProps({
				id: 'default-checkbox',
				checkboxPosition: 'right',
			})
			.withSlots({ default: 'Input label' })
			.build();

		const checkbox = screen.getByRole('checkbox', { name: 'Input label' });
		const checkboxStyle = screen.getByLabelText('Checkbox unchecked');

		expect(checkbox).toBeEnabled();
		expect(checkboxStyle).toHaveClass('soft-checkbox__input--right');
	});
});
