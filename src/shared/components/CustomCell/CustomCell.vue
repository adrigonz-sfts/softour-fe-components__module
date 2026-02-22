<template>
    <div
        class="custom-cell"
        :class="{ 'custom-cell--heading': props.isHeading }"
        :role="props.isHeading ? 'columnheader' : 'cell'"
        :aria-colindex="props.colIndex"
    >
        <div class="custom-cell__content">
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

<style src="./CustomCell.scss" scoped></style>
