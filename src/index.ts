/**
 * Softour FE Components – library entry
 * Export all components and global styles for use as an npm package.
 */

// Components (relative paths so emitted .d.ts resolve for package consumers)
import type { App } from 'vue';
import SoftButton from './shared/components/SoftButton/SoftButton.vue';
import SoftCell from './shared/components/SoftCell/SoftCell.vue';
import SoftRow from './shared/components/SoftRow/SoftRow.vue';
import SoftTable from './shared/components/SoftTable/SoftTable.vue';
import SoftPanel from './shared/components/SoftPanel/SoftPanel.vue';
import SoftIcon from './shared/components/SoftIcon/SoftIcon.vue';
import SoftIconButton from './shared/components/SoftIconButton/SoftIconButton.vue';
import SoftCheckbox from './shared/components/SoftCheckbox/SoftCheckbox.vue';
import SoftLink from './shared/components/SoftLink/SoftLink.vue';
import SoftPill from './shared/components/SoftPill/SoftPill.vue';
import SoftProfilePicture from './shared/components/SoftProfilePicture/SoftProfilePicture.vue';
import SoftRadioButton from './shared/components/SoftRadioButton/SoftRadioButton.vue';
import SoftSkeleton from './shared/components/SoftSkeleton/SoftSkeleton.vue';
import SoftTab from './shared/components/SoftTab/SoftTab.vue';
import SoftTag from './shared/components/SoftTag/SoftTag.vue';
import SoftToggleButton from './shared/components/SoftToggleButton/SoftToggleButton.vue';
import SoftToggleSwitch from './shared/components/SoftToggleSwitch/SoftToggleSwitch.vue';
import SoftDial from './shared/components/SoftDial/SoftDial.vue';
import SoftPad from './shared/components/SoftPad/SoftPad.vue';
import SoftSlider from './shared/components/SoftSlider/SoftSlider.vue';
import SoftLabel from './shared/components/SoftLabel/SoftLabel.vue';
import SoftInput from './shared/components/SoftInput/SoftInput.vue';
import SoftDropdown from './shared/components/SoftDropdown/SoftDropdown.vue';

type ComponentProps<T> = T extends new () => { $props: infer P } ? P : never;
type ComponentSlots<T> = T extends new () => { $slots: infer S } ? S : never;
type ComponentEmits<T> = T extends new () => { $emit: infer E } ? E : never;

export type SoftButtonProps = ComponentProps<typeof SoftButton>;
export type SoftButtonSlots = ComponentSlots<typeof SoftButton>;
export type SoftButtonEmits = ComponentEmits<typeof SoftButton>;

export type SoftCellProps = ComponentProps<typeof SoftCell>;
export type SoftCellSlots = ComponentSlots<typeof SoftCell>;
export type SoftCellEmits = ComponentEmits<typeof SoftCell>;

export type SoftRowProps = ComponentProps<typeof SoftRow>;
export type SoftRowSlots = ComponentSlots<typeof SoftRow>;
export type SoftRowEmits = ComponentEmits<typeof SoftRow>;

export type SoftTableProps = ComponentProps<typeof SoftTable>;
export type SoftTableSlots = ComponentSlots<typeof SoftTable>;
export type SoftTableEmits = ComponentEmits<typeof SoftTable>;

export type SoftPanelProps = ComponentProps<typeof SoftPanel>;
export type SoftPanelSlots = ComponentSlots<typeof SoftPanel>;
export type SoftPanelEmits = ComponentEmits<typeof SoftPanel>;

export type SoftIconProps = ComponentProps<typeof SoftIcon>;
export type SoftIconSlots = ComponentSlots<typeof SoftIcon>;
export type SoftIconEmits = ComponentEmits<typeof SoftIcon>;

export type SoftIconButtonProps = ComponentProps<typeof SoftIconButton>;
export type SoftIconButtonSlots = ComponentSlots<typeof SoftIconButton>;
export type SoftIconButtonEmits = ComponentEmits<typeof SoftIconButton>;

