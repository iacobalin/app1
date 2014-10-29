Ext.define("LDPA.view.tablet.video.VideoList", {
    extend: 'Ext.List',

	config: {
        itemId: 'videoArticlesList',
		store: 'VideoArticles',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,
        scrollable:{
            direction: 'vertical',
            indicators: false
        },
        inline: false,

        cls: "video-article-list",

		itemCls: 'video-article-list-item',
		itemTpl: new Ext.XTemplate(
            '<tpl if="image">',
			    '<img src="http://src.sencha.io/300/{image}" />',
		    '</tpl>',
			'<div>{title}</div>'
            //'<div style="background-image: url(http://src.sencha.io/300/300/{image});">{title}</div>'
        ),
		emptyText: 'Nu exist&#259; articole video!',
        pressedCls: "item-pressed",
        selectedCls: 'item-selected',

		items: [
			{
				xtype: 'component',
				docked: 'top',
				html: '<h1>Lec&#355;ii video</h1>'
			}
		]
	},


	initialize: function(){

        this.callParent(arguments);

		this.handleOrientationChange();

		// add a handler for the resize event of the viewport
		Ext.Viewport.on('resize', 'handleOrientationChange', this, {buffer: 50 });
	},


	handleOrientationChange: function(){

		var videoList = this;
		var orientation = this.getOrientation();

		videoList.getScrollable().getScroller().scrollTo(0,0);

		if (orientation == "landscape"){

			videoList.setScrollable({
                direction: 'vertical',
                indicators: false
            });

			videoList.setInline({
                wrap: true
            });

		} else{

			videoList.setScrollable({
                direction: 'horizontal',
                indicators: false
            });

			videoList.setInline({
                wrap: false
            });

        }

		videoList.refresh();

    },


	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
    }

});
