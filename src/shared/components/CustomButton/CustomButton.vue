<template>
    <button
        class="custom-button"
        :type="props.type"
        :disabled="props.disabled"
    >
        <slot>
            {{ props.label }}
        </slot>
    </button>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
        label?: string;
    }>(),
    {
        type: 'button',
        disabled: false,
        label: 'Button',
    }
);
</script>

<style src="./CustomButton.scss" scoped></style>
