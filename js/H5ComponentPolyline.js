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
  var text_w = w/step>>0;
  for (var j = 0; j < step + 1; j++ ) {
    var x = (w/step) * j;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  console.log(text_w/2)

    var text = $('<div class="text"></div>');
    if (cfg.data[j]) {
      text.text(cfg.data[j][0]);
      text.css('width', text_w/2).css('left', x/2 + text_w/4);
      component.append(text);
    }
  }

  ctx.stroke();


  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas);

  var step = 10;

    /**
   *  绘制折线以及生长动画
   *  @param {float} per 0到1之间的数据，会根据这个值绘制
   */
  var draw = function (per) {
    // 清空画布
    ctx.clearRect(0,0,w,h);
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
      y = h - (h*item[1] * per);
      ctx.moveTo(x, y);
      ctx.arc(x, y, 5, 0, 2*Math.PI)  
    }
    // 连线
    ctx.moveTo(row_w, h-(cfg.data[0][1]*h*per));
    for (i in cfg.data){
      var item = cfg.data[i];
      x = row_w * i + row_w ;
      y = h - (h*item[1] * per);

      
      ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 118, 118,0)';
    ctx.lineWidth = 1;
    // 绘制阴影
    ctx.lineTo(x, h);
    ctx.lineTo(row_w, h);
    ctx.fillStyle = 'rgba(255, 118, 118,.4)';
    ctx.fill()
    for (i in cfg.data) {
      var item = cfg.data[i];
      x = row_w * i + row_w ;
      y = h - (h*item[1] * per);

      ctx.fillStyle = item[2] ? item[2] : '#595959';
      ctx.fillText(((item[1]*100)>>0) + '%', x  ,y - 15);
    }
    ctx.stroke();



  }


  
  // draw(.5);

  component.on('onLoad', function() {
    var s = 0;
    for (i = 0; i < 100; i++) {
      setTimeout(function(){
        s+=.01;
        draw(s)
      }, i*10);
    }
  });


  component.on('onLeave', function() {
    var s = 1;
    for (i = 0; i < 100; i++) {
      setTimeout(function(){
        s-=.01;
        draw(s)
      }, i*10);
    }
  });  
  component.append(canvas);


  return component;
}