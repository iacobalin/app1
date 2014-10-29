Ext.define("LDPA.view.tablet.categories.CategoriesList", {
    extend: 'Ext.List',
	
	requires: [
		"Ext.field.Search"
	],
	
	config: {
		
		id: "categoriesList",
				
		// custom properties
		scrolling: false,
								
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
			'<div style="{[ this.getItemSize(values.sequence-1); ]} padding-top: 5px; padding-bottom: 5px;">',
				'<div class="categories-box vbox" style="width: 100%; height: 100%; padding-top: 10px;">',
					'<div class="img flex" style="background-image: url({[this.getImage(values.image)]}); "></div>',
					'<div class="title">{name}</div>',
				'</div>',
			'</div>',
			{
				spacer: 15,
				minPadding: 80,
				minWidth: 200,
				maxWidth: 280,
				getItemSize: function(index){
					var vieportWidth = Ext.Viewport.getWindowWidth();
					
					// items per row
					var ln = Math.floor((vieportWidth - 2*this.minPadding) / this.minWidth);
					var itemWidth = Math.round((vieportWidth - 2*this.minPadding) / ln);
					itemWidth = Math.max(Math.min(itemWidth, this.maxWidth), this.minWidth);
					
					var itemHeight = Math.floor(5/6 * itemWidth);
					var generalPadding = Math.floor((vieportWidth - ln * itemWidth)/2);
					
					var extraWidth = 0;
					
					if ((index % ln) == 0){
						var paddingLeft = generalPadding + this.spacer/2;
						extraWidth = generalPadding;
					}
					else{
						var paddingLeft = this.spacer/2;	
					}
					
					if ((index+1 % ln) == 0){
						var paddingRight = generalPadding + this.spacer/2;	
						extraWidth = generalPadding;	
					}
					else{
						var paddingRight = this.spacer/2;
					}
					
					return "width: "+(itemWidth+extraWidth)+"px; height: "+itemHeight+"px; padding-left: "+paddingLeft+"px; padding-right: "+paddingRight+"px;";
				},
				getImage: function(image){
					if (LDPA.app.isOnline()){
						return image;
					}
					else{
						var imagesOffline = mainController.imagesOfflineStore;
						var offlineRecord = imagesOffline.findRecord("url", image, 0, false, true, true);
						if (offlineRecord && offlineRecord.get("dataUrl")){
							return offlineRecord.get("dataUrl");	
						}
					}
				}
			}
		),
		items: [
			{
				xtype: "panel",
				itemId: "topBar",
				height: 60,
				docked: "top",	  
				cls: "categories-bar",
				tpl: new Ext.XTemplate(
					'<div style="width: 100%;">',
						'<div class="inner" style="width: {width}px;"><h1>Solu&#355;ii de prim ajutor</h1></div>',
					'</div>'
				),
				data: {
					width: Ext.Viewport.getWindowWidth()-160	
				},
				items: [
					{
						xtype: "button",
						action: 'view-actions-panel',
						iconCls: 'menu',
						html: '',
						cls: 'actions-panel-button',
						pressedCls: 'pressed',
						width: 60,
						height: 60,
						top: 0,
						right: 0
					}
				]
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setStore(Ext.create("LDPA.store.Categories"));
		
		var scroller = this.getScrollable().getScroller();
		scroller.on("scroll", this.onScrollableChange, this);
		
		this.element.on("touchstart", this.onTouchStart, this);
		this.element.on("touchend", this.onTouchEnd, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onTouchStart: function(){
		this.setScrolling(true);
	},
	
	onTouchEnd: function(){
		this.setScrolling(false);
		mainController.getMainView().setDragBlocked(false);
	},
	
	onScrollableChange: function(scroller, scrollX, scrollY){
		var scrolling = this.getScrolling();
		
		if (scrolling){
			mainController.getMainView().setDragBlocked(true);
		}
	},
	
	handleOrientationChange: function(){
		this.refresh();	
		
		var topBar = this.down("#topBar");
		topBar.setData({
			width: Ext.Viewport.getWindowWidth()-160
		});
	}
});
