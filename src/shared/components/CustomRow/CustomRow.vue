<template>
    <div
        class="custom-row"
        :class="{ 'custom-row--heading': props.isHeading }"
        role="row"
        :aria-rowindex="props.rowIndex"
    >
        <template
            v-for="(cell, index) in props.cells"
            :key="`cell-${index}`"
        >
            <CustomCell
                v-if="!props.hiddenColumns?.includes(index)"
                :isHeading="props.isHeading"
                :colIndex="getVisibleColIndex(index)"
            >
                {{ cell }}
            </CustomCell>
        </template>
    </div>
</template>

<script setup lang="ts">
import CustomCell from '../CustomCell/CustomCell.vue';

const props = defineProps<{
    cells: string[];
    isHeading?: boolean;
    rowIndex?: number;
    hiddenColumns?: number[];
}>();

const getVisibleColIndex = (index: number): number => {
    if (!props.hiddenColumns?.length) return index + 1;

    const hiddenBefore = props.hiddenColumns.filter((hiddenIndex) => hiddenIndex <= index).length;
    return index + 1 - hiddenBefore;
};
</script>

<style src="./CustomRow.scss" scoped></style>
