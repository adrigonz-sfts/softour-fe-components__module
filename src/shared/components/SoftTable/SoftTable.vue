<template>
    <div
        class="soft-table"
        role="table"
        aria-label="Soft data table"
        :aria-colcount="visibleColumnsCount"
        :aria-rowcount="props.dataRows.length + 1"
    >
        <div
            role="rowgroup"
            class="soft-table__heading"
        >
            <SoftRow
                isHeading
                :cells="props.headingRows"
                :rowIndex="1"
                :hiddenColumns="props.hiddenColumns"
            />
        </div>
        <div
            role="rowgroup"
            class="soft-table__content"
        >
            <SoftRow
                v-for="(row, index) in props.dataRows"
                :key="`row-${index}`"
                :cells="row"
                :rowIndex="index + 2"
                :hiddenColumns="props.hiddenColumns"
                :dataIndex="index"
                @rowClick="(dataIndex: number) => emit('rowClick', dataIndex)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SoftRow from '../SoftRow/SoftRow.vue';

const emit = defineEmits<{
    rowClick: [dataIndex: number];
}>();

const props = defineProps({
    headingRows: {
        type: Array as () => string[],
        required: false,
        default: () => [
            'Heading Row 1 - Cell 1',
            'Heading Row 1 - Cell 2',
            'Heading Row 1 - Cell 3',
        ],
    },
    dataRows: {
        type: Array as () => string[][],
        required: false,
        default: () => [['Row 1 - Cell 1', 'Row 1 - Cell 2', 'Row 1 - Cell 3']],
    },
    hiddenColumns: {
        type: Array as () => number[],
        required: false,
        default: () => [],
    },
});

const visibleColumnsCount = computed(
    () => props.headingRows.filter((_, index) => !props.hiddenColumns.includes(index)).length
);
</script>

<style src="./SoftTable.scss" scoped></style>
