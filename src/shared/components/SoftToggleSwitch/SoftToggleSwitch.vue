<template>
	<button
		role="switch"
		:aria-checked="props.isChecked"
		:aria-label="props.label"
		:disabled="props.disabled"
		:class="[
			'soft-toggle-switch',
			`soft-toggle-switch--${indicatorState}`,
			{ 'soft-toggle-switch--full': props.isFull },
		]"
	>
		<span
			v-if="props.isLabelVisible"
			:class="[
				'soft-toggle-switch__label',
				'body-sm',
				{ 'soft-toggle-switch__label--checked': props.isChecked },
				`soft-toggle-switch__label--${props.labelPosition}`,
			]"
			:aria-hidden="!props.isLabelVisible"
		>
			{{ props.label }}
		</span>
		<slot />
		<span class="soft-toggle-switch__indicator">
			<span
				class="soft-toggle-switch__indicator-handle"
				role="presentation"
			/>
		</span>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SoftToggleSwitchProps {
	id?: string;
	isChecked?: boolean;
	label?: string;
	isLabelVisible?: boolean;
	labelPosition?: 'left' | 'right';
	isFull?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<SoftToggleSwitchProps>(), {
	id: 'default-toggle-switch',
	isChecked: false,
	label: 'Toggle Switch',
	isLabelVisible: false,
	labelPosition: 'right',
	isFull: false,
	disabled: false,
});

const indicatorState = computed(() => (props.isChecked ? 'on' : 'off'));
</script>

<style src="./SoftToggleSwitch.scss" lang="scss" scoped></style>
