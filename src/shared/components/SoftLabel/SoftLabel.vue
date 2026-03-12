<template>
	<label
		:for="props.for"
		class="soft-label body-sm"
	>
		<slot />
	</label>
</template>

<script lang="ts" setup>
interface SoftLabelProps {
	for: string;
}

const props = defineProps<SoftLabelProps>();
</script>

<style src="./SoftLabel.scss" lang="scss" scoped></style>
