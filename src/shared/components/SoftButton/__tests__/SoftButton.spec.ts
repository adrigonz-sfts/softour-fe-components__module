import { screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { customRenderer } from '@/helpers/customRenderer';
import SoftButton from '../SoftButton.vue';

describe('SoftButton.vue', () => {
    it('renders with default label when no slot content', async () => {
        await customRenderer(SoftButton).withProps({}).build();

        const button = screen.getByRole('button', { name: 'Button' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Button');
    });

    it('renders slot content when provided', async () => {
        await customRenderer(SoftButton)
            .withProps({})
            .withSlots({ default: 'Save changes' })
            .build();

        const button = screen.getByRole('button', { name: 'Save changes' });
        expect(button).toHaveTextContent('Save changes');
    });

    it('renders with custom label prop when no slot', async () => {
        await customRenderer(SoftButton).withProps({ label: 'Submit' }).build();

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toHaveTextContent('Submit');
    });

    it('applies primary variant class by default', async () => {
        await customRenderer(SoftButton).withProps({ label: 'Button' }).build();

        const button = screen.getByRole('button', { name: 'Button' });
        expect(button).toHaveClass('soft-button--primary');
    });

    it('applies secondary variant class when variant is secondary', async () => {
        await customRenderer(SoftButton)
            .withProps({ label: 'Cancel', variant: 'secondary' })
            .build();

        const button = screen.getByRole('button', { name: 'Cancel' });
        expect(button).toHaveClass('soft-button--secondary');
    });

    it('applies delete variant class when variant is delete', async () => {
        await customRenderer(SoftButton)
            .withProps({ label: 'Delete', variant: 'delete' })
            .build();

        const button = screen.getByRole('button', { name: 'Delete' });
        expect(button).toHaveClass('soft-button--delete');
    });

    it('applies with-icon class and renders icon when iconName is set', async () => {
        await customRenderer(SoftButton)
            .withProps({ label: 'Add', iconName: 'plus' })
            .build();

        const button = screen.getByRole('button', { name: 'Add' });
        expect(button).toHaveClass('soft-button--with-icon');
        // Heroicon SVGs have aria-hidden="true" and cannot be found via within() queries
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('renders icon as last child when iconPosition is right', async () => {
        await customRenderer(SoftButton)
            .withProps({ label: 'Next', iconName: 'chevronRight', iconPosition: 'right' })
            .build();

        const button = screen.getByRole('button', { name: 'Next' });
        // Heroicon SVGs have aria-hidden="true" and cannot be found via within() queries
        expect(button.querySelector('svg')).toBeInTheDocument();
        expect(button.lastElementChild?.tagName.toLowerCase()).toBe('svg');
    });

    it('has type="submit" when type prop is submit', async () => {
        await customRenderer(SoftButton)
            .withProps({ type: 'submit', label: 'Submit' })
            .build();

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('is disabled when disabled prop is true', async () => {
        await customRenderer(SoftButton)
            .withProps({ label: 'Submit', disabled: true })
            .build();

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toBeDisabled();
    });

    it('emits click when clicked', async () => {
        const { emitted } = await customRenderer(SoftButton)
            .withProps({ label: 'Click me' })
            .build();

        const button = screen.getByRole('button', { name: 'Click me' });
        await userEvent.click(button);

        const events = emitted();
        expect(events).toHaveProperty('click');
        expect(events.click).toHaveLength(1);
    });

    it('does not emit click when disabled', async () => {
        const { emitted } = await customRenderer(SoftButton)
            .withProps({ label: 'Click me', disabled: true })
            .build();

        const button = screen.getByRole('button', { name: 'Click me' });
        await userEvent.click(button);

        const events = emitted();
        expect(events.click).toBeUndefined();
    });
});
