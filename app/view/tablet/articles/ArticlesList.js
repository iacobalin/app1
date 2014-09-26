Ext.define("LDPA.view.tablet.articles.ArticlesList", {
    extend: 'Ext.List',

	config: {
        itemId: 'categoryArticlesList',
		store: 'Articles',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,

        cls: "articles-list",

		itemCls: 'articles-list-item',
		itemTpl: new Ext.XTemplate(
            '<div>{title}</div>'
        ),
		emptyText: 'Nu exist&#259; articole!',
        pressedCls: "item-pressed",
        selectedCls: 'item-selected',

		items: [
			{
				xtype: 'component',
				docked: 'top',
				html: '<h1>Articole</h1>'
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