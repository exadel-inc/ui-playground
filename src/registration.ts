
import {UIPDefaults} from './config';
import {registerCore} from './core/registration';
import {registerPlugins, registerSettings} from './plugins/registration';

import type {UIPDefaultConfigs} from './config';

export * from './core/registration';
export * from './plugins/registration';

export function init(config?: Partial<UIPDefaultConfigs>): void {
  UIPDefaults.applyDefaults(config);
  registerCore();
  registerPlugins();
  registerSettings();
}
