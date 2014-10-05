Ext.define("LDPA.view.phone.video.VideoDetails", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.phone.video.Media',
	],
    
	config: {
        backPanel: null,
		
		isFilled: false,
		
		itemId: 'videoDetails',
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
        cls: 'video-details',
		
		
		tpl: new Ext.XTemplate('<div class="title">{title}</div>',
			'<div class="description">{content}</div>',
			'<div style="width:300px; height:200px; position:relative; margin:0 auto; background: url(\'{[this.getImage(values.featured_image)]}\') center center no-repeat; -webkit-background-size: 100% auto;">',
				'<div id="videoDetailsCover{id}" style="width:100%; height:100%; position:absolute; top:0; background: url(\'resources/images/phone/video_play_overlay.png\') center center no-repeat;"></div>',
			'</div>',
			{
				getImage: function(image){
					var imagesOffline = LDPA.app.imagesOffline;
					var offlineRecord = imagesOffline.findRecord("url",image, 0, false, true, true);
					if (offlineRecord && offlineRecord.get("dataUrl")){
						return offlineRecord.get("dataUrl");
					}
					
					if (LDPA.app.isOnline()){
						if (image)
							return 'http://src.sencha.io/300/'+image;		
					}
					
					return "";
				}
			}
		),
		
		layout: 'fit',
		
		items:[
			{
				xtype: 'titlebar',
				docked: 'top',
				cls: 'top-titlebar',
				title: 'Detalii',
				items: [
					{
						align: 'left',
						ui: 'back',
						text: '&#206;napoi',
						handler: function(){
							var videoDetails = this.up("#videoDetails");
							var videoPanel = this.up("#videoPanel");
							
							videoPanel.animateActiveItem(0, {type: 'slide', direction: 'right'});
						}
					}
				]
			},
			{
				xtype: "panel",
				docked: 'bottom',
				title: '',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'start'
				},
				cls: 'bottom-toolbar',
				items: [
					{
						xtype		: "button",
						text		: "Share",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'facebook4',
						hasDisabled	: false,
						handler		: function(btn){
							var videoDetails = this.up("#videoDetails");
							
							var webUrl = encodeURIComponent(videoDetails.getData().link);
							var title = encodeURIComponent(videoDetails.getData().title);
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", "http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						text		: "Tweet",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'twitter4',
						hasDisabled	: false,
						handler		: function(btn){
							var videoDetails = this.up("#videoDetails");
							
							var webUrl = videoDetails.getData().link;
							//var title = this.getData().title;
							var title = "Citeste+acest+articol:+";
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						itemId		: "videoCommentBtn",
						text		: "0",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'chat4',
						hasDisabled	: false,
						handler		: function(btn){
							var videoDetails = this.up("#videoDetails");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", videoDetails.getData().comment_link);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						itemId		: "videoVoteBtn",
						text		: "0",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'star2',
						hasDisabled	: false,
						handler		: function(btn){
							var videoDetails = this.up("#videoDetails");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								videoDetails.openRatePanel();
							}
						},
					}
				]
			}
		]
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		//this.on("updatedata", this.onUpdateData, this);
		this.on("painted", this.onPainted, this);
		this.on("setactions", this.onSetActions, this);
		this.on("updatedata", this.onUpdateData, this);
	},
	
	
	onPainted: function(){
		
		if (this.getIsFilled() == true) return;
		
		this.fireEvent("setactions");
		
		this.setIsFilled(true);
	},
	
	
	onSetActions: function(){
		if (this.getData() == null) return;
		
		var videoId = this.getData().id;
		
		// add tap action for the cover image of the video
		var cover = this.element.down("#videoDetailsCover"+videoId);
		cover.on("tap", this.playVideo, this);
	},
	
	
	playVideo: function(){
		var videoId = this.getData().id;
		var url = this.getData().video_link;
		var posterUrl = this.getData().featured_image;		
		
		// offline loading
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{
			var panel = Ext.create("LDPA.view.phone.video.Media");
			panel.fireEvent("addvideo", url, posterUrl, videoId);
		
			Ext.Viewport.add(panel);
		
			panel.show('pop');	
		}
	},
	
	
	onUpdateData: function(panel, data){
		var videoVoteBtn = panel.down("#videoVoteBtn");
		var videoCommentBtn = panel.down("#videoCommentBtn");
		
		videoVoteBtn.setText(String(data.ranking));
		videoCommentBtn.setText(String(data.comment_count));
		
		this.fireEvent("setactions");
	},
	
	
	openRatePanel: function(){
		
		this.ratePanel = Ext.Viewport.down("rateview");
		if (this.ratePanel){
			this.ratePanel.destroy();
		}
		
		this.ratePanel = Ext.create('LDPA.view.phone.rate.RateView', {opener: this, postId: this.getData().id, postRanking: this.getData().ranking});
		Ext.Viewport.add(this.ratePanel);
		this.ratePanel.show('pop');
	}
});
