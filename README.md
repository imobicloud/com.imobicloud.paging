# ScrollableView
====

Paging for ScrollableView

xml

	<ScrollableView id="scroller">
		<View>
			<Label>View 1</Label>
		</View>
	</ScrollableView>

	<Widget id="paging" src="com.imobicloud.paging" class="paging-container"/>

app.tss

	".paging-container": { height: 76, top: 0, touchEnabled: false }
		".messages-paging-inner": { width: Ti.UI.SIZE, height: 5, touchEnabled: false }
			".messages-paging-dot": { width: 5, height: 5, left: 4.5, borderRadius: 2.5, touchEnabled: false }
			".messages-paging-dot-on": { backgroundColor: '#8c919c', opacity: 0.58 }
			".messages-paging-dot-off": { backgroundColor: '#fff', opacity: 0.91 }      

js

	$.paging.load($, {
		classes: 'messages',
		currentPage: 0,
		scrollableView: scroller
	});

	/*
	$.paging.load($, {
		classes: 'messages',
		currentPage: 0,
		scrollableView: scroller,

		// view source for pageFormatter + pageUpdater examples
		pageFormatter: function(container, params) {},
		pageUpdater: function(container, params) {}
	});
	*/

	$.paging.unload();

Change log:

- 5/31/2017
	+ deprecated count parameter in favor of [pageFormatter] and [pageUpdater] parameter
	+ deprecated update function in favor of [pageFormatter] and [pageUpdater] parameter
	+ add pageFormatter parameter
	+ add pageUpdater parameter

- 5/26/2017:
 	+ add currentPage parameter
	+ fix undefined view
