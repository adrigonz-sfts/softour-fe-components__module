<template>
	<div
		class="soft-checkbox"
		:class="{ 'soft-checkbox--disabled': props.isDisabled }"
		:aria-disabled="props.isDisabled"
	>
		<input
			:id="props.id"
			type="checkbox"
			:name="props.id"
			:checked="props.isChecked"
			:disabled="props.isDisabled"
			:aria-invalid="props.hasError"
		/>
		<div
			class="soft-checkbox__input"
			:class="[
				`soft-checkbox__input--${props.size}`,
				{ 'soft-checkbox__input--checked': props.isChecked },
				{ 'soft-checkbox__input--disabled': props.isDisabled },
				{ 'soft-checkbox__input--error': props.hasError },
				{ 'soft-checkbox__input--filled': props.isChecked && props.isDisabled },
				{ 'soft-checkbox__input--right': props.checkboxPosition === 'right' },
			]"
			:aria-label="`Checkbox ${props.isChecked ? 'checked' : 'unchecked'}`"
			aria-hidden="true"
		>
			<SoftIcon
				v-if="props.variant === 'default' && props.isChecked"
				name="check"
				label="Check"
				size="sm"
				type="solid"
			/>
			<SoftIcon
				v-else-if="props.variant === 'indeterminate' && props.isChecked"
				name="minus"
				label="Minus"
				size="sm"
				type="solid"
			/>
		</div>
		<label
			class="body-sm"
			:for="props.id"
		>
			<slot />
		</label>
	</div>
</template>

<script lang="ts" setup>
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import { SoftCheckboxIcon } from './types/SoftCheckboxIcon';
import { SoftCheckboxPosition } from './types/SoftCheckboxPosition';
import { SoftCheckboxSize } from './types/SoftCheckboxSize';

interface SoftCheckboxProps {
	id: string;
	variant?: SoftCheckboxIcon;
	isChecked?: boolean;
	isDisabled?: boolean;
	hasError?: boolean;
	checkboxPosition?: SoftCheckboxPosition;
	size?: SoftCheckboxSize;
}

const props = withDefaults(defineProps<SoftCheckboxProps>(), {
	variant: 'default',
	isChecked: false,
	isDisabled: false,
	hasError: false,
	checkboxPosition: 'left',
	size: 'md' as SoftCheckboxSize,
});
</script>

<style src="./SoftCheckbox.scss" lang="scss" scoped></style>
