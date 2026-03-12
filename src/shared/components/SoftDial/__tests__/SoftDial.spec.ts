import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor, screen  } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftDial from '../SoftDial.vue';

describe('SoftDial', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the label', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				label: 'Dial Label',
				min: 0,
				max: 100,
				value: 50,
			})
			.build();

		expect(screen.getByText('Dial Label')).toBeInTheDocument();
	});

	it('renders the value correctly', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				label: 'Dial Label',
				min: 0,
				max: 100,
			})
			.build();

		const input = screen.getByRole('spinbutton');
		expect(input).toHaveValue(50);
	});

	it('updates the value when wheel interaction occurs', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				label: 'Dial Label',
				min: 0,
				max: 100,
				step: 10,
			})
			.build();

		const dial = screen.getByRole('slider');
		await fireEvent.wheel(dial, { deltaY: -100 });

		expect(emitted().update).toBeTruthy();
		expect(emitted().update).toEqual([[60]]);
	});

	it('resets to the default value on double-click', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				min: 0,
				max: 100,
				value: 50,
				defaultValue: 25,
				label: 'Dial Label',
			})
			.build();

		const dial = screen.getByRole('slider');
		await fireEvent.dblClick(dial);

		await waitFor(() => {
			expect(emitted().update).toBeTruthy();
			expect(emitted().update).toEqual([[25]]);
		});
	});

	it('does not exceed max prop', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 80,
				min: 0,
				max: 100,
				step: 10,
				label: 'Dial Label',
			})
			.build();

		const dial = screen.getByRole('slider');
		await fireEvent.wheel(dial, { deltaY: -100 });
		await fireEvent.wheel(dial, { deltaY: -100 });
		await fireEvent.wheel(dial, { deltaY: -100 });
		await fireEvent.wheel(dial, { deltaY: -100 });

		expect(emitted().update).toBeTruthy();
		expect(emitted().update).toEqual([[90], [100]]);
	});

	it('does not exceed min prop', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 40,
				min: 0,
				max: 100,
				step: 10,
				label: 'Dial Label',
			})
			.build();

		const dial = screen.getByRole('slider');
		await fireEvent.wheel(dial, { deltaY: 100 });
		await fireEvent.wheel(dial, { deltaY: 100 });
		await fireEvent.wheel(dial, { deltaY: 100 });
		await fireEvent.wheel(dial, { deltaY: 100 });
		await fireEvent.wheel(dial, { deltaY: 100 });

		expect(emitted().update).toBeTruthy();
		expect(emitted().update).toEqual([[30], [20], [10], [0]]);
	});

	it('handles input field changes and emits events', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				label: 'Dial Label',
			})
			.build();

		const input = screen.getByRole('spinbutton');
		await userEvent.clear(input);
		await userEvent.type(input, '75');
		await userEvent.tab();

		await waitFor(() => {
			expect(emitted().update).toBeTruthy();
		});
		expect((emitted().change as number[][])[0][0]).toBe(75);
	});

	it('handles Enter key press on input field', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				label: 'Dial Label',
			})
			.build();

		const input = screen.getByRole('spinbutton');
		await userEvent.clear(input);
		await userEvent.type(input, '75');
		await userEvent.keyboard('{Enter}');

		await waitFor(() => {
			expect(emitted().update).toBeTruthy();
		});
		expect((emitted().change as number[][])[0][0]).toBe(75);
	});

	it('clamps input values to max bound', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				label: 'Dial Label',
			})
			.build();

		const input = screen.getByRole('spinbutton');
		await userEvent.clear(input);
		await userEvent.type(input, '150');
		await userEvent.tab();

		await waitFor(() => {
			expect(emitted().update).toBeTruthy();
		});
		const updates = emitted().update as number[][];
		const changes = emitted().change as number[][];
		expect(updates[updates.length - 1][0]).toBe(100);
		expect(changes[0][0]).toBe(100);
	});

	it('clamps input values to min bound', async () => {
		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				label: 'Dial Label',
			})
			.build();

		const input = screen.getByRole('spinbutton');
		await userEvent.clear(input);
		await userEvent.type(input, '-20');
		await userEvent.tab();

		await waitFor(() => {
			expect(emitted().update).toBeTruthy();
		});
		const updates = emitted().update as number[][];
		const changes = emitted().change as number[][];
		expect(updates[updates.length - 1][0]).toBe(0);
		expect(changes[0][0]).toBe(0);
	});

	it('emits dragStateChange when dragging starts and stops', async () => {
		const mockRect = {
			width: 100,
			height: 100,
			left: 0,
			top: 0,
			right: 100,
			bottom: 100,
			x: 0,
			y: 0,
			toJSON: () => {},
		};
		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(mockRect);

		const { emitted } = await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				label: 'Dial Label',
			})
			.build();

		const dial = screen.getByRole('slider');
		await fireEvent.mouseDown(dial, { clientX: 100, clientY: 100 });
		await fireEvent.mouseMove(window, { clientX: 101, clientY: 100 });
		await fireEvent.mouseUp(window);

		await waitFor(() => {
			expect(emitted().dragStateChange).toBeTruthy();
		});
		const dragStateChanges = emitted().dragStateChange as boolean[][];
		expect(dragStateChanges).toContainEqual([true]);
		expect(dragStateChanges).toContainEqual([false]);

		vi.restoreAllMocks();
	});

	it('handles size prop correctly', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				label: 'Dial Label',
				size: 'sm',
			})
			.build();

		const dial = screen.getByRole('slider').closest('.soft-dial');
		expect(dial).toHaveClass('soft-dial--sm');
	});

	it('handles hoverable prop correctly', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				label: 'Dial Label',
				hoverable: true,
			})
			.build();

		const dial = screen.getByRole('slider').closest('.soft-dial');
		expect(dial).toHaveClass('soft-dial--hoverable');
	});

	it('does not display the input when hideInput is true', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				label: 'Dial Label',
				hideInput: true,
			})
			.build();

		expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
	});

	it('does not display the label when hideLabel is true', async () => {
		await customRenderer(SoftDial)
			.withProps({
				id: 'test-dial',
				value: 50,
				min: 0,
				max: 100,
				label: 'Dial Label',
				hideLabel: true,
			})
			.build();

		expect(screen.queryByText('Dial Label')).not.toBeInTheDocument();
	});
});
