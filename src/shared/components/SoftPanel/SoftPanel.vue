<template>
    <div class="soft-panel">
        <div class="soft-panel__wrapper">
            <div class="soft-panel__wrapper-title">
                <h2 class="headline-sm">
                    {{ props.title }}
                </h2>
                <h3 v-if="props.subTitle">
                    {{ props.subTitle }}
                </h3>
            </div>
            <SoftIconButton
                v-if="$slots.filters"
                class="soft-panel__filter-button"
                iconName="funnel"
                :label="areFiltersOpen ? 'Hide Filters' : 'Open Filters'"
                :type="areFiltersOpen ? 'solid' : 'outline'"
                @click="areFiltersOpen = !areFiltersOpen"
            />
            <SoftIconButton
                class="soft-panel__collapse-button"
                :iconName="isTableCollapsed ? 'chevronDown' : 'chevronUp'"
                :iconType="isTableCollapsed ? 'outline' : 'solid'"
                label="Toggle table collapse"
                @click="isTableCollapsed = !isTableCollapsed"
            />
        </div>

        <Transition name="soft-panel__filter-transition">
            <div
                v-if="areFiltersOpen"
                class="soft-panel__filter-wrapper"
            >
                <slot name="filters" />
            </div>
        </Transition>
        <Transition name="soft-panel__collapse-transition">
            <div
                v-if="!isTableCollapsed"
                class="soft-panel__collapse-wrapper"
            >
                <slot name="table" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SoftIconButton from '../SoftIconButton/SoftIconButton.vue';

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

<style src="./SoftPanel.scss" scoped></style>
