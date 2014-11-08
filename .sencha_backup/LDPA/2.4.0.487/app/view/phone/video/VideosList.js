Ext.define("LDPA.view.phone.video.VideosList", {
    extend: 'Ext.dataview.DataView',
	
	requires: [
		"LDPA.store.Videos"
	],
	
	config: {
		
		itemId: "videosList",
		name: "videosList",
				
		// custom properties
										
		// css properties
		cls: 'videos-list',
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
			'<div class="img-container vbox" style="height: {[ this.getItemHeight(); ]}px; background-image: url({[this.getImage(values.featured_image)]}); ">',
				'<div class="gradient-bg vbox">',
					'<h1>{title}</h1>',
					'<div class="stats hbox">',
						'<div class="comments"><div class="icon"></div>{comment_count}</div>',
						'<div class="ranking"><div class="icon"></div>{ranking}</div>',
					'</div>',
				'<div>',
			'</div>',
			{
				getItemHeight: function(){
					return (this.getOrientation() == "landscape") ? 320 : 200
				},
				getImage: function(image){
					if (mainController.isOnline()){
						return image;
					}
					else{
						var imagesOffline = mainController.imagesOfflineStore;
						var offlineRecord = imagesOffline.findRecord("url", image, 0, false, true, true);
						if (offlineRecord && offlineRecord.get("dataUrl")){
							return offlineRecord.get("dataUrl");	
						}
					}
				},
				getOrientation: function(){
					if (!Ext.os.is.Android){
						return 	Ext.Viewport.getOrientation();
					}
					
					return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
				}
			}
		),
		
		items: [
			{
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "Lec&#355;ii video",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			}
		]
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Videos"));
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onClosePanel, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");
	},
	
	handleOrientationChange: function(){
		this.refresh();
	}
});
