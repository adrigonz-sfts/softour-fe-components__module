import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftProfilePicture from '../SoftProfilePicture.vue';

describe('SoftProfilePicture', () => {
	it('renders profile picture', async () => {
		await customRenderer(SoftProfilePicture).build();

		expect(screen.getByLabelText('Profile picture')).toBeInTheDocument();
	});

	it('renders profile variant and xl size with fallback icon when no image', async () => {
		await customRenderer(SoftProfilePicture)
			.withProps({ variant: 'profile', size: 'xl' })
			.build();

		const profile = screen.getByLabelText('Profile picture');

		expect(profile).toHaveClass('soft-profile-picture--profile');
		expect(profile).toHaveClass('soft-profile-picture--xl');
		expect(profile.querySelector('svg')).toBeInTheDocument();
	});

	it('renders profile variant and xl size with image when picture provided', async () => {
		await customRenderer(SoftProfilePicture)
			.withProps({
				variant: 'profile',
				size: 'xl',
				picture: 'https://content-storage.voicemod.net',
				username: 'John Doe',
			})
			.build();

		const profile = screen.getByLabelText('Profile picture');
		const image = screen.getByAltText('John Doe');

		expect(profile).toHaveClass('soft-profile-picture--profile');
		expect(profile).toHaveClass('soft-profile-picture--xl');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'https://content-storage.voicemod.net');
	});

	it('renders follower variant and xs size with initial', async () => {
		await customRenderer(SoftProfilePicture)
			.withProps({
				variant: 'follower',
				size: 'xs',
				username: 'John Doe',
			})
			.build();

		const profile = screen.getByLabelText('Profile picture');

		expect(profile).toHaveClass('soft-profile-picture--follower');
		expect(profile).toHaveClass('soft-profile-picture--xs');
		expect(screen.getByText('J')).toBeInTheDocument();
	});

	it('renders slot content', async () => {
		await customRenderer(SoftProfilePicture)
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByLabelText('Profile picture')).toHaveTextContent('hello');
	});
});
