import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { SoftLinkVariant } from './types/SoftLinkVariant';
import SoftLink from './SoftLink.vue';

const linkVariant: SoftLinkVariant[] = [
    'primary',
    'default',
    'inverted',
    'tab',
    'button-primary',
    'button-secondary',
    'button-delete',
    'button-icon-primary',
    'button-icon-secondary',
];

const meta: Meta<typeof SoftLink> = {
    title: 'Atoms/SoftLink',
    component: SoftLink,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The \`SoftLink\` component is a versatile navigation element that can render as either a router link or an external anchor tag. It provides consistent styling and behavior across different link types while maintaining accessibility standards.

### Usage
The \`SoftLink\` component is used for navigation within the application or to external resources. Common use cases include:
- Internal navigation between pages
- External links to websites
- Call-to-action buttons with link styling
- Navigation menus

### Variants
The link component supports text and button-style variants (button styles match SoftButton):

1. **Default**: Standard link styling for general navigation
2. **Primary**: Brand-colored text link
3. **Inverted**: Inverse color for use on dark backgrounds
4. **Tab**: Pill-like tab with background color for segmented navigation
5. **Button primary/secondary/delete**: Button-like appearance matching SoftButton variants
6. **Button icon primary/secondary**: Icon-only button variants for compact actions

### States
The link supports multiple states:

1. **Default**: Normal, clickable state
2. **Active**: Currently active/selected state
3. **Disabled**: Non-interactive state
4. **Hover**: Interactive hover state
                `,
            },
        },
    },
    argTypes: {
        to: {
            description:
                'The destination for the link. Can be a route object, string path, or external URL.',
            control: 'object',
        },
        variant: {
            description: 'The visual style variant of the link.',
            control: 'select',
            options: linkVariant,
        },
        active: {
            description: 'Whether the link is currently active/selected.',
            control: 'boolean',
        },
        disabled: {
            description: 'Whether the link is disabled and non-interactive.',
            control: 'boolean',
        },
        default: {
            description: 'The text content of the link (slot content).',
            control: 'text',
        },
        iconName: {
            description:
                'Heroicon name (e.g. plus, arrowRight, chevronRight). When set, shows SoftIcon.',
            control: 'text',
        },
        iconPosition: {
            description: 'Icon position relative to link content.',
            control: 'select',
            options: ['left', 'right'],
        },
        iconSize: {
            description: 'Size of the icon.',
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
        },
        iconType: {
            description: 'Icon style.',
            control: 'radio',
            options: ['outline', 'solid'],
        },
        iconLabel: {
            description: 'Aria-label for the icon (a11y).',
            control: 'text',
        },
    },
    args: {
        to: {
            path: '/',
        },
        variant: 'default',
        active: false,
        disabled: false,
        default: 'This is a link',
        iconName: undefined,
        iconPosition: 'left',
        iconSize: 'sm',
        iconType: 'outline',
        iconLabel: 'Link',
    },
};

export default meta;

export const Default: StoryFn<typeof SoftLink> = (args) => ({
    components: { SoftLink },
    setup() {
        return { args };
    },
    template: `
		<div class="body-md">
			<SoftLink
				:to="args.to"
				:variant="args.variant"
				:active="args.active"
				:disabled="args.disabled"
				:icon-name="args.iconName"
				:icon-position="args.iconPosition"
				:icon-size="args.iconSize"
				:icon-type="args.iconType"
				:icon-label="args.iconLabel"
			>
				{{ args.default }}
			</SoftLink>
		</div>
	`,
});

export const Primary: StoryFn<typeof SoftLink> = Default.bind({});
Primary.args = {
    variant: 'primary',
    default: 'Primary link',
};

export const LinkAsButtonPrimary: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonPrimary.args = {
    variant: 'button-primary',
    default: 'Primary',
};

export const LinkAsButtonSecondary: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonSecondary.args = {
    variant: 'button-secondary',
    default: 'Secondary',
};

export const LinkAsButtonDelete: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonDelete.args = {
    variant: 'button-delete',
    default: 'Delete',
};

export const Tab: StoryFn<typeof SoftLink> = Default.bind({});
Tab.args = {
    variant: 'tab',
    default: 'Details',
};

export const LinkAsButtonWithIcon: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonWithIcon.args = {
    variant: 'button-primary',
    iconName: 'plus',
    iconLabel: 'Add',
    default: 'Add item',
};

export const LinkAsButtonWithIconRight: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonWithIconRight.args = {
    variant: 'button-primary',
    iconName: 'chevronRight',
    iconLabel: 'Next',
    iconPosition: 'right',
    default: 'Next page',
};

export const LinkAsButtonActiveWithIcon: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonActiveWithIcon.args = {
    variant: 'button-primary',
    iconName: 'plus',
    iconLabel: 'Add',
    active: true,
    default: 'Add item',
};

export const LinkAsButtonDisabledWithIcon: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsButtonDisabledWithIcon.args = {
    variant: 'button-primary',
    disabled: true,
    iconName: 'plus',
    iconLabel: 'Add',
    default: 'Add item',
};

export const LinkAsIconButtonPrimary: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsIconButtonPrimary.args = {
    variant: 'button-icon-primary',
    iconName: 'plus',
    iconLabel: 'Add item',
    default: '',
};

export const LinkAsIconButtonSecondary: StoryFn<typeof SoftLink> = Default.bind({});
LinkAsIconButtonSecondary.args = {
    variant: 'button-icon-secondary',
    iconName: 'chevronRight',
    iconLabel: 'Next page',
    default: '',
};

export const Disabled: StoryFn<typeof SoftLink> = Default.bind({});
Disabled.args = {
    variant: 'default',
    disabled: true,
    default: 'Disabled link',
};

export const ExternalLink: StoryFn<typeof SoftLink> = Default.bind({});
ExternalLink.args = {
    to: 'https://example.com',
    default: 'External link',
};
ExternalLink.parameters = {
    docs: {
        description: {
            story: "The Link component will automatically render as `router-link` or `a` depending on the received `to` prop: if it's a string and starts with `http`, it will be an `a`, otherwise it will be a `router-link`.",
        },
    },
};
