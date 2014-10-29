Ext.define('LDPA.controller.tablet.News', {
    extend: 'LDPA.controller.Base',
	
	requires: [
		'Ext.util.DelayedTask'		   
	],

    config: {
        
		refs: {
           	
			newsPanel: '#newsPanel',
			newsList: '#newsPanel #newsList',
			detailsPanel: '#newsPanel #newsDetails',
			
			commentsList: '#newsPanel #newsComments',
			commentForm: '#newsPanel #commentForm',
			commentErrorsPanel: '#newsPanel #commentForm #errorsPanel',
			
			sendCommentBtn: {
				selector: '#newsPanel #commentForm button[action=sendcomment]',
				xtype: 'button',
				autoCreate: true
			},
			
			showCommentsBtn: {
				selector: 'button[name="newsCommentsBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			shareNewsBtn: {
				selector: 'button[name="newsShareBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			tweetNewsBtn: {
				selector: 'button[name="newsTweetBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			rateNewsBtn: {
				selector: 'button[name="newsRateBtn"]',
				xtype: 'button',
				autoCreate: true
			},
		},
		
		control: {
			
			newsList: {
				itemtap: 'onNewsPostsItemTap',
				loadnews: 'onLoadNews'
			},
			showCommentsBtn: {
				tap: 'onShowComments'	
			},
			detailsPanel: {
				setdata: "onDetailsPanelSetData",
				syncontent: "onDetailsPanelSyncContent"
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
			shareNewsBtn: {
				tap: 'onShareNewsBtnTap'	
			},
			tweetNewsBtn: {
				tap: 'onTweetNewsBtnTap'	
			},
			rateNewsBtn: {
				tap: 'onRateNewsBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		var newsList = this.getNewsList();
		
		newsList.getStore().load(function(){
			newsList.fireEvent("loadnews", newsList.getStore().getAt(0).get("id"));								  
		});
    },
	
	
	onNewsPostsItemTap: function(list, index, el, record){
		list.fireEvent("loadnews", record.get("id"));
	},
	
	
	onLoadNews: function(id){
		var newsPanel = this.getNewsPanel();
		var detailsPanel = this.getDetailsPanel();
		
		if (!newsPanel.getMasked()){
			newsPanel.setMasked({
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
				detailsPanel.fireEvent("setdata", result.post);
			}
        });
	},
	
	
	onDetailsPanelSetData: function(data){
		var newsPanel = this.getNewsPanel();
		var detailsPanel = this.getDetailsPanel();
		var newsParent = detailsPanel.getParent();
		
		// load data for the selected news
		detailsPanel.getScrollable().getScroller().scrollTo(0,0);
		detailsPanel.setData(data);
		detailsPanel.fireEvent("setactions");
		
		// activate the news details panel in case the comments panel was currently activated
		if (newsParent.getActiveItem() != detailsPanel){
			newsParent.getLayout().setAnimation({type: 'slide', direction: 'left'});
			newsParent.setActiveItem(detailsPanel);
		}
		
		Ext.defer(function(){
			newsPanel.unmask();				   
		}, 200, this)
	},
	
	
	onShowComments: function(){
		var detailsPanel = this.getDetailsPanel();
		var newsParent = detailsPanel.getParent();
		var commentsList = this.getCommentsList();
		var commentForm = this.getCommentForm();
		
			
		// if there are no comments for this news than open the comment form panel
		if (detailsPanel.getData().comment_count == 0){
			var task = Ext.create('Ext.util.DelayedTask', function() {
				commentForm.fireEvent("openform",true);
			});
			task.delay(1000);
		}
		
		// remove all previous comments
		commentsList.getStore().removeAll();
		
		// activate comments list
		newsParent.getLayout().setAnimation({type: 'slide'});
		newsParent.setActiveItem(commentsList);
	},
	
	onLoadComments: function(){
		var commentsList = this.getCommentsList();
		var detailsPanel = this.getDetailsPanel();
		
		var newsId = detailsPanel.getData().id;
		 
		// add newsId to extra params
		commentsList.getStore().getProxy().setExtraParam("id", newsId);
		
		// load comments by video id
		commentsList.getStore().load();
	},
	
	
	onDetailsPanelSyncContent: function(){
		var detailsPanel = this.getDetailsPanel();
		var newsList = this.getNewsList();
		
		var newsId = detailsPanel.getData().id;
		
		// modify instance with the new value of comments number
		var instance = newsList.getStore().findRecord("id",newsId,0,false,true,true)	;
		instance.set("ranking", detailsPanel.getData().ranking);
		instance.set("comment_count", detailsPanel.getData().comment_count);
		
		var data = instance.getData();
		
		// update 'ShowCommentsBtn' and 'rateVideoBtn' text
		detailsPanel.fireEvent("setactions");
		
	},
	
	
	onCommentsListSyncContent: function(){
		var detailsPanel = this.getDetailsPanel();
		var commentsList = this.getCommentsList();
		
		var length = commentsList.getStore().getCount();
		
		var data = detailsPanel.getData();
		data.comment_count = length;
		detailsPanel.setData(data);
		
		detailsPanel.fireEvent("syncontent");
	},
	
	
	onCommentsListActivate: function(){
		var detailsPanel = this.getDetailsPanel();
		var commentsList = this.getCommentsList();
		
		// load comments
		var data = detailsPanel.getData();
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
		var detailsPanel = this.getDetailsPanel();
		
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
                type			: 'news',
				id				: detailsPanel.getData().id,
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
	
	
	onShareNewsBtnTap: function(){
		var detailsPanel = this.getDetailsPanel();
		
		var webUrl = encodeURIComponent(detailsPanel.getData().link);
						
		// open a new link
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.facebook.com/sharer/sharer.php?u="+webUrl);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);
	},
	
	
	onTweetNewsBtnTap: function(){
		var detailsPanel = this.getDetailsPanel();
		
		var webUrl = detailsPanel.getData().link;
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
	
	
	onRateNewsBtnTap: function(){
		var ratePanel = Ext.Viewport.down("ratePanel");
		if (ratePanel){
			ratePanel.destroy();
		}
		
		var detailsPanel = this.getDetailsPanel();
		
		ratePanel = Ext.create(this.getViewName('rate.RatePanel'), {
			opener: detailsPanel, 
			postId: detailsPanel.getData().id, 
			postRanking: detailsPanel.getData().ranking
		});
		
		Ext.Viewport.add(ratePanel);
		
		ratePanel.show('pop');
	},
});