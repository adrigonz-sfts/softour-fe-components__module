<template>
	<span :class="['soft-tag', `soft-tag--${props.variant}`]"
	>
		{{ props.label }}
	</span>
</template>

<script setup lang="ts">
import { SoftTagVariant } from './types/SoftTagVariant';

interface SoftTagProps {
	variant?: SoftTagVariant;
	label?: string;
}

const props = withDefaults(defineProps<SoftTagProps>(), {
	variant: 'primary' as SoftTagVariant,
	label: '',
});
</script>

<style src="./SoftTag.scss" scoped lang="scss" />
