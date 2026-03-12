<template>
    <div
        class="soft-row"
        :class="{ 'soft-row--heading': props.isHeading, 'soft-row--clickable': isClickable }"
        role="row"
        :aria-rowindex="props.rowIndex"
        tabindex="0"
        @click="onRowClick"
    >
        <template
            v-for="(cell, index) in props.cells"
            :key="`cell-${index}`"
        >
            <SoftCell
                v-if="!props.hiddenColumns?.includes(index)"
                :isHeading="props.isHeading"
                :colIndex="getVisibleColIndex(index)"
            >
                <slot>
                    {{ cell }}
                </slot>
            </SoftCell>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SoftCell from '../SoftCell/SoftCell.vue';

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

<style src="./SoftRow.scss" scoped></style>
