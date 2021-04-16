import { attr } from '@exadel/esl/modules/esl-base-element/core';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {UIPPlugin} from '../core/plugin';

export class UIPPreview extends UIPPlugin {
  static is = 'uip-preview';

  @attr() public height: string;

  @bind
  protected handleChange(e: CustomEvent): void {
    const {markup} = e.detail;
    const $inner = document.createElement('div');
    $inner.classList.add('uip-preview-inner');
    $inner.innerHTML = markup;
    this.innerHTML = $inner.outerHTML;
    this.height && (this.style.maxHeight = this.height);
  }
}

