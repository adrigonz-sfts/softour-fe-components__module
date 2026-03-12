<template>
	<button
		type="button"
		:aria-pressed="props.isActive"
		:aria-label="props.label"
		:disabled="props.isDisabled"
		:class="[
			'soft-toggle-button',
			`soft-toggle-button--${props.variant}`,
		]"
	>
		<span
			v-if="hasStateNotification"
			role="presentation"
			:class="['soft-toggle-button__state', `soft-toggle-button__state--${props.state}`]"
		/>
		<SoftIcon
			v-if="props.iconName"
			:name="props.iconName"
			:label="props.iconLabel ?? props.label"
			size="md"
			:type="iconType"
			class="soft-toggle-button__icon"
		/>
		<slot
			v-else
			name="icon"
		/>
	</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import { SoftToggleButtonState } from './types/SoftToggleButtonState';
import { SoftToggleButtonVariant } from './types/SoftToggleButtonVariant';

interface SoftToggleButtonProps {
	variant?: SoftToggleButtonVariant;
	state?: SoftToggleButtonState;
	isActive?: boolean;
	isDisabled?: boolean;
	label?: string;
	/** Heroicon name (e.g. speakerWave). When set, outline when inactive, solid when active. */
	iconName?: string;
	/** Aria-label for the icon when iconName is set (defaults to label). */
	iconLabel?: string;
}

const props = withDefaults(defineProps<SoftToggleButtonProps>(), {
	variant: 'primary' as SoftToggleButtonVariant,
	state: 'none' as SoftToggleButtonState,
	isActive: false,
	isDisabled: false,
	label: 'Toggle Button',
	iconName: undefined,
	iconLabel: undefined,
});

const hasStateNotification = computed(() => props.state !== 'none');
const iconType = computed(() => (props.isActive ? 'solid' : 'outline'));
</script>

<style src="./SoftToggleButton.scss" lang="scss" scoped></style>
