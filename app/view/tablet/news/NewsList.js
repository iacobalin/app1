Ext.define("LDPA.view.tablet.news.NewsList", {
    extend: 'Ext.List',

	config: {
        itemId: 'newsList',
		store: 'News',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,

        cls: "news-list",

		itemCls: 'news-list-item',
		itemTpl: new Ext.XTemplate(
            '<tpl if="image">',
                '<img src="http://src.sencha.io/300/{image}" />',
            '</tpl>',
            '<div>{title}</div>'
        ),
		emptyText: 'Nu exist&#259; articole!',
        pressedCls: "item-pressed",
        selectedCls: 'item-selected',

		items: [
			{
				xtype: 'component',
				docked: 'top',
				html: '<h1>Nout&#259;&#355;i</h1>'
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

		var newsList = this;
		var orientation = this.getOrientation();

		newsList.getScrollable().getScroller().scrollTo(0,0);

		if (orientation == "landscape"){

			newsList.setScrollable({
                direction: 'vertical',
                indicators: false
            });

			newsList.setInline({
                wrap: true
            });

		} else{

			newsList.setScrollable({
                direction: 'horizontal',
                indicators: false
            });

			newsList.setInline({
                wrap: false
            });

        }

		newsList.refresh();

    },


	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
    }

});
