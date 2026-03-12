<template>
	<a
		v-if="isExternalLink"
		:aria-disabled="props.disabled"
		:tabindex="props.disabled ? -1 : undefined"
		:href="href"
		:class="classes"
		@click="onClick"
	>
		<SoftIcon
			v-if="props.iconName"
			:name="props.iconName"
			:label="props.iconLabel"
			:size="props.iconSize"
			:type="props.iconType"
			class="soft-link__icon"
		/>
		<slot />
	</a>
	<router-link
		v-else
		:class="classes"
		:aria-disabled="props.disabled"
		:tabindex="props.disabled ? -1 : undefined"
		:to="to"
		@click="onClick"
	>
		<SoftIcon
			v-if="props.iconName"
			:name="props.iconName"
			:label="props.iconLabel"
			:size="props.iconSize"
			:type="props.iconType"
			class="soft-link__icon"
		/>
		<slot />
	</router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import { SoftLinkVariant } from './types/SoftLinkVariant';

interface SoftLinkProps {
	to: RouteLocationRaw;
	variant?: SoftLinkVariant;
	disabled?: boolean;
	active?: boolean;
	/** Heroicon name (e.g. 'plus', 'arrowRight'). When set, shows icon with gap from label */
	iconName?: string;
	/** Icon position relative to link content */
	iconPosition?: 'left' | 'right';
	iconSize?: 'xs' | 'sm' | 'md' | 'lg';
	iconType?: 'outline' | 'solid';
	/** Aria-label for the icon (required for a11y when iconName is set) */
	iconLabel?: string;
}

const props = withDefaults(defineProps<SoftLinkProps>(), {
	variant: 'default' as SoftLinkVariant,
	active: false,
	iconName: undefined,
	iconPosition: 'left',
	iconSize: 'sm',
	iconType: 'outline',
	iconLabel: 'Link',
});

const isExternalLink = computed(() => (
		typeof props.to === 'string' &&
		(props.to.startsWith('http') || props.to === '#')
	));

const href = computed(() => isExternalLink.value ? (props.to as string) : '');

const classes = computed(() => [
	`soft-link soft-link--${props.variant}`,
	{ 'soft-link--disabled': props.disabled },
	{ 'soft-link--active': props.active },
	{ 'soft-link--with-icon': props.iconName },
	{ 'soft-link--icon-reversed': props.iconName && props.iconPosition === 'right' },
]);

function onClick(e: MouseEvent) {
	if (props.disabled) {
		e.preventDefault();
		e.stopPropagation();
	}
}
</script>

<style src="./SoftLink.scss" lang="scss" scoped></style>
