var videosController;

Ext.define('LDPA.controller.phone.Videos', {
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
			
			// offline
			if (!LDPA.app.isOnline()){
				mask.fireEvent("close");
				
				alert(webcrumbz.offlineMsg);
			}
			// online
			else{
				
				// create video panel
				var profile = webcrumbz.profile.toLowerCase();
				var videoView = Ext.create("LDPA.view."+profile+".video.Video", {
					mask: mask,
					zIndex: mask.getZIndex()+1
				});
				
				Ext.Viewport.add(videoView);
				
				var videosList = videoView.down("#videosList");
				videosList.getStore().loadPage(1, {
					callback: function(){
						
						mask.fireEvent("close");
						videoView.show();	
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
		var articleId = record.get("id");
		this.showArticle(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var videoView = this.getVideoView();
		var videoPanel = this.getVideoPanel();
		var mask = videoPanel.getMask();
		
		// offline loading
		if (!LDPA.app.isOnline()){
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
					// show video article from offline
					self.showArticleFromOffline(id);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
					
					// save article for offline
					//self.saveArticleForOffline(result.post, articleId);
					
					//result.post.content = result.post.content.replace(/src=\"/gi,'src="http://src.sencha.io/-10/');
					result.post.articleId = result.post.id;
					
					// add content
					videoPanel.fireEvent("addcontent", result.post);	
					
					// show video panel
					videoView.animateActiveItem(videoPanel, {type: "slide", direction: "left"})
				}
			});	
		}
	},
});