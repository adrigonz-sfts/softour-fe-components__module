<template>
	<SoftLabel
		:id="`${props.id}-label`"
		:for="props.id"
		class="soft-dropdown-label"
		:class="{
			'soft-dropdown-label--hidden': props.hideLabel,
			'soft-dropdown-label--disabled': props.disabled,
		}"
	>
		{{ label }}
	</SoftLabel>
	<div
		class="soft-dropdown body-sm"
		:class="[
			{
				'soft-dropdown--open': isOpen,
				'soft-dropdown--error': hasWarningActive,
				'soft-dropdown--disabled': props.disabled,
			},
			`soft-dropdown--${props.variant}`,
		]"
		:style="{
			'--dropdown-visible-options': numVisibleOptions,
		}"
	>
		<div
			:id="props.id"
			:aria-controls="`${props.id}-listbox`"
			:aria-expanded="isOpen"
			aria-haspopup="listbox"
			:aria-labelledby="`${props.id}-label`"
			class="soft-dropdown__input"
			:class="`soft-dropdown__input--${props.size}`"
			role="combobox"
			tabindex="0"
			:aria-disabled="props.disabled"
			:aria-activedescendant="options[activeIndex]?.id"
			:aria-invalid="props.hasWarningActive"
			@click="toggleDropdown"
			@blur="handleBlur"
			@keydown="handleKeydown"
		>
			<SoftIcon
				v-if="props.hasWarningActive"
				name="exclamationTriangle"
				size="sm"
				label="Warning"
				class="soft-dropdown__warning"
			/>
			<span class="soft-dropdown__single-line">{{
				innerSelectedOption?.text || placeholderText
			}}</span>
			<SoftIcon
				name="chevronDown"
				size="sm"
				label="Open menu"
				class="soft-dropdown__arrow"
			/>
		</div>
		<div
			:id="`${props.id}-listbox`"
			ref="listbox"
			class="soft-dropdown__menu"
			role="listbox"
			:aria-labelledby="`${props.id}-label`"
			tabindex="-1"
		>
			<div
				ref="optionsRefs"
				class="soft-dropdown__options"
			>
				<div
					v-for="(option, i) in options"
					:id="option.id"
					:key="option.id"
					role="option"
					:aria-selected="innerSelectedOption?.id === option.id"
					class="soft-dropdown__option"
					:class="{
						'soft-dropdown__option--active': activeIndex === i,
						'soft-dropdown__option--selected':
							innerSelectedOption?.id === option.id,
					}"
					@click="selectOption(option)"
				>
					<span class="soft-dropdown__single-line">{{ option.text }}</span>
				</div>
			</div>
		</div>
	</div>
	<span
		v-if="props.hasWarningActive && props.warningText"
		class="soft-dropdown-error caption"
		role="alert"
	>
		{{ warningText }}
	</span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import SoftLabel from '../SoftLabel/SoftLabel.vue';
import { useSoftDropdownKeyboard } from './composables/useSoftDropdownKeyboard';
import type { SoftDropdownOption } from './types/SoftDropdownOption';
import type { SoftDropdownSize } from './types/SoftDropdownSize';
import type { SoftDropdownVariant } from './types/SoftDropdownVariant';
import { KeyboardAction } from './types/SoftKeyboardAction';

interface SoftDropdownProps {
	label: string;
	id: string;
	options: SoftDropdownOption[];
	hideLabel?: boolean;
	variant?: SoftDropdownVariant;
	selectedOption: SoftDropdownOption | null;
	hasWarningActive?: boolean;
	warningText?: string;
	placeholder?: string;
	numVisibleOptions?: number;
	size?: SoftDropdownSize;
	disabled?: boolean;
}

interface SoftDropdownEmits {
	(name: 'selectOption', option: SoftDropdownOption): void;
}

const props = withDefaults(defineProps<SoftDropdownProps>(), {
	hasWarningActive: false,
	warningText: '',
	variant: 'deep',
	hideLabel: true,
	placeholder: '',
	numVisibleOptions: 3,
	size: 'md',
	disabled: false,
});
const emit = defineEmits<SoftDropdownEmits>();

const optionsRefs = ref<HTMLDivElement | null>(null);
const listbox = ref<HTMLDivElement | null>(null);
const isMenuOpen = ref(false);
const isOpen = computed(() => Boolean(props.options.length) && isMenuOpen.value);
const placeholderText = computed(() => {
	if (props.placeholder) {
		return props.placeholder;
	}

	return props.options.length ? props.placeholder : '-';
});
const selectedOptionId = ref<string | null>(null);
const innerSelectedOption = computed(() => {
	if (!props.selectedOption && !selectedOptionId.value) {
		return null;
	}

	return (
		props.selectedOption ??
		props.options.find((option) => option.id === selectedOptionId.value)
	);
});

const openDropdown = () => {
	isMenuOpen.value = true;
};
const closeDropdown = () => {
	isMenuOpen.value = false;
};
const toggleDropdown = () => {
	if (props.disabled) {
		return;
	}

	isMenuOpen.value = !isMenuOpen.value;
};

const selectOption = (option: SoftDropdownOption) => {
	selectedOptionId.value = option.id;
	emit('selectOption', option);
	closeDropdown();
};

const handleBlur = (event: FocusEvent): void => {
	if (listbox.value?.contains(event.relatedTarget as Node)) {
		return;
	}
	closeDropdown();
};

const { getActionFromKey, activeIndex, updateActiveIndex } = useSoftDropdownKeyboard({
	optionsLength: props.options.length,
	isMenuOpen,
	optionsRefs,
});

const keyboardActionHandler: {
	[K in KeyboardAction]: () => void;
} = {
	[KeyboardAction.Next]: () => {
		updateActiveIndex(activeIndex.value, KeyboardAction.Next);
	},
	[KeyboardAction.Previous]: () => {
		updateActiveIndex(activeIndex.value, KeyboardAction.Previous);
	},
	[KeyboardAction.SelectAndClose]: () => {
		const option = props.options[activeIndex.value];
		if (option) selectOption(option);
		closeDropdown();
	},
	[KeyboardAction.Close]: closeDropdown,
	[KeyboardAction.Open]: openDropdown,
	[KeyboardAction.None]: () => {},
};

const handleKeydown = (event: KeyboardEvent) => {
	event.preventDefault();

	const action = getActionFromKey(event);

	keyboardActionHandler[action]();
};
</script>

<style src="./SoftDropdown.scss" lang="scss" scoped></style>
