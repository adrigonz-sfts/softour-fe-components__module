export interface SoftDialProps {
	id: string;
	label: string;
	min: number;
	max: number;
	value: number;
	step?: number;
	originValue?: number;
	defaultValue?: number;
	size?: 'sm' | 'lg';
	hoverable?: boolean;
	hideInput?: boolean;
	hideLabel?: boolean;
}
