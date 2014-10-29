Ext.define("LDPA.view.phone.video.Video", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.phone.video.VideosList',
		'LDPA.view.phone.video.VideoPanel'
	],
	
	config: {
		
		itemId: "videoView",
				
		// custom properties
		mask: null,
		
								
		// css properties
		layout: {
			type: 'card'	
		},
		width: "100%",
		height: "100%",
		zIndex: 101,
						
		// properties
		scrollable: null,
		hidden: true,
		showAnimation: {
			type: "popIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "popOut",
			duration: 400,
			easing: "in"
		},
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var videosList = Ext.create("LDPA.view.phone.video.VideosList");
		this.add(videosList);
		
		var videoPanel = Ext.create("LDPA.view.phone.video.VideoPanel");
		this.add(videoPanel);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
	},
});
