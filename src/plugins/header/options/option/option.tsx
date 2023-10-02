import {ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {attr, listen} from '@exadel/esl/modules/esl-utils/decorators';
import {ENTER, SPACE} from '@exadel/esl/modules/esl-utils/dom/keys';

import type {UIPOptions} from '../options';
import type {UIPRoot} from '../../../../core/base/root';

/** Config used to create options */
export type OptionConfig = {
  /** Attribute name used as absence marker of option icon */
  attrName: string;
  /** Controlled attribute to toggle on root */
  optionValue: string;
  /** Callback to indicate if option should be rendered */
  canActivate?: (scope: UIPOptions) => boolean;
  svg: HTMLElement;
};

/** Custom element to toggle {@link UIPRoot} attributes */
export class UIPOption extends ESLBaseElement {
  public static is = 'uip-option';

  /** {@link UIPRoot}'s attribute which is changed by option */
  @attr() public attribute: string;

  /** Closest playground {@link UIPRoot} element */
  protected $root: UIPRoot;
  protected config: OptionConfig;

  /** Builds option element from {@link OptionConfig} */
  static createEl(optionConfig: OptionConfig): UIPOption {
    const option = document.createElement('uip-option') as UIPOption;
    option.setAttribute('attribute', optionConfig.optionValue);
    option.append(optionConfig.svg.cloneNode(true));
    option.config = optionConfig;
    return option;
  }

  protected override connectedCallback(): void {
    super.connectedCallback();
    this.$root = this.closest('.uip-root')!;
    this.classList.add(`${this.attribute}-option`);
    this.tabIndex = 0;
    this.active = this.$root.hasAttribute(this.config.optionValue);
  }

  /** Checks whether option is in its active state */
  public get active(): boolean {
    return this.$$cls('active');
  }

  /** Setter for `active` class */
  public set active(val: boolean) {
    this.$$cls('active', val);
  }

  /** Handles option `click` event */
  @listen('click')
  protected _onClick(): void {
    this.toggleState();
    this.$$fire('uip:option:changed');
  }

  /** Handles option `keydown` event */
  @listen('keydown')
  protected _onKeydown(e: KeyboardEvent): void {
    if (ENTER !== e.key && SPACE !== e.key) return;
    this.toggleState();
    this.$$fire('uip:option:changed');
  }

  /** Toggles option active state */
  public toggleState(force?: boolean): void {
    this.active = force === undefined ? !this.active : force;
  }
}
