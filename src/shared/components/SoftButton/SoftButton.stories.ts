import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SoftButton from './SoftButton.vue';

const meta = {
    title: 'Buttons/SoftButton',
    component: SoftButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Primary action button with variants (primary, secondary, delete). Use for form submit, confirm actions, or navigation. Optional icon (Heroicon name) left or right of label.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['primary', 'secondary', 'delete'],
        },
        type: {
            control: 'radio',
            options: ['button', 'submit', 'reset'],
        },
        iconPosition: {
            control: 'radio',
            options: ['left', 'right'],
        },
    },
    args: {
        label: 'Button',
        variant: 'primary',
        type: 'button',
        disabled: false,
        iconPosition: 'left',
    },
} satisfies Meta<typeof SoftButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Button',
    },
};

export const WithSlot: Story = {
    render: (args) => ({
        components: { SoftButton },
        setup() {
            return { args };
        },
        template: '<SoftButton v-bind="args">Save changes</SoftButton>',
    }),
    args: {
        type: 'button',
        disabled: false,
    },
};

export const Submit: Story = {
    args: {
        label: 'Submit',
        type: 'submit',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        variant: 'secondary',
    },
};

export const Delete: Story = {
    args: {
        label: 'Delete',
        variant: 'delete',
    },
};

export const WithIconLeft: Story = {
    args: {
        label: 'Add new',
        iconName: 'plus',
        iconPosition: 'left',
    },
};

export const WithIconRight: Story = {
    args: {
        label: 'Next',
        iconName: 'chevronRight',
        iconPosition: 'right',
    },
};

export const DeleteWithIcon: Story = {
    args: {
        label: 'Delete',
        variant: 'delete',
        iconName: 'trash',
        iconPosition: 'left',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        disabled: true,
    },
};
