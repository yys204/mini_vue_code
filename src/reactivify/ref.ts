import { isTracking, trackEffect, triggerEffect } from "./effect";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";
class RefImpl {
  private _value: any;
  public dep: any;
  private _rawValue: any;
  public __isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = convert(newVal);
      triggerEffect(this.dep);
    }
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}

export function isRef(value) {
  return !!(value && value.__isRef);
}
export function unRef(value) {
  return isRef(value) ? value.value : value;
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(target[key]);
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return (target[key] = value);
      }
    }
  });
}