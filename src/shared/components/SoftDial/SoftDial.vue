<template>
	<div
		class="soft-dial"
		:class="[
			`soft-dial--${props.size}`,
			{ 'soft-dial--hoverable': props.hoverable, 'soft-dial--static': !props.hoverable },
		]"
	>
		<div
			:id="props.id"
			:aria-label="props.label"
			class="soft-dial__container"
			role="slider"
			:class="{ 'soft-dial__container--dragging': isDragging }"
			:style="knobDegrees"
			@wheel="handleWheel"
			@mousedown="startDrag"
			@dblclick="resetValue"
		>
			<div class="soft-dial__value">
				<div class="soft-dial__input-container">
					<input
						v-if="!props.hideInput"
						type="number"
						class="soft-dial__input"
						:class="{ 'body-md': props.size === 'sm' }"
						:min="props.min"
						:max="props.max"
						:step="props.step"
						:value="currentValue"
						@input="handleInput"
						@blur="handleInputBlur"
						@keydown.enter.prevent="handleInputBlur"
						@mousedown.stop
						@click.stop
						@dblclick.stop
					/>
				</div>
				<label
					v-if="props.hoverable && !props.hideLabel"
					:for="props.id"
					class="body-xs"
				>{{ props.label }}</label>
			</div>
			<svg
				class="soft-dial__progress"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
			>
				<circle
					cx="50"
					cy="50"
					r="47"
					class="soft-dial__progress-background"
					fill="none"
					stroke-dasharray="221 295"
					stroke-dashoffset="0"
					transform="rotate(135 50 50)"
				/>
				<circle
					cx="50"
					cy="50"
					r="47"
					class="soft-dial__progress-foreground"
					fill="none"
					stroke-dasharray="295"
					:stroke-dashoffset="progressOffset"
					:transform="`rotate(${startAngle} 50 50)`"
				/>
			</svg>
			<div class="soft-dial__device" />
		</div>
		<div class="soft-dial__inner-content">
			<slot name="inner-content" />
		</div>
		<label
			v-if="!props.hoverable && !props.hideLabel"
			:for="props.id"
			class="body-xs soft-dial__label"
		>{{ props.label }}</label>
	</div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useSoftDial } from './composables/useSoftDial';
import { SoftDialProps } from './types/SoftDialProps';

const props = withDefaults(defineProps<SoftDialProps>(), {
	id: 'softDial',
	label: 'Default Dial',
	min: 0,
	max: 100,
	step: 1,
	value: 0,
	originValue: 0,
	defaultValue: 0,
	size: 'lg',
	hoverable: false,
	hideInput: false,
	hideLabel: false,
});

const emit = defineEmits<{
	(event: 'update', value: number): void;
	(event: 'change', value: number): void;
	(event: 'dragStateChange', isDragging: boolean): void;
}>();

const {
	isDragging,
	startAngle,
	knobDegrees,
	progressOffset,
	currentValue,
	resetValue,
	handleWheel,
	startDrag,
	handleInput,
	handleInputBlur,
} = useSoftDial({
	min: computed(() => props.min),
	max: computed(() => props.max),
	step: computed(() => props.step),
	value: computed(() => props.value),
	originValue: computed(() => props.originValue),
	defaultValue: computed(() => props.defaultValue),
	update: (newValue) => emit('update', newValue),
	change: (newValue) => emit('change', newValue),
});

watch(isDragging, (newValue) => {
	emit('dragStateChange', newValue);
});
</script>

<style src="./SoftDial.scss" lang="scss" scoped />
