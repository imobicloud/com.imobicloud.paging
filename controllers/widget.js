var G, params;

init($.args);
function init(args) {
	var exclude = ['id', 'children'];
	$.container.applyProperties(_.omit(args, exclude));
}

/*
 params = {
 	classes: 'photos',
 	count: 0, // number of page // Deprecated
	currentPage: 0,
 	scrollableView: Titanium.UI.ScrollableView,
	pageFormatter: null // function(container, params) {},
	pageUpdater: null // function(container, params) {}
 }
 * */
exports.load = function(_G, _params) {
	params = _params;
	G = _G;

	if (params.currentPage == null) { params.currentPage = 0; }
	params.lastPage = params.currentPage;

	var formatter = params.pageFormatter || pageFormatter;
	if (params.count) {
		// TODO: Deprecated
		Ti.API.error('com.imobicloud.paging: [count] parameter DEPRECATED in favor of [pageFormatter] and [pageUpdater] parameter');

		formatter($.container, params);
	} else if (params.scrollableView) {
		var scrollableView = params.scrollableView;
		params.count = scrollableView.views ? scrollableView.views.length : 0;
		formatter($.container, params);
		scrollableView.addEventListener('scroll', scrollerScroll);
	}
};

exports.update = function(currentPage) {
	// TODO: Deprecated
	Ti.API.error('com.imobicloud.paging: [update] DEPRECATED in favor of [pageFormatter] and [pageUpdater] parameter');
	params.currentPage = currentPage;
	pageUpdater($.container, params);
};

exports.unload = function() {
	if (params == null) { return; }
	if (params.scrollableView) {
		params.scrollableView.removeEventListener('scroll', scrollerScroll);
	}
	$.container.removeAllChildren();
	params = null;
	G = null;
};

function scrollerScroll(e) {
	if (e.currentPage == params.lastPage ||

		// fix ScrollView inside ScrollableView
		e.currentPage == undefined ||
		e.source !== params.scrollableView
	) { return; }

	params.currentPage = e.currentPage;

	var updater = params.pageUpdater || pageUpdater;
	updater($.container, params);

	$.trigger('scroll', e);
}

function pageFormatter(container, _params) {
	var classes = _params.classes;

	var inner = G.UI.create('View', { classes: classes + '-paging-inner' });
	var dotStyles = G.createStyle({ classes: classes + '-paging-dot' });

	for (var i = 0, ii = _params.count; i < ii; i++) {
		var dot = G.UI.create('View', dotStyles);
		if (i != _params.currentPage) {
			G.addClass(dot, classes + '-paging-dot-off');
		} else {
			G.addClass(dot, classes + '-paging-dot-on');
		}
		dot.left = i * (dotStyles.width + dotStyles.left);
	  	inner.add(dot);
	}

  	container.add(inner);
}

function pageUpdater(container, _params) {
	if (_params.currentPage == _params.lastPage) { return; }

	var classes = _params.classes;

	var inner = container.children[0],
		dots = inner.children;
	if (dots.length) {
	  	dots[_params.lastPage   ] && dots[_params.lastPage   ].applyProperties( G.createStyle({ classes: classes + '-paging-dot-off' }) );
		dots[_params.currentPage] && dots[_params.currentPage].applyProperties( G.createStyle({ classes: classes + '-paging-dot-on'  }) );
	}

	_params.lastPage = _params.currentPage;
}
