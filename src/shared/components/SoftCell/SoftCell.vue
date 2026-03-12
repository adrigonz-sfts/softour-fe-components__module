<template>
    <div
        class="soft-cell body-sm"
        :class="{ 'soft-cell--heading': props.isHeading }"
        :role="props.isHeading ? 'columnheader' : 'cell'"
        :aria-colindex="props.colIndex"
    >
        <div class="soft-cell__content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isHeading?: boolean;
    colIndex?: number;
}>();
</script>

<style src="./SoftCell.scss" scoped></style>
