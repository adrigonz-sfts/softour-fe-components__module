<template>
    <button
        class="soft-icon-button"
        :class="`soft-icon-button--${props.variant}`"
        :disabled="props.disabled"
        :aria-disabled="props.disabled"
        :aria-label="props.label"
    >
        <SoftIcon
            :name="props.iconName"
            :size="props.size"
            :type="props.type"
            :label="props.label"
        />
    </button>
</template>

<script setup lang="ts">
import SoftIcon from '../SoftIcon/SoftIcon.vue';

const props = withDefaults(
    defineProps<{
        iconName: string;
        label: string;
        variant?: 'button' | 'icon';
        size?: 'xs' | 'sm' | 'md' | 'lg';
        type?: 'outline' | 'solid';
        disabled?: boolean;
    }>(),
    {
        variant: 'icon',
        size: 'md',
        type: 'outline',
        disabled: false,
    }
);
</script>

<style src="./SoftIconButton.scss" scoped></style>
