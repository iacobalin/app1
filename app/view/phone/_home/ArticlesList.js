Ext.define("LDPA.view.phone.home.ArticlesList", {
    extend: 'Ext.Panel',
	    
	config: {
        itemId: 'categoryArticlesList',
		
		scrollable: null,
		
		tpl: new Ext.XTemplate(
            '<tpl for=".">',
				'<article class="article" data-article-id="{articleId}">',
					'<div class="title">{title}</div>',
					'<div class="details">',
						'<div class="comments">',
							'<div class="comments-icon"></div>',
							'<div class="comments-number">{comment_count}</div>',
						'</div>',
						'<div class="note">',
							'<div class="note-icon"></div>',
							'<div class="note-number">{ranking}</div>',
						'</div>',
					'</div>',
				'</article>',
			'</tpl>'),
		        
		cls: "articles-list",
        
		pressedCls: "item-pressed",
        selectedCls: 'item-selected',
		
		pressedTimeout: null		// a delay used for changing the class of the pressed item 
	},
	
	
	initialize: function(){
		
		this.on('updatedata', this.onUpdateData, this);
		this.on('setactions', this.onSetActions, this);
		
		this.callParent(arguments);
	},
	
	
	onUpdateData: function(){
		this.fireEvent("setactions");
	},
		
	onSetActions: function(){
		
		// attach tap event for each article items
		var articleItems = this.element.query("article[class^=article]");
		
		for (var k=0; k<articleItems.length; k++){
			var articleItem = Ext.get(articleItems[k]);
			articleItem.on("tap", this.onArticleItemTap, this);
			articleItem.on("touchstart", this.onArticleItemTouchStart, this);
			articleItem.on("touchend", this.onArticleItemTouchMove, this);
		}
	},
	
	onArticleItemTap: function(event, item){
		
		var articleItem = Ext.get(item).hasCls("article") ? Ext.get(item) : Ext.get(item).up("article[class^=article]");
		var articleId = articleItem.getAttribute("data-article-id");
		
		var articleDetails = this.up("#homePanel").child("#articleDetails");
		articleDetails.setBackPanel(this.getParent());
		
		this.fireEvent("showpost", articleId);
	},
	
	
	onArticleItemTouchStart: function(event, item){
		
		var articleItem = Ext.get(item).hasCls("article") ? Ext.get(item) : Ext.get(item).up("article[class^=article]");
		var articleId = articleItem.getAttribute("data-article-id");
		
		articleItem.un("touchmove", this.onArticleItemTouchMove);
		articleItem.on("touchmove", this.onArticleItemTouchMove, this);
		
		var me = this;
		this.setPressedTimeout(setTimeout(function(){
			// remove pressed item cls
			articleItem.addCls(me.getPressedCls());
		}, 100));
	},
	
	
	onArticleItemTouchMove: function(event, item){
		
		var articleItem = Ext.get(item).hasCls("article") ? Ext.get(item) : Ext.get(item).up("article[class^=article]");
		
		if (articleItem){
			var articleId = articleItem.getAttribute("data-article-id");
			
			delete this.getPressedTimeout();
			clearTimeout(this.getPressedTimeout());
			
			// remove pressed item cls
			articleItem.removeCls(this.getPressedCls());
			
			articleItem.un("touchmove", this.onArticleItemTouchMove);
		}
	},
	
	updateArticleItem: function(data){
		var articleItem = this.element.query("article[data-article-id='"+data.articleId+"']")[0];
		articleItem = Ext.get(articleItem);
		articleItem.query("[class=comments-number]")[0].innerHTML = data.comment_count;
		articleItem.query("[class=note-number]")[0].innerHTML = data.ranking;
	}
});