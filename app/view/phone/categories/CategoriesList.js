Ext.define("LDPA.view.phone.categories.CategoriesList", {
    extend: 'Ext.List',
	
	requires: [
		"Ext.field.Search"
	],
	
	config: {
		
		id: "categoriesList",
				
		// custom properties
								
		// css properties
		cls: 'categories-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
						
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false,
			directionLock: true
		},
		inline: {
			wrap: false	
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		itemTpl: new Ext.XTemplate(
			'<div style="{[ this.getItemSize(); ]}" class="categories-box">',
				'<div class="img" style="background-image: url();">',
					'{[this.getImage(values.image)]}',
				'</div>',
				'<p>{name}</p>',
			'</div>',
			{
				spacer: 20,
				minPadding: 20,
				minWidth: 130,
				maxWidth: 170,
				getItemSize: function(){
					var vieportWidth = Ext.Viewport.getWindowWidth();
					
					// items per row
					var ln = Math.floor((vieportWidth - 2*this.minPadding) / this.minWidth);
					var itemWidth = Math.round((vieportWidth - 2*this.minPadding - (ln-1)*this.spacer) / ln);
					itemWidth = Math.max(Math.min(itemWidth, this.maxWidth), this.minWidth);
					
					var itemHeight = Math.floor(3/4 * itemWidth);
					console.log(ln, itemWidth, itemHeight)
					return "width: "+itemWidth+"px; height: "+itemHeight+"px;";
				},
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
					xtype: 'searchfield',
					placeHolder: 'Caut\u0103...',
					cls: 'search-field',
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
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	handleOrientationChange: function(){
		this.refresh();	
	}
});
