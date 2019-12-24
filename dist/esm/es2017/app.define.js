
// App: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './app.core.js';
import { COMPONENTS } from './app.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
