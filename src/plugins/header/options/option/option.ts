import {attr, boolAttr, ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {ENTER, SPACE} from '@exadel/esl/modules/esl-utils/dom/keys';

import type {UIPOptions} from '../options';

/** Config used to create options. */
export type OptionConfig = {
  /** Attribute name used as absence marker of option icon */
  attrName: string;
  /** Controlled attribute to toggle on root. */
  rootControlledAttr: string;
  /** Callback to indicate if option should be rendered. */
  canActivate?: (scope: UIPOptions) => boolean;
};

/** Custom element to toggle {@link UIPRoot} attributes. */
export class UIPOption extends ESLBaseElement {
  static is = 'uip-option';
  @attr() public attribute: string;
  @boolAttr() public active: boolean;

  static create(optionConfig: OptionConfig): UIPOption {
    const option = document.createElement('uip-option') as UIPOption;
    option.setAttribute('attribute', optionConfig.rootControlledAttr);
    return option;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.classList.add(`${this.attribute}-option`);
    this.tabIndex = 0;
    this.bindEvents();
  }

  protected bindEvents() {
    this.addEventListener('click', this._onClick);
    this.addEventListener('keydown', this._onKeydown);
  }

  @bind
  protected _onClick() {
    this.toggleState();
    this.$$fire('uip:option:changed');
  }

  @bind
  protected _onKeydown(e: KeyboardEvent) {
    if (ENTER !== e.key && SPACE !== e.key) return;
    this.toggleState();
    this.$$fire('uip:option:changed');
  }

  public toggleState(force?: boolean) {
    this.active = force === undefined ? !this.active : force;
    this.$$cls('active', this.active);
  }

  protected unbindEvents() {
    this.removeEventListener('click', this._onClick);
    this.removeEventListener('keydown', this._onKeydown);
  }

  protected disconnectedCallback() {
      this.unbindEvents();
      super.disconnectedCallback();
  }
}
