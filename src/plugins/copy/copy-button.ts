import './copy-button.shape';

import {attr} from '@exadel/esl/modules/esl-utils/decorators';
import {UIPPluginButton} from '../../core/button/plugin-button';

import type {ESLAlertActionParams} from '@exadel/esl/modules/esl-alert/core';

/** Button-plugin to copy snippet to clipboard */
export class UIPCopy extends UIPPluginButton {
  public static override is = 'uip-copy';
  public static override defaultTitle = 'Copy to clipboard';

  /** Source type to copy (html | js) */
  @attr({defaultValue: 'html'}) public source: string;

  public static msgConfig: ESLAlertActionParams = {
    text: 'Playground content copied to clipboard',
    cls: 'uip-copy-alert'
  };

  /** Content to copy */
  protected get content(): string | undefined {
    switch (this.source) {
      case 'js':
      case 'javascript':
        return this.model?.js;
      case 'html':
      default:
        return this.model?.html;
    }
  }

  protected override connectedCallback(): void {
    if (!navigator.clipboard) this.hidden = true;
    super.connectedCallback();
  }

  public override onAction(): void {
    this.copy().then(() => this.dispatchMessage());
  }

  /** Dispatches success alert message */
  protected dispatchMessage(): void {
    const detail = (this.constructor as typeof UIPCopy).msgConfig;
    this.$$fire('esl:alert:show', {detail});
  }

  /** Copy model content to clipboard */
  public copy(): Promise<void> {
    return navigator.clipboard.writeText(this.content || '');
  }
}
