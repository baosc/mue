


var vm = new Mue({
  el: '#app',
  data: {
    msg: 'hello Mue',
  },
  mounted () {
    setTimeout(() => {
      this.msg = "hello Baosc"
    }, 3000);
  }
})