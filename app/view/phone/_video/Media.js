Ext.define("LDPA.view.phone.video.Media", {
    extend: 'Ext.Panel',
	
	requires: [
		'Ext.Video'
	],
	
	config: {
		
		mediaItems: null,			// an array with info about images
		
		itemId: 'mediaView',
		margin: 0,
		padding: 0,
		cls: 'media-panel',
		floatingCls: '',
		modal: true,
		fullscreen: true,
		centered: true,
		zIndex: 100,
		
		layout: 'fit',
		
		items: [
			{
				xtype: 'button',
                action: 'close',
				top: 0,
				left: 0,
				iconCls: 'left-icon',
				html: '&nbsp;',
				cls: 'close-button',
				pressedCls: 'close-button-pressing',
				zIndex: 200,
			}
		]
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("addvideo", this.onAddVideo, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('resize', 'handleOrientationChange', this, {buffer: 100 });
		
		// add tap event on close button
		var btn = this.down("button[action=close]");
		btn.on("tap", this.closePanel, this);
	},
	
	
	onAddVideo: function(videoUrl, posterUrl, videoId){
		var video = Ext.create("Ext.Video", {
			itemId: 'videoBox',
			url: videoUrl,
			posterUrl: posterUrl,
			width: this.getVideoWidth(),
			height: this.getVideoHeight(),
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
		video.play();
	},
	
	
	handleOrientationChange: function(){
		var videoBox = this.down("#videoBox");
		
		videoBox.setWidth(this.getVideoWidth());
		videoBox.setHeight(this.getVideoHeight());
	},
	
	
	closePanel: function(){
		this.hide("popOut");
		
		Ext.defer(function(){
			this.destroy();
		}, 200, this);
	},
	
	
	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
	},
	
	getVideoWidth: function(){
		var height = Ext.Viewport.getWindowHeight();
		
		if (this.getOrientation() == "landscape"){
			return Ext.Viewport.getWindowHeight() * 4 / 3 - 25;
		}
		else{
			return Ext.Viewport.getWindowWidth() - 25;
		}
		
	},
	
	getVideoHeight: function(){
		var width = Ext.Viewport.getWindowWidth();
		
		if (this.getOrientation() == "landscape"){
			return Ext.Viewport.getWindowHeight() - 25;
		}
		else{
			return Ext.Viewport.getWindowWidth() * 3 / 4 - 25;
		}
	}
});
