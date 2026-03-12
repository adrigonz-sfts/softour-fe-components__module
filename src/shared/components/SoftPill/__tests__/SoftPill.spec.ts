import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftPill from '../SoftPill.vue';

describe('SoftPill', () => {
	it('renders as button with slot content when to is not set', async () => {
		await customRenderer(SoftPill).withSlots({ default: 'hello' }).build();

		const button = screen.getByRole('button', { name: 'hello' });
		expect(button).toBeInTheDocument();
	});

	it('applies size class sm', async () => {
		await customRenderer(SoftPill)
			.withProps({ size: 'sm' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--sm');
	});

	it('applies size class md', async () => {
		await customRenderer(SoftPill)
			.withProps({ size: 'md' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--md');
	});

	it('applies size class lg', async () => {
		await customRenderer(SoftPill)
			.withProps({ size: 'lg' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--lg');
	});

	it('applies selected class when isSelected is true', async () => {
		await customRenderer(SoftPill)
			.withProps({ isSelected: true })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--selected');
	});

	it('renders as link when to is passed', async () => {
		await customRenderer(SoftPill)
			.withProps({ to: '/' })
			.withSlots({ default: 'hello' })
			.build();

		const link = screen.getByRole('link', { name: 'hello' });
		expect(link).toBeInTheDocument();
	});

	it('renders SoftIcon when iconName is passed', async () => {
		await customRenderer(SoftPill)
			.withProps({ iconName: 'plus', iconLabel: 'Add' })
			.withSlots({ default: 'hello' })
			.build();

		const el = screen.getByRole('button', { name: 'hello' });
		expect(el.querySelector('svg')).toBeInTheDocument();
		expect(el).toHaveClass('soft-pill--with-icon');
	});

	it('applies strong elevation by default', async () => {
		await customRenderer(SoftPill).withSlots({ default: 'hello' }).build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--strong');
	});

	it('applies bold elevation when set', async () => {
		await customRenderer(SoftPill)
			.withProps({ elevation: 'bold' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByRole('button')).toHaveClass('soft-pill--bold');
	});

	it('applies body-sm to text when size is sm', async () => {
		await customRenderer(SoftPill)
			.withProps({ size: 'sm' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByText('hello')).toHaveClass('body-sm');
	});

	it('applies body-lg to text when size is lg', async () => {
		await customRenderer(SoftPill)
			.withProps({ size: 'lg' })
			.withSlots({ default: 'hello' })
			.build();

		expect(screen.getByText('hello')).toHaveClass('body-lg');
	});
});
