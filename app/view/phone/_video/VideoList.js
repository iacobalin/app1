Ext.define("LDPA.view.phone.video.VideoList", {
    extend: 'Ext.List',
		
	config: {
        itemId: 'videoList',
		
		scrollToTopOnRefresh: true,
		store: 'VideoArticles',
		
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Lec&#355;ii Video'
			}
		],
		
		itemTpl: new Ext.XTemplate(
            '<div class="box">',
                '<div class="image">'+
                   '{[this.getImage(values.featured_image)]}',
                '</div>',
                '<div class="title">{title}</div>',
            '</div>',
            "<div class='details'>",
                '<div class="comments">',
                    "<div class='comments-icon'></div>",
                    "<div class='comments-number'>{comment_count}</div>",
                '</div>',
                '<div class="note">',
                    "<div class='note-icon'></div>",
                    "<div class='note-number'>{ranking}</div>",
                '<div>',
            "</div>",
			{
				getImage: function(image){
					var imagesOffline = LDPA.app.imagesOffline;
					var offlineRecord = imagesOffline.findRecord("url",image, 0, false, true, true);
					if (offlineRecord && offlineRecord.get("dataUrl")){
						return '<img src="'+offlineRecord.get("dataUrl")+'" style="max-width: 120px;" />';	
					}
					
					if (LDPA.app.isOnline()){
						if (image)
							return '<img src="http://src.sencha.io/120/'+image+'" style="max-width: 120px;" />';	
					}
					
					return "";
				}
			}
		),
		
		emptyText: 'Nu exist&#259; articole video!',
		
		deferEmptyText: false,
		cls: 'video-list',
        itemCls: 'video-list-item',
      	pressedCls: "item-pressed",
        selectedCls: 'item-selected'
	},
	
	
	initialize: function(){
		this.callParent(arguments);
	}
});