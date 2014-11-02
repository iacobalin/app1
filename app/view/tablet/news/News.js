Ext.define("LDPA.view.tablet.news.News", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.news.NewsPanel',
		'LDPA.view.tablet.news.NewsList'
	],
	
	config: {
		
		itemId: "newsView",
				
		// custom properties
		mask: null,
		
								
		// css properties
		layout: {
			type: 'fit'	
		},
		cls: "news-container",
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
				title: "Nout&#259;&#355;i",
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
				itemId: "newsBox",
				cls: "news-box",
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
		
		var newsBox = this.down("#newsBox");
		
		var newsPanel = Ext.create("LDPA.view.tablet.news.NewsPanel");
		newsBox.add(newsPanel);
		
		var newsList = Ext.create("LDPA.view.tablet.news.NewsList");
		newsBox.add(newsList);
		
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
