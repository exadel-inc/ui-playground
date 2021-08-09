# UIP Plugin

[UIPPlugin](#uip-plugin) - base class for all UIP elements. Extending it allows creating custom UIP
components.

## Description

All UIP elements are [UIPPlugin](#uip-plugin) instances. Plugin automatically sets *uip-plugin* class to its elements,
provides access to [UIPRoot](#uip-root) and adds **_onRootStateChange()** method, which is a key part in components
communication.

After initialization [UIPPlugin](#uip-plugin) subscribes to [UIPStateModel](#uip-state-model) changes and, after
destroying, automatically unsubscribes. **_onRootStateChange()** is called every time markup changes are detected.
As you can see, the flow is quite similar to what we usually do in
[Observable](https://en.wikipedia.org/wiki/Observer_pattern) pattern.

## Processing markup changes

**_onRootStateChange()** method does nothing by default. So if you want your custom component to react on markup
changes, you need to implement it. This callback has the following signature:

```typescript
import {UIPPlugin} from "./plugin";

class UIPComponent extends UIPPlugin {
  protected _onRootStateChange(): void {
      //...;
  }
}
```

You can find a way of getting current markup in [UIPStateModel](#uip-state-model) section.

To make the long story shorter: we implement "reaction" callback in **_onRootStateChange()** (using markup's getter
mentioned earlier) and every time [UIPStateModel](#uip-state-model) produces markup updates, we "react" to them!

## Example

```typescript
import {UIPPlugin} from "./plugin";

class UIPPreview extends UIPPlugin {
  protected _onRootStateChange(): void {
    this.$inner.innerHTML = this.model!.html;
    this.innerHTML = '';
    this.appendChild(this.$inner);
  }
}
```

---

# UIP Root

[UIPRoot](#uip-root) - container for [UIPPlugin](#uip-plugin) components.

## Description:

[UIPRoot](#uip-plugin) contains [UIPStateModel](#uip-state-model) getter. It also allows [UIPPlugin](#uip-plugin) elements
subscribing to model changes (or unsubscribing from them). More details can be found in [UIPPlugin](#uip-plugin) section.

## Example:

```html
<uip-root></uip-root>
```

---

# UIP State Model

[UIPStateModel](#uip-state-model) - state manager which contains current markup and provides methods for changing it.
Implements [Observable](https://en.wikipedia.org/wiki/Observer_pattern) pattern through extending
ESL's [Observable](https://github.com/exadel-inc/esl/blob/main/src/modules/esl-utils/abstract/observable.ts) class.

## Description

As we already mentioned, [UIPStateModel](#uip-state-model) is an observable. It's fired every time we produce markup
changes. To trigger the observable you need to change model's markup:

```typescript
import {UIPPlugin} from "./plugin";

class UIPComponent extends UIPPlugin {
    protected _onComponentChange() {
        //...
        this.model!.setHtml('New markup here!', this);
        //...
    }
}
```

Markup's setter takes two arguments: *markup* and *modifier*. *Markup* stands for, surprisingly, new markup, and
*modifier* is a [UIPPlugin](#uip-plugin) instance which triggers changes (it is needed to prevent extra triggers of
[UIPStateModel](#uip-state-model)).


[UIPStateModel](#uip-state-model) also has a getter for current markup:

```typescript
import {UIPPlugin} from "./plugin";

class UIPComponent extends UIPPlugin {
    protected processMarkup() {
        //...
        const currentMarkup = this.model!.html;
        //...
    }
}
```

## Markup processing methods

[UIPStateModel](#uip-state-model) has some methods to make markup processing easier. They are used inside
[UIPSettings](../settings/README.md) and [UIPSetting](../settings/setting/README.md) plugins. These methods have the
following signatures:

```typescript
import {Observable} from "@exadel/esl";

class UIPStateModel extends Observable {
  public getAttribute(target: string, attr: string): (string | null)[] {};
  public changeAttribute(cfg: ChangeAttrConfig) {};
}
```

**getAttribute()** method returns attributes (*attr* field) values from targets.

**changeAttribute()** callback is used for changing elements attributes. As you can see, it takes *ChangeAttrConfig* as
a parameter. This type looks like this:

```typescript
export type TransformSignature = (current: string | null) => string | boolean | null;

export type ChangeAttrConfig = {
  target: string,
  attribute: string,
  modifier: UIPPlugin
} & ({
  value: string | boolean
} | {
  transform: TransformSignature
});

```

Here *attribute* stands for attribute name and *target* - for target elements. *Modifier* field represents the
[UIPPlugin](../core/README.md#uip-plugin) instance which triggers attribute's changes.

The last field can either be *value* (this value replaces current *attribute*'s value) or *transform* function (it maps
current attribute value to the new one).

Again, the examples of using this API can be found in [UIPSetting](../settings/setting/README.md)
implementations (e.g. [UIPBoolSetting](../settings/setting/bool-setting/README.md)).