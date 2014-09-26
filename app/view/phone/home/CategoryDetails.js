Ext.define("LDPA.view.phone.home.CategoryDetails", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Panel',
		'Ext.Component',
		'LDPA.view.phone.home.ArticlesList'
    ],
    config: {
        
		itemId: 'categoryDetails',
		
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		
		layout: {
			type: 'vbox',
			pack: 'start',
			align:'justify'	
		},
		cls: 'category-view',
		
		items: [
			{
				xtype: 'titlebar',
				itemId: 'titleBar',
				docked: 'top',
				cls: 'categories-toolbar',
				title: '',
				items: [
					{
						align: 'left',
						ui: 'back',
						text: '&#206;napoi',
						handler: function(){
							var homePanel = this.up("#homePanel");
							var homeView = homePanel.child("#homeView");
														
							homePanel.animateActiveItem(homeView, {type: 'slide', direction: 'right'});
						}
					}
				]
			},
			{
				xtype: "component",
				itemId: "description",
				styleHtmlContent: true,
				tpl: new Ext.XTemplate(
					'<div align="center" style="width: 100%;">',
						'{[this.getImage(values.image)]}',
					'</div>',
					'<br/>',
					'{description}',
					{
						getImage: function(image){
							var imagesOffline = LDPA.app.imagesOffline;
							var offlineRecord = imagesOffline.findRecord("url",image, 0, false, true, true);
							if (offlineRecord && offlineRecord.get("dataUrl")){
								return '<img src="'+offlineRecord.get("dataUrl")+'" />';	
							}
							
							if (LDPA.app.isOnline()){
								if (image)
									return '<img src="http://src.sencha.io/x100/'+image+'" />';	
							}
							
							return "";
						}
					}			
				)
			},
			{
				xtype: "component",
				html: '<h1>Articole</h1>',
				cls: 'articles-title-component'
			}
		]
    },
	
	
	initialize: function(){
		
		// articles list
		var item = Ext.create("LDPA.view.phone.home.ArticlesList");
		this.add(item);
		
		this.callParent(arguments);
	}
	
});
