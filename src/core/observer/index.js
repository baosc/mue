
import Dep from './dep'

class Observer {
  constructor(value) {
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this.walk(obj[key])
      }
      defineReactive(obj, key, obj[key])
    })
  }
}

let defineReactive = (obj, key, value) => {
  let dep = new Dep();  //依赖收集
  Object.defineProperty(obj, key, {
    set(newVal) {
      if (newVal === value) {
        return
      }
      value = newVal
      dep.notify() //如果数据被重新赋值了, 调用 Dep 的 notify 方法, 通知所有的 Watcher
    },
    get() {
      //Dep.target全局变量 指向的就是当前正在解析指令的Complie生成的 Watcher
      //会执行到 dep.addSub(Dep.target), 将 Watcher 添加到 Dep 对象的 Watcher 列表中
      if (Dep.target) {
        dep.addDepend()
      }
      return value;
    }
  })
}


export default function observer(value) {
  return new Observer(value)
}