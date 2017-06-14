/* 基本图文组件对象 */
var H5ComponentBase = function (name, cfg) {
  var cfg = cfg || {};
  var id = ('h5_c' + Math.random()).replace('.', '_');
  // 把当前组件进行样式标记
  var cls = 'h5_component_' + cfg.type;
  var component = $(`<div class="h5_component ${cls} h5_component_name_${name}"  id="${id}"></div>`);

  cfg.text && component.text(cfg.text);
  cfg.width && component.width(cfg.width/2)
  cfg.width && component.height(cfg.height/2)

  cfg.css && component.css(cfg.css);
  cfg.bg && component.css('backgroundImage', 'url('+ cfg.bg +')');
  if (cfg.center === true) {
    component.css({
      marginLeft: (cfg.width/4 * -1) + 'px',
      left: '50%'
    });
  }
  // page下的组件进行动画事件 当加载时
  component.on('onLoad', function() {
    component.addClass(cls + '_load').removeClass(cls + '_leave');
    setTimeout(function () {
      cfg.animateIn && component.animate(cfg.animateIn);   
    }, cfg.dely || 0);
    return false;
  });
  // page下的组件进行动画事件 当离开时
  component.on('onLeave', function() {
    component.addClass(cls + '_leave').removeClass(cls + '_load');    
    cfg.animateOut && component.animate(cfg.animateOut);    
    return false;        
  });


  return component;
}