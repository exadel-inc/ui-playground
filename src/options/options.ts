import {attr} from '@exadel/esl/modules/esl-base-element/core';
import {bind} from '@exadel/esl/modules/esl-utils/decorators/bind';
import {UIPEditor} from '../editor/editor';
import {CSSUtil, ESLMediaQuery} from '@exadel/esl';
import {UIPPlugin} from '../core/plugin';

export class UIPOptions extends UIPPlugin {
  static is = 'uip-options';
  static optionsConfig = [
    {
      name: 'mode',
      items: ['vertical', 'horizontal']
    },
    {
      name: 'theme',
      items: ['light', 'dark']
    }
  ]

  @attr({defaultValue: 'vertical'}) public mode: string;
  @attr({defaultValue: 'light'}) public theme: string;

  @attr({defaultValue: ''}) public target: string;
  @attr({defaultValue: 'Options:'}) public label: string;

  private _conditionQuery: ESLMediaQuery | null = new ESLMediaQuery('@-MD');

  static darkEditorTheme = 'ace/theme/tomorrow_night';
  static lightEditorTheme = 'ace/theme/chrome';

  protected connectedCallback() {
    super.connectedCallback();

    this.bindEvents();
    this.render();

    this.updateModeMarker(this.mode);
    this.updateThemeMarker(this.theme);
    this._onResize();
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.unbindEvents();
  }

  protected handleChange() {}

  protected bindEvents() {
    this.addEventListener('click', this._onOptionChange);
    window.addEventListener('resize', this._onResize);
  }

  protected unbindEvents() {
    this.removeEventListener('click', this._onOptionChange);
    window.removeEventListener('resize', this._onResize);
  }

  protected render() {
    if (this.label) this.innerHTML = `<span class="section-name">${this.label}</span>`;
    UIPOptions.optionsConfig.forEach( option => {
      if ((!this.mode && option.name === 'mode') || (!this.theme && option.name === 'theme')) return;

      const $option = document.createElement('div');
      $option.classList.add('uip-option', option.name);
      option.items.forEach( item => {
        $option.innerHTML += `
          <div class="option-item">
              <input type="radio" id="${item}-${option.name}" ${option.name}="${item}" class="option-radio-btn">
              <label for="${item}-${option.name}" class="option-label">${item}</label>
          </div>
        `
      })
      this.append($option);
    })
  }

  @bind
  protected _onOptionChange(e: Event) {
    const target = e.target as HTMLElement;

    if (!target || target.classList.value !== 'option-radio-btn') return;
  
    const mode = target.getAttribute('mode');
    const theme = target.getAttribute('theme');

    if (mode) {
      this.mode = mode;
      this.updateModeMarker(this.mode);
    }

    if (theme) {
      this.theme = theme;
      this.updateThemeMarker(this.theme);
    }
  }

  protected changeEditorTheme(theme: string) {
    const $editor = this.root?.querySelector('uip-editor') as UIPEditor;
    if (!$editor) return;
    const editorConfig = $editor.editorConfig;
    editorConfig.theme = theme === 'dark' ? UIPOptions.darkEditorTheme : UIPOptions.lightEditorTheme;
    $editor.setEditorConfig(editorConfig);
  }

  protected updateModeMarker(mode: string) {
    this.root && CSSUtil.removeCls(this.root, 'vertical-mode horizontal-mode');
    this.root && CSSUtil.addCls(this.root, `${mode}-mode`);
  }

  protected updateThemeMarker(theme: string) {
    this.root && CSSUtil.removeCls(this.root, 'light-theme dark-theme');
    this.root && CSSUtil.addCls(this.root, `${theme}-theme`);
    this.changeEditorTheme(theme);
  }

  @bind
  protected _onResize() {
    (this._conditionQuery?.matches)
      ? this.updateModeMarker('horizontal')
      : this.updateModeMarker(this.mode);
  }
}
