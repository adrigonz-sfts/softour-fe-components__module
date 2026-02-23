import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import CustomIcon from '../CustomIcon.vue';

describe('CustomIcon.vue', () => {
    it('renders an icon with size class', async () => {
        const render = customRenderer(CustomIcon).withProps({
            name: 'pencil',
            label: 'Edit',
        });

        const { container } = await render.build();

        const icon = container.querySelector('.custom-icon--md');
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName.toLowerCase()).toBe('svg');
    });

    it('applies size class for md by default', async () => {
        const render = customRenderer(CustomIcon).withProps({
            name: 'pencil',
            label: 'Edit',
        });

        const { container } = await render.build();

        const icon = container.querySelector('.custom-icon--md');
        expect(icon).toBeInTheDocument();
    });

    it('applies size class when size prop is set', async () => {
        const render = customRenderer(CustomIcon).withProps({
            name: 'pencil',
            label: 'Edit',
            size: 'sm',
        });

        const { container } = await render.build();

        const icon = container.querySelector('.custom-icon--sm');
        expect(icon).toBeInTheDocument();
    });

    it('renders an svg (Heroicon)', async () => {
        const render = customRenderer(CustomIcon).withProps({
            name: 'pencil',
            label: 'Edit',
        });

        const { container } = await render.build();

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('renders different icon by name', async () => {
        const render = customRenderer(CustomIcon).withProps({
            name: 'trash',
            label: 'Delete',
        });

        const { container } = await render.build();

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('custom-icon--md');
    });
});
