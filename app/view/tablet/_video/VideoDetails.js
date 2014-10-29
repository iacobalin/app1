Ext.define("LDPA.view.tablet.video.VideoDetails", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.rate.RatePanel'
	],
	
	config: {
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
			'<div style="width:100%; height:400px; position:relative; background: url(\'{image}\') center center no-repeat; -webkit-background-size: 100% auto;">',
				'<div id="videoDetailsCover{id}" style="width:100%; height:100%; position:absolute; top:0; background: url(\'resources/images/video_play_overlay.png\') center center no-repeat;"></div>',
			'</div>',
			'<div class="bar">',
				'<div class="comments-button-box" id="videoCommentsBtn{id}"></div>',
				'<div class="facebook-button-box" id="videoShareBtn{id}"></div>',
				'<div class="twitter-button-box" id="videoTweetBtn{id}"></div>',
				'<div class="rating-button-box" id="videoRateBtn{id}"></div>',
			'</div>'
		),

        margin: 0,
        padding: 0

    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("painted", this.onPainted, this);
		this.on("setactions", this.onSetActions, this);
	},
	
	
	onPainted: function(){
		
		if (this.getIsFilled() == true) return;
		
		this.fireEvent("setactions");
		
		this.setIsFilled(true);
	},
	
	
	onSetActions: function(){
		if (this.getData() == null) return;
		
		var videoId = this.getData().id;
		var noComments = this.getData().comment_count;
		
		// add tap action for the cover image of the video
		var cover = this.element.down("#videoDetailsCover"+videoId);
		cover.on("tap", this.playVideo, this);
		
		
		// add comments button
		var btnComments = Ext.create("Ext.Button",{
			tpl: new Ext.XTemplate(
				'{[this.getText(values.comment_count)]}',
				{
					getText: function(noComments){
						if (noComments == 0){
							return "Fii primul care comenteaz&#259; aceast&#259; lec&#355;ie video"	;
						}
						else{
							return "Vezi comentarii ("+noComments+")";
						}
					}
				}
			),
			renderTo: document.getElementById('videoCommentsBtn'+videoId),
			name: 'videoCommentsBtn',
			itemId: 'videoCommentsBtn',
            iconCls: 'chat4',
            cls: "comments-button",
            pressedCls: "comments-button-pressed"
		});
		btnComments.setData({comment_count: noComments});
		
		
		// add share on facebook button
		var btnShare = Ext.create("Ext.Button",{
			html: 'Share',
			renderTo: document.getElementById('videoShareBtn'+videoId),
			name: 'videoShareBtn',
			itemId: 'videoShareBtn',
            iconCls: 'facebook',
            cls: "share-button",
            pressedCls: "share-button-pressed"
		});
		
		
		// add tweet button
		var btnTweet = Ext.create("Ext.Button",{
			html: 'Tweet',
			renderTo: document.getElementById('videoTweetBtn'+videoId),
			name: 'videoTweetBtn',
			itemId: 'videoTweetBtn',
            iconCls: 'tweet',
            cls: "tweet-button",
            pressedCls: "tweet-button-pressed"
		});
		
		
		// add rate button
		var btnRate = Ext.create("Ext.Button",{
			tpl: new Ext.XTemplate(
				'<div style="background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#59c5fc), color-stop({[this.getBackgroundSize(values.rate)]}, #59c5fc), color-stop({[this.getBackgroundSize(values.rate)]}, #B6B6B6), to(#B6B6B6));" class="star"></div>' +
                '<div class="rating">{rate}</div>',
                {
                    getBackgroundSize: function(rate){
                        return rate/5;
                    }
                }
			),
			renderTo: document.getElementById('videoRateBtn'+videoId),
			name: 'videoRateBtn',
			itemId: 'videoRateBtn',
            cls: "rating-button",
            pressedCls: "rating-button-pressed"
		});
		btnRate.setData({rate: this.getData().ranking});
	},
	
	playVideo: function(){
		var videoId = this.getData().id;
		var url = this.getData().video_link;
		var posterUrl = this.getData().image;		
		
		var panel = Ext.create("LDPA.view.tablet.media.Media");
		panel.fireEvent("addvideo", url, posterUrl, videoId);
		
		Ext.Viewport.add(panel);
		
		panel.show('pop');
		
		
		// iOs device
		/*var video = Ext.create('Ext.Video',{
			//url: this.getData().video_link,
			//posterUrl: 'resources/images/video_play_overlay.png), url('+'http://src.sencha.io/300/'+this.getData().image,
			url: "http://vid2.stirileprotv.ro/2012/02/02/60547326-2.mp4",
			posterUrl: this.getData().image,
		});
		videoBox.add(video);*/
	}
});
