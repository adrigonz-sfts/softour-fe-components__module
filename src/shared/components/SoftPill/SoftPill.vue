<template>
	<component
		:is="to ? 'router-link' : 'button'"
		:class="pillClasses"
		:to="to"
	>
		<SoftIcon
			v-if="iconName"
			:name="iconName"
			:label="iconLabel"
			:size="iconSize"
			:type="iconType"
			class="soft-pill__icon"
		/>
		<span :class="pillTextClasses"><slot /></span>
	</component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import { SoftPillElevation } from './types/SoftPillElevation';
import { SoftPillSize } from './types/SoftPillSize';

interface SoftPillProps {
	to?: RouteLocationRaw;
	size?: SoftPillSize;
	isSelected?: boolean;
	elevation?: SoftPillElevation;
	iconName?: string;
	iconLabel?: string;
	iconSize?: 'xs' | 'sm' | 'md' | 'lg';
	iconType?: 'outline' | 'solid';
	iconPosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<SoftPillProps>(), {
	to: undefined,
	size: 'sm' as SoftPillSize,
	isSelected: false,
	elevation: 'strong' as SoftPillElevation,
	iconName: undefined,
	iconSize: 'sm',
	iconType: 'outline',
	iconLabel: 'Pill',
	iconPosition: 'left',
});

const pillClasses = computed(() => [
	'soft-pill',
	`soft-pill--${props.size}`,
	`soft-pill--${props.elevation}`,
	{ 'soft-pill--selected': props.isSelected },
	{ 'soft-pill--with-icon': props.iconName },
	{ 'soft-pill--icon-reversed': props.iconName && props.iconPosition === 'right' },
]);

const pillTextClasses = computed(() => [
	{ 'body-sm': props.size === 'sm' },
	{ 'body-md': props.size === 'md' },
	{ 'body-lg': props.size === 'lg' },
]);
</script>

<style src="./SoftPill.scss" scoped lang="scss" />
