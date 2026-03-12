import { screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftIconButton from '../SoftIconButton.vue';

describe('SoftIconButton.vue', () => {
    it('renders a button with the given aria-label', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'pencil',
            label: 'Edit item',
        });

        await render.build();

        const button = screen.getByRole('button', { name: 'Edit item' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Edit item');
    });

    it('applies icon variant class by default', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'pencil',
            label: 'Edit',
        });

        await render.build();

        const button = screen.getByRole('button', { name: 'Edit' });
        expect(button).toHaveClass('soft-icon-button--icon');
    });

    it('applies button variant class when variant is button', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'plus',
            label: 'Add',
            variant: 'button',
        });

        await render.build();

        const button = screen.getByRole('button', { name: 'Add' });
        expect(button).toHaveClass('soft-icon-button--button');
    });

    it('is disabled when disabled prop is true', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'pencil',
            label: 'Edit',
            disabled: true,
        });

        await render.build();

        const button = screen.getByRole('button', { name: 'Edit' });
        expect(button).toBeDisabled();
    });

    it('emits click when clicked', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'trash',
            label: 'Delete',
        });

        const { emitted } = await render.build();

        const button = screen.getByRole('button', { name: 'Delete' });
        await userEvent.click(button);

        const events = emitted();
        expect(events).toHaveProperty('click');
        expect(events.click).toHaveLength(1);
    });

    it('does not emit click when disabled', async () => {
        const render = customRenderer(SoftIconButton).withProps({
            iconName: 'trash',
            label: 'Delete',
            disabled: true,
        });

        const { emitted } = await render.build();

        const button = screen.getByRole('button', { name: 'Delete' });
        await userEvent.click(button);

        const events = emitted();
        expect(events.click).toBeUndefined();
    });
});
