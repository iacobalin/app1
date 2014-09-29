Ext.define("LDPA.view.phone.categories.CategoryPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.phone.categories.ArticlesList',
		'LDPA.view.phone.CloseButton',
	],
	
	config: {
		
		itemId: "categoryPanel",
				
		// custom properties
		scrolling: false,								// a flag indicating if the content of the card is scrolling
		closeBtn: null,									// a reference of the close button
								
		// css properties
		cls: 'category-panel',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
						
		// properties
		scrollable: {
			direction: 'vertical',
			indicators: false	
		},
		items: [
			{
				xtype: "panel",
				itemId: "categoryBox",
				tpl: new Ext.XTemplate(
					'<div class="category-image" style="width: 100%; height: {[ this.getImageHeight(); ]}px;" >',
						'<div class="vbox container">',
							'<div>',
								'<div class="image-container" style="background-image: url(\'{image}\');"></div>',
							'</div>',
							'<div class="headline">',
								'<h1>{name}</h1>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="content">',
						'<p>{description}</p>',
					'</div>',
					{
						getImageHeight: function(){
							return Math.round(Ext.Viewport.getWindowWidth() * 3/4);
						}
					}
				),
				scrollable: null
			}
		]
	},
	
	
	initialize: function(){
		
		var articlesList = Ext.create("LDPA.view.phone.categories.ArticlesList");
		this.add(articlesList);
		
		var closeBtn = Ext.create("LDPA.view.phone.CloseButton");	
		this.add(closeBtn);
		this.setCloseBtn(closeBtn);
		closeBtn.on("tap", this.onClosePanel, this);
		
		this.on("addcontent", this.onAddContent, this);
		
		var scroller = this.getScrollable().getScroller();
		scroller.on("scroll", this.onScrollableChange, this);
		
		this.element.on("touchstart", this.onTouchStart, this);
		this.element.on("touchend", this.onTouchEnd, this);
		this.element.on("tap", this.onTap, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},

	
	onAddContent: function(category){
		
		var categoryBox = this.down("#categoryBox");
		categoryBox.setData(category);
		
		var articlesList = this.down("#articlesList");
		articlesList.getStore().add(category.posts);
	},
	
	
	onTouchStart: function(){
		this.setScrolling(true);
	},
	
	onTouchEnd: function(){
		this.setScrolling(false);
	},
	
	onTap: function(){
		var closeBtn = this.getCloseBtn(); 
		closeBtn.fireEvent("showbtn");
	},
	
	onScrollableChange: function(scroller, scrollX, scrollY){
		var scrolling = this.getScrolling();
		
		if (scrolling){
			var closeBtn = this.getCloseBtn(); 
			
			this.deltaY = (this.lastScrollY) ? scrollY - this.lastScrollY : 0;
			
			// scroll down
			if (this.deltaY > 0){
				closeBtn.fireEvent("hidebtn");
			}
			// scroll up
			else if (this.deltaY < 0){
				closeBtn.fireEvent("showbtn");
			}
			
			this.lastScrollY = scrollY;
		}
	},
	
	
	handleOrientationChange: function(){
		var categoryBox = this.down("#categoryBox");
		categoryBox.setData(category);
	},
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");	
	}
});
