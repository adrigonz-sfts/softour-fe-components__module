<template>
	<div
		class="soft-skeleton"
		role="presentation"
		:aria-label="props.label"
		:style="skeletonStyle"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type SoftSkeletonColor = 'light' | 'default' | 'medium' | 'strong';
type SoftSkeletonRadius = 'sm' | 'md' | 'lg' | 'xl' | 'circle';

interface SoftSkeletonProps {
	label?: string;
	width?: string;
	height?: string;
	color?: SoftSkeletonColor;
	radius?: SoftSkeletonRadius;
}

const props = withDefaults(defineProps<SoftSkeletonProps>(), {
	label: 'loading',
	radius: 'sm',
	color: 'default',
	width: 'auto',
	height: 'auto',
});

const radiusMap: Record<SoftSkeletonRadius, string> = {
	sm: 'var(--border-radius-sm)',
	md: 'var(--border-radius-md)',
	lg: 'var(--border-radius-lg)',
	xl: 'var(--border-radius-xl)',
	circle: '50%',
};

const colorMap: Record<SoftSkeletonColor, string> = {
	light: 'var(--color-surface-base)',
	default: 'var(--color-surface-float)',
	medium: 'var(--color-200)',
	strong: 'var(--color-300)',
};

const skeletonStyle = computed(() => ({
	width: props.width,
	height: props.height,
	backgroundColor: colorMap[props.color],
	borderRadius: radiusMap[props.radius],
}));
</script>

<style lang="scss" scoped>
.soft-skeleton {
	--skeleton-shine: 0 0 0 / 0.08;

	position: relative;
	display: flex;

	overflow: hidden;

	&::after {
		content: '';

		position: absolute;
		inset: 0;
		transform: translateX(-100%);

		background-image: linear-gradient(
			90deg,
			transparent 0,
			rgba(255, 255, 255, 0.15) 20%,
			rgba(255, 255, 255, 0.35) 60%,
			transparent 100%
		);

		animation: soft-skeleton-loading 2s infinite;
	}
}

@keyframes soft-skeleton-loading {
	100% {
		transform: translateX(100%);
	}
}
</style>
