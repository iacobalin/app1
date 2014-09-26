Ext.define("LDPA.view.phone.categories.CategoriesList", {
    extend: 'Ext.List',
	
	requires: [
		
	],
	
	config: {
		
		id: "categoriesList",
				
		// custom properties
		mainView: null,												// a reference to mainView panel
						
		// css properties
		cls: 'categories-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
						
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		itemTpl: new Ext.XTemplate(
			'<div>',
				'<div style="text-align:center;">',
					'{[this.getImage(values.image)]}',
				'</div>',
				'<p>{name}</p>',
			'</div>',
			{
				getImage: function(image){
					/*var imagesOffline = LDPA.app.imagesOffline;
					var offlineRecord = imagesOffline.findRecord("url",image, 0, false, true, true);
					if (offlineRecord && offlineRecord.get("dataUrl")){
						return '<img src="'+offlineRecord.get("dataUrl")+'" style="max-width: 100px; max-height:60px" />';	
					}
					
					if (LDPA.app.isOnline()){
						if (image)
							return '<img src="http://src.sencha.io/100/60/'+image+'" style="max-width: 100px; max-height:60px" />';	
					}*/
					
					return '<img src="'+image+'" style="max-width: 100px; max-height:60px" />'; 
					
					return "";
				}
			}
		),
		items: [{
			xtype: "panel",
			itemId: "searchBar",
			height: 45,
			docked: "top",	  
			cls: "categories-bar",
			layout: {
				type: "hbox",
				pack: "justify",
				align: "stretch"
			},
			items: [
				{
					xtype: 'panel',
					flex: 1
				},
				{
					xtype: "button",
					action: 'view-actions-panel',
					iconCls: 'menu',
					html: '&nbsp;',
					cls: 'actions-panel-button',
					pressedCls: 'pressed',
					width: 60
				}
			]
		}]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setStore(Ext.create("LDPA.store.Categories"));
	}
});
