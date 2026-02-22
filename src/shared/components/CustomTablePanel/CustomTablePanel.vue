<template>
    <div class="custom-table-panel">
        <div class="custom-table-panel__wrapper">
            <div class="custom-table-panel__wrapper-title">
                <h2>
                    {{ props.title }}
                </h2>
                <h3 v-if="props.subTitle">
                    {{ props.subTitle }}
                </h3>
            </div>
            <CustomButton
                v-if="$slots.filters"
                class="custom-table-panel__filter-button"
                type="button"
                @click="areFiltersOpen = !areFiltersOpen"
            >
                {{ areFiltersOpen ? 'Hide Filters' : 'Open Filters' }}
            </CustomButton>
            <CustomButton
                class="custom-table-panel__collapse-button"
                type="button"
                @click="isTableCollapsed = !isTableCollapsed"
            >
                {{ isTableCollapsed ? 'Expand' : 'Collapse' }}
            </CustomButton>
        </div>

        <Transition name="custom-table-panel__filter-transition">
            <div
                v-if="areFiltersOpen"
                class="custom-table-panel__filter-wrapper"
            >
                <slot name="filters" />
            </div>
        </Transition>
        <Transition name="custom-table-panel__collapse-transition">
            <div
                v-if="!isTableCollapsed"
                class="custom-table-panel__collapse-wrapper"
            >
                <slot name="table" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomButton from '../CustomButton/CustomButton.vue';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Table Title',
    },
    subTitle: {
        type: String,
        required: false,
        default: '',
    },
});

const areFiltersOpen = ref(false);
const isTableCollapsed = ref(false);
</script>

<style src="./CustomTablePanel.scss" scoped></style>
