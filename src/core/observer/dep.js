

// Dep是订阅者Watcher对应的数据依赖  
// Watcher实例

export default class Dep {
  constructor() {
    this.subs = []; //subs用于存放依赖( Watcher实例 )
  }
  notify() {
    for (let sub of this.subs) {
      sub.update()
    }
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  addDepend() {
    if (Dep.target) {
      Dep.target.addDep(this);
      // this.subs.push(Dep.target);
    }
  }
}

Dep.target = null   //Watcher实例
const targetStack = []
export function pushTarget(_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget() {
  Dep.target = targetStack.pop()
}