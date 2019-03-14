
import observer from '../observer/index'

const LIFECYCLE_HOOK = [
  "creater", "mounted"
]
export default function initOptions(vm) {
  vm._data = vm.$options.data;
  observer(vm._data)
  LIFECYCLE_HOOK.forEach(hook => {
    vm.$options[hook] = vm.$options[hook] || function () { }
  })
}