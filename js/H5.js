/* H5对象 */
var H5 = function () {
  this.id = ('h5' + Math.random()).replace('.', '_');
  this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();
  this.pages = [];
  $('body').append(this.el);

  /**
   * 新增一个页
   * @param {string} name 组件的名称
   * @param {string} text 组件的描述信息,默认文本
   * @return {H5} h5对象，可以重复使用的h5对象支持的方法
   */
  this.addPage = function(name, text) {
    var page = $('<div class="h5_page"></div>');
    if ( name != undefined) {
      page.addClass('section h5_page_' + name);
    }
    if (text != undefined) {
      page.text(text);
    }
    this.el.append(page);
    this.pages.push(page);
    if (typeof this.whenAddPage === 'function') {
      this.whenAddPage()
    }
    return this;
  }     

  this.addComponent = function(name ,cfg) {
    var cfg = cfg || {};
    cfg = $.extend({
      type: 'base'
    }, cfg);
    var coponent;
    var page = this.pages.slice(-1)[0];
    switch(cfg.type) {
      case 'base':
        component = new H5ComponentBase(name, cfg);
        break;
      case 'polyline':
        component = new H5ComponentPolyline(name, cfg);
        break;
      case 'pie':
        component = new H5ComponentPie(name, cfg);
        break;
      case 'bar':
        component = new H5ComponentBar(name, cfg);
        break;
      case 'bar_v':
        component = new H5ComponentBar_v(name, cfg);
        break;
      case 'radar':
        component = new H5ComponentRadar(name, cfg);
      default:
    }
    console.log(cfg.type);
    page.append(component);
    return this;
  }

  // H5 对象初始化呈现
  this.loader = function(page) {
    this.el.fullpage({
      onLeave: function(index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave');;
      },
      afterLoad: function(anchorLink, index) {
        $(this).find('.h5_component').trigger('onLoad');;          
      }      
    });
    this.pages[0].find('.h5_component').trigger('onLoad');
    this.el.show();
    if (page) {
      $.fn.fullpage.moveTo(page);
    }
  }
  return this;
}