/* 折线图组件对象 */
var H5ComponentPolyline = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg);
  // 绘制网格线
  var w = cfg.width;
  var h = cfg.height;

  // 加入一个画布 (网格线背景)
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;

  //  水平网格线 100 => 10份

  var step = 10;
  ctx.beginPath()
  ctx.lineWidth = .8;
  ctx.strokeStyle = "#aaa"

  window.ctx = ctx;
  // 横线
  for (var i = 0; i < step+1; i++) {
    var y = (h/step) * i;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }

  // 垂线
  step = cfg.data.length + 1;
  for (var j = 0; j < step + 1; j++ ) {
    var x = (w/step) * j;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }

  ctx.stroke();


  component.append(canvas);
  return component;
}