<template>
	<div
		:class="[
			'soft-radio-button',
			`soft-radio-button--${props.size}`,
			{ 'soft-radio-button--error': props.hasError },
			{ 'soft-radio-button--disabled': props.isDisabled },
			`body-${props.size}`,
		]"
		:aria-disabled="props.isDisabled"
	>
		<label
			:for="props.id"
			class="soft-radio-button__label"
		>
			<input
				:id="props.id"
				type="radio"
				class="soft-radio-button__icon"
				:name="props.name"
				:checked="props.isChecked"
				:disabled="props.isDisabled"
				:aria-invalid="props.hasError"
				@change="$emit('change')"
			/>
			<slot />
		</label>
	</div>
</template>

<script lang="ts" setup>
import { SoftRadioButtonSize } from './types/SoftRadioButtonSize';

interface SoftRadioButtonProps {
	id: string;
	name?: string;
	isChecked?: boolean;
	isDisabled?: boolean;
	hasError?: boolean;
	size?: SoftRadioButtonSize;
}

const props = withDefaults(defineProps<SoftRadioButtonProps>(), {
	isChecked: false,
	isDisabled: false,
	hasError: false,
	size: 'sm' as SoftRadioButtonSize,
	name: '',
});
defineEmits<{ change: [] }>();
</script>

<style src="./SoftRadioButton.scss" lang="scss" scoped></style>
