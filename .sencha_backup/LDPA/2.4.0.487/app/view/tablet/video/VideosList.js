Ext.define("LDPA.view.tablet.video.VideosList", {
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
		height: '100%',
		docked: "left",
								
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		variableHeights: true,
		itemTpl: new Ext.XTemplate(
			'<div class="img-container vbox" style="height: {[ this.getItemHeight(); ]}px; background-image: url({[this.getImage(values)]}); ">',
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
					return (this.getOrientation() == "landscape") ? 190 : 135
				},
				getImage: function(data){
					var image = data.featured_image || data.image;
					
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
		)
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Videos"));
		
		this.on("painted", this.onPainted, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},
	
	onPainted: function(){
		//this.element.query(".x-container")[0].style.height = (Ext.Viewport.getWindowHeight() - 50) + "px";
	},
	
	handleOrientationChange: function(){
		this.refresh();
	}
});
