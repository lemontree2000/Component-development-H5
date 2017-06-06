/* 柱图组件对象 */
var H5ComponentBar = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg);
 
  $.each(cfg.data, function(index, item) {
    var line = $('<div class="line"></div>');
    var name = $('<div class="name"></div>');
    var rate = $('<div class="rate"></div>');
    var per = $('<div class="per"></div>');

    var width = item[1]*100 + '%';
      
    name.text(item[0]);
    rate.html('<div class="bg"></div>');
    rate.css('width', width);
    per.text(width)
    line.append(name);
    line.append(rate);
    line.append(per);
    component.append(line);
  });
  return component;
}