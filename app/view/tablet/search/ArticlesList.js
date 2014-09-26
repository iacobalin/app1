Ext.define("LDPA.view.tablet.search.ArticlesList", {
    extend: 'Ext.List',

	config: {
        store: 'Search',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,

        cls: "results-list",

		itemCls: 'results-list-item',
		itemTpl: new Ext.XTemplate(
            '<div><strong>{title}</strong></div>'
        ),
		emptyText: 'Nu exist&#259; articole!',
        pressedCls: "item-pressed",
        selectedCls: 'item-selected',

		items: [
			{
				xtype: 'component',
				itemId: "bar",
				docked: 'top',
				tpl: new Ext.XTemplate('<h1>Rezultatele c&#259;ut&#259;rii pentru:</h1><span>{query}</span>')
			}
		]
	},


	initialize: function(){
		this.callParent(arguments);

		this.handleOrientationChange();

		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('resize', 'handleOrientationChange', this, {buffer: 50 });
	},


	handleOrientationChange: function(){

		var articlesList = this;
		var orientation = this.getOrientation();

		articlesList.getScrollable().getScroller().scrollTo(0,0);

		if (orientation == "landscape"){

			articlesList.setScrollable({
                direction: 'vertical',
                indicators: false
            });

			articlesList.setInline({
                wrap: true
            });

		} else{

			articlesList.setScrollable({
                direction: 'horizontal',
                indicators: false
            });

			articlesList.setInline({
                wrap: false
            });

        }

		articlesList.refresh();

    },


	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
    }

});