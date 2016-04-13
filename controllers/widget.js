var G, params;
var lastPaging;

init($.args);
function init(args) {
	var exclude = ['id', 'children'];
	$.container.applyProperties(_.omit(args, exclude));
}

/*
 params = { 
 	classes: 'photos', 
 	scrollableView: Titanium.UI.ScrollableView
 }
 * */
exports.load = function(_G, _params) {
	params = _params;
	G = _G;
	
	loadPaging(params.scrollableView);
	lastPaging = 0;
	
	params.scrollableView.addEventListener('scroll', scrollerScroll);
};

exports.unload = function() {
	params.scrollableView.removeEventListener('scroll', scrollerScroll);
	$.container.removeAllChildren();
	params = null;
	G = null;
};

function loadPaging(scrollableView) {
	var classes = params.classes;
	var len = scrollableView.views ? scrollableView.views.length : 0;
		
	var inner = G.UI.create('View', { classes: classes + '-paging-inner' });
	
	for (var i=0; i < len; i++) {
		var dot = G.UI.create('View', { 
			classes: classes + '-paging-dot ' + classes + (i ? '-paging-dot-off' : '-paging-dot-on') 
		});
		i == 0 && (dot.left = 0);
	  	inner.add(dot);
	}
  	
  	$.container.add(inner);
}

function scrollerScroll(e) {
  	var currentPage = e.currentPage;
	if (currentPage == lastPaging) { return; }
	
	var inner = $.container.children[0],
		classes = params.classes,
		dots = inner.children;
	
	if (dots.length) {
		dots[lastPaging ].applyProperties( G.createStyle({ classes: classes + '-paging-dot-off' }) );
		dots[currentPage].applyProperties( G.createStyle({ classes: classes + '-paging-dot-on'  }) );
	}	
	
	lastPaging = currentPage;
	
	$.trigger('scroll', e);
}