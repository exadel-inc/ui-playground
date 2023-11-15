import {ESLBaseElement} from '@exadel/esl/modules/esl-base-element/core';
import {ESLTraversingQuery} from '@exadel/esl/modules/esl-traversing-query/core';
import {attr, listen, memoize} from '@exadel/esl/modules/esl-utils/decorators';

import {UIPRoot} from './root';

import type {UIPStateModel} from './model';

/**
 * Base class for UI Playground plugins
 * Implements basic relation and styles
 */
export abstract class UIPPlugin extends ESLBaseElement {
  static observedAttributes = ['label'];

  /** Visible label */
  @attr() public label: string;
  /** Query for root */
  @attr() public rootTarget: string;

  /** Closest playground {@link UIPRoot} element */
  @memoize()
  protected get root(): UIPRoot | null {
    return (this.rootTarget ? ESLTraversingQuery.first(this.rootTarget, this) : this.closest(`${UIPRoot.is}`)) as UIPRoot;
  }

  /** Returns {@link UIPStateModel} from root instance */
  protected get model(): UIPStateModel | null {
    return this.root ? this.root.model : null;
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('uip-plugin');
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    memoize.clear(this, 'root');
  }

  protected attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void {
    if (attrName === 'label') this.setAttribute('aria-label', newVal);
  }

  /** Handles {@link UIPRoot} state changes */
  @listen({event: 'uip:modelchange', target: (that: UIPPlugin)=> that.model})
  protected _onRootStateChange(): void {}
}