export type SoftCheckboxProps = ComponentProps<typeof SoftCheckbox>;
export type SoftCheckboxSlots = ComponentSlots<typeof SoftCheckbox>;
export type SoftCheckboxEmits = ComponentEmits<typeof SoftCheckbox>;

export type SoftLinkProps = ComponentProps<typeof SoftLink>;
export type SoftLinkSlots = ComponentSlots<typeof SoftLink>;
export type SoftLinkEmits = ComponentEmits<typeof SoftLink>;

export type SoftPillProps = ComponentProps<typeof SoftPill>;
export type SoftPillSlots = ComponentSlots<typeof SoftPill>;
export type SoftPillEmits = ComponentEmits<typeof SoftPill>;

export type SoftProfilePictureProps = ComponentProps<typeof SoftProfilePicture>;
export type SoftProfilePictureSlots = ComponentSlots<typeof SoftProfilePicture>;
export type SoftProfilePictureEmits = ComponentEmits<typeof SoftProfilePicture>;

export type SoftRadioButtonProps = ComponentProps<typeof SoftRadioButton>;
export type SoftRadioButtonSlots = ComponentSlots<typeof SoftRadioButton>;
export type SoftRadioButtonEmits = ComponentEmits<typeof SoftRadioButton>;

export type SoftSkeletonProps = ComponentProps<typeof SoftSkeleton>;
export type SoftSkeletonSlots = ComponentSlots<typeof SoftSkeleton>;
export type SoftSkeletonEmits = ComponentEmits<typeof SoftSkeleton>;

export type SoftTabProps = ComponentProps<typeof SoftTab>;
export type SoftTabSlots = ComponentSlots<typeof SoftTab>;
export type SoftTabEmits = ComponentEmits<typeof SoftTab>;

export type SoftTagProps = ComponentProps<typeof SoftTag>;
export type SoftTagSlots = ComponentSlots<typeof SoftTag>;
export type SoftTagEmits = ComponentEmits<typeof SoftTag>;

export type SoftToggleButtonProps = ComponentProps<typeof SoftToggleButton>;
export type SoftToggleButtonSlots = ComponentSlots<typeof SoftToggleButton>;
export type SoftToggleButtonEmits = ComponentEmits<typeof SoftToggleButton>;

export type SoftToggleSwitchProps = ComponentProps<typeof SoftToggleSwitch>;
export type SoftToggleSwitchSlots = ComponentSlots<typeof SoftToggleSwitch>;
export type SoftToggleSwitchEmits = ComponentEmits<typeof SoftToggleSwitch>;

export type SoftDialProps = ComponentProps<typeof SoftDial>;
export type SoftDialSlots = ComponentSlots<typeof SoftDial>;
export type SoftDialEmits = ComponentEmits<typeof SoftDial>;

export type SoftPadProps = ComponentProps<typeof SoftPad>;
export type SoftPadSlots = ComponentSlots<typeof SoftPad>;
export type SoftPadEmits = ComponentEmits<typeof SoftPad>;

export type SoftSliderProps = ComponentProps<typeof SoftSlider>;
export type SoftSliderSlots = ComponentSlots<typeof SoftSlider>;
export type SoftSliderEmits = ComponentEmits<typeof SoftSlider>;

export type SoftLabelProps = ComponentProps<typeof SoftLabel>;
export type SoftLabelSlots = ComponentSlots<typeof SoftLabel>;
export type SoftLabelEmits = ComponentEmits<typeof SoftLabel>;

export type SoftInputProps = ComponentProps<typeof SoftInput>;
export type SoftInputSlots = ComponentSlots<typeof SoftInput>;
export type SoftInputEmits = ComponentEmits<typeof SoftInput>;

export type SoftDropdownProps = ComponentProps<typeof SoftDropdown>;
export type SoftDropdownSlots = ComponentSlots<typeof SoftDropdown>;
export type SoftDropdownEmits = ComponentEmits<typeof SoftDropdown>;

