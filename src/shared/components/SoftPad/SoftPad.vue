<template>
	<div class="soft-pad">
		<div class="soft-pad__axis soft-pad__axis--x">
			<label :for="`${props.id}-x-input`" class="decoration">{{ props.label[0] }}</label>
			<input
				v-if="!props.hideInputs"
				:id="`${props.id}-x-input`"
				class="soft-pad__value"
				type="number"
				min="0"
				max="100"
				:value="x"
				@change="(event) => handleInputChange(event, 'x')"
			/>
		</div>
		<div class="soft-pad__axis soft-pad__axis--y">
			<label :for="`${props.id}-y-input`" class="decoration">{{ props.label[1] }}</label>
			<input
				v-if="!props.hideInputs"
				:id="`${props.id}-y-input`"
				class="soft-pad__value"
				type="number"
				min="0"
				max="100"
				:value="y"
				@change="(event) => handleInputChange(event, 'y')"
			/>
		</div>
		<div v-if="!props.hideInputs" class="soft-pad__icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" class="soft-pad__icon-svg">
				<path class="soft-pad__icon-path" stroke-linecap="round" stroke-width="1.5" d="M9.138 17.233v-16M17.145 9.24h-16" />
				<circle class="soft-pad__icon-circle" cx="9.138" cy="9.24" r="4.192" stroke-width="1.5" />
			</svg>
		</div>
		<div class="soft-pad__container">
			<svg
				ref="svgRef"
				data-testid="soft-pad-svg"
				:viewBox="`0 0 ${GRID_SIZE} ${GRID_SIZE}`"
				@mousedown="startDrag"
			>
				<defs>
					<mask :id="`${props.id}-dots-mask`">
						<rect width="100%" height="100%" fill="black" />
						<g v-for="dot in dots" :key="`mask-${dot.row}-${dot.col}`">
							<circle :cx="dot.x" :cy="dot.y" r="3" fill="white" />
						</g>
					</mask>
					<radialGradient :id="`${props.id}-pad-gradient`" :cx="`${x}%`" :cy="`${100 - y}%`" r="50%">
						<stop class="soft-pad__gradient-stop" :offset="`${isDragging ? 30 : 10}%`" />
						<stop class="soft-pad__gradient-stop" offset="40%" />
						<stop class="soft-pad__gradient-stop" :offset="`${isDragging ? 70 : 100}%`" />
					</radialGradient>
				</defs>
				<rect
					:width="GRID_SIZE"
					:height="GRID_SIZE"
					:fill="`url(#${props.id}-pad-gradient)`"
					:mask="`url(#${props.id}-dots-mask)`"
				/>
				<circle
					:cx="selectorX"
					:cy="selectorY"
					class="soft-pad__selector"
					:class="{ 'soft-pad__selector--dragging': isDragging }"
				/>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { SoftPadProps } from './types/SoftPadProps';

const props = withDefaults(defineProps<SoftPadProps>(), {
	label: () => ['X', 'Y'] as [string, string],
	hideInputs: false,
});

const emit = defineEmits<{
	(event: 'update', x: number, y: number): void;
	(event: 'change', x: number, y: number): void;
}>();

const svgRef = ref<SVGSVGElement | null>(null);
const isDragging = ref(false);
const x = ref(props.value[0]);
const y = ref(props.value[1]);

const CELL_AMOUNT = 11;
const GRID_SIZE = 198;
const VALUE_MAX = 100;
const cellSize = GRID_SIZE / CELL_AMOUNT;

const selectorX = computed(() => {
	const minX = cellSize / 2;
	const maxX = GRID_SIZE - cellSize / 2;
	return minX + (x.value / VALUE_MAX) * (maxX - minX);
});

const selectorY = computed(() => {
	const minY = cellSize / 2;
	const maxY = GRID_SIZE - cellSize / 2;
	return maxY - (y.value / VALUE_MAX) * (maxY - minY);
});

const generateDots = () => {
	const dotsArray = [];
	for (let row = 0; row < CELL_AMOUNT; row += 1) {
		for (let col = 0; col < CELL_AMOUNT; col += 1) {
			dotsArray.push({
				row,
				col,
				x: col * cellSize + cellSize / 2,
				y: row * cellSize + cellSize / 2,
			});
		}
	}
	return dotsArray;
};
const dots = generateDots();

const emitUpdate = () => emit('update', x.value, y.value);
const emitChange = () => emit('change', x.value, y.value);

const handleInputChange = (event: Event, axis: 'x' | 'y') => {
	const val = Number((event.target as HTMLInputElement).value);
	if (axis === 'x') x.value = Number(Math.max(0, Math.min(VALUE_MAX, val)));
	if (axis === 'y') y.value = Number(Math.max(0, Math.min(VALUE_MAX, val)));
	emitChange();
};

const updatePosition = (event: MouseEvent) => {
	if (!svgRef.value) return;
	const rect = svgRef.value.getBoundingClientRect();
	const relativeX = (event.clientX - rect.left) / rect.width;
	const relativeY = (event.clientY - rect.top) / rect.height;
	x.value = Math.round(Math.max(0, Math.min(VALUE_MAX, relativeX * VALUE_MAX)));
	y.value = Math.round(
		Math.max(0, Math.min(VALUE_MAX, (1 - relativeY) * VALUE_MAX)),
	);
	emitUpdate();
};

const handleDrag = (event: MouseEvent) => {
	if (isDragging.value) updatePosition(event);
};

const stopDrag = () => {
	isDragging.value = false;
	document.removeEventListener('mousemove', handleDrag);
	document.removeEventListener('mouseup', stopDrag);
	emitChange();
};

const startDrag = (event: MouseEvent) => {
	isDragging.value = true;
	document.addEventListener('mousemove', handleDrag);
	document.addEventListener('mouseup', stopDrag);
	updatePosition(event);
};

watch(() => props.value, (newValue) => {
	if (newValue[0] !== x.value || newValue[1] !== y.value) {
		x.value = newValue[0];
		y.value = newValue[1];
	}
}, { deep: true });

onUnmounted(() => {
	document.removeEventListener('mousemove', handleDrag);
	document.removeEventListener('mouseup', stopDrag);
});
</script>

<style lang="scss" scoped src="./SoftPad.scss"></style>
