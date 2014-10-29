Ext.define('LDPA.controller.tablet.Search', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
           	mainView: '#mainView',
		   	searchPanel: "#searchPanel",
			emptyCard: "#searchPanel #emptyCard",
			searchField: '#mainView searchfield',
			
			articlesList: '#searchPanel #searchArticlesList',
			articleDetailsPanel: '#searchPanel #articleDetails',
			
			commentsList: '#searchPanel #articleComments',
			commentForm: '#searchPanel #commentForm',
			commentErrorsPanel: '#searchPanel #commentForm #errorsPanel',
			
			sendCommentBtn: {
				selector: '#searchPanel #commentForm button[action=sendcomment]',
				xtype: 'button',
				autoCreate: true
			},
			
			showCommentsBtn: {
				selector: 'button[name="searchCommentsBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			rateArticleBtn: {
				selector: 'button[name="searchRateBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			shareArticleBtn: {
				selector: 'button[name="searchShareBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			tweetArticleBtn: {
				selector: 'button[name="searchTweetBtn"]',
				xtype: 'button',
				autoCreate: true
			},
        },
		
		control: {
			searchField: {
				keyup: 'onSearch'
			},
			articlesList: {
				itemtap: 'onPostsItemTap',
				loadarticle: 'onLoadArticle'
			},
			articleDetailsPanel: {
				setdata: "onArticlePanelSetData",
				syncontent: "onArticlePanelSyncContent"
			},
			showCommentsBtn: {
				tap: 'onShowComments'	
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
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
    },
	
	onSearch : function(field, e){
		var keyCode = e.event.keyCode,
            searchField = this.getSearchField();

        //the return keyCode is 13.
        if (keyCode == 13) {
            //fire the search action with the current value of the searchField
            this.fireAction('search', [searchField.getValue()], 'doSearch');
        }
	},
	
	
	doSearch: function(search) {
    	   
		var model = LDPA.model.Articles,
			mainView = this.getMainView(),
			searchPanel = this.getSearchPanel(),
			searchField = this.getSearchField(),
            articlesList = this.getArticlesList(),
			emptyCard = this.getEmptyCard(),
			articleDetailsPanel = this.getArticleDetailsPanel(),
			query;
		
        // ensure there is a search...
        if (!search) {
            return;
        }
		
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general',
			transparent: true
		});
        
		// update search bar from the results list
		articlesList.down("#bar").setData({
			query: search							
		})
		
		query = search.replace("%20", " ");
		
		articlesList.getStore().load({
			filters: { 
				q : query,
				key: webcrumbz.key
			},
			callback: function(results){
				
				//if there are no results than show the empty card
				if (results.length == 0){
					emptyCard.setData({
						query: query			  
					})
					
					searchPanel.animateActiveItem(emptyCard, {type: 'slide', direction: 'left'});
					mainView.animateActiveItem(searchPanel, {type: 'slide', direction: 'left'});
				}
				else{
					// activate results Panel
					searchPanel.setActiveItem(articlesList.getParent());
					mainView.animateActiveItem(searchPanel, {type: 'slide', direction: 'left'});
					
					var firstRecord = results[0]
					
					articlesList.select(firstRecord, false);
					
					// load article's content
					articlesList.fireEvent("loadarticle", firstRecord.get("id"));
					
					articleDetailsPanel.getParent().setActiveItem(articleDetailsPanel);
					searchPanel.animateActiveItem(articlesList.getParent(), {type: 'slide', direction: 'left'});
				}
				
				Ext.Viewport.unmask();
			}
		});
		

        //empty the field and remove focus from it
        searchField.setValue('');
        searchField.blur();
    },
	
	
	onPostsItemTap: function(list, index, el, record){
		list.fireEvent("loadarticle", record.get("id"));
	},
	
	
	onLoadArticle: function(id){
		var searchPanel = this.getSearchPanel();
		var articleDetailsPanel = this.getArticleDetailsPanel();
		
		if (!searchPanel.getMasked()){
			searchPanel.setMasked({
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
		var searchPanel = this.getSearchPanel();
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
			searchPanel.unmask();				   
		}, 200, this)
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
		
		// update 'ShowCommentsBtn' and 'rateBtn' text
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
});