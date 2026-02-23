<template>
    <div
        class="custom-table"
        role="table"
        aria-label="Custom data table"
        :aria-colcount="visibleColumnsCount"
        :aria-rowcount="props.dataRows.length + 1"
    >
        <div
            role="rowgroup"
            class="custom-table__heading"
        >
            <CustomRow
                isHeading
                :cells="props.headingRows"
                :rowIndex="1"
                :hiddenColumns="props.hiddenColumns"
            />
        </div>
        <div
            role="rowgroup"
            class="custom-table__content"
        >
            <CustomRow
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
import CustomRow from '../CustomRow/CustomRow.vue';

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

<style src="./CustomTable.scss" scoped></style>
