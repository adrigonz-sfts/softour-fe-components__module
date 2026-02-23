/**
 * Softour FE Components – library entry
 * Export all components and global styles for use as an npm package.
 */

// Global styles (tokens, themes, resets) – order matters
import './styles/tokens.scss';
import './styles/themes.scss';
import './styles/resets.scss';

// Components (relative paths so emitted .d.ts resolve for package consumers)
import type { App } from 'vue';
import CustomButton from './shared/components/CustomButton/CustomButton.vue';
import CustomCell from './shared/components/CustomCell/CustomCell.vue';
import CustomRow from './shared/components/CustomRow/CustomRow.vue';
import CustomTable from './shared/components/CustomTable/CustomTable.vue';
import CustomPanel from './shared/components/CustomPanel/CustomPanel.vue';
import CustomIcon from './shared/components/CustomIcon/CustomIcon.vue';
import CustomIconButton from './shared/components/CustomIconButton/CustomIconButton.vue';

const install = (app: App) => {
    app.component('CustomButton', CustomButton);
    app.component('CustomCell', CustomCell);
    app.component('CustomRow', CustomRow);
    app.component('CustomTable', CustomTable);
    app.component('CustomPanel', CustomPanel);
    app.component('CustomIcon', CustomIcon);
    app.component('CustomIconButton', CustomIconButton);
};

export {
    CustomButton,
    CustomCell,
    CustomRow,
    CustomTable,
    CustomPanel,
    CustomIcon,
    CustomIconButton,
    install,
};
export default { install };
