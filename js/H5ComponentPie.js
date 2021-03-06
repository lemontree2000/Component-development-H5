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
  $(cns).css('zIndex',1);

  component.append(cns);

  var r = w/2;
  // 加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r, r, r, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  component.append(cns);
  $(cns).css('zIndex',2);
  
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;

  var colors = ['red', 'green', 'blue', 'orange', 'gray']
  var sAngel = 1.5 * Math.PI; // 这种开始角度 12点位置
  var eAngel = 0;
  var aAngel = Math.PI * 2;
   
  var step = cfg.data.length;
  for (var i = 0; i < step; i++) {
    var item = cfg.data[i];
    var color = item[2] || (item[2] = colors.pop())

    eAngel = sAngel + aAngel * item[1];
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.moveTo(r, r);
    ctx.arc(r, r, r, sAngel, eAngel);
    ctx.fill();
    ctx.stroke();
    
    sAngel = eAngel;

    // 加入所有的项目文本以及百分比
    var text = $('<div class="text"></div>');
    text.text(cfg.data[i][0]);
    var per = $('<div class="per"></div>');
    per.text(cfg.data[i][1] * 100 + '%');
    text.append(per);

    var x = r + Math.sin(.5*Math.PI - sAngel) * r
    var y = r + Math.cos(.5*Math.PI - sAngel) * r

    text.css('left', x/2);
    text.css('top', y/2);

    if (x > w/2) {
      text.css('left', x/2);
    } else {
      text.css('right', (w-x)/2);
    }

    if (y > h/2) {
      text.css('top', y/2);
    } else {
      text.css('bottom', (h-y)/2);
    }

    if (cfg.data[i][2]) {
      text.css('color', cfg.data[i][2]);
    }
    text.css('opacity', 0);
    component.append(text);
  }


  // 加入一个蒙版层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');

  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  $(cns).css('zIndex',3);

  component.append(cns);

  var r = w/2;

  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;



  var draw = function(per) {
    ctx.clearRect(0,0,w,h);

    ctx.beginPath();
    ctx.moveTo(r,r);
    if(per <= 0) {
      ctx.arc(r,r,r,0, 2*Math.PI);
    } else {
      ctx.arc(r, r, r, sAngel, sAngel + 2*Math.PI*per, true);
    }
    ctx.fill();
    ctx.stroke();

    if(per >= 1) {
      H5ComponentPie.resort(component.find('.text'));
      component.find('.text').css('opacity',1);
    }
    if(per <= 1) {
      component.find('.text').css('opacity',0);
    }
  }

  // draw(0)

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


  return component;
}

// 重拍项目文本元素
H5ComponentPie.resort = function(list) {
  console.log(list);
  // 1. 检查相交
  var compare = function(domA, domB) {
    var offsetA = $(domA).offset();
    // domA 的投影
    var shadowA_x = [offsetA.left, $(domA).width() + offset.left];
    var shadowA_y = [offset.top, $(domA).height() + offsetA.top] 

    // domB 的投影
    var shadowB_x = [offsetA.left, $(domB).width() + offset.left];
    var shadowB_y = [offset.top, $(domB).height() + offsetA.top] 
  }
  // 2. 错开重排
  var reset = function (domA, domB) {
    
  }

}