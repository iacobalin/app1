Ext.define("LDPA.view.phone.categories.ArticlePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		"Ext.field.Search"
	],
	
	config: {
		
		itemId: "articlePanel",
				
		// custom properties
		mask: null,
								
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
			},
			{
				xtype: "panel",
				itemId: "bottomBar",
				height: 50,
				docked: "bottom",	  
				cls: "bottom-bar",
				layout: {
					type: "hbox",
					pack: "justify",
					align: "stretch"
				},
				items: [
					{
						xtype: "button",
						action: 'view-comments',
						iconCls: 'comments',
						html: '',
						cls: 'comments-button',
						pressedCls: 'pressed',
						flex: 1,
					},
					{
						xtype: "button",
						action: 'rate-article',
						iconCls: 'rate',
						html: '',
						cls: 'rating-button',
						pressedCls: 'pressed',
						flex: 1
					}
				]	
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
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
		
		this.setData(article);
		this.handleOrientationChange();
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
