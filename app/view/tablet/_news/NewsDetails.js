Ext.define("LDPA.view.tablet.news.NewsDetails", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.rate.RatePanel',
		'LDPA.view.tablet.media.Media'
	],
	
	config: {
		isFilled: false,
		
		itemId: 'newsDetails',
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
        cls: 'news-details',
		
		tpl: new Ext.XTemplate(
            '<div class="title">{title}</div>',
			'<div class="description">{content}</div>',
			'<div class="bar">',
				'<div class="comments-button-box" id="newsCommentsBtn{id}"></div>',
				'<div class="facebook-button-box" id="newsShareBtn{id}"></div>',
				'<div class="twitter-button-box" id="newsTweetBtn{id}"></div>',
				'<div class="rating-button-box" id="newsRateBtn{id}"></div>',
			'</div>'
		),

        margin: 0,
        padding: 0

    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("setactions", this.onSetActions, this);
	},
	
	
	
	
	
	onSetActions: function(){
		if (this.getData() == null) return;
		
		var newsId = this.getData().id;
		var noComments = this.getData().comment_count;
		
			
		// add comments button
		var btnComments = Ext.create("Ext.Button",{
			tpl: new Ext.XTemplate(
				'{[this.getText(values.comment_count)]}',
				{
					getText: function(noComments){
						if (noComments == 0){
							return "Fii primul care comenteaz&#259; aceast&#259; &#351;tire!"	;
						}
						else{
							return "Vezi comentarii ("+noComments+")";
						}
					}
				}
			),
			renderTo: document.getElementById('newsCommentsBtn'+newsId),
			name: 'newsCommentsBtn',
			itemId: 'newsCommentsBtn',
            iconCls: 'chat4',
            cls: "comments-button",
            pressedCls: "comments-button-pressed"
		});
		btnComments.setData({comment_count: noComments});
		
		
		// add share on facebook button
		var btnShare = Ext.create("Ext.Button",{
			html: 'Share',
			renderTo: document.getElementById('newsShareBtn'+newsId),
			name: 'newsShareBtn',
			itemId: 'newsShareBtn',
            iconCls: 'facebook',
            cls: "share-button",
            pressedCls: "share-button-pressed"
		});
		
		
		// add tweet button
		var btnTweet = Ext.create("Ext.Button",{
			html: 'Tweet',
			renderTo: document.getElementById('newsTweetBtn'+newsId),
			name: 'newsTweetBtn',
			itemId: 'newsTweetBtn',
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
			renderTo: document.getElementById('newsRateBtn'+newsId),
			name: 'newsRateBtn',
			itemId: 'newsRateBtn',
            cls: "rating-button",
            pressedCls: "rating-button-pressed"
		});
		btnRate.setData({rate: this.getData().ranking});
		
		
		// attach tap event for each media items
		var mediaItems = this.element.query("div[class=description] img");
		for (var i=0; i<mediaItems.length; i++){
			var item = Ext.get(mediaItems[i]);
			item.dom.setAttribute("data-index", i);
			item.on("tap", this.onMediaItemTap, this);
		}
	},
	
	
	
	onMediaItemTap: function(event, item){
		var index = parseInt(item.getAttribute("data-index"));
		var arrMediaItems = [];
		
		var mediaItems = this.element.query("div[class=description] img");
		for (var i=0; i<mediaItems.length; i++){
			var item = Ext.get(mediaItems[i]);
			arrMediaItems.push({src: item.getAttribute("src"), title: ""})
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
