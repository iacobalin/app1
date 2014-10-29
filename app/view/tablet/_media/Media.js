Ext.define("LDPA.view.tablet.media.Media", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.media.MediaCarousel'
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
				xtype: 'titlebar',
				itemId: 'titleBar',
				title: '',
				cls: 'title-bar'
			},
			{
				xtype: 'button',
                action: 'close',
				top: 0,
				left: 0,
				iconCls: 'left-icon',
				html: '&nbsp;',
				cls: 'close-button',
				pressedCls: 'close-button-pressing'
			}
		]
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("addcontent", this.onAddContent, this);
		this.on("addvideo", this.onAddVideo, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('resize', 'handleOrientationChange', this, {buffer: 100 });
		
		// add tap event on close button
		var btn = this.down("button[action=close]");
		btn.on("tap", this.closePanel, this);
	},
	
	
	onAddContent: function(mediaItems, index, articleTitle){
		
		this.setMediaItems(mediaItems);
		
		// set media panel's title
		this.down("#titleBar").setTitle(articleTitle);
		
		// create a simple panel with the image
		if (mediaItems.length == 1){
			var card = Ext.create("LDPA.view.tablet.media.MediaCard",{
				itemId: 'mediaPanel',
				data: {
					src: mediaItems[0].src,
					title: mediaItems[0].title,
					width: this.getImageWidth(),
					height: this.getImageHeight()
				}
			})
			
			this.add(card);
		}
		// create a carousel with a card for each image
		else{
			var carousel = Ext.create("LDPA.view.tablet.media.MediaCarousel",{
				itemId: 'mediaPanel',
			})
			
			for (var i=0; i<mediaItems.length; i++){
				var card = Ext.create("LDPA.view.tablet.media.MediaCard",{
					index: i,
					itemId: "card_"+i,
					data: {
						src: mediaItems[i].src,
						title: mediaItems[i].title,
						width: this.getImageWidth(),
						height: this.getImageHeight()
					}
				})
				carousel.add(card);	
				if (i == index) carousel.setActiveItem(card);
			}
			
			this.add(carousel);
		}
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
		var mediaPanel = this.down("#mediaPanel");
		var videoBox = this.down("#videoBox");
		
		
		if (this.down("#videoBox") != null){
			videoBox.setWidth(this.getVideoWidth());
			videoBox.setHeight(this.getVideoHeight());
		}
		else{
			var mediaItems = this.getMediaItems();
			var imageWidth = this.getImageWidth();
			var imageHeight = this.getImageHeight();
			
			
			if (mediaItems.length == 1){
				var data = mediaPanel.getData();
				data.width = imageWidth;
				data.height = imageHeight;
				
				mediaPanel.setData(data);
			}
			else{
				for (var i=0; i<mediaItems.length; i++){
					var card = mediaPanel.down("#card_"+i);
					var data = card.getData();
					data.width = imageWidth;
					data.height = imageHeight;
					
					card.setData(data);
				}
			}
		}
		
		
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
	
	getImageWidth: function(){
		return Ext.Viewport.getWindowWidth() - 50;
	},
	
	getImageHeight: function(){
		return Ext.Viewport.getWindowHeight() - 125;
	},
	
	
	getVideoWidth: function(){
		var height = Ext.Viewport.getWindowHeight();
		
		if (this.getOrientation() == "landscape"){
			return Ext.Viewport.getWindowHeight() * 4 / 3 - 125;
		}
		else{
			return Ext.Viewport.getWindowWidth() - 125;
		}
		
	},
	
	getVideoHeight: function(){
		var width = Ext.Viewport.getWindowWidth();
		
		if (this.getOrientation() == "landscape"){
			return Ext.Viewport.getWindowHeight() - 125;
		}
		else{
			return Ext.Viewport.getWindowWidth() * 3 / 4 - 125;
		}
	}
});
