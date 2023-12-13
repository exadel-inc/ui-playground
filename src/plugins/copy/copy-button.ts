import './copy-button.shape';

import {UIPPluginButton} from '../../core/button/plugin-button';

import type {AlertActionParams} from '@exadel/esl/modules/esl-alert/core';

/** Button-plugin to copy snippet to clipboard */
export class UIPCopy extends UIPPluginButton {
  public static override is = 'uip-copy';
  public static override defaultTitle = 'Copy to clipboard';

  public static msgConfig: AlertActionParams = {
    text: 'Playground content copied to clipboard',
    cls: 'uip-copy-alert'
  };

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
    return navigator.clipboard.writeText(this.model!.html);
  }
}
