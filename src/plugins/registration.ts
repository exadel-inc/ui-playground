import {UIPHeader} from './header/header';
import {UIPSnippets} from './header/snippets/snippets';
export {UIPSnippets, UIPHeader};

import {UIPEditor} from './editor/editor';
export {UIPEditor};

import {UIPSettings} from './settings/settings';
import {UIPSetting} from './settings/base-setting/base-setting';
import {UIPTextSetting} from './settings/text-setting/text-setting';
import {UIPSelectSetting} from './settings/select-setting/select-setting';
import {UIPBoolSetting} from './settings/bool-setting/bool-setting';
import {UIPSliderSetting} from './settings/slider-setting/slider-setting';
export {UIPSetting, UIPSettings, UIPTextSetting, UIPBoolSetting, UIPSelectSetting, UIPSliderSetting};

import {UIPCopy} from './copy/copy-button';
export {UIPCopy};

import {UIPDirSwitcher} from './direction/dir-toggle';
import {UIPThemeSwitcher} from './theme/theme-toggle';
export {UIPDirSwitcher, UIPThemeSwitcher};

export const registerSettings = (): void => {
  UIPSettings.register();
  UIPBoolSetting.register();
  UIPTextSetting.register();
  UIPSelectSetting.register();
  UIPSliderSetting.register();
};

export const registerPlugins = (): void => {
  UIPCopy.register();
  UIPDirSwitcher.register();
  UIPThemeSwitcher.register();

  UIPHeader.register();
  UIPSnippets.register();
  UIPEditor.register();
};
