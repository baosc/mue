# mue
My Vue

---

## 总览

<p>1、initOptions -- 主要observer(设置data的setter/getter)</p>

<p>2、proxy代理 -- 实现 this.msg 到 this._data.msg</p>

<p>3、Compiler -- 解析模板， 添加监听(new Watcher())</p>


### Observer
<p>遍历data属性, 添加该属性依赖(Dep 实例);</p>
<p>执行defineProperty, 代理set/get</p>
<p>get --> dep.notify()</p>
<p> set --> dep.addDepend()</p>
  

### Watcher(vm, expression, cb)   
  #### vm Mve实例, expression 表达式, cb 回调

  ##### 目的：将当前Watcher实例push到dep.subs中
  <p>1、获取监听属性值 (Dep.target 标识当前Watcher实例)       ----  watcher.js</p>
  <p>2、触发getter, 收集依赖  dep.addDepend()        ----  observer/index.js</p>
  <p>3、调用dep.addSub(watcherInstance)       ----  dep.js</p>
  
  
 
  

  
