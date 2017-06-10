/* 折线图组件对象 */
var H5ComponentRadar = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg);

  // 绘制网格线 - 背景层

  var w = cfg.width;
  var h = cfg.height;
  var step = cfg.data.length;
  // 加入一个画布（网格线背景）
  
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas);



  var r = w / 2;

  // 计算一个圆角上的坐标 （计算多边形的顶点坐标）
  // 已知： 圆心坐标（a,b）、半径r ：角度deg
  // rad = ( 2 * Math.PI / 360) * (360 / step) * i
  // x = a + Math.sin(rad) * r;
  // y = b + Math.cos(rad) * r;

  // 绘制网格背景 (面绘制)
  var isBlue = false;
  ctx.beginPath()
  for (var s = 10; s > 0; s--) {
    ctx.beginPath();
    for (var i = 0; i < step; i++) {
      var rad = ( 2 * Math.PI / 360) * (360 / step) * i;
      var x = r + Math.sin(rad) * r * (s/10);
      var y = r + Math.cos(rad) * r * (s/10);
      ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
    ctx.fill();
  }
  
  // 绘制扇骨图

  for (var i = 0; i < step; i++) {
    var rad = ( 2 * Math.PI / 360) * (360 / step) * i;
    var x = r + Math.sin(rad) * r ;
    var y = r + Math.cos(rad) * r ;    
    ctx.moveTo(r, r);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#e0e0e0';
  ctx.stroke();

  // 加入一个画布（数据层）
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas);

  ctx.strokeStyle = '#f00';
  var draw = function(per) {
    ctx.clearRect(0,0,w,h);
    // 输出数据的折线
    for (var i = 0; i < step; i++) {
      var rad = ( 2 * Math.PI / 360) * (360 / step) * i;
      var rate = cfg.data[i][1] * per;

      var x = r + Math.sin(rad) * r * rate;
      var y = r + Math.cos(rad) * r * rate;
      ctx.lineTo(x, y);
      ctx.arc(x, y, 3, 0, 2*Math.PI);
        
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = '#ff7676';
    for (var i = 0; i < step; i++) {
      var rad = ( 2 * Math.PI / 360) * (360 / step) * i;
      var rate = cfg.data[i][1] * per;

      var x = r + Math.sin(rad) * r * rate;
      var y = r + Math.cos(rad) * r * rate;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2*Math.PI);       
      ctx.fill();
      ctx.closePath();
    }

  }
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
  draw(1)


  return component;
}