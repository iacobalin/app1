Ext.define("LDPA.view.phone.video.VideoPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		"LDPA.view.phone.video.VideoBottomBar",
		"LDPA.view.phone.video.MediaPanel"
	],
	
	config: {
		
		itemId: "videoPanel",
				
		// custom properties
		mask: null,
		scrolling: false,									// a flag indicating if the content of the card is scrolling
		bottomBar: null,									// a reference of the bottom bar
								
		// css properties
		cls: 'video-panel',
						
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false,
		},
		tpl: new Ext.XTemplate(
			'<h1>{title}</h1>'+           
            '<div class="content">',
				'{content}',
			'</div>',
			'<div class="article-media" data-video-image="{featured_image}" data-video-link="{video_link}" style="width: {[ this.getImgWidth(); ]}px; height: {[ this.getImgHeight(); ]}px; position:relative; margin:0 auto; background: url(\'{[this.getImage(values.featured_image)]}\') center center no-repeat;">',
				'<div class="overlay" style="width:100%; height:100%; position:absolute; top:0;"></div>',
			'</div>',
			{
				imageWidth: 441,
				imageHeight: 326,
				padding: 25,
				getImgWidth: function(){
					
					var width = Ext.Viewport.getWindowWidth() - 2*this.padding;
					return Math.floor(width);
				},
				getImgHeight: function(){
					
					var height = this.getImgWidth() * this.imageHeight / this.imageWidth;
					return Math.floor(height);
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
				xtype: "panel",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				layout: {
					type: "hbox",
					pack: "justify",
					align: "stretch"
				},
				items: [
					{
						xtype: 'button',
						itemId: "backBtn",
						html: "Lec&#355;ii video",
						cls: 'back-button',
						pressedCls: 'pressed',
						iconCls: 'back',
					},
					{
						xtype: "button",
						action: 'share-facebook',
						iconCls: 'facebook',
						html: '',
						cls: 'share-facebook-button',
						pressedCls: 'pressed',
						handler: function(btn){
							var videoPanel = btn.up("#videoPanel");
							
							var webUrl = encodeURIComponent(videoPanel.getData().link);
							var title = encodeURIComponent(videoPanel.getData().title);
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								window.open("http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title, '_system');
							}
						},
						scope: this
					},
					{
						xtype: "button",
						action: 'share-twitter',
						iconCls: 'twitter',
						html: '',
						cls: 'share-twitter-button',
						pressedCls: 'pressed',
						handler: function(btn){
							var videoPanel = btn.up("#videoPanel");
							
							var webUrl = encodeURIComponent(videoPanel.getData().link);
							var title = "Citeste+acest+articol:+";
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								window.open("http://www.twitter.com/?status="+title+"+"+webUrl, '_system');
							}
						},
						scope: this
					}
				]
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var bottomBar = Ext.create("LDPA.view.phone.video.VideoBottomBar");
		this.add(bottomBar);
		this.setBottomBar(bottomBar);
		
		var scroller = this.getScrollable().getScroller();
		scroller.on("scroll", this.onScrollableChange, this);
		
		this.element.on("touchstart", this.onTouchStart, this);
		this.element.on("touchend", this.onTouchEnd, this);
		this.element.on("tap", this.onTap, this);
		
		this.on("addcontent", this.onAddContent, this);
		
		var backBtn = this.down("#backBtn"); 
		backBtn.on("tap", this.onClosePanel, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onAddContent: function(article){
		
		// update bottom bar
		var bottomBar = this.getBottomBar();
		bottomBar.fireEvent("updatedata", {
			ratings: article.ranking,
			comment_count: article.comment_count	
		});
		
		this.setData(article);
		this.handleOrientationChange();
		
		// attach tap event for each media items on this panel
		var mediaItems = this.element.query(".article-media");
		for (var i=0; i<mediaItems.length; i++){
			var item = Ext.get(mediaItems[i]);
			
			item.on("tap", this.onMediaItemTap, this);
		}
	},
	
	
	onTouchStart: function(){
		this.setScrolling(true);
	},
	
	onTouchEnd: function(){
		this.setScrolling(false);
	},
	
	onTap: function(){
		var bottomBar = this.getBottomBar(); 
		bottomBar.fireEvent("showbar");
	},
	
	onScrollableChange: function(scroller, scrollX, scrollY){
		var scrolling = this.getScrolling();
		
		if (scrolling){
			var bottomBar = this.getBottomBar(); 
			
			this.deltaY = (this.lastScrollY) ? scrollY - this.lastScrollY : 0;
			
			// scroll down
			if (this.deltaY > 0){
				bottomBar.fireEvent("hidebar");
			}
			// scroll up
			else if (this.deltaY < 0){
				bottomBar.fireEvent("showbar");
			}
			
			this.lastScrollY = scrollY;
		}
	},
	
	onMediaItemTap: function(event, item){
		var video = Ext.get(item).up(".article-media").dom;
		var videoLink = video.getAttribute("data-video-link");
		var videoImage = video.getAttribute("data-video-image");
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: false,
			closeFn: function(){
				mediaPanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create media panel
		var mediaPanel = Ext.create("LDPA.view.phone.video.MediaPanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(mediaPanel);
		
		mask.show();
		
		// add content
		mediaPanel.fireEvent("addcontent", {
			videoLink: videoLink,
			videoImage: videoImage,
			width: parseInt(video.style.width),
			height: parseInt(video.style.height)
		});
		
		// open panel
		mediaPanel.fireEvent("openpanel");
	},
	
	
	onClosePanel: function(){
		this.getParent().animateActiveItem(0, {direction: "right", type: "slide"})	
	},
	
	
	handleOrientationChange: function(){
		var images = this.element.query("img");
		var padding = 50;
		
		// change images max width according with the Viewport width
		for (var i=0; i<images.length; i++){
			images[i].style.maxWidth = (Ext.Viewport.getWindowWidth() - padding) + "px";
		}
	}
});
