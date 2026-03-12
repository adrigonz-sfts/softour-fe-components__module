import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftLink from '../SoftLink.vue';

describe('SoftLink', () => {
	it('renders the link with the correct href attribute and its content in the slot', async () => {
		const href = '/';
		await customRenderer(SoftLink)
			.withProps({ to: href })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link', { name: 'hello' });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', href);
	});

	it('renders the link with the correct href attribute when it is an external link', async () => {
		const href = 'https://example.com';
		await customRenderer(SoftLink)
			.withProps({ to: href })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link', { name: 'hello' });

		expect(link).toHaveAttribute('href', href);
	});

	it('applies primary variant correctly', async () => {
		await customRenderer(SoftLink)
			.withProps({ variant: 'primary', to: '/' })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link');

		expect(link).toHaveClass('soft-link--primary');
	});

	it('applies default variant correctly', async () => {
		await customRenderer(SoftLink)
			.withProps({ variant: 'default', to: '/' })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link');

		expect(link).toHaveClass('soft-link--default');
	});

	it('renders SoftIcon when iconName is passed', async () => {
		await customRenderer(SoftLink)
			.withProps({
				variant: 'primary',
				to: '/',
				iconName: 'plus',
				iconLabel: 'Add',
			})
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link', { name: 'hello' });

		expect(link.querySelector('svg')).toBeInTheDocument();
		expect(link).toHaveClass('soft-link--with-icon');
	});

	it('render disabled variant correctly', async () => {
		await customRenderer(SoftLink)
			.withProps({ variant: 'default', disabled: true, to: '/' })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link');

		expect(link).toHaveClass('soft-link--disabled');
		expect(link).toHaveAttribute('aria-disabled', 'true');
	});

	it('render active link correctly', async () => {
		await customRenderer(SoftLink)
			.withProps({ variant: 'default', active: true, to: '/' })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link');

		expect(link).toHaveClass('soft-link--active');
	});
});
