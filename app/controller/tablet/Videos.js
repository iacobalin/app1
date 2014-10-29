var videosController;

Ext.define('LDPA.controller.tablet.Videos', {
    extend: 'Ext.app.Controller',
	
	requires:[
		
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            videoView: {
				selector: "#videoView",
				autoCreate: true	
			},
			videosList: {
				selector: "#videoView #videosList",
				autoCreate: true	
			},
			videoPanel: {
				selector: "#videoView #videoPanel",
				autoCreate: true	
			}
        },
		
		control: {
			videosList: {
				itemtap: 'onVideosListItemTap'	
			}
		}
    },
	
	
	init: function() {
		videosController = this;
    },
	
	launch: function() {
		
    },
	
	
	processVideos: function(videos){
		Ext.each(videos, function(video){
			video.articleId = video.id;
		});
		
		return videos;
	},
	
	
	showVideos: function(){
		
		if (!Ext.Viewport.down("#videoView")){
			
			// create mask
			var mask = Ext.create("LDPA.view.MainMask", {
				disabled: true,
				spinner: true,
				closeFn: function(){
					
				}
			});
			
			Ext.Viewport.add(mask);
			
			mask.show();
			
			
			// create video panel
			var profile = webcrumbz.profile.toLowerCase();
			var videoView = Ext.create("LDPA.view."+profile+".video.Video", {
				mask: mask,
				zIndex: mask.getZIndex()+1
			});
			
			Ext.Viewport.add(videoView);
				
			
			// offline
			if (!LDPA.app.isOnline()){
				mask.fireEvent("close");
				
				var videosList = videoView.down("#videosList");
				var videosOfflineStore = mainController.videosOfflineStore;
				videosList.getStore().add(videosOfflineStore.getRange());
				
				videoView.show();
			}
			// online
			else{
				var self = this;
				var videosList = videoView.down("#videosList");
				
				videosList.getStore().loadPage(1, {
					callback: function(records){
						
						mask.fireEvent("close");
						videoView.show();
						
						if (records.length > 0){
							// save video articles for offline
							mainController.saveVideosForOffline(records);
						}
						// if there was an error with the server's response, then load the content from SQL Database
						else{
							videosList.getStore().add(videosOfflineStore.getRange());
						}	
					}
				})
			}
		}
		else{
			Ext.Viewport.down("#videoView").show();
		}
	},
	
	
	onVideosListItemTap: function(list, index, item, record){
		
		var videoPanel = this.getVideoPanel();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				
			}
		});
		
		Ext.Viewport.add(mask);
		videoPanel.setMask(mask);
		
		mask.show();
		
		// show article
		var articleId = record.get("articleId") || record.get("id");
		this.showArticle(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var videoView = this.getVideoView();
		var videoPanel = this.getVideoPanel();
		var mask = videoPanel.getMask();
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// hide mask
			mask.fireEvent("close");
			
			// show article from offline			
			this.showArticleFromOffline(articleId);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.video_lesson',
				params: {
					id: articleId,
					format: 'json',
				},
				failure: function(){
					// hide mask
					mask.fireEvent("close");
					
					// show video article from offline
					self.showArticleFromOffline(id);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
					
					// save article for offline
					mainController.saveVideoForOffline(result.post, articleId);
					
					result.post.articleId = result.post.id;
					
					// add content
					videoPanel.fireEvent("addcontent", result.post);	
					
					// show video panel
					videoView.animateActiveItem(videoPanel, {type: "slide", direction: "left"})
				}
			});	
		}
	},
	
	
	showArticleFromOffline: function(articleId){
		var self = this;
		var videoView = this.getVideoView();
		var videoPanel = this.getVideoPanel();
		
		var videosOfflineStore = mainController.videosOfflineStore;
		var offlineRecord = videosOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		if (offlineRecord){
			var imagesOfflineStore = mainController.imagesOfflineStore;
			var content = offlineRecord.get("content");
			
			// update values
			var data = offlineRecord.getData();
			
			// add content
			videoPanel.fireEvent("addcontent", data);	
			
			// show article panel
			videoView.animateActiveItem(videoPanel, {type: "slide", direction: "left"});
		}
	}
});