Ext.define("LDPA.view.tablet.home.VideoCard", {
    extend: 'Ext.Panel',
	
	requires: [
		'Ext.Video',
		'Ext.Img'
	],
	
	config: {
		index: 0,					
		carousel: null,
		data: null,
		isFilled: false,
		
		itemId: null,
		styleHtmlContent: true,
		scrollable: null,
        cls: 'video-card',
		
		layout: {
			type: 'vbox',
			pack: 'justify',
			align: 'stretch'
		},
				
		items: [
			{
				xtype: 'component',
				itemId: 'videoBox',
				cls: 'home-video-box',
				flex: 1,
				tpl: new Ext.XTemplate('<div style="-webkit-box-flex:1; position:relative; background: url(\'{image}\') center center no-repeat; -webkit-background-size: 100% auto;">',
					'<div style="width:100%; height:100%; position:absolute; top:0; background: url(\'resources/images/video_play_overlay.png\') center center no-repeat;"></div>',
				'</div>')
			},
			{
				xtype: 'component',
				itemId: 'infoPanel',
				//docked: 'bottom',
                cls: 'home-video-details',
				tpl: new Ext.XTemplate('' +
                    '<div class="video-details-box">',
                        '<div class="video-details-left">',
					        '<div class="label">LEC&#354;II VIDEO</div>',
					        '<div class="title">{title}</div>',
                        '</div>',
                        '<div class="video-details-right">',
					        '<div class="video-statistics">',
                                '<div class="video-statistics-item">{comment_count}</div>',
                                '<div class="video-statistics-item">{ranking}</div>',
                            '</div>',
					        '<div class="video-details-button-box" id="videoDetails{id}"></div>',
                        '</div>',
				    '</div>'
                )
			}
		]
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
		
		var infoPanel = this.down("#infoPanel");
		infoPanel.setData(this.getData());
		
		var videoBox = this.down("#videoBox");
		var videoId = this.getData().id;
		
		videoBox.setData(this.getData());
		videoBox.element.on("tap", this.playVideo, videoBox);
		
		
		var btnDetails = Ext.create("Ext.Button",{
			text: 'DETALII'	,
			renderTo: document.getElementById('videoDetails'+videoId),
			handler: function(){
				this.getParent().fireEvent("showdetails", this.getData());
			},
			scope: this
		});
	},
	
	
	playVideo: function(){
		var videoId = this.getData().id;
		var url = this.getData().video_link;
		var posterUrl = this.getData().image;		
		
		var panel = Ext.create("LDPA.view.tablet.media.Media");
		panel.fireEvent("addvideo", url, posterUrl, videoId);
		
		Ext.Viewport.add(panel);
		
		panel.show('pop');
		
		
		//Ext.defer(function(){
			
		//}, 2000, this);
		
		// Android device
		// open a new link
		/*var a = document.createElement("a");
		a.setAttribute("href", this.getData().video_link);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);*/
		
		
				
		/*
		// iOs device
		var video = Ext.create('Ext.Video',{
			url: this.getData().video_link,
			posterUrl: 'resources/images/video_play_overlay.png), url('+'http://src.sencha.io/300/'+this.getData().image,
			//url: "http://vid2.stirileprotv.ro/2012/02/02/60547326-2.mp4",
			//posterUrl: this.getData().image,
			width: 600,
			height: 300
		});
		Ext.Viewport.add(video);
		video.play();
		console.log(video)*/
	}
});
