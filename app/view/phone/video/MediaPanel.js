Ext.define("LDPA.view.phone.video.MediaPanel", {
    extend: 'Ext.Panel',
	requires: [
		"Ext.Video"
	],
	
	config: {
		
		itemId: "mediaPanel",
		
		// custom properties
		mask: null,												// the custom mask that appears behind this panel
		
		// css properties
		cls: 'media-panel',
		width: '100%',
        height: '100%',
		zIndex: 110,
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
				
		// properties
		modal: false,
		fullscreen: true,
		centered: true,
		items: [
			{
				xtype: "button",
				itemId: "closeBtn",
				action: 'close-media',
				cls: 'close-x',
				pressedCls: 'pressed',
				iconCls: 'close-icon',
				top: 0,
				right: 0,
				height: 50,
				width: 50,
				html: ''
			}
		],
		hidden: true,
		showAnimation: {
			type: "fadeIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "fadeOut",
			duration: 400,
			easing: "in"
		}
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 10 });
		
		this.on("addcontent", this.onAddContent, this);
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
		
		this.callParent(arguments);
	},
	
	
	handleOrientationChange: function(){
		var mediaContainer = this.down("#mediaContainer");
			mediaContainer.setData(mediaContainer.getData());
	},
	
	
	onAddContent: function(options){
		
		if (!this.down("#videoBox")){
		
			var video = Ext.create("Ext.Video", {
				itemId: 'videoBox',
				url: options.videoLink,
				posterUrl: options.videoImage,
				width: options.width,
				height: options.height,
				enableControls : true,
				autoResume: true,
				centered: true,
				listeners: {
					play: function(){
						var poster = this.element.query('div[class=x-video-ghost]')[0];
						Ext.get(poster).setStyle('display', 'none !important');
						var v = this.element.query('video')[0];
						Ext.get(v).setStyle('display', 'block !important');	
						video.play();	
					}
				}
			})
			
			this.add(video);
		}
		else{
			var video = this.down("#videoBox");
		}
		
		video.play();
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy();	
		}, 400);	
	},
		
	onCloseBtnTap: function(){
		this.getMask().fireEvent("close");	
	},
});
