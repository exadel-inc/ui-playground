import {memoize} from '@exadel/esl';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {UIPPlugin} from '../core/plugin';

export class UIPPreview extends UIPPlugin {
  static is = 'uip-preview';

  @memoize()
  get $inner() {
    const $inner = document.createElement('div');
    $inner.className = 'uip-preview-inner uip-plugin-inner';
    return $inner;
  }

  @bind
  protected _onRootStateChange(): void {
    if (this.$inner.parentElement === this) this.removeChild(this.$inner);
    this.$inner.innerHTML = this.model!.html;
    this.appendChild(this.$inner);
  }

  protected disconnectedCallback() {
    if (this.$inner.parentElement === this) this.removeChild(this.$inner);
    super.disconnectedCallback();
  }
}
