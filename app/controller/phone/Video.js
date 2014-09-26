Ext.define('LDPA.controller.phone.Video', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            videoPanel: '#videoPanel',
			videoList: '#videoPanel #videoList',
			videoDetails: '#videoPanel #videoDetails'
        },
		
		control: {
			videoList: {
				itemtap: 'onVideoListItemTap',
				showpost: 'showPostById'	
			}
		}
    },
	
	
	launch: function() {
       	var self = this;
		var videoOfflineStore = Ext.getStore("VideoArticlesOffline");
		var imagesOfflineStore = Ext.getStore("ImagesOffline");
		
		videoOfflineStore.load(function(){
			imagesOfflineStore.load(function(){
				
				// offline loading
				if (!LDPA.app.isOnline()){
					Ext.getStore('VideoArticles').add(videoOfflineStore.getRange());
				}
				// online loading
				else{
					var store = Ext.getStore('VideoArticles').load(function(records){
						if (records.length > 0){
							// save video articles for offline
							self.saveArticlesForOffline(records);
						}
						// if there was an error with the server's response, then load the content from SQL Database
						else{
							store.add(videoOfflineStore.getRange());
						}						
					});
				}
			});
		});
	},
	
    
	onVideoListItemTap: function(list, index, item, record){
		list.fireEvent("showpost", record.get("articleId"));
	},
	
	
    showPostById: function(id) {
        var self = this;
		var videoPanel = this.getVideoPanel();
		var videoList = this.getVideoList();
		var videoDetails = this.getVideoDetails();
		
		
		videoPanel.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general'
		});
		
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// show video article from offline
			this.showArticleFromOffline(id);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.video_lesson',
				params: {
					id: id,
					format: 'json'
				},
				failure: function(){
					// show video article from offline
					self.showArticleFromOffline(id);
				},
				success: function(result, request) {
					videoPanel.unmask();
					
					// save article for offline
					self.saveArticleForOffline(result.post, id);
					
								
					// update values
					videoDetails.setData(result.post);
					
					var scroller = videoDetails.getScrollable().getScroller();
					scroller.scrollTo(0,0);
									
					// activate card
					videoPanel.animateActiveItem(videoDetails, {type: 'slide', direction: 'left'});
				}
			});	
		}
    },
	
	
	saveArticlesForOffline: function(records){
		
		var videoOfflineStore = Ext.getStore("VideoArticlesOffline");
		var newIds = [];
								
		// add records to local SQL DATABASE
		Ext.each(records, function(record){
			record.updateData();
			newIds.push(record.get("id"));
			
			var data = record.getData();
			var offlineRecord = videoOfflineStore.findRecord("articleId", data.articleId, 0, false, true, true);
			
			// update
			if (offlineRecord){
				offlineRecord.updateData(data);
			}
			// add
			else{
				var myRecord = Ext.create("LDPA.model.VideoArticlesOffline");
				myRecord.updateData(data);
			
				videoOfflineStore.add(myRecord);	
			}
		});
		
		
		// delete old records
		Ext.each(videoOfflineStore.getRange(), function(record){
			if (newIds.indexOf(record.get("articleId")) == -1){
				videoOfflineStore.remove(record);
			}
		});
		
		// syncronize the video articles offline store
		videoOfflineStore.sync();
	},
	
	
	saveArticleForOffline: function(post, articleId){
		// update video articles in local SQL DATABASE
		var videoOfflineStore = Ext.getStore("VideoArticlesOffline");
		var offlineRecord = videoOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		// update
		if (offlineRecord){
			offlineRecord.updateData(post);
		}
		
		videoOfflineStore.sync();
	},
	
	showArticleFromOffline: function(articleId){
		var videoPanel = this.getVideoPanel();
		var videoList = this.getVideoList();
		var videoDetails = this.getVideoDetails();
		
		var videoOfflineStore = Ext.getStore("VideoArticlesOffline");
		var offlineRecord = videoOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		if (offlineRecord){
			// update values
			videoDetails.setData(offlineRecord.getData());
			
			var scroller = videoDetails.getScrollable().getScroller();
			scroller.scrollTo(0,0);
							
			// activate card
			videoPanel.animateActiveItem(videoDetails, {type: 'slide', direction: 'left'});
		}
		
		videoPanel.unmask();	
	}
});