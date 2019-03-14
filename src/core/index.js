import Watcher from "./observer/watcher";
import initOptions from './instance/init';
import proxy from './instance/proxy';
import { callHook } from './instance/lifecycle';
import Compiler from './compile/index'

export default class Mve {
  constructor(options) {
    let vm = this;
    vm.$options = options;
    
    vm.$watch = function (key, cb) {
      new Watcher(vm, key, cb)
    }

    initOptions(vm)   //设置options， 同时observer(设置data的 setter/getter)

    for (const key in vm._data) {
      if (vm._data.hasOwnProperty(key)) {
        proxy(vm, '_data', key)
      }
    }

    callHook(vm, 'created')

    new Compiler(vm.$options.el, vm)

    callHook(vm, 'mounted')
  }
}