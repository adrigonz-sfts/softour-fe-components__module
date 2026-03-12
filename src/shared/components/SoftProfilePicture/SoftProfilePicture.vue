<template>
	<div
		class="soft-profile-picture"
		aria-label="Profile picture"
		:class="[
			`soft-profile-picture--${props.variant}`,
			`soft-profile-picture--${props.size}`,
		]"
		:style="{
			background: getBackgroundImage(),
		}"
	>
		<img
			v-if="props.variant === 'profile' && props.picture"
			:src="props.picture"
			:alt="props.username || 'Photo picture'"
		/>
		<SoftIcon
			v-else-if="props.variant === 'profile' && !props.picture"
			name="userCircle"
			label="Account"
			:size="profileIconSize"
			type="outline"
		/>
		<span v-if="props.variant === 'follower' && props.username">{{
			getFirstInitial(props.username)
		}}</span>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SoftIcon from '../SoftIcon/SoftIcon.vue';
import { SoftProfilePictureSize } from './types/SoftProfilePictureSize';
import { SoftProfilePictureVariant } from './types/SoftProfilePictureVariant';

interface SoftProfilePictureProps {
	variant?: SoftProfilePictureVariant;
	size?: SoftProfilePictureSize;
	picture?: string;
	username?: string;
}

const props = withDefaults(defineProps<SoftProfilePictureProps>(), {
	variant: 'profile' as SoftProfilePictureVariant,
	size: 'xl' as SoftProfilePictureSize,
	picture: '',
	username: '',
});

const profileIconSize = computed(() => (props.size === 'xl' ? 'lg' : 'sm'));

const avatarCoverColors = [
	'var(--color-surface-brand-canvas)',
	'var(--color-error-100)',
	'var(--color-surface-brand-active)',
	'var(--color-info-100)',
];

const getFirstInitial = (name: string) => name.charAt(0).toUpperCase();

const getRandomAvatarCoverColor = () =>
	avatarCoverColors[Math.floor(Math.random() * avatarCoverColors.length)];

const getBackgroundImage = () => {
	if (props.variant === 'profile') {
		return '';
	}
	return getRandomAvatarCoverColor();
};
</script>

<style src="./SoftProfilePicture.scss" lang="scss" scoped></style>
