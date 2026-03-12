import userEvent from '@testing-library/user-event';
import { fireEvent, screen  } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftSlider from '../SoftSlider.vue';

describe('SoftSlider', () => {
	const defaultProps = {
		id: 'slider',
		label: 'SoftSlider',
		value: 50,
		min: 0,
		max: 100,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the slider with default props', async () => {
		await customRenderer(SoftSlider).withProps(defaultProps).build();

		expect(screen.getByRole('slider', { name: 'SoftSlider' })).toBeInTheDocument();
		expect(screen.getByText('SoftSlider')).toBeInTheDocument();
		expect(screen.getByLabelText('Set SoftSlider value')).toBeInTheDocument();
		const slider = screen.getByRole('slider');
		expect(slider).toHaveAttribute('aria-valuemin', '0');
		expect(slider).toHaveAttribute('aria-valuemax', '100');
		expect(slider).toHaveAttribute('aria-valuenow', '50');
	});

	it('renders slider without label when showLabel is false', async () => {
		await customRenderer(SoftSlider).withProps({ ...defaultProps, showLabel: false }).build();

		expect(screen.queryByText('SoftSlider')).not.toBeInTheDocument();
		expect(screen.getByRole('slider')).toBeInTheDocument();
	});

	it('renders slider without text input when showInput is false', async () => {
		await customRenderer(SoftSlider).withProps({ ...defaultProps, showInput: false }).build();

		expect(screen.queryByLabelText('Set SoftSlider value')).not.toBeInTheDocument();
		expect(screen.getByRole('slider')).toBeInTheDocument();
	});

	it('renders slider with icon when iconName is provided', async () => {
		await customRenderer(SoftSlider).withProps({ ...defaultProps, iconName: 'cog6Tooth' }).build();

		const container = screen.getByRole('slider').closest('.soft-slider');
		const icon = container?.querySelector('.soft-slider__icon');
		expect(icon).toBeInTheDocument();
	});

	it('applies correct classes based on props', async () => {
		await customRenderer(SoftSlider)
			.withProps({
				...defaultProps,
				variant: 'effect',
				fullWidth: false,
				isDisabled: true,
				elevation: 'strong',
			})
			.build();

		const container = screen.getByRole('slider').closest('.soft-slider');
		expect(container).toHaveClass('soft-slider--effect');
		expect(container).toHaveClass('soft-slider--disabled');
		expect(container).not.toHaveClass('soft-slider--full-width');
		expect(container).toHaveClass('soft-slider--elevation-strong');
	});

	it('emits update when slider value changes', async () => {
		const { emitted } = await customRenderer(SoftSlider).withProps(defaultProps).build();

		const textInput = screen.getByLabelText('Set SoftSlider value');
		await userEvent.clear(textInput);
		await userEvent.type(textInput, '80');
		await userEvent.tab();

		const events = emitted().update as number[][];
		expect(events[events.length - 1]).toEqual([80]);
	});

	it('emits change when slider value is committed', async () => {
		const { emitted } = await customRenderer(SoftSlider).withProps(defaultProps).build();

		const textInput = screen.getByLabelText('Set SoftSlider value');
		await userEvent.clear(textInput);
		await userEvent.type(textInput, '80');
		await userEvent.tab();

		expect(emitted().change).toEqual([[80]]);
	});

	it('clamps value to min when below minimum', async () => {
		const { emitted } = await customRenderer(SoftSlider).withProps(defaultProps).build();

		const textInput = screen.getByLabelText('Set SoftSlider value');
		await fireEvent.input(textInput, { target: { value: '-10' } });
		await fireEvent.change(textInput, { target: { value: '-10' } });

		expect(emitted().change).toEqual([[0]]);
		expect(textInput).toHaveValue(0);
	});

	it('clamps value to max when above maximum', async () => {
		const { emitted } = await customRenderer(SoftSlider).withProps(defaultProps).build();

		const textInput = screen.getByLabelText('Set SoftSlider value');
		await userEvent.clear(textInput);
		await userEvent.type(textInput, '150');
		await userEvent.tab();

		const events = emitted().update as number[][];
		expect(events[events.length - 1]).toEqual([100]);
		expect(textInput).toHaveValue(100);
	});

	it('handles keyboard navigation correctly', async () => {
		const { emitted } = await customRenderer(SoftSlider).withProps(defaultProps).build();

		const slider = screen.getByRole('slider');
		slider.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(emitted().change).toEqual([[51]]);

		await userEvent.keyboard('{ArrowLeft}');
		expect(emitted().change).toEqual([[51], [50]]);

		await userEvent.keyboard('{Home}');
		expect(emitted().change).toEqual([[51], [50], [0]]);

		await userEvent.keyboard('{End}');
		expect(emitted().change).toEqual([[51], [50], [0], [100]]);
	});

	it('shows reset button for effect variant when value is above min', async () => {
		await customRenderer(SoftSlider)
			.withProps({ ...defaultProps, variant: 'effect', value: 50 })
			.build();

		expect(
			screen.getByRole('button', { name: 'Set SoftSlider to minimum value' }),
		).toBeInTheDocument();
	});

	it('hides reset button for effect variant when value is at min', async () => {
		await customRenderer(SoftSlider)
			.withProps({ ...defaultProps, variant: 'effect', value: 0 })
			.build();

		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('resets value to min when reset button is clicked', async () => {
		const { emitted } = await customRenderer(SoftSlider)
			.withProps({ ...defaultProps, variant: 'effect', value: 50 })
			.build();

		const resetButton = screen.getByRole('button', { name: 'Set SoftSlider to minimum value' });
		await userEvent.click(resetButton);

		expect(emitted().change).toEqual([[0]]);
	});
});
