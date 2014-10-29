Ext.define("LDPA.view.tablet.search.ArticleDetails", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.rate.RatePanel',
		'LDPA.view.tablet.media.Media'
	],
	
	config: {
		
		itemId: 'articleDetails',
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
        cls: 'article-details',
		
		tpl: new Ext.XTemplate('' +
            '<div class="category-name">{category}</div>',
			'<div class="title">{title}</div>',
			'<div class="content">{[this.transformContent(values.content)]}</div>',
			'<div class="bar">',
				'<div class="comments-button-box" id="articleCommentsBtn{id}"></div>',
				'<div class="facebook-button-box" id="articleShareBtn{id}"></div>',
				'<div class="twitter-button-box" id="articleTweetBtn{id}"></div>',
				'<div class="rating-button-box" id="articleRateBtn{id}"></div>',
			'</div>',
			{
				transformContent: function(content){
					var c = content;
					c = c.replace(/faq_answer\"/g, 'faq_answer" style="display:none;"');
					return c;
				}
			}
		)
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("setactions", this.onSetActions, this);
	},
	
	
	onSetActions: function(){
		if (this.getData() == null) return;
		
		var articleId = this.getData().id;
		var noComments = this.getData().comment_count;
		
			
		// add comments button
		var btnComments = Ext.create("Ext.Button",{
			tpl: new Ext.XTemplate(
				'{[this.getText(values.comment_count)]}',
				{
					getText: function(noComments){
						if (noComments == 0){
							return "Fii primul care comenteaz&#259; acest articol"	;
						}
						else{
							return "Vezi comentarii ("+noComments+")";
						}
					}
				}
			),
			renderTo: document.getElementById('articleCommentsBtn'+articleId),
			name: 'searchCommentsBtn',
			itemId: 'searchCommentsBtn',
            iconCls: 'chat4',
            cls: "comments-button",
            pressedCls: "comments-button-pressed"
		});
		btnComments.setData({comment_count: noComments});
		
		
		// add share on facebook button
		var btnShare = Ext.create("Ext.Button",{
			html: '<div class="">Share</div>',
			renderTo: document.getElementById('articleShareBtn'+articleId),
			name: 'searchShareBtn',
			itemId: 'searchShareBtn',
            iconCls: 'facebook',
            cls: "share-button",
            pressedCls: "share-button-pressed"
		});
		
		
		// add tweet button
		var btnTweet = Ext.create("Ext.Button",{
			html: '<div class="">Tweet</div>',
			renderTo: document.getElementById('articleTweetBtn'+articleId),
			name: 'searchTweetBtn',
			itemId: 'searchTweetBtn',
            iconCls: 'tweet',
            cls: "tweet-button",
            pressedCls: "tweet-button-pressed"
		});
		
		
		// add rate button
		var btnRate = Ext.create("Ext.Button",{
			tpl: new Ext.XTemplate(
                '<div style="background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#59c5fc), color-stop({[this.getBackgroundSize(values.rate)]}, #59c5fc), color-stop({[this.getBackgroundSize(values.rate)]}, #B6B6B6), to(#B6B6B6));" class="star"></div>' +
                    '<div class="rating">{rate}</div>',
                {
                    getBackgroundSize: function(rate){
                        return rate/5;
                    }
                }
			),
			renderTo: document.getElementById('articleRateBtn'+articleId),
			name: 'searchRateBtn',
			itemId: 'searchRateBtn',
            cls: "rating-button",
            pressedCls: "rating-button-pressed"
		});
		btnRate.setData({rate: this.getData().ranking});
		
		
		// attach tap event for each item with classes 'faq_question expa'
		var questionItems = this.element.query("*[class^=faq_question]");
		for (var i=0; i<questionItems.length; i++){
			var item = Ext.get(questionItems[i]);
			item.dom.setAttribute("data-index", i);
			item.on("tap", this.onQuestionItemTap, this);
		}
		
		
		// attach tap event for each media items
		var mediaItems = this.element.query("div[class=content] img");
		for (var i=0; i<mediaItems.length; i++){
			var item = Ext.get(mediaItems[i]);
			item.dom.setAttribute("data-index", i);
			item.on("tap", this.onMediaItemTap, this);
		}
	},
	
	
	onQuestionItemTap: function(event, item){
		var index = item.getAttribute("data-index");
		
		// find the answer
		var answerItem = this.element.query("*[class^=faq_answer]")[index];
		
		if (answerItem.style.display == "none")
			answerItem.style.display = "block";
		else answerItem.style.display = "none";
	},
	
	
	onMediaItemTap: function(event, item){
		var index = parseInt(item.getAttribute("data-index"));
		var arrMediaItems = [];
		
		var mediaItems = this.element.query("div[class=content] img");
		for (var i=0; i<mediaItems.length; i++){
			var item = Ext.get(mediaItems[i]);
			arrMediaItems.push({src: item.getAttribute("src"), title: item.getAttribute("title")})
		}
		
		var articleTitle = this.getData().title;
		
		this.openMediaWindow(arrMediaItems, index, articleTitle);
	},
	
	
	openMediaWindow: function(arrMediaItems, index, articleTitle){
		var panel = Ext.create("LDPA.view.tablet.media.Media");
		panel.fireEvent("addcontent", arrMediaItems, index, articleTitle);
		
		Ext.Viewport.add(panel);
		
		panel.show('pop');
	}
});
