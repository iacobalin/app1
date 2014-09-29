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
		bottomBar: null,									// a reference of the close button
								
		// css properties
		cls: 'article-panel',
						
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false,
		},
		tpl: new Ext.XTemplate(
			'<h1>{title}</h1>'+           
            '<div class="content>',
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
					},
					{
						xtype: "button",
						action: 'share-facebook',
						iconCls: 'facebook',
						html: '&nbsp;',
						cls: 'share-facebook-button',
						pressedCls: 'pressed',
					},
					{
						xtype: "button",
						action: 'share-twitter',
						iconCls: 'twitter',
						html: '&nbsp;',
						cls: 'share-twitter-button',
						pressedCls: 'pressed',
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
		
		this.on("updatedata", this.onUpdateData, this);
		this.on("addcontent", this.onAddContent, this);
		
		var backBtn = this.down("#backBtn"); 
		backBtn.on("tap", this.onClosePanel, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onAddContent: function(article){
		
		var backBtn = this.down("#backBtn"); 
		backBtn.setHtml(article.category);
		
		var bottomBar = this.getBottomBar();
		var commentsBtn = bottomBar.down("#commentsBtn").setBadgeText(article.comment_count);
		var rateBtn = bottomBar.down("#rateBtn").setBadgeText(article.ranking);
		
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
	
	onUpdateData: function(data){
		/*var articleVoteBtn = panel.down("#articleVoteBtn");
		var articleCommentBtn = panel.down("#articleCommentBtn");
		
		articleVoteBtn.setText(String(data.ranking));
		articleCommentBtn.setText(String(data.comment_count));*/
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
