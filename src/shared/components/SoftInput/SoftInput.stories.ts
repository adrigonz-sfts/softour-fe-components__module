import type { Meta, StoryFn } from '@storybook/vue3-vite';
import type { SoftInputSize } from './types/SoftInputSize';
import type { SoftInputType } from './types/SoftInputType';
import type { SoftInputVariant } from './types/SoftInputVariant';
import SoftInput from './SoftInput.vue';

const inputVariant: SoftInputVariant[] = ['base', 'bold', 'deep'];
const inputSize: SoftInputSize[] = ['sm', 'md'];
const inputType: SoftInputType[] = ['text', 'password', 'email', 'number', 'tel'];

const meta: Meta<typeof SoftInput> = {
	title: 'Atoms/SoftInput',
	component: SoftInput,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Text input with optional label, prefix/suffix icons (Heroicon names), and clear button. Use for forms, search, or single-line text. Supports variants (base, bold, deep), error state via `hasError` and `errorMsgId`, and `aria-invalid` for accessibility.',
			},
		},
	},
	argTypes: {
		variant: { control: 'select', options: inputVariant },
		size: { control: 'select', options: inputSize },
		type: { control: 'select', options: inputType },
	},
	args: {
		label: 'Input label',
		id: 'default-input',
		value: '',
		variant: 'base',
		size: 'md',
		type: 'text',
		placeholder: '',
		hideLabel: false,
		hasError: false,
		isClearable: false,
		readonly: false,
		disabled: false,
	},
	decorators: [
		(): { template: string } => ({
			template: `
				<div style="width: 100%; min-height: 100px; display: grid; place-items: center;">
					<div style="width: 300px"><story/></div>
				</div>
			`,
		}),
	],
};

export default meta;

export const Default: StoryFn<typeof SoftInput> = (args) => ({
	components: { SoftInput },
	setup() {
		return { args };
	},
		template: `
		<SoftInput
			:id="args.id"
			:label="args.label"
			:value="args.value"
			:size="args.size"
			:placeholder="args.placeholder"
			:variant="args.variant"
			:type="args.type"
			:prefix-icon="args.prefixIcon"
			:suffix-icon="args.suffixIcon"
			:is-clearable="args.isClearable"
			:has-error="args.hasError"
			:error-msg-id="args.errorMsgId"
			:readonly="args.readonly"
			:hide-label="args.hideLabel"
			:disabled="args.disabled"
			@input="args.value = $event"
			@clear="args.value = $event"
			@change="args.value = $event"
		/>
		<div v-if="args.hasError" id="error-message" style="margin-top: 8px; font-size: 12px; color: var(--color-error-500);">
			Error message (link via errorMsgId)
		</div>
	`,
});

export const Small: StoryFn<typeof SoftInput> = Default.bind({});
Small.args = { id: 'small-input', value: '', size: 'sm', placeholder: 'Placeholder' };
Small.parameters = { docs: { description: { story: 'Compact size for tight layouts.' } } };

export const WithPlaceholder: StoryFn<typeof SoftInput> = Default.bind({});
WithPlaceholder.args = { id: 'ph-input', value: '', placeholder: 'Placeholder text' };
WithPlaceholder.parameters = { docs: { description: { story: 'Placeholder text when empty.' } } };

export const WithError: StoryFn<typeof SoftInput> = Default.bind({});
WithError.args = { id: 'err-input', value: '', hasError: true, errorMsgId: 'error-message' };
WithError.parameters = { docs: { description: { story: 'Error state; link message via errorMsgId for screen readers.' } } };

export const WithPrefixIcon: StoryFn<typeof SoftInput> = Default.bind({});
WithPrefixIcon.args = { id: 'prefix-input', value: '', prefixIcon: 'magnifyingGlass' };
WithPrefixIcon.parameters = { docs: { description: { story: 'Icon before the input (e.g. search).' } } };

export const WithSuffixIcon: StoryFn<typeof SoftInput> = Default.bind({});
WithSuffixIcon.args = { id: 'suffix-input', value: '', suffixIcon: 'check' };
WithSuffixIcon.parameters = { docs: { description: { story: 'Icon after the input.' } } };

export const Clearable: StoryFn<typeof SoftInput> = Default.bind({});
Clearable.args = { id: 'clear-input', value: 'some text', isClearable: true };
Clearable.parameters = { docs: { description: { story: 'Clear button appears when focused or when value is non-empty.' } } };
