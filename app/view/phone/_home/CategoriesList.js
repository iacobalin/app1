Ext.define("LDPA.view.phone.home.CategoriesList", {
    extend: 'Ext.List',
	    
	config: {
        id: 'categoriesList',
		store: 'Categories',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,
		
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		
		cls: "categories-list",
		
		itemCls: 'categories-list-item',
		itemTpl: new Ext.XTemplate('<div style="display:-webkit-box; -webkit-box-orient: vertical; -webkit-box-pack: center; -webkit-box-align:center;">',
				'<div style="width: 100px; height: 66px; text-align:center;">',
					'{[this.getImage(values.image)]}',
				'</div>',
				'<p style="margin:0px; padding:0px;">{name}</p>',
			'</div>',
			{
				getImage: function(image){
					var imagesOffline = LDPA.app.imagesOffline;
					var offlineRecord = imagesOffline.findRecord("url",image, 0, false, true, true);
					if (offlineRecord && offlineRecord.get("dataUrl")){
						return '<img src="'+offlineRecord.get("dataUrl")+'" style="max-width: 100px; max-height:60px" />';	
					}
					
					if (LDPA.app.isOnline()){
						if (image)
							return '<img src="http://src.sencha.io/100/60/'+image+'" style="max-width: 100px; max-height:60px" />';	
					}
					
					return "";
				}
			}),
		
		emptyText: 'Nu exist&#259; categorii!',
		pressedCls: "item-pressed",
        selectedCls: ''
	},
	
	
	initialize: function(){
		this.callParent(arguments);
	}
});
