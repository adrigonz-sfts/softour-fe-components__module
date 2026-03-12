import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { customRenderer } from '@/helpers/customRenderer';
import SoftTab from '../SoftTab.vue';

describe('SoftTab', () => {
    it('renders the tab with the correct icon and text', async () => {
        await customRenderer(SoftTab)
            .withProps({
                iconName: 'home',
                text: 'Home',
                isActive: false,
                to: '/',
            })
            .build();

        const tab = screen.getByRole('link');

        expect(tab).toBeInTheDocument();
        expect(tab).toHaveTextContent('Home');
        expect(tab).toHaveAttribute('href', '/');
        expect(tab.querySelector('.soft-tab__icon')).toBeInTheDocument();
    });

    it('renders the tab with the correct icon and text when active', async () => {
        await customRenderer(SoftTab)
            .withProps({
                iconName: 'home',
                text: 'Home',
                isActive: true,
                to: '/',
            })
            .build();

        const tab = screen.getByRole('link');

        expect(tab).toHaveClass('soft-tab--active');
        expect(tab).toHaveAttribute('aria-disabled', 'false');
    });

    it('renders the tab as disabled when the disabled prop is true', async () => {
        await customRenderer(SoftTab)
            .withProps({
                iconName: 'home',
                text: 'Home',
                isActive: false,
                to: '/',
                disabled: true,
            })
            .build();

        const tab = screen.getByRole('link');

        expect(tab).toHaveClass('soft-tab--disabled');
        expect(tab).toHaveAttribute('href', '/');
        expect(tab).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders the tab as a button when the to prop is undefined', async () => {
        await customRenderer(SoftTab)
            .withProps({
                iconName: 'home',
                text: 'Home',
                isActive: false,
            })
            .build();

        const tab = screen.getByRole('button');

        expect(tab).toHaveClass('soft-tab');
        expect(tab).toHaveAttribute('aria-disabled', 'false');
    });

    it('applies filled variant class when variant is filled', async () => {
        await customRenderer(SoftTab)
            .withProps({
                iconName: 'home',
                text: 'Home',
                variant: 'filled',
                to: '/',
            })
            .build();

        const tab = screen.getByRole('link');

        expect(tab).toHaveClass('soft-tab--filled');
    });
});
