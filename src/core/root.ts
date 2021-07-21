import {EventUtils, ObserverCallback} from '@exadel/esl';
import {ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {UIPStateModel} from './state-model';

export class UIPRoot extends ESLBaseElement {
  public static is = 'uip-root';
  private _model = new UIPStateModel();

  public get model(): UIPStateModel {
    return this._model;
  }

  static get observedAttributes() {
    return ['theme', 'mode'];
  }

  public addStateListener(listener: ObserverCallback) {
    this._model.addListener(listener);
  }

  public removeStateListener(listener: ObserverCallback) {
    this._model.removeListener(listener);
  }

  protected attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      this.classList.remove(`${oldVal}-${attrName}`);
      this.classList.add(`${newVal}-${attrName}`);
      EventUtils.dispatch(this, 'uip:config_change', { detail: {
          attribute: attrName,
          value: newVal
        }
      });
    }
  }
}
