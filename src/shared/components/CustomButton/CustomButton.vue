<template>
    <button
        class="custom-button"
        :class="[
            `custom-button--${props.variant}`,
            props.iconName && 'custom-button--with-icon',
        ]"
        :type="props.type"
        :disabled="props.disabled"
    >
        <CustomIcon
            v-if="props.iconName && props.iconPosition === 'left'"
            :name="props.iconName"
            :label="props.label"
            :size="props.iconSize"
            :type="props.iconType"
            class="custom-button__icon"
        />
        <slot>
            {{ props.label }}
        </slot>
        <CustomIcon
            v-if="props.iconName && props.iconPosition === 'right'"
            :name="props.iconName"
            :label="props.label"
            :size="props.iconSize"
            :type="props.iconType"
            class="custom-button__icon"
        />
    </button>
</template>

<script setup lang="ts">
import CustomIcon from '../CustomIcon/CustomIcon.vue';

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

<style src="./CustomButton.scss" scoped></style>
