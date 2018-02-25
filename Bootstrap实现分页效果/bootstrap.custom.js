jQuery.fn.extend({
	tabsV2: function (options) {
		console.log("tabs-v2");
		var $container = $(this);
		if (!options) options = {};
		if (!options.event) options.event = "click";
		$container.find('.nav-tabs li').unbind(options.event).on(options.event, function(e) {
			$container.find('.nav-tabs li,.tab-content .tab-pane').removeClass('active'),
			$(this).addClass('active'),
			$container.find('.tab-content ' + $(this).attr('target')).addClass('active');
			//event.preventDefault();
		});
	},
	treeViewV2: function (options) {
		if (!options) throw "Please give me some parameters.";
		var $sel = $(this);
		if (!$sel || $sel.length == 0) throw "Please select at least one element as container.";
		while ($.type(options) === "string") {
			if (options.toUpperCase() == "REMOVE") {
				//销毁tree
				$sel.treeview("remove");
				return;
			}
			return;
		}
		if ($.isEmptyObject(options.data)) return;
		var o = {
			data: options.data,
			emptyIcon: options.edit? '': 'fa fa-newspaper-o',
			showBorder: options.showBorder || false,
			showTags: options.showTags || true,
			selectedBackColor: options.selectedBackColor || '##428bca',
			selectedColor: options.selectedColor || '#FFFFFF',
			onNodeSelected: options.edit? null: function (event, node) {
				options.onNodeSelected(event, node);
			},
			onNodeUnselected: options.edit? null: function (event, node) {
				options.onNodeUnselected(event, node);
			},
			showCheckbox: options.edit? true: false,
		};
		options.nodeChecked ? o.onNodeChecked = options.nodeChecked :"";
		options.nodeUnchecked ? o.onNodeUnchecked = options.nodeUnchecked :"";
		$sel.treeview(o);
//		$sel.find(".list-group-item").each(function (index, ele) {
//			$(ele).attr("title", $(ele).text());
//		});
		$sel.data("treeviewData", o);
	},
	
	/**
	 * confirm事件 
	 * content:内容   
	 * title:显示的标题  
	 * width:显示的宽度 1最窄 2正常宽度 3最宽    
	 */
	confirmV2: function(options) {
		var content = options.content;
		var title = options.title;
		var width = options.width;
		var yesContent = options.yesContent;
		var noContent = options.noContent;
		$("#alertModal").remove();
		var $this = this;
		var alertHtml = ''
						+	'<div class="modal fade" id="alertModal" tabindex="-1">'
						+	  '<div class="modal-dialog">'
						+	    '<div class="modal-content" style="margin-top:200px">'
						+	      '<div class="modal-header">'
						+	        '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'
						+	        '<h4 class="modal-title" id="alertTitle">Warning!</h4>'
						+	      '</div>'
						+	      '<div class="modal-body">'
						+	      '</div>'
						+	      '<div class="modal-footer">'
						+	        '<button type="button" class="btn btn-YES btn-default" data-dismiss="modal">YES</button>'
						+	        '<button type="button" class="btn btn-NO btn-default" data-dismiss="modal">NO</button>'
						+	      '</div>'
						+	    '</div>'
						+	  '</div>'
						+   '</div>';
		$("body").append(alertHtml);
		if(content != null) {
			$(".modal-body").append(content);
		}
		if(title != null) {
			$("#alertTitle").html("").append(title);
		}
		if(yesContent!=null){
			$('.btn-YES',$('#alertModal')).html(yesContent);
		}
		if(noContent!=null){
			$('.btn-NO',$('#alertModal')).html(noContent);
		}
		if(width == 1) {
			$(".modal-dialog").addClass("modal-sm");
		} else if(width == 3) {
			$(".modal-dialog").addClass("modal-lg");
		}
		$("#alertModal").modal();
		$(".btn-YES").click(function() {
			options.YES && options.YES();
		});
		$(".btn-NO").click(function() {
			options.NO && options.NO();
		});
	},
});


/**
 * simple qtipUtil 用于生成本项目下qtip
 * @param  {[type]} selector [qtip selector]
 * @param  {[type]} options  [qtip params]
 * @return {[type]}          [qtip api]
 * e.g. qtipUtil('body',text:"hello world");
 */
