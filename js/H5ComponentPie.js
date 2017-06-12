/* 折线图组件对象 */
var H5ComponentPie = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg);
  // 绘制网格线 - 背景层
  var w = cfg.width;
  var h = cfg.height;

  // 加入一个画布（网格线背景）
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');

  cns.width = ctx.width = w;
  cns.height = ctx.height = h;

  component.append(cns);
  var colors = ['red', 'green']
  var r = w/2;
  // 加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r, r, r, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();


  var drwa = function(per) {

  }

  














  component.on('onLoad', function() {
    var s = 0;
    for (i = 0; i < 100; i++) {
      setTimeout(function(){
        s+=.01;
        // draw(s)
      }, i*10);
    }
  });


  component.on('onLeave', function() {
    var s = 1;
    for (i = 0; i < 100; i++) {
      setTimeout(function(){
        s-=.01;
        // draw(s)
      }, i*10);
    }
  });


  return component;
}