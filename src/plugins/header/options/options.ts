import {listen} from '@exadel/esl/modules/esl-utils/decorators/listen';

import {UIPPlugin} from '../../../core/base/plugin';
import {OptionConfig, UIPOption} from './option/option';

/**
 * Custom element to provide controls for changing UIP visual appearance.
 * @extends UIPPlugin
 */
export class UIPOptions extends UIPPlugin {
  static is = 'uip-options';
  public options: Map<string, UIPOption>;

  /** List of configs to create options. */
  protected static UIPOptionsConfig: OptionConfig[] = [
    {
      attribute: 'dark-theme',
      canActivate: (component) => !component.hasAttribute('hide-theme')
    },
    {
      attribute: 'rtl-direction',
      canActivate: (component) => !component.hasAttribute('hide-direction')
    },
    {
      attribute: 'settings-collapsed',
      canActivate: (component) => !component.hasAttribute('hide-settings') &&
      !!component.root?.querySelector('uip-settings')
    },
    {
      attribute: 'editor-collapsed',
      canActivate: (component) => !component.hasAttribute('hide-editor') &&
      !!component.root?.querySelector('uip-editor')
    }
  ];

  protected connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  protected disconnectedCallback() {
    this.innerHTML = '';
    super.disconnectedCallback();
  }

  protected render() {
    const options = UIPOptions.UIPOptionsConfig.filter(option => !option.canActivate || option.canActivate(this));
    const entries: [string, UIPOption][] = options.map(option => [option.attribute, UIPOption.createEl(option)]);
    this.options = new Map(entries);
    this.options.forEach(option => this.append(option));
  }

  @listen({event: 'uip:configchange', target: '::parent(.uip-root)'})
  protected _onRootConfigChange(e: CustomEvent) {
    const option = this.options.get(e.detail.attribute);
    option?.toggleState(e.detail.value !== null);
  }

  @listen('click')
  protected _onOptionClick(e: Event) {
    e.stopPropagation();
    const option = e.target as UIPOption;
    this.root?.toggleAttribute(option.attribute, option.active);
  }

  public static register(tagName?: string) {
    UIPOption.register();
    UIPOption.registered.then(() => super.register.call(this, tagName));
  }
}
