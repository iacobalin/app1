Ext.define("LDPA.view.phone.categories.ArticlePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		"LDPA.view.phone.categories.ArticleBottomBar"
	],
	
	config: {
		
		itemId: "articlePanel",
				
		// custom properties
		mask: null,
		scrolling: false,									// a flag indicating if the content of the card is scrolling
		bottomBar: null,									// a reference of the bottom bar
		fromSearch: false,									// a flag indicating if this article is displayed from a search request
								
		// css properties
		cls: 'article-panel',
						
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false,
		},
		tpl: new Ext.XTemplate(
			'<h1>{title}</h1>'+           
            '<div class="content">',
				'{content}',
			'</div>'
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
						html: "",
						cls: 'back-button',
						pressedCls: 'pressed',
						iconCls: 'back',
					},
					{
						xtype: "button",
						action: 'share-facebook',
						iconCls: 'facebook',
						html: '&nbsp;',
						cls: 'share-facebook-button',
						pressedCls: 'pressed',
						handler: function(btn){
							var articlePanel = btn.up("#articlePanel");
							
							var webUrl = encodeURIComponent(articlePanel.getData().link);
							var title = encodeURIComponent(articlePanel.getData().title);
							
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
							var articlePanel = btn.up("#articlePanel");
							
							var webUrl = encodeURIComponent(articlePanel.getData().link);
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
		
		var bottomBar = Ext.create("LDPA.view.phone.categories.ArticleBottomBar");
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
		
		var backBtn = this.down("#backBtn"); 
		
		if (!this.getFromSearch()){
			var category = this.getParent().down("#categoryBox").getData();
			backBtn.setHtml(category.name);
		}
		else{
			backBtn.setHtml("Inapoi");	
		}
		
		// update bottom bar
		var bottomBar = this.getBottomBar();
		bottomBar.fireEvent("updatedata", {
			ratings: article.ranking,
			comment_count: article.comment_count	
		});
		
		this.setData(article);
		this.handleOrientationChange();
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
