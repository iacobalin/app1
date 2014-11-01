Ext.define("LDPA.view.tablet.video.Video", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.video.VideoPanel',
		'LDPA.view.tablet.video.VideosList'
	],
	
	config: {
		
		itemId: "videoView",
				
		// custom properties
		mask: null,
		
								
		// css properties
		layout: {
			type: 'fit'	
		},
		cls: "video-container",
		width: "100%",
		height: "100%",
		zIndex: 101,
						
		// properties
		scrollable: null,
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
			},
			{
				xtype: 'panel',
				itemId: "videoBox",
				cls: "video-box",
				layout: {
					type: "hbox",
					pack: "justify",
					align: "stretch"	
				},
				flex: 1
			}
		],
		hidden: true,
		showAnimation: {
			type: "slideIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "slideOut",
			duration: 400,
			easing: "in"
		},
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var videoBox = this.down("#videoBox");
		
		var videoPanel = Ext.create("LDPA.view.tablet.video.VideoPanel");
		videoBox.add(videoPanel);
		
		var videoList = Ext.create("LDPA.view.tablet.video.VideosList");
		videoBox.add(videoList);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onClosePanel, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
	}
});
