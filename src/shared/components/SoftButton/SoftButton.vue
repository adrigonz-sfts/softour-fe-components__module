<template>
    <button
        class="soft-button"
        :class="[
            `soft-button--${props.variant}`,
            props.iconName && 'soft-button--with-icon',
        ]"
        :type="props.type"
        :disabled="props.disabled"
        :aria-disabled="props.disabled"
    >
        <SoftIcon
            v-if="props.iconName && props.iconPosition === 'left'"
            :name="props.iconName"
            :label="props.label"
            :size="props.iconSize"
            :type="props.iconType"
            class="soft-button__icon"
        />
        <slot>
            {{ props.label }}
        </slot>
        <SoftIcon
            v-if="props.iconName && props.iconPosition === 'right'"
            :name="props.iconName"
            :label="props.label"
            :size="props.iconSize"
            :type="props.iconType"
            class="soft-button__icon"
        />
    </button>
</template>

<script setup lang="ts">
import SoftIcon from '../SoftIcon/SoftIcon.vue';

const props = withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'delete';
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
        label?: string;
        /** Heroicon name (e.g. 'plus', 'trash'). When set, shows icon with gap-sm from label */
        iconName?: string;
        /** Icon position relative to label */
        iconPosition?: 'left' | 'right';
        iconSize?: 'xs' | 'sm' | 'md' | 'lg';
        iconType?: 'outline' | 'solid';
    }>(),
    {
        variant: 'primary',
        type: 'button',
        disabled: false,
        label: 'Button',
        iconName: undefined,
        iconPosition: 'left',
        iconSize: 'sm',
        iconType: 'outline',
    }
);
</script>

<style src="./SoftButton.scss" scoped></style>
