var newsController;

Ext.define('LDPA.controller.tablet.News', {
    extend: 'Ext.app.Controller',
	
	requires:[
		
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            newsView: {
				selector: "#newsView",
				autoCreate: true	
			},
			newsList: {
				selector: "#newsView #newsList",
				autoCreate: true	
			},
			newsPanel: {
				selector: "#newsView #newsPanel",
				autoCreate: true	
			}
        },
		
		control: {
			newsList: {
				itemtap: 'onNewsListItemTap'	
			}
		}
    },
	
	
	init: function() {
		newsController = this;
    },
	
	launch: function() {
		
    },
	
	
	processNews: function(news){
		Ext.each(news, function(item){
			item.articleId = item.id;
		});
		
		return news;
	},
	
	
	showNews: function(){
		
		if (!Ext.Viewport.down("#newsView")){
			
			// create mask
			var mask = Ext.create("LDPA.view.MainMask", {
				disabled: true,
				spinner: true,
				closeFn: function(){
					
				}
			});
			
			Ext.Viewport.add(mask);
			
			mask.show();
			
			
			// offline
			if (!LDPA.app.isOnline()){
				mask.fireEvent("close");
				
				alert(webcrumbz.offlineMsg);
			}
			// online
			else{
				// create news panel
				var profile = webcrumbz.profile.toLowerCase();
				var newsView = Ext.create("LDPA.view."+profile+".news.News", {
					mask: mask,
					zIndex: mask.getZIndex()+1
				});
				
				Ext.Viewport.add(newsView);
				
				var self = this;
				var newsList = newsView.down("#newsList");
				
				newsList.getStore().loadPage(1, {
					callback: function(records){
						
						mask.fireEvent("close");
						newsView.show();
					}
				})
			}
		}
		else{
			Ext.Viewport.down("#newsView").show();
		}
	},
	
	
	onNewsListItemTap: function(list, index, item, record){
		
		var newsPanel = this.getNewsPanel();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				
			}
		});
		
		Ext.Viewport.add(mask);
		newsPanel.setMask(mask);
		
		mask.show();
		
		// show article
		var articleId = record.get("articleId") || record.get("id");
		this.showArticle(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var newsView = this.getNewsView();
		var newsPanel = this.getNewsPanel();
		var mask = newsPanel.getMask();
		
		// scroll to top
		var articleInnerPanel = newsPanel.down("#articleInner");
		var scroller = articleInnerPanel.getScrollable().getScroller();
		scroller.scrollTo(0,0,true);
		
		// Make the JsonP request
		Ext.data.JsonP.request({
			url: webcrumbz.exportPath+'?json=tablet.post',
			params: {
				id: articleId,
				format: 'json',
			},
			failure: function(){
				// hide mask
				if (mask) mask.fireEvent("close");
			},
			success: function(result, request) {
				// hide mask
				if (mask) mask.fireEvent("close");
				
				result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
				
				result.post.articleId = result.post.id;
				
				// add content
				newsPanel.fireEvent("addcontent", result.post);
			}
		});
	}
});