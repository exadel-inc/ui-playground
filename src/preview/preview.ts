import {CSSClassUtils} from '@exadel/esl';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {UIPPlugin} from '../core/plugin';

export class UIPPreview extends UIPPlugin {
  static is = 'uip-preview';

  @bind
  protected handleChange(e: CustomEvent): void {
    const {markup} = e.detail;
    const $inner = document.createElement('div');
    CSSClassUtils.add($inner, 'uip-preview-inner esl-scrollable-content');
    $inner.innerHTML = markup;

    const $scroll = document.createElement('esl-scrollbar');
    $scroll.setAttribute('target','::prev(.uip-preview-inner)');

    this.innerHTML = $inner.outerHTML + $scroll.outerHTML;

    $scroll.setAttribute('horizontal', 'true');
    this.innerHTML += $scroll.outerHTML;
  }
}

