<template>
	<div
		:class="[
			'soft-slider',
			`soft-slider--${props.variant}`,
			{ 'soft-slider--disabled': props.isDisabled },
			{ 'soft-slider--full-width': props.fullWidth },
			props.elevation ? `soft-slider--elevation-${props.elevation}` : '',
		]"
		:aria-label="!props.showLabel ? props.label : undefined"
	>
		<div v-if="props.showLabel || props.iconName" class="soft-slider__content">
			<SoftIcon
				v-if="props.iconName"
				:name="props.iconName"
				size="md"
				label=""
				aria-hidden="true"
				class="soft-slider__icon"
			/>
			<label
				v-if="props.showLabel"
				:id="`${props.id}-label`"
				:for="props.id"
				class="soft-slider__label"
			>
				{{ props.label }}
			</label>
		</div>
		<div class="soft-slider__wrapper">
			<button
				v-if="isEffectVariant && sliderValue > min"
				:aria-label="`Set ${props.label} to minimum value`"
				class="soft-slider__button"
				:disabled="props.isDisabled"
				@click.stop="changeValueToMin"
			/>
			<input
				:id="props.id"
				type="range"
				:min="min"
				:max="max"
				:value="sliderValue"
				:defaultValue="props.value"
				class="soft-slider__input"
				:aria-labelledby="`${props.id}-label`"
				:aria-valuemin="min"
				:aria-valuemax="max"
				:aria-valuenow="sliderValue"
				:disabled="props.isDisabled"
				@input="changeValue"
				@change="changeValue"
				@keydown="handleKeyDown"
			/>
			<div
				class="soft-slider__progress"
				:class="[
					{ 'soft-slider__progress--disabled': props.isDisabled, 'hidden-in-firefox': !isEffectVariant },
				]"
				:style="{ '--progress': `${((sliderValue - min) / (max - min)) * 100}%` }"
				aria-hidden="true"
			/>
		</div>
		<input
			v-if="props.showInput"
			type="number"
			:min="min"
			:max="max"
			:value="sliderValue"
			class="soft-slider__text-input body-sm"
			:class="{ 'soft-slider__text-input--compact': props.variant === 'compact' }"
			:aria-label="`Set ${props.label} value`"
			:disabled="props.isDisabled"
			@input="changeValue"
			@change="changeValue"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import type { SoftSliderProps } from './types/SoftSliderProps';

const props = withDefaults(defineProps<SoftSliderProps>(), {
	variant: 'default',
	min: 0,
	max: 100,
	fullWidth: true,
	isDisabled: false,
	showInput: true,
	showLabel: true,
	elevation: 'deep',
	step: 1,
	iconName: undefined,
});

const emit = defineEmits<{
	(event: 'update', value: number): void;
	(event: 'change', value: number): void;
}>();

const sliderValue = ref(props.value);
const min = computed(() => props.min);
const max = computed(() => props.max);

const isEffectVariant = computed(() => props.variant === 'effect');

const parseValue = (stringValue: string) =>
	stringValue !== '' ? parseInt(stringValue, 10) : props.min;

const clampValue = (value: number) => {
	if (value < props.min) return props.min;
	if (value > props.max) return props.max;
	return value;
};

const updateValue = (value: number, isUpdate: boolean) => {
	sliderValue.value = clampValue(value);
	if (isUpdate) {
		emit('update', sliderValue.value);
		return;
	}
	emit('change', sliderValue.value);
};

const changeValue = (event: Event) => {
	const inputElement = event.target as HTMLInputElement;
	const numValue = parseValue(inputElement.value);
	const clampedValue = clampValue(numValue).toString();
	if (inputElement.value !== clampedValue) inputElement.value = clampedValue;
	updateValue(numValue, event.type === 'input');
};

const changeValueToMin = () => updateValue(props.min, false);

const handleKeyDown = (event: KeyboardEvent) => {
	if (props.isDisabled) return;
	let newValue = sliderValue.value;
	switch (event.key) {
		case 'ArrowUp':
		case 'ArrowRight':
			newValue = clampValue(newValue + props.step);
			break;
		case 'ArrowDown':
		case 'ArrowLeft':
			newValue = clampValue(newValue - props.step);
			break;
		case 'Home':
			newValue = props.min;
			break;
		case 'End':
			newValue = props.max;
			break;
		default:
			return;
	}
	event.preventDefault();
	updateValue(newValue, false);
};

watch(() => props.value, () => {
	sliderValue.value = props.value;
});
</script>

<style src="./SoftSlider.scss" lang="scss" scoped></style>
