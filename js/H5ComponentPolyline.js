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
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#aaa"
  component.append(canvas);

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


  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas);

  var step = 10;
  ctx.beginPath()
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ff8878"

  var x = 0;
  var y = 0;

  // 画点
  var row_w = w / (cfg.data.length + 1)
  for (i in cfg.data) {
    var item = cfg.data[i];
    x = row_w * i + row_w ;
    y = h * (1 - item[1]);
    ctx.moveTo(x, y);
    ctx.arc(x, y, 5, 0, 2*Math.PI)
    
  }
  ctx.stroke();





  component.append(canvas);


  return component;
}