<template>
    <div
        class="custom-row"
        :class="{ 'custom-row--heading': props.isHeading, 'custom-row--clickable': isClickable }"
        role="row"
        :aria-rowindex="props.rowIndex"
        tabindex="0"
        @click="onRowClick"
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
import { computed } from 'vue';
import CustomCell from '../CustomCell/CustomCell.vue';

const props = defineProps<{
    cells: string[];
    isHeading?: boolean;
    rowIndex?: number;
    hiddenColumns?: number[];
    /** When set, row is clickable and emits rowClick with this index */
    dataIndex?: number;
}>();

const emit = defineEmits<{
    rowClick: [dataIndex: number];
}>();

const isClickable = computed(() => !props.isHeading && props.dataIndex !== undefined);

function onRowClick() {
    if (isClickable.value && props.dataIndex !== undefined) {
        emit('rowClick', props.dataIndex);
    }
}

const getVisibleColIndex = (index: number): number => {
    if (!props.hiddenColumns?.length) return index + 1;

    const hiddenBefore = props.hiddenColumns.filter((hiddenIndex) => hiddenIndex <= index).length;
    return index + 1 - hiddenBefore;
};
</script>

<style src="./CustomRow.scss" scoped></style>
