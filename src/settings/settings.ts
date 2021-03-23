import {UIPCheckSetting} from './setting/check-setting/check-setting';
import {UIPListSetting} from './setting/list-setting/list-setting';
import {UIPTextSetting} from './setting/text-setting/text-setting';
import {UIPSetting} from './setting/setting';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {attr, ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {UIPRoot} from '../core/root';
import {EventUtils} from '@exadel/esl/modules/esl-utils/dom/events';
import {UIPStateModel} from '../utils/state-model/state-model';

export class UIPSettings extends ESLBaseElement {
  public static is = 'uip-settings';
  protected model: UIPStateModel;

  @attr() public target: string;

  protected get playground(): UIPRoot {
    return this.closest(`${UIPRoot.is}`) as UIPRoot;
  }

  protected get settings(): UIPSetting[] {
    return [
      ...this.getElementsByTagName(UIPCheckSetting.is),
      ...this.getElementsByTagName(UIPListSetting.is),
      ...this.getElementsByTagName(UIPTextSetting.is),
    ] as UIPSetting[];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.bindEvents();
    this.model = new UIPStateModel();
  }

  protected bindEvents() {
    this.addEventListener('valueChange', this._onSettingChanged);
    this.playground && this.playground.addEventListener('state:change', this._syncState);
  }

  private _onSettingChanged(e: CustomEvent) {
    const setting = e.target as UIPSetting;
    setting.applyTo(this.model);
    EventUtils.dispatch(this, 'request:change', {detail: {source: UIPSettings.is, markup: this.model.state}});
  }

  @bind
  private _syncState(e: CustomEvent): void {
    const {markup, source} = e.detail;
    if (source === UIPSettings.is) return;

    this.model.state = markup;

    for (const settingTag of this.settings) {
      settingTag.updateFrom(this.model);
    }
  }

  protected disconnectedCallback(): void {
    this.unbindEvents();
    super.disconnectedCallback();
  }

  private unbindEvents(): void {
    this.removeEventListener('valueChange', this._onSettingChanged);
    this.playground && this.playground.removeEventListener('state:change', this._syncState);
  }
}