var qtipUtil = function(selector,options){
    var qtipUtil={};
    // 这里设置默认的样式
    var DEFAULT_STYLE = {
    		tip: {
    			corner: true,
    			border: 1,
    			width: 10,
    			height: 10
    		},
    		classes: 'qtip-bootstrap defaultQtip'
    	},
    	DEFAULT_SHOW = {
    		solo: true,
    		effect: function() {
    		    $(this).fadeTo(300, 1);
    		}
    	},
    	DEFAULT_HIDE = {
    		distance:10
    	},
    	DEFAULT_POSITION = {
    		target: 'mouse', 
    		viewport: $(window),
    		adjust: {
    		    resize: true,
    		    x: 10,
    		    y:10,
    		    mouse:false,
    		    scroll: true,
    		}
    	},
    	DEFAULT_EVENTS = {}
    if(options==undefined){
    	options = {};
    }
	var target = selector,
		text = options.text ? options.text : undefined,
		title = options.title ? options.title : undefined,
		style = options.style ? options.style : DEFAULT_STYLE,
		show = options.show ? options.show : DEFAULT_SHOW,
		hide = options.hide ? options.hide : DEFAULT_HIDE,
		events = options.events ? options.events : DEFAULT_EVENTS,
		position = options.position ? options.position : DEFAULT_POSITION,
		content = function() {
			var content = {};
			if (text) {
				content.text = text;
			}
			if (title) {
				content.title = title;
			}
			return content;
		}();
	function init() {
		return $(target).qtip({
			overwrite:false,
			style: style,
			show: show,
			hide: hide,
			position: position,
			content: content,
			events: events
		})
	}
    qtipUtil.initQtip = function(){
        return init();
    }
    return qtipUtil;
}

/**
 * 使用animate.css的动画
 * @param  {string}   animate  [动画名字]
 * @param  {Function} callback [动画完成回调函数]
 *
 */
$.fn.coolAnimate= function(animate, callback) {
	var self = this;
	animate = "animated fast " + animate;
	$(self).addClass(animate).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass(animate);
		if ($.isFunction(callback)) {
			callback(self)
		}
	})
	return $(self);
}

/**
 * 绝对居中的Loader
 * @param  {string} action  [show/hide]
 * @param  {string} spinner [loader html]
 */
$.fn.loader = function(action,spinner) {
	var action = action || 'show';
	if(action === 'show') {
		if(this.find('.loader').length == 0) {
			parent_position = this.css('position');
			this.css('position','relative');
			paddingTop = parseInt(this.css('padding-top'));
			paddingRight = parseInt(this.css('padding-right'));
			paddingBottom = parseInt(this.css('padding-bottom'));
			paddingLeft = parseInt(this.css('padding-left'));
			width = this.innerWidth();
			height = this.innerHeight();
			
			$loader = $('<div class="loader"></div>').css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'width': '100%',
				'height': '100%',
				'z-index':	50,
				'background-color': 'rgba(255,255,255,0.7)',
				'border-radius': '3px'
			});

			$loader.attr('parent_position',parent_position);

			$spinner = $(spinner).css({
				'position': 'absolute',
		    	'top': '50%',
		    	'left': '50%',
		    	'color': '#000',
				'margin-top': '-'+paddingTop+'px',
				'margin-right': '-'+paddingRight+'px',
				'margin-bottom': '-'+paddingBottom+'px',
				'margin-left': '-'+paddingLeft+'px'
			});

			$loader.html($spinner);
			this.prepend($loader);
			marginTop = $spinner.height()/2;
			marginLeft = +$spinner.width()/2;
			$spinner.css({
				'margin-top': '-'+marginTop+'px',
				'margin-left': '-'+marginLeft+'px'
			});
		}
	} else if(action === 'hide') {
		this.css('position',this.find('.loader').attr('parent_position'));
		this.find('.loader').remove();
	}
};
(function($) {
    'use strict';
    // use font awesome icons if available
    if ( typeof PNotify != 'undefined' ) {
        PNotify.prototype.options.styling = "fontawesome";
        $.extend(true, PNotify.prototype.options, {
            shadow: false,
            stack: {
                spacing1: 10,
                spacing2: 10
            }
        });
        $.extend(PNotify.styling.fontawesome, {
            // classes
            container: "notification",
            notice: "notification-warning",
            info: "notification-info",
            success: "notification-success",
            error: "notification-danger",
            // icons
            notice_icon: "fa fa-exclamation",
            info_icon: "fa fa-info",
            success_icon: "fa fa-check",
            error_icon: "fa fa-times"
        });
    }
}).apply(this, [jQuery]);