import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {SyntheticEventTarget} from '@exadel/esl/modules/esl-utils/dom/events/target';

import {CodeJar} from 'codejar';
import {EditorConfig, normalize, useLineNumbers, wrapLines} from './jar-utils';

/** {@link https://medv.io/codejar/ Codejar} editor wrapper */
export class JarEditor extends SyntheticEventTarget {
  /** Inner {@link https://medv.io/codejar/ Codejar} instance */
  private editor: CodeJar;
  /** Editor's {@link EditorConfig} passed through attribute */
  private editorConfig: Partial<EditorConfig>;

  /**
   * @param {HTMLElement} element - element to place editor inside
   */
  constructor(element: HTMLElement, editorConfig: Partial<EditorConfig>) {
    super();

    this.editor = CodeJar(
      element,
      useLineNumbers(),
      { tab: '\t' }
    );
    this.editor.onUpdate(this._onChange);

    this.editorConfig = editorConfig;
  }

  /** Set editor's text content
   * @param {string} value - text content to set
   */
  public setValue(value: string): void {
    value = this.prepareValue(value);
    this.editor.updateCode(value);
  }

  /** @returns editor's text content */
  public getValue(): string {
    return this.editor.toString();
  }

  /** Cleanup internal event listeners */
  public destroy(): void {
    this.editor.destroy();
  }

  private prepareValue(markup: string): string {
    const value = normalize(markup);
    return wrapLines(value, this.editorConfig.wrap);
  }

  /** Handle editor's content change */
  @bind
  private _onChange() {
    this.dispatchEvent(new CustomEvent('uip:editor-change'));
  }
}
