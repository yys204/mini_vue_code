import { extend } from "../shared";
let activeEffect;
let shouldTrack;
export class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?: any) {
    this._fn = fn;
  }
  run() {
    if (!this.active) return this._fn();
    shouldTrack = true;
    activeEffect = this;
    // 返回函数调用的结果
    const res = this._fn();
    shouldTrack = false;
    return res;
  }
  stop() {
    if (this.active) {
      this.onStop?.();
      cleanupEffect(this);
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}
export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}
// 依赖收集
const targetMap = new Map();
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (dep.has(activeEffect)) {
    return;
  }
  trackEffect(dep);
}
export function trackEffect(dep) {
  if (!isTracking()) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}
// 依赖触发
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffect(dep);
}
export function triggerEffect(dep) {
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
  // 返回effect的run方法
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
