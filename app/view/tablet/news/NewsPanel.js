Ext.define("LDPA.view.tablet.news.NewsPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		"LDPA.view.tablet.news.NewsBottomBar"
	],
	
	config: {
		
		itemId: "newsPanel",
				
		// custom properties
		mask: null,
		scrolling: false,									// a flag indicating if the content of the card is scrolling
		bottomBar: null,									// a reference of the bottom bar
		bottomButtons: null,								// a reference of the bottom buttons (comments and rate)
								
		// css properties
		cls: 'news-panel',
		width: '100%',
		height: '100%',
						
		// properties
		layout: {
			type: "vbox",
			pack: "justify",
			align: "stretch"
		},
		scrollable: null,
		items: [
			{
				xtype: "panel",
				itemId: "articleInner",
				flex: 1,
				tpl: new Ext.XTemplate(
					'<h1>{title}</h1>'+           
					'<div class="content">',
						'{content}',
					'</div>'
				),
				scrollable:{
					direction: 'vertical',
					indicators: false,
				},
				items: [
					{
						xtype: "panel",
						itemId: "topBar",
						height: 65,
						docked: "top",	  
						cls: "top-bar",
						zIndex: 100,
						layout: {
							type: "hbox",
							pack: "end",
							align: "stretch"
						},
						items: [
							{
								xtype: "button",
								action: 'share-facebook',
								iconCls: 'facebook',
								html: '&nbsp;',
								cls: 'share-facebook-button',
								pressedCls: 'pressed',
								handler: function(btn){
									var articleInner = btn.up("#articleInner");
									var webUrl = encodeURIComponent(articleInner.getData().link);
									var title = encodeURIComponent(articleInner.getData().title);
									
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
								html: '&nbsp;',
								cls: 'share-twitter-button',
								pressedCls: 'pressed',
								handler: function(btn){
									var articleInner = btn.up("#articleInner");
									
									var webUrl = encodeURIComponent(articleInner.getData().link);
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
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var bottomBar = Ext.create("LDPA.view.tablet.news.NewsBottomBar");
		this.add(bottomBar);
		this.setBottomBar(bottomBar);
		
		var bottomButtons = bottomBar.down("#buttons");
		this.setBottomButtons(bottomButtons);
		
		var articleInnerPanel = this.down("#articleInner");
		var scroller = articleInnerPanel.getScrollable().getScroller();
		scroller.on("scroll", this.onScrollableChange, this);
		
		articleInnerPanel.element.on("touchstart", this.onTouchStart, this);
		articleInnerPanel.element.on("touchend", this.onTouchEnd, this);
		articleInnerPanel.element.on("tap", this.onTap, this);
		
		this.on("painted", this.onPainted, this);
		this.on("addcontent", this.onAddContent, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onPainted: function(){
		var articleInner = this.down("#articleInner");
		if (articleInner.getData() == null){
			
			var article = this.up("#newsView").down("#newsList").getStore().getAt(0).getData();
			
			// create mask
			var mask = Ext.create("LDPA.view.MainMask", {
				spinner: true,
				disabled: true,
				zIndex: 120,
				closeFn: function(){
					
				}
			});
			
			Ext.Viewport.add(mask);
			mask.show();
			this.setMask(mask);
			
			newsController.showArticle(article.articleId);
		}
	},
	
	
	onAddContent: function(article){
		
		// update bottom bar
		var bottomBar = this.getBottomBar();
		bottomBar.fireEvent("updatedata", {
			ratings: article.ranking,
			comment_count: article.comment_count,
			articleId: article.id
		});
		bottomBar.fireEvent("closemenu");
		
		var articleInnerPanel = this.down("#articleInner");
		articleInnerPanel.setData(article);
		
		this.handleOrientationChange();
	},
	
	
	onTouchStart: function(){
		this.setScrolling(true);
	},
	
	onTouchEnd: function(){
		this.setScrolling(false);
	},
	
	onTap: function(){
		var bottomButtons = this.getBottomButtons(); 
		bottomButtons.fireEvent("showbuttons");
	},
	
	onScrollableChange: function(scroller, scrollX, scrollY){
		var scrolling = this.getScrolling();
		
		if (scrolling){
			var bottomButtons = this.getBottomButtons(); 
			
			this.deltaY = (this.lastScrollY) ? scrollY - this.lastScrollY : 0;
			
			// scroll down
			if (this.deltaY > 0){
				bottomButtons.fireEvent("hidebuttons");
			}
			// scroll up
			else if (this.deltaY < 0){
				bottomButtons.fireEvent("showbuttons");
			}
			
			this.lastScrollY = scrollY;
		}
	},
	
	
	handleOrientationChange: function(){
		var images = this.element.query("img");
		var padding = 50;
		
		// change images max width according with the Viewport width
		for (var i=0; i<images.length; i++){
			images[i].style.maxWidth = (Ext.Viewport.getWindowWidth() - 310 - padding) + "px";
		}
	}
});
