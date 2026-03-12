import type { SoftSliderElevation } from './SoftSliderElevation';
import type { SoftSliderVariant } from './SoftSliderVariant';

export interface SoftSliderProps {
	id: string;
	label: string;
	value: number;
	min?: number;
	max?: number;
	variant?: SoftSliderVariant;
	iconName?: string;
	fullWidth?: boolean;
	isDisabled?: boolean;
	showInput?: boolean;
	showLabel?: boolean;
	elevation?: SoftSliderElevation;
	step?: number;
}
