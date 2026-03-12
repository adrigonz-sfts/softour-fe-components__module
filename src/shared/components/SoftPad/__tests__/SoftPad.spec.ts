import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor, screen  } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftPad from '../SoftPad.vue';

describe('SoftPad', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		const mockRect = { left: 0, top: 0, width: 198, height: 198 };
		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(mockRect);
	});

	it('emits change when dragging and releasing', async () => {
		const { emitted } = await customRenderer(SoftPad)
			.withProps({ id: 'soft-pad', value: [0, 0], label: ['X', 'Y'] })
			.build();

		const svg = screen.getByTestId('soft-pad-svg');
		await fireEvent.mouseDown(svg, { clientX: 50, clientY: 50 });
		await fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
		await fireEvent.mouseUp(document);

		expect(emitted().change).toBeTruthy();
		expect(emitted().change![0]).toEqual([51, 49]);
	});

	it('updates input values when dragging and releasing', async () => {
		await customRenderer(SoftPad)
			.withProps({ id: 'soft-pad', value: [0, 0], label: ['X', 'Y'] })
			.build();

		const svg = screen.getByTestId('soft-pad-svg');
		await fireEvent.mouseDown(svg, { clientX: 50, clientY: 50 });
		await fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
		await fireEvent.mouseUp(document);

		expect(screen.getByLabelText('X')).toHaveValue(51);
		expect(screen.getByLabelText('Y')).toHaveValue(49);
	});

	it('emits change when inputting values', async () => {
		const { emitted } = await customRenderer(SoftPad)
			.withProps({ id: 'soft-pad', value: [0, 0], label: ['X', 'Y'] })
			.build();

		const xInput = screen.getByLabelText('X');
		const yInput = screen.getByLabelText('Y');
		await userEvent.clear(xInput);
		await userEvent.type(xInput, '50');
		await userEvent.tab();
		await userEvent.clear(yInput);
		await userEvent.type(yInput, '50');
		await userEvent.tab();

		await waitFor(() => expect(emitted().change).toBeTruthy());
		expect(emitted().change![0]).toEqual([50, 0]);
		expect(emitted().change![1]).toEqual([50, 50]);
	});

	it('hides inputs when hideInputs is true but keeps labels visible', async () => {
		await customRenderer(SoftPad)
			.withProps({ id: 'soft-pad', value: [0, 0], label: ['X', 'Y'], hideInputs: true })
			.build();

		expect(screen.queryByLabelText('X')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Y')).not.toBeInTheDocument();
		expect(screen.getByText('X')).toBeInTheDocument();
		expect(screen.getByText('Y')).toBeInTheDocument();
	});
});
