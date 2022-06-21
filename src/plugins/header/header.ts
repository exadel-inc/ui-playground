import {UIPPlugin} from '../../core/base/plugin';
import {UIPOptions, UIPSnippets} from '../registration';

/**
 * Custom element that displays active markup.
 * @extends UIPPlugin
 */
export class UIPHeader extends UIPPlugin {
  static is = 'uip-header';

  protected connectedCallback(): void {
    super.connectedCallback();
    !this.childElementCount && this.render();
  }

  protected render() {
    this.querySelector('uip-snippets') ||  this.renderSnippets();
    this.querySelector('uip-options') || this.renderOptions();
  }

  protected renderSnippets() {
    if (this.model?.snippets.length) {
      const snippetsEl = document.createElement(UIPSnippets.is) as UIPSnippets;
      this.prepend(snippetsEl);
    }
  }

  protected renderOptions() {
    const optionsEl = document.createElement(UIPOptions.is) as UIPSnippets;
    this.append(optionsEl);
  }
}