import {UIPPlugin} from '../../core/base/plugin';
import {UIPOptions} from './options/options';
import {UIPSnippets} from './snippets/snippets';

/**
 * Header {@link UIPPlugin} custom element definition
 * Container for {@link UIPSnippets} and {@link UIPOptions} elements
 */
export class UIPHeader extends UIPPlugin {
  static is = 'uip-header';

  protected connectedCallback(): void {
    super.connectedCallback();
    this.childElementCount || this.autofill();
  }

  /** Default configuration rendering */
  protected autofill(): void {
    this.renderSnippets();
    this.renderOptions();
  }

  /** Renders {@link UIPSnippets} element */
  protected renderSnippets(): void {
    if (this.model?.snippets.length) {
      const snippetsEl = document.createElement(UIPSnippets.is);
      this.prepend(snippetsEl);
    }
  }

  /** Renders {@link UIPOptions} element */
  protected renderOptions(): void {
    const optionsEl = document.createElement(UIPOptions.is);
    this.append(optionsEl);
  }
}