export type { SoftToggleButtonState } from './shared/components/SoftToggleButton/types/SoftToggleButtonState';
export type { SoftToggleButtonVariant } from './shared/components/SoftToggleButton/types/SoftToggleButtonVariant';
export type { SoftTagVariant } from './shared/components/SoftTag/types/SoftTagVariant';
export type { SoftInputSize } from './shared/components/SoftInput/types/SoftInputSize';
export type { SoftInputType } from './shared/components/SoftInput/types/SoftInputType';
export type { SoftInputVariant } from './shared/components/SoftInput/types/SoftInputVariant';
export type { SoftSliderElevation } from './shared/components/SoftSlider/types/SoftSliderElevation';
export type { SoftSliderVariant } from './shared/components/SoftSlider/types/SoftSliderVariant';
export type { SoftRadioButtonSize } from './shared/components/SoftRadioButton/types/SoftRadioButtonSize';
export type { SoftProfilePictureSize } from './shared/components/SoftProfilePicture/types/SoftProfilePictureSize';
export type { SoftProfilePictureVariant } from './shared/components/SoftProfilePicture/types/SoftProfilePictureVariant';
export type { SoftPillElevation } from './shared/components/SoftPill/types/SoftPillElevation';
export type { SoftPillSize } from './shared/components/SoftPill/types/SoftPillSize';
export type { SoftLinkVariant } from './shared/components/SoftLink/types/SoftLinkVariant';
export type { SoftDropdownOption } from './shared/components/SoftDropdown/types/SoftDropdownOption';
export type { SoftDropdownSize } from './shared/components/SoftDropdown/types/SoftDropdownSize';
export type { SoftDropdownVariant } from './shared/components/SoftDropdown/types/SoftDropdownVariant';
export type { SoftCheckboxIcon } from './shared/components/SoftCheckbox/types/SoftCheckboxIcon';
export type { SoftCheckboxPosition } from './shared/components/SoftCheckbox/types/SoftCheckboxPosition';
export type { SoftCheckboxSize } from './shared/components/SoftCheckbox/types/SoftCheckboxSize';
export { KeyboardAction } from './shared/components/SoftDropdown/types/SoftKeyboardAction';

const install = (app: App) => {
    app.component('SoftButton', SoftButton);
    app.component('SoftCell', SoftCell);
    app.component('SoftRow', SoftRow);
    app.component('SoftTable', SoftTable);
    app.component('SoftPanel', SoftPanel);
    app.component('SoftIcon', SoftIcon);
    app.component('SoftIconButton', SoftIconButton);
    app.component('SoftCheckbox', SoftCheckbox);
    app.component('SoftLink', SoftLink);
    app.component('SoftPill', SoftPill);
    app.component('SoftProfilePicture', SoftProfilePicture);
    app.component('SoftRadioButton', SoftRadioButton);
    app.component('SoftSkeleton', SoftSkeleton);
    app.component('SoftTab', SoftTab);
    app.component('SoftTag', SoftTag);
    app.component('SoftToggleButton', SoftToggleButton);
    app.component('SoftToggleSwitch', SoftToggleSwitch);
    app.component('SoftDial', SoftDial);
    app.component('SoftPad', SoftPad);
    app.component('SoftSlider', SoftSlider);
    app.component('SoftLabel', SoftLabel);
    app.component('SoftInput', SoftInput);
    app.component('SoftDropdown', SoftDropdown);
};

export {
    SoftButton,
    SoftCell,
    SoftRow,
    SoftTable,
    SoftPanel,
    SoftIcon,
    SoftIconButton,
    SoftCheckbox,
    SoftLink,
    SoftPill,
    SoftProfilePicture,
    SoftRadioButton,
    SoftSkeleton,
    SoftTab,
    SoftTag,
    SoftToggleButton,
    SoftToggleSwitch,
    SoftDial,
    SoftPad,
    SoftSlider,
    SoftLabel,
    SoftInput,
    SoftDropdown,
    install,
};
export default { install };
