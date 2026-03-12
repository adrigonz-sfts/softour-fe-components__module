import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { debounce } from '../../../utils/debounce';

interface UseSoftDialParams {
	min: ComputedRef<number> | number;
	max: ComputedRef<number> | number;
	step: ComputedRef<number> | number;
	value: ComputedRef<number> | number;
	originValue: ComputedRef<number> | number;
	defaultValue: ComputedRef<number> | number;
	update: (value: number) => void;
	change: (value: number) => void;
}

interface UseSoftDial {
	progressWidth: ComputedRef<number>;
	isDragging: Ref<boolean>;
	startAngle: ComputedRef<number>;
	knobDegrees: ComputedRef<{ '--soft-dial-deg': string }>;
	progressOffset: ComputedRef<number>;
	currentValue: Ref<number>;
	resetValue: () => void;
	handleWheel: (event: WheelEvent) => void;
	startDrag: (event: MouseEvent) => void;
	handleInput: (event: Event) => void;
	handleInputBlur: (event: Event) => void;
}

const ARC_MAX_RANGE = 270;
const ARC_STARTING_ANGLE = 135;
const CIRCLE_RADIUS = 47;
const PRECISION_THRESHOLD = 1;
const VELOCITY_SCALING_FACTOR = 1.5;
const ACCELERATION_FACTOR = 1.5;
const MAX_ACCELERATION = 10;
const DEGREES_FULL_CIRCLE = 360;
const RAD_TO_DEG = 180;
const PROGRESS_WIDTH_ACTIVE = 10;
const DEBOUNCE_MS = 400;

