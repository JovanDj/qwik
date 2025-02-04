/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */

//////////////////////////////////////////////////////////////////////////////////////////
// Developer Core API
//////////////////////////////////////////////////////////////////////////////////////////
export { PropsOf, qComponent, QComponent, StateOf } from './component/q-component.public';
export { qHook, QHook, qHookMap as __internal_qHookMap } from './component/qrl-hook.public';
//////////////////////////////////////////////////////////////////////////////////////////
// Developer Event API
//////////////////////////////////////////////////////////////////////////////////////////
export { qBubble } from './event/q-bubble.public';
export { PayloadOf, qEvent, QEvent } from './event/q-event.public';
export { qDehydrate } from './object/q-store.public';
//////////////////////////////////////////////////////////////////////////////////////////
// Internal Runtime
//////////////////////////////////////////////////////////////////////////////////////////
export { QRL } from './import/qrl';
export { qImport } from './import/qImport';
export { qObject, QObject } from './object/q-object.public';
export { qSubscribe } from './object/q-subscribe.public';
export { qProps, QProps } from './props/q-props.public';
export { qNotifyRender as notifyRender } from './render/q-notify-render';
//////////////////////////////////////////////////////////////////////////////////////////
// PLATFORM
//////////////////////////////////////////////////////////////////////////////////////////
export { getPlatform, setPlatform } from './platform/platform';
export { CorePlatform } from './platform/types';
//////////////////////////////////////////////////////////////////////////////////////////
// JSX Support
//////////////////////////////////////////////////////////////////////////////////////////
export { Async, PromiseValue } from './render/jsx/async.public';
//////////////////////////////////////////////////////////////////////////////////////////
// JSX Runtime
//////////////////////////////////////////////////////////////////////////////////////////
export { h } from './render/jsx/factory';
export { Host } from './render/jsx/host.public';
export { Fragment, jsx, jsxDEV, jsxs } from './render/jsx/jsx-runtime';
export { Slot } from './render/jsx/slot.public';
export {
  ComponentChild,
  ComponentChildren,
  FunctionComponent,
  JSXFactory,
  JSXNode,
  RenderableProps,
} from './render/jsx/types/jsx-node';
export { QwikDOMAttributes, QwikJSX } from './render/jsx/types/jsx-qwik';
export type { QwikIntrinsicElements } from './render/jsx/types/jsx-qwik-elements';
export { qRender } from './render/q-render.public';
export { useEvent, useHostElement, useURL } from './use/use-core.public';
export { useTransient } from './use/use-transient.public';
//////////////////////////////////////////////////////////////////////////////////////////
// Developer Low-Level API
//////////////////////////////////////////////////////////////////////////////////////////
export { ValueOrPromise } from './util/types';

/**
 * @alpha
 */
export const version = (globalThis as any).QWIK_VERSION as string;
