import {UIPSetting} from './setting/setting';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {attr} from '@exadel/esl/modules/esl-base-element/core';
import {CSSClassUtils} from '@exadel/esl';
import {UIPPlugin} from '../core/plugin';

export class UIPSettings extends UIPPlugin {
  public static is = 'uip-settings';

  @attr() public target: string;
  @attr({defaultValue: 'Settings'}) public label: string;
  @attr({defaultValue: 'settings-attached'}) public rootClass: string;

  protected connectedCallback() {
    super.connectedCallback();
    this.bindEvents();
    this.root && CSSClassUtils.add(this.root, this.rootClass);
    const $inner = document.createElement('div');
    $inner.classList.add('uip-settings-inner');
    [...this.childNodes].forEach( (node: HTMLElement) => {
      $inner.appendChild(node);
    });
    this.appendChild($inner);
  }

  protected disconnectedCallback(): void {
    this.unbindEvents();
    this.root && CSSClassUtils.remove(this.root, this.rootClass);
    super.disconnectedCallback();
  }

  protected bindEvents() {
    this.addEventListener('uip:change', this._onSettingChanged);
  }

  protected unbindEvents(): void {
    this.removeEventListener('uip:change', this._onSettingChanged);
  }

  protected _onSettingChanged(e: any) {
    e.stopPropagation();
    if (!this.model) return;
    (e.target as UIPSetting).applyTo(this.model);
  }

  protected get settings(): UIPSetting[] {
    return Array.from(this.getElementsByClassName(UIPSetting.is)) as UIPSetting[];
  }

  @bind
  protected _onRootStateChange(): void {
    this.settings.forEach(setting => setting.updateFrom(this.model!));
  }
}

