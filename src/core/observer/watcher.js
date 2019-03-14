
import { popTarget, pushTarget } from './dep'

export default class Watcher {
  constructor(vm, expression, cb) {
    this.vm = vm
    this.cb = cb
    this.expression = expression
    this.value = this.getVal()  //评估getter，并重新收集依赖项。
  }

  getVal() {
    pushTarget(this)
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]   //触发getter
    })
    popTarget()
    return val
  }

  addDep(dep) {
    dep.addSub(this)
  }
  
  update() {
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    this.cb.call(this.vm, val, this.value)
  }
}
