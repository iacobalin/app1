Ext.define('LDPA.controller.tablet.Articles', {
    extend: 'LDPA.controller.Base',
	
	requires: [
		'Ext.util.DelayedTask'		   
	],

    config: {
        
		refs: {
            mainView: '#mainView',
			homePanel: '#homePanel',
			homeCategoriesList: '#homePanel #categoriesList',
			
			articlesPanel: '#articlesPanel',
			articlesList: '#articlesPanel #categoryArticlesList',
			categoriesList: '#articlesPanel #categoriesList',
			categoryDetailsPanel: '#articlesPanel #categoryDetails',
			articleDetailsPanel: '#articlesPanel #articleDetails',
			
			commentsList: '#articlesPanel #articleComments',
			commentForm: '#articlesPanel #commentForm',
			commentErrorsPanel: '#articlesPanel #commentForm #errorsPanel',
			
			sendCommentBtn: {
				selector: '#articlesPanel #commentForm button[action=sendcomment]',
				xtype: 'button',
				autoCreate: true
			},
			
			showCommentsBtn: {
				selector: 'button[name="articleCommentsBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			rateArticleBtn: {
				selector: 'button[name="articleRateBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			shareArticleBtn: {
				selector: 'button[name="articleShareBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			tweetArticleBtn: {
				selector: 'button[name="articleTweetBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			backCategoryBtn: {
				selector: 'button[name="articleBackBtn"]',
				xtype: 'button',
				autoCreate: true
			},
		},
		
		control: {
			articlesList: {
				itemtap: 'onPostsItemTap',
				loadarticle: 'onLoadArticle'
			},
			showCommentsBtn: {
				tap: 'onShowComments'	
			},
			categoriesList:{
				itemtap: 'onCategoriesItemTap',
			},
			categoryDetailsPanel: {
				loadcategory: "onLoadCategory",
				syncontent: "onCategoryPanelSyncContent"
			},
			articleDetailsPanel: {
				setdata: "onArticlePanelSetData",
				syncontent: "onArticlePanelSyncContent"
			},
			commentsList: {
				activate: 'onCommentsListActivate',
				deactivate: 'onCommentsListDeactivate',
				loadcomments: 'onLoadComments',	
				syncontent: 'onCommentsListSyncContent',	
			},
			sendCommentBtn: {
				tap: 'onSendCommentBtnTap'	
			},
			rateArticleBtn: {
				tap: 'onRateArticleBtnTap'	
			},
			shareArticleBtn: {
				tap: 'onShareArticleBtnTap'	
			},
			tweetArticleBtn: {
				tap: 'onTweetArticleBtnTap'	
			},
			backCategoryBtn: {
				tap: 'onBackCategoryBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
    },
	
	
	onCategoriesItemTap: function(list, index, el, record){
		var categoryDetailsPanel = this.getCategoryDetailsPanel();
		categoryDetailsPanel.fireEvent("loadcategory", record.get("id"));
	},
	
	
	onLoadCategory: function(id){
		
		var categoriesList = this.getCategoriesList();
		var categoryDetailsPanel = this.getCategoryDetailsPanel();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var articlesList = this.getArticlesList();
		var articleParent = articleDetailsPanel.getParent();
		var articlesPanel = this.getArticlesPanel();
		var mainPanel = this.getMainView();
		
		if (!mainPanel.getMasked()){
			mainPanel.setMasked({
				xtype: 'loadmask',
				message: 'Loading ...',
				transparent: true
			});
		}
		
		var record = categoriesList.getStore().findRecord("id", id, 0, false, true, true);
		
		// update values
		categoryDetailsPanel.setData(record.getData());
		categoryDetailsPanel.down("titlebar").setTitle(record.get("name"));

		// activate the category details panel in case other panel is active
		if (articleParent.getActiveItem() != categoryDetailsPanel){
			articleParent.getLayout().setAnimation({type: 'slide', direction: 'right'});
			articleParent.setActiveItem(categoryDetailsPanel);
		}
		
		if (articlesPanel.getActiveItem() != articleParent){
			articlesPanel.getLayout().setAnimation({type: 'slide', direction: 'left'});
			articlesPanel.setActiveItem(1);
		}
		
		// remove all previous comments
		articlesList.getStore().removeAll();
		
		// activate Articles module
		mainPanel.setActiveItem(articlesPanel);
		
		// load category's articles
		articlesList.getStore().add(record.get("posts"));
		
		mainPanel.unmask();
	},
	
	
	
	
	onPostsItemTap: function(list, index, el, record){
		list.fireEvent("loadarticle", record.get("id"));
	},
	
	
	onLoadArticle: function(id){
		var articlesPanel = this.getArticlesPanel();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		if (!articlesPanel.getMasked()){
			articlesPanel.setMasked({
				xtype: 'loadmask',
				message: 'Loading ...',
				transparent: true
			});
		}
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: webcrumbz.exportPath+'?json=tablet.post',
            params: {
                id: id,
                format: 'json',
            },
            success: function(result, request) {
               				
				// update values
				articleDetailsPanel.fireEvent("setdata", result.post);
			}
        });
	},
	
	
	onArticlePanelSetData: function(data){
		var articlesPanel = this.getArticlesPanel();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var articleParent = articleDetailsPanel.getParent();
		
		// load data for the selected article
		articleDetailsPanel.getScrollable().getScroller().scrollTo(0,0);
		articleDetailsPanel.setData(data);
		articleDetailsPanel.fireEvent("setactions");
		
		// activate the article details panel in case the comments panel was currently activated
		if (articleParent.getActiveItem() != articleDetailsPanel){
			articleParent.animateActiveItem(articleDetailsPanel, {type: 'slide', direction: 'left'});
		}
		
		Ext.defer(function(){
			articlesPanel.unmask();				   
		}, 200, this);
	},
	
	
	onArticlePanelSyncContent: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var articlesList = this.getArticlesList();
		
		var articleId = articleDetailsPanel.getData().id;
		
		// modify instance with the new value of comments number
		var instance = articlesList.getStore().findRecord("id",articleId,0,false,true,true)	;
		instance.set("ranking", articleDetailsPanel.getData().ranking);
		instance.set("comment_count", articleDetailsPanel.getData().comment_count);
		
		var data = instance.getData();
		
		// update 'ShowCommentsBtn' and 'rateVideoBtn' text
		articleDetailsPanel.fireEvent("setactions");
		
	},
	
	
	onShowComments: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var articleParent = articleDetailsPanel.getParent();
		var commentsList = this.getCommentsList();
		var commentForm = this.getCommentForm();
		
			
		// if there are no comments for this article than open the comment form panel
		if (articleDetailsPanel.getData().comment_count == 0){
			var task = Ext.create('Ext.util.DelayedTask', function() {
				commentForm.fireEvent("openform",true);
			});
			task.delay(1000);
		}
		
		// remove all previous comments
		commentsList.getStore().removeAll();
		
		// activate comments list
		articleParent.getLayout().setAnimation({type: 'slide'});
		articleParent.setActiveItem(commentsList);
	},
	
	
	onLoadComments: function(){
		var commentsList = this.getCommentsList();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		var articleId = articleDetailsPanel.getData().id;
		 
		// add articleId to extra params
		commentsList.getStore().getProxy().setExtraParam("id", articleId);
		
		// load comments by video id
		commentsList.getStore().load();
	},
	
	
	onCommentsListSyncContent: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var commentsList = this.getCommentsList();
		
		var length = commentsList.getStore().getCount();
		
		var data = articleDetailsPanel.getData();
		data.comment_count = length;
		articleDetailsPanel.setData(data);
		
		articleDetailsPanel.fireEvent("syncontent");
	},
	
	
	onCommentsListActivate: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		var commentsList = this.getCommentsList();
		
		// load comments
		var data = articleDetailsPanel.getData();
		commentsList.down("titlebar").setTitle(data.title);
		commentsList.fireEvent("loadcomments");
	},
	
	onCommentsListDeactivate: function(){
		var commentForm = this.getCommentForm();
		commentForm.fireEvent("closeform", false);
	},
	
	
	onSendCommentBtnTap: function(){
		
		var commentForm = this.getCommentForm();
		var errorsPanel = this.getCommentErrorsPanel();
				
		var model = Ext.create("LDPA.model.Comments",{
			user: commentForm.getValues().user,
			email: commentForm.getValues().email,
			comment: commentForm.getValues().comment
		});
		
		var errors = model.validate(),
			message = "";
		
		if (errors.isValid()){
			this.submitCommentForm();
		}
		else{
			errorsPanel.setData({message: errors.items[0].config.message})	
		}	
	},
	
	
	submitCommentForm: function() {
        
		var commentForm = this.getCommentForm();
		var errorsPanel = this.getCommentErrorsPanel();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		// clear errors panel content
		errorsPanel.setData({message: ""})	
		
		commentForm.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            transparent: true
		});
		
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: webcrumbz.exportPath+'?json=tablet.add_comment',
            params: {
                type			: 'article',
				id				: articleDetailsPanel.getData().id,
				user			: commentForm.getValues().user,
                email			: commentForm.getValues().email,
				comment			: commentForm.getValues().comment,
				key				: webcrumbz.key
            },
            success: function(result, request) {
               	commentForm.unmask();
				
				if (result.status == "ok"){
					commentForm.reset();
					alert('Comentariul tau a fost trimis cu succes! Iti multumim!');
					commentForm.fireEvent("closeform", true);
					//Ext.Msg.alert('Felicit&#259;ri', 'Comentariul t&#259;u a fost trimis cu succes!<br/>&#206;&#355;i mul&#355;umim!', Ext.emptyFn);
				}
				else{
					alert('Comentariul tau nu a fost trimis! Incearca din nou sau trimite un email la contact@lectiadeprimajutor.ro!')
					//Ext.Msg.alert('Eroare', 'Comentariul t&#259;u nu a fost trimis!<br/> &#206;ncearc&#259; din nou sau trimite un email la contact@lectiadeprimajutor.ro!', Ext.emptyFn);
				}
            }
        });
    },
	
	
	onRateArticleBtnTap: function(){
		var ratePanel = Ext.Viewport.down("ratePanel");
		if (ratePanel){
			ratePanel.destroy();
		}
		
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		ratePanel = Ext.create(this.getViewName('rate.RatePanel'), {
			opener: articleDetailsPanel, 
			postId: articleDetailsPanel.getData().id, 
			postRanking: articleDetailsPanel.getData().ranking
		});
		
		Ext.Viewport.add(ratePanel);
		
		ratePanel.show('pop');
	},
	
	
	onShareArticleBtnTap: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		var webUrl = encodeURIComponent(articleDetailsPanel.getData().link);
						
		// open a new link
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.facebook.com/sharer/sharer.php?u="+webUrl);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);
	},
	
	
	onTweetArticleBtnTap: function(){
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		var webUrl = articleDetailsPanel.getData().link;
		//var title = this.getData().title;
		var title = "Citeste+acest+articol:+";
		
		// open a new link
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);
	},
	
	
	onBackCategoryBtnTap: function(){
		var categoryDetailsPanel = this.getCategoryDetailsPanel();
		var articleParent = categoryDetailsPanel.getParent();
		var articlesList = this.getArticlesList();
		
		articleParent.getLayout().setAnimation({type: 'slide', direction: 'right'});
		articleParent.setActiveItem(categoryDetailsPanel);
		articlesList.deselectAll(true);
	}
});