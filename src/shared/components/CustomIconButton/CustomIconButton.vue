<template>
    <button
        class="custom-icon-button"
        :class="`custom-icon-button--${props.variant}`"
        :disabled="props.disabled"
        :aria-label="props.label"
    >
        <CustomIcon
            :name="props.iconName"
            :size="props.size"
            :type="props.type"
            :label="props.label"
        />
    </button>
</template>

<script setup lang="ts">
import CustomIcon from '../CustomIcon/CustomIcon.vue';

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

<style src="./CustomIconButton.scss" scoped></style>
