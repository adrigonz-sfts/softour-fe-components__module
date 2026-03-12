<template>
	<div
		:class="[
			'soft-input',
			`soft-input--${props.size}`,
			{ 'soft-input--disabled': props.disabled },
		]"
	>
		<SoftLabel
			:for="props.id"
			class="soft-input__label"
			:class="{
				'soft-input__label--hidden': props.hideLabel,
			}"
		>
			{{ label }}
		</SoftLabel>
		<div
			class="soft-input__control"
			:class="[
				'soft-input__control',
				`soft-input__control--${props.variant}`,
				{ 'soft-input__control--has-error': props.hasError },
				{ 'soft-input__control--has-prefix': props.prefixIcon },
				{
					'soft-input__control--has-suffix':
						props.suffixIcon || props.isClearable,
				},
			]"
		>
			<div
				v-if="props.prefixIcon"
				class="soft-input__prefix-icon"
				role="presentation"
			>
				<SoftIcon
					:name="props.prefixIcon"
					size="sm"
					label=""
				/>
			</div>
			<input
				:id="props.id"
				ref="inputRef"
				:type="props.type"
				:value="props.value"
				:aria-invalid="props.hasError"
				:aria-disabled="props.disabled"
				:aria-describedby="props.errorMsgId"
				:disabled="props.disabled"
				:readonly="props.readonly"
				:placeholder="props.placeholder"
				@input="handleOnInput"
				@change="handleOnChange"
				@focus="handleOnFocus"
				@keydown="handleOnKeyDown"
			/>
			<component
				:is="props.isClearable ? 'button' : 'div'"
				v-if="props.isClearable || props.suffixIcon"
				:role="props.isClearable ? 'button' : 'presentation'"
				:class="[
					{ 'soft-input__suffix-icon': props.suffixIcon },
					{ 'soft-input__clear-btn': props.isClearable },
					{
						'soft-input__clear-btn--has-value': props.isClearable && hasValue,
					},
				]"
				:aria-label="props.isClearable ? clearLabel : undefined"
				v-on="props.isClearable ? { click: () => handleOnClear() } : {}"
			>
				<SoftIcon
					:name="props.isClearable ? 'xMark' : props.suffixIcon!"
					size="sm"
					:label="props.isClearable ? clearLabel : ''"
				/>
			</component>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import SoftLabel from '../SoftLabel/SoftLabel.vue';
import type { SoftInputSize } from './types/SoftInputSize';
import type { SoftInputType } from './types/SoftInputType';
import type { SoftInputVariant } from './types/SoftInputVariant';

const inputRef = ref<HTMLInputElement | null>(null);

interface SoftInputProps {
	label: string;
	id: string;
	variant?: SoftInputVariant;
	size?: SoftInputSize;
	value: string;
	type?: SoftInputType;
	hasError?: boolean;
	errorMsgId?: string;
	/** Heroicon name (e.g. 'magnifyingGlass', 'userGroup') */
	prefixIcon?: string;
	/** Heroicon name (e.g. 'check') */
	suffixIcon?: string;
	hideLabel?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	placeholder?: string;
	isClearable?: boolean;
	clearLabel?: string;
}

interface SoftInputEmits {
	(name: 'input', value: string): void;
	(name: 'change', value: string): void;
	(name: 'clear', value: string): void;
	(name: 'focus'): void;
	(name: 'blur'): void;
}

const props = withDefaults(defineProps<SoftInputProps>(), {
	variant: 'base',
	type: 'text',
	size: 'md',
	hasError: false,
	hideLabel: false,
	disabled: false,
	readonly: false,
	placeholder: '',
	prefixIcon: undefined,
	suffixIcon: undefined,
	isClearable: false,
	errorMsgId: undefined,
	clearLabel: 'Clear',
});

const emit = defineEmits<SoftInputEmits>();

const hasValue = computed(() => props.value.trim().length > 0);

const handleOnInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('input', target.value);
};

const handleOnChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('change', target.value);
};

const handleOnClear = () => {
	emit('clear', '');
	inputRef.value?.focus();
};

const handleOnFocus = () => {
	emit('focus');
};

const handleOnKeyDown = (event: KeyboardEvent) => {
	if (event.key === 'Escape') {
		inputRef.value?.blur();
		emit('blur');
	}
};
</script>

<style src="./SoftInput.scss" lang="scss" scoped></style>
