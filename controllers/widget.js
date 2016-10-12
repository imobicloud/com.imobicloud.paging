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
 	count: 0, // number of page
 	scrollableView: Titanium.UI.ScrollableView
 }
 * */
exports.load = function(_G, _params) {
	params = _params;
	G = _G;
	
	if (params.count) {
		loadPaging(params.count);
	} else if (params.scrollableView) {
		var scrollableView = params.scrollableView;
		loadPaging(scrollableView.views ? scrollableView.views.length : 0);
		scrollableView.addEventListener('scroll', scrollerScroll);
	}
	
	lastPaging = 0;
};

exports.update = updatePage;

exports.unload = function() {
	if (params == null) { return; }
	if (params.scrollableView) {
		params.scrollableView.removeEventListener('scroll', scrollerScroll);
	}
	$.container.removeAllChildren();
	params = null;
	G = null;
};

function loadPaging(count) {
	var classes = params.classes;
		
	var inner = G.UI.create('View', { classes: classes + '-paging-inner' });
	var dotStyles = G.createStyle({ classes: classes + '-paging-dot' });
	
	for (var i = 0; i < count; i++) {
		var dot = G.UI.create('View', dotStyles);
		if (i != 0) {
			G.addClass(dot, classes + '-paging-dot-off');
		} else {
			G.addClass(dot, classes + '-paging-dot-on');
		}
		dot.left = i * (dotStyles.width + dotStyles.left);
	  	inner.add(dot);
	}
	
  	$.container.add(inner);
}

function scrollerScroll(e) {
  	var currentPage = e.currentPage;
	if (currentPage == lastPaging ||
		
		// fix ScrollView inside ScrollableView
		currentPage == undefined || 
		e.source !== params.scrollableView
	) { return; }
	
	updatePage(currentPage);
	
	$.trigger('scroll', e);
}

function updatePage(currentPage) {
	var classes = params.classes;
	
	var inner = $.container.children[0],
		dots = inner.children;
	if (dots.length) {
	  	dots[lastPaging ].applyProperties( G.createStyle({ classes: classes + '-paging-dot-off' }) );
		dots[currentPage].applyProperties( G.createStyle({ classes: classes + '-paging-dot-on'  }) );
	}
	
	lastPaging = currentPage;
}
