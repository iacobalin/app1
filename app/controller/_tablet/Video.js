Ext.define('LDPA.controller.tablet.Video', {
    extend: 'LDPA.controller.Base',
	
	requires: [
		'Ext.util.DelayedTask'		   
	],

    config: {
        
		refs: {
            homePanel: '#homePanel',
			homeCarousel: '#homePanel #videoCarousel',
			
			videoPanel: '#videoPanel',
			videoList: '#videoPanel #videoArticlesList',
			detailsPanel: '#videoPanel #videoDetails',
			
			commentsList: '#videoPanel #videoComments',
			commentForm: '#videoPanel #commentForm',
			commentErrorsPanel: '#videoPanel #commentForm #errorsPanel',
			
			sendCommentBtn: {
				selector: '#videoPanel #commentForm button[action=sendcomment]',
				xtype: 'button',
				autoCreate: true
			},
			
			showCommentsBtn: {
				selector: 'button[name="videoCommentsBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			
			rateVideoBtn: {
				selector: 'button[name="videoRateBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			shareVideoBtn: {
				selector: 'button[name="videoShareBtn"]',
				xtype: 'button',
				autoCreate: true
			},
			tweetVideoBtn: {
				selector: 'button[name="videoTweetBtn"]',
				xtype: 'button',
				autoCreate: true
			},
		},
		
		control: {
			homeCarousel: {
				loadcompleted: 'onVideoCarouselLoaded'
			},
			videoList: {
				itemtap: 'onVideoPostsItemTap'
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
			rateVideoBtn: {
				tap: 'onRateVideoBtnTap'	
			},
			shareVideoBtn: {
				tap: 'onShareVideoBtnTap'	
			},
			tweetVideoBtn: {
				tap: 'onTweetVideoBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
    },
	
	
	onVideoCarouselLoaded: function(){
		var homeCarousel = this.getHomeCarousel();	
		var videoList = this.getVideoList();
		var detailsPanel = this.getDetailsPanel();
		
		// load video videoList
		videoList.getStore().add(homeCarousel.getStore().getRange());
		
		// set the first video as the default one
		detailsPanel.setData(videoList.getStore().getAt(0).getData());
	},
	
	
	onVideoPostsItemTap: function(list, index, el, record){
		var detailsPanel = this.getDetailsPanel();
		
		// update details panel info
		detailsPanel.fireEvent("setdata", list.getStore().getAt(index).getData(), false);
	},
	
	
	onDetailsPanelSetData: function(data, scrolling){
		var detailsPanel = this.getDetailsPanel();
		var detailsParent = detailsPanel.getParent();
		var videoList = this.getVideoList();
		
		if (!detailsPanel.getMasked()){
			detailsPanel.setMasked({
				xtype: 'loadmask',
				message: 'Loading ...',
				transparent: true
			});
		}
		
		// load data for the selected video
		detailsPanel.getScrollable().getScroller().scrollTo(0,0);
		detailsPanel.setData(data);
		detailsPanel.fireEvent("setactions");
		
		// activate the details panel in case the comments panel was currently activated
		if (detailsParent.getActiveItem() != detailsPanel){
			detailsParent.getLayout().setAnimation({type: 'slide', direction: 'right'});
			detailsParent.setActiveItem(0);
		}
		
		
		if (scrolling){
			// select the item from video list
			var record = videoList.getStore().findRecord("id",data.id, 0, false, true, true);
			videoList.select(record, false);
			
			// scroll the list to the selected item
			var store = videoList.getStore(),
				selected = videoList.getSelection()[0],
				idx = store.indexOf(selected),
				els = videoList.container.getViewItems(),
				el = els[idx],
				offset = Ext.get(el).dom.offsetTop;
			
			videoList.getScrollable().getScroller().scrollTo(0, offset, true); 
		}
		
		
		Ext.defer(function(){
			detailsPanel.unmask();				   
		}, 200, this)
	},
	
	
	onShowComments: function(){
		var detailsPanel = this.getDetailsPanel();
		var detailsParent = detailsPanel.getParent();
		var commentsList = this.getCommentsList();
		var commentForm = this.getCommentForm();
		
			
		// if there are no comments for this article than open the comment form panel
		if (detailsPanel.getData().comment_count == 0){
			var task = Ext.create('Ext.util.DelayedTask', function() {
				commentForm.fireEvent("openform",true);
			});
			task.delay(1000);
		}
		
		// remove all previous comments
		commentsList.getStore().removeAll();
		
		// activate comments list
		detailsParent.getLayout().setAnimation({type: 'slide'});
		detailsParent.setActiveItem(commentsList);
	},
	
	
	onLoadComments: function(){
		var commentsList = this.getCommentsList();
		var detailsPanel = this.getDetailsPanel();
		
		var videoId = detailsPanel.getData().id;
		 
		// add videoId to extra params
		commentsList.getStore().getProxy().setExtraParam("id", videoId);
		
		// load comments by video id
		commentsList.getStore().load();
	},
	
	
	onDetailsPanelSyncContent: function(){
		var homeCarousel = this.getHomeCarousel();
		var detailsPanel = this.getDetailsPanel();
		var videoList = this.getVideoList();
		
		var videoId = detailsPanel.getData().id;
		
		// modify instance with the new value of comments number
		var instance = videoList.getStore().findRecord("id",videoId,0,false,true,true)	;
		instance.set("ranking", detailsPanel.getData().ranking);
		instance.set("comment_count", detailsPanel.getData().comment_count);
		
		var data = instance.getData();
		
		// update 'ShowCommentsBtn' and 'rateVideoBtn' text
		detailsPanel.fireEvent("setactions");
		
		// update the corresponding card of the home video carousel
		homeCarousel.fireEvent("updatecard", {videoId: videoId, data: data});
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
		//commentsList.down("titlebar").setTitle(data.title);
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
            cls: 'loading-general',
			transparent: true
		});
		
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: webcrumbz.exportPath+'?json=tablet.add_comment',
            params: {
                type			: 'video',
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
	
	
	onRateVideoBtnTap: function(){
		var ratePanel = Ext.Viewport.down("ratePanel");
		if (ratePanel){
			ratePanel.destroy();
		}
		
		var detailsPanel = this.getDetailsPanel();
		
		ratePanel = Ext.create(this.getViewName('rate.RatePanel'), {opener: detailsPanel, postId: detailsPanel.getData().id, postRanking: detailsPanel.getData().ranking});
		Ext.Viewport.add(ratePanel);
		
		ratePanel.show('pop');
	},
	
	
	onShareVideoBtnTap: function(){
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
	
	
	onTweetVideoBtnTap: function(){
		var detailsPanel = this.getDetailsPanel();
		
		var webUrl = detailsPanel.getData().link;
		//var title = this.getData().title;
		var title = "Urmareste+acest+video:+";
		
		// open a new link
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);
	}
});