export function useSoftDial({
	min,
	max,
	step,
	value,
	originValue,
	defaultValue,
	update,
	change,
}: UseSoftDialParams): UseSoftDial {
	const minValue = computed(() => (typeof min === 'number' ? min : min.value));
	const maxValue = computed(() => (typeof max === 'number' ? max : max.value));
	const stepValue = computed(() =>
		typeof step === 'number' ? step : step.value,
	);
	const valueRef = computed(() =>
		typeof value === 'number' ? value : value.value,
	);
	const originValueRef = computed(() =>
		typeof originValue === 'number' ? originValue : originValue.value,
	);
	const defaultValueRef = computed(() =>
		typeof defaultValue === 'number' ? defaultValue : defaultValue.value,
	);

	const currentValue = ref(typeof value === 'number' ? value : value.value);
	const isDragging = ref(false);
	const initialPosition = ref({ x: 0, y: 0 });

	const range = computed(() => maxValue.value - minValue.value);
	const progressWidth = computed(() =>
		currentValue.value === originValueRef.value ? 0 : PROGRESS_WIDTH_ACTIVE,
	);
	const knobDegrees = computed(() => {
		const deg =
			((currentValue.value - minValue.value) / range.value) * ARC_MAX_RANGE -
			ARC_STARTING_ANGLE;

		return { '--soft-dial-deg': `${deg}` };
	});

	const progressOffset = computed(() => {
		const circumference = 2 * Math.PI * CIRCLE_RADIUS;

		const currentProgress = (currentValue.value - minValue.value) / range.value;
		const initialProgress =
			(originValueRef.value - minValue.value) / range.value;
		const offsetFromInitial =
			(currentProgress - initialProgress) * ARC_MAX_RANGE;

		return circumference * (1 - offsetFromInitial / DEGREES_FULL_CIRCLE);
	});

	const startAngle = computed(() => {
		const initialProgress =
			(originValueRef.value - minValue.value) / range.value;

		return initialProgress * ARC_MAX_RANGE + ARC_STARTING_ANGLE;
	});

	const updateValue = (newValue: number) => {
		let clampedValue = newValue;
		if (clampedValue > maxValue.value) {
			clampedValue = maxValue.value;
		} else if (clampedValue < minValue.value) {
			clampedValue = minValue.value;
		}

		const stepsFromMin = (clampedValue - minValue.value) / stepValue.value;
		const roundedSteps = Math.round(stepsFromMin);
		const steppedValue = roundedSteps * stepValue.value + minValue.value;

		const finalValue = Math.max(
			minValue.value,
			Math.min(maxValue.value, steppedValue),
		);

		currentValue.value = Math.round(finalValue);
	};

	const debouncedChange = debounce(change, DEBOUNCE_MS);

	const handleWheel = (event: WheelEvent) => {
		event.preventDefault();

		const increment = event.deltaY < 0 ? stepValue.value : -stepValue.value;

		updateValue(currentValue.value + increment);

		debouncedChange(currentValue.value);
	};

	const calculateValueFromPosition = (event: MouseEvent) => {
		const container = event.currentTarget as HTMLElement;
		const rect = container.getBoundingClientRect();

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const clickX = event.clientX - (rect.left + centerX);
		const clickY = event.clientY - (rect.top + centerY);

		let angleDeg = Math.atan2(clickY, clickX) * (RAD_TO_DEG / Math.PI);

		angleDeg = (angleDeg + DEGREES_FULL_CIRCLE) % DEGREES_FULL_CIRCLE;

		let normalizedAngle: number | undefined;

		const arcEndAngle =
			(ARC_STARTING_ANGLE + ARC_MAX_RANGE) % DEGREES_FULL_CIRCLE;

		const isWithinArc =
			angleDeg >= ARC_STARTING_ANGLE &&
			angleDeg <= ARC_STARTING_ANGLE + ARC_MAX_RANGE;

		const isBeforeArcEnd = angleDeg <= arcEndAngle;

		if (isWithinArc) {
			normalizedAngle = angleDeg - ARC_STARTING_ANGLE;
		} else if (isBeforeArcEnd) {
			normalizedAngle =
				ARC_MAX_RANGE - (arcEndAngle - angleDeg);
		}

		if (normalizedAngle === undefined) {
			return null;
		}

		normalizedAngle = Math.max(0, Math.min(normalizedAngle, ARC_MAX_RANGE));

		const newValue =
			minValue.value + (normalizedAngle / ARC_MAX_RANGE) * range.value;

		const steppedValue =
			Math.round(newValue / stepValue.value) * stepValue.value;

		return steppedValue;
	};

	const startDrag = (event: MouseEvent) => {
		const initialClickPosition = { x: event.clientX, y: event.clientY };
		const targetValue = calculateValueFromPosition(event);

		isDragging.value = true;
		initialPosition.value = { x: event.clientX, y: event.clientY };

		let hasMoved = false;
		let lastMoveTime = performance.now();
		let lastDirection = 0;
		let acceleration = 1;

		const dragEvent = (e: MouseEvent) => {
			const currentPosition = { x: e.clientX, y: e.clientY };
			const currentTime = performance.now();

			const deltaX = currentPosition.x - initialClickPosition.x;
			const deltaY = currentPosition.y - initialClickPosition.y;

			if (!hasMoved && (deltaX !== 0 || deltaY !== 0)) {
				hasMoved = true;
			}

			const dragDeltaX = currentPosition.x - initialPosition.value.x;
			const dragDeltaY = currentPosition.y - initialPosition.value.y;

			const isHorizontal = Math.abs(dragDeltaX) > Math.abs(dragDeltaY);
			const delta = isHorizontal ? dragDeltaX : -dragDeltaY;

			const timeDelta = currentTime - lastMoveTime;
			const velocity = timeDelta > 0 ? Math.abs(delta) / timeDelta : 0;

			lastMoveTime = currentTime;

			if (Math.abs(delta) < PRECISION_THRESHOLD) {
				initialPosition.value = currentPosition;

				return;
			}

			const currentDirection = Math.sign(delta);

			if (currentDirection === lastDirection && currentDirection !== 0) {
				acceleration = Math.min(
					acceleration * ACCELERATION_FACTOR,
					MAX_ACCELERATION,
				);
			} else {
				acceleration = 1;
				lastDirection = currentDirection;
			}

			if (delta !== 0) {
				const velocityFactor =
					1 + velocity * VELOCITY_SCALING_FACTOR * acceleration;

				const stepsToMove = Math.round(velocityFactor);
				const valueChange = currentDirection * stepValue.value * stepsToMove;

				updateValue(currentValue.value + valueChange);
			}

			initialPosition.value = currentPosition;
		};

		const stopEvent = () => {
			isDragging.value = false;

			if (!hasMoved && targetValue !== null) {
				updateValue(targetValue);
			}

			change(currentValue.value);

			window.removeEventListener('mousemove', dragEvent);
			window.removeEventListener('mouseup', stopEvent);
		};

		window.addEventListener('mousemove', dragEvent);
		window.addEventListener('mouseup', stopEvent);
	};

	const resetValue = () => {
		updateValue(defaultValueRef.value);
	};

	const setInputValue = (inputValue: string): void => {
		const parsedValue = parseFloat(inputValue);

		if (Number.isNaN(parsedValue)) {
			resetValue();

			return;
		}

		const clampedValue = Math.min(
			Math.max(parsedValue, minValue.value),
			maxValue.value,
		);

		updateValue(clampedValue);
	};

	const handleInput = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;
		setInputValue(inputValue);

		const parsedValue = parseFloat(inputValue);
		if (!Number.isNaN(parsedValue)) {
			const clampedValue = Math.min(
				Math.max(parsedValue, minValue.value),
				maxValue.value,
			);
			if (parsedValue !== clampedValue) {
				target.value = String(clampedValue);
			}
		}
	};

	const handleInputBlur = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		setInputValue(target.value);
		change(currentValue.value);
	};

	watch(
		valueRef,
		(newValue) => {
			if (newValue !== currentValue.value) {
				updateValue(newValue);
			}
		},
		{ immediate: false },
	);

	watch(currentValue, (newVal) => {
		update(newVal);
	});

	return {
		isDragging,
		startAngle,
		knobDegrees,
		progressOffset,
		progressWidth,
		currentValue,
		resetValue,
		handleWheel,
		startDrag,
		handleInput,
		handleInputBlur,
	};
}
