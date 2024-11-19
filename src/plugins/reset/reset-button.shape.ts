import type {ESLBaseElementShape} from '@exadel/esl/modules/esl-base-element/core';
import type {UIPReset} from './reset-button';

export interface UIPResetShape extends ESLBaseElementShape<UIPReset> {
  source?: 'javascript' | 'js' | 'html';
  children?: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uip-reset': UIPResetShape;
    }
  }
}
