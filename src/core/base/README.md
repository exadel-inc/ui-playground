<a href="#uip-plugin" id="uip-plugin"></a>

# UIPPlugin

**UIPPlugin** - base class for all UIP elements.
Should be used as a parent class for all custom plugins of UIP to correctly observe and change UIPModel state.

## Description

All UIP elements are **UIPPlugin** instances. Plugin automatically sets _uip-plugin_ class to its elements,
provides access to [UIPRoot](src/core/README.md#uip-root).

After initialization **UIPPlugin** subscribes to [UIPStateModel](src/core/README.md#uip-state-model) changes and, after
destroying, automatically unsubscribes.
As you can see, the flow is quite similar to what we usually do in [Observable](https://en.wikipedia.org/wiki/Observer_pattern) pattern.

## Processing markup changes

```typescript
import {UIPPlugin} from './plugin';

class UIPComponent extends UIPPlugin {
  @listen({event: 'uip:model:change', target: (that: UIPSetting) => that.model})
  protected _onRootStateChange(): void {
    // ...
  }
}
```

You can find a way of getting current markup in [UIPStateModel](src/core/README.md#uip-state-model) section.

## Example

```typescript
import {UIPPlugin} from './plugin';

class UIPPreview extends UIPPlugin {
  @listen({event: 'uip:model:change', target: (that: UIPSetting) => that.model})
  protected _onRootStateChange(): void {
    this.$inner.innerHTML = this.model!.html;
    this.innerHTML = '';
    this.appendChild(this.$inner);
  }
}
```

---

<a href="#uip-root" id="uip-root"></a>

# UIPRoot

**UIPRoot** - container for **UIPPlugin** components.

## Description

**UIPRoot** contains [UIPStateModel](src/core/README.md#uip-state-model) getter. It also allows **UIPPlugin** elements
to subscribe to model changes (or unsubscribe from them). More details can be found in
[UIPPlugin](src/core/README.md#uip-plugin) section.

## Example

```html
<uip-root></uip-root>
```

---

<a href="#uip-state-model" id="uip-state-model"></a>

# UIPStateModel

**UIPStateModel** - state manager which contains current markup and provides methods for changing it.
Implements [Observable](https://en.wikipedia.org/wiki/Observer_pattern) pattern through extending
ESL's [Observable](https://github.com/exadel-inc/esl/blob/main/src/modules/esl-utils/abstract/observable.ts) class.

## Description

As we already mentioned, **UIPStateModel** is an observable. It's fired every time we produce markup
changes. To trigger the observable you need to change model's markup:

```typescript
import {UIPPlugin} from './plugin';

class UIPComponent extends UIPPlugin {
  protected _onComponentChange() {
    // ...
    this.model!.setHtml('New markup here!', this);
    // ...
  }
}
```

Markup's setter takes two arguments: _markup_ and _modifier_. _Markup_ stands for the new markup, and
_modifier_ is a **UIPPlugin** instance which triggers changes.

**UIPStateModel** also has a getter for current markup:

```typescript
import {UIPPlugin} from './plugin';

class UIPComponent extends UIPPlugin {
  protected processMarkup() {
    // ...
    const currentMarkup = this.model!.html;
    // ...
  }
}
```

## Markup processing methods

**UIPStateModel** has some methods to make markup processing easier. They are used inside
[UIPSettings](src/plugins/settings/README.md) and [UIPSetting](src/plugins/settings/README.md) plugins. These methods have the following signatures:

```typescript
import {Observable} from '@exadel/esl';

class UIPStateModel extends Observable {
  public getAttribute(target: string, attr: string): (string | null)[] {}
  public changeAttribute(cfg: ChangeAttrConfig) {}
}
```

_getAttribute()_ method returns attributes (_attr_ field) values from targets.

_changeAttribute()_ callback is used for changing elements attributes. As you can see, it takes _ChangeAttrConfig_ as
a parameter. This type looks like this:

```typescript
export type TransformSignature = (
  current: string | null
) => string | boolean | null;

export type ChangeAttrConfig = {
  target: string;
  attribute: string;
  modifier: UIPPlugin;
} & (
  | {
      value: string | boolean;
    }
  | {
      transform: TransformSignature;
    }
);
```

Here _attribute_ stands for attribute name and _target_ - for target elements. _Modifier_ field represents the
**UIPPlugin** instance which triggers attribute's changes.

The last field can either be _value_ (this value replaces current _attribute_'s value) or _transform_ function (it maps
current attribute value to the new one).

Again, the examples of using this API can be found in [UIPSetting](src/plugins/settings/README.md)
implementations (e.g. [UIPBoolSetting](src/settings/bool-setting/README.md)).
