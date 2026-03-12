import type { Meta, StoryFn } from '@storybook/vue3-vite';
import profilePictureImg from './assets/profiulePicture.jpg';
import SoftProfilePicture from './SoftProfilePicture.vue';
import { SoftProfilePictureSize } from './types/SoftProfilePictureSize';
import { SoftProfilePictureVariant } from './types/SoftProfilePictureVariant';

const meta: Meta<typeof SoftProfilePicture> = {
	title: 'Atoms/SoftProfilePicture',
	component: SoftProfilePicture,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
The \`SoftProfilePicture\` component displays user profile images or a Heroicons fallback when no image is available. It supports profile and follower variants and two sizes.

### Usage
- User profile pages, comment sections, user lists, navigation headers.
- **Profile**: Shows photo or a user-circle icon (Heroicons) when no picture.
- **Follower**: Shows the first letter of the username with a colored background.

### Sizes
- **xl**: 124px (prominent display)
- **xs**: 32px (compact)
				`,
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['profile', 'follower'] as SoftProfilePictureVariant[],
		},
		size: {
			control: 'select',
			options: ['xs', 'xl'] as SoftProfilePictureSize[],
		},
		picture: { control: 'text' },
		username: { control: 'text' },
	},
	args: {
		variant: 'profile' as SoftProfilePictureVariant,
		size: 'xl' as SoftProfilePictureSize,
		picture: '',
		username: '',
	},
};

export default meta;

export const Default: StoryFn<typeof SoftProfilePicture> = (args) => ({
	components: { SoftProfilePicture },
	setup() {
		return { args };
	},
	template: `
		<SoftProfilePicture
			:variant="args.variant"
			:size="args.size"
			:picture="args.picture"
			:username="args.username"
		/>
	`,
});

export const WithImage: StoryFn<typeof SoftProfilePicture> = Default.bind({});
WithImage.args = {
	variant: 'profile',
	size: 'xl',
	picture: profilePictureImg,
};

export const WithoutImage: StoryFn<typeof SoftProfilePicture> = Default.bind({});
WithoutImage.args = {
	variant: 'profile',
	size: 'xl',
};

export const SmallSize: StoryFn<typeof SoftProfilePicture> = Default.bind({});
SmallSize.args = {
	variant: 'profile',
	size: 'xs',
	picture: profilePictureImg,
};

export const FollowerVariant: StoryFn<typeof SoftProfilePicture> = Default.bind({});
FollowerVariant.args = {
	variant: 'follower',
	size: 'xs',
	username: 'John Doe',
};

export const FollowerLarge: StoryFn<typeof SoftProfilePicture> = Default.bind({});
FollowerLarge.args = {
	variant: 'follower',
	size: 'xl',
	username: 'John Doe',
};

export const MultipleSizes: StoryFn<typeof SoftProfilePicture> = (args) => ({
	components: { SoftProfilePicture },
	setup() {
		return { args };
	},
	template: `
		<div style="display: flex; align-items: center; gap: 16px;">
			<SoftProfilePicture variant="profile" size="xs" :picture="args.picture" />
			<SoftProfilePicture variant="profile" size="xl" :picture="args.picture" />
		</div>
	`,
});
MultipleSizes.args = {
	picture: profilePictureImg,
};

export const VariantComparison: StoryFn<typeof SoftProfilePicture> = (args) => ({
	components: { SoftProfilePicture },
	setup() {
		return { args };
	},
	template: `
		<div style="display: flex; align-items: center; gap: 16px;">
			<SoftProfilePicture variant="profile" size="xl" :picture="args.picture" />
			<SoftProfilePicture variant="follower" size="xl" username="John Doe" />
		</div>
	`,
});
VariantComparison.args = {
	picture: profilePictureImg,
};
