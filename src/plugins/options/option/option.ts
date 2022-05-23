import {attr, boolAttr, ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {ESLImage} from '@exadel/esl/modules/esl-image/core';
import {EventUtils} from '@exadel/esl/modules/esl-utils/dom/events';
import {ENTER} from '@exadel/esl/modules/esl-utils/dom/keys';

/** Config used to create options. */
export type OptionConfig = {
  /** Attribute to toggle. */
  attribute: string;
  /** Callback to indicate if option should be rendered. */
  canActivate?: () => boolean;
};

/** Custom element to toggle {@link UIPRoot} attributes. */
export class UIPOption extends ESLBaseElement {
  static is = 'uip-option';
  @attr() public attribute: string;
  @boolAttr() public active: boolean;

  static create(optionConfig: OptionConfig): UIPOption {
    const option = document.createElement('uip-option') as UIPOption;
    option.setAttribute('attribute', optionConfig.attribute);
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
    EventUtils.dispatch(this, 'uip:optionclick');
  }

  @bind
  protected _onKeydown(e: KeyboardEvent) {
    if (ENTER !== e.key) return;
    this.toggleState();
    EventUtils.dispatch(this, 'uip:optionclick');
  }

  protected disconnectedCallback() {
    this.unbindEvents();
    this.disconnectedCallback();
  }

  protected unbindEvents() {
    this.removeEventListener('click', this._onClick);
  }

  public toggleState(force?: boolean) {
    this.active = force === undefined ? !this.active : force;
    this.classList.toggle('active', this.active);
  }
}
