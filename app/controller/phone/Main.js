var mainController;

Ext.define('LDPA.controller.phone.Main', {
    extend: 'Ext.app.Controller',
	
	requires: [
        'LDPA.store.ImagesOffline',
		'LDPA.store.ImagesLoadingList',
		'LDPA.store.Categories',
		'LDPA.store.CategoriesOffline',
		'LDPA.store.ArticlesOffline',
		'LDPA.store.VideosOffline',
		'LDPA.view.MainMask',
		'LDPA.view.phone.actions.ActionsList',
		'LDPA.view.phone.categories.Category',
		'LDPA.view.phone.categories.Search',
		'LDPA.view.phone.video.Video',
		'LDPA.view.phone.map.MapPanel'
	],
	
    config: {
		refs: {
          	mainView: '#mainView',
		},
        
        control: {
			
		}
    },
	
	init: function(){
		mainController = this;
		
		this.imagesOfflineStore = Ext.create("LDPA.store.ImagesOffline");				// offline images store
		this.categoriesStore = Ext.create("LDPA.store.Categories");
		this.categoriesOfflineStore = Ext.create("LDPA.store.CategoriesOffline");
		this.articlesOfflineStore = Ext.create("LDPA.store.ArticlesOffline");
		this.videosOfflineStore = Ext.create("LDPA.store.VideosOffline");
		this.imagesLoadingList = Ext.create("LDPA.store.ImagesLoadingList");
		
		
		this.categoriesOfflineStore.getModel().getProxy().dropTable();
		this.articlesOfflineStore.getModel().getProxy().dropTable();
		this.videosOfflineStore.getModel().getProxy().dropTable();
		this.imagesOfflineStore.getModel().getProxy().dropTable();
	},
		
	
	launch: function() {
		
		var self = this;
		var categoriesStore = this.categoriesStore;
		var categoriesOfflineStore = this.categoriesOfflineStore;
		var articlesOfflineStore = this.articlesOfflineStore;
		var videosOfflineStore = this.videosOfflineStore;
		var imagesOfflineStore = this.imagesOfflineStore;
		var imagesLoadingList = this.imagesLoadingList;
		
		
		categoriesOfflineStore.load(function(){
			articlesOfflineStore.load(function(){
				videosOfflineStore.load(function(){
					imagesOfflineStore.load(function(){
						
						// offline loading
						if (!LDPA.app.isOnline()){
							categoriesStore.add(categoriesOfflineStore.getRange());
							self.setActions();
						}
						// online loading
						else{
							// load categories
							categoriesStore.loadPage(1, {
								callback: function(records, operation){
									
									if (records.length > 0){
										// save categories for offline
										self.saveCategoriesForOffline(records);
									}
									// if there was an error with the server's response, then load the content from SQL Database
									else{
										categoriesStore.add(categoriesOfflineStore.getRange());
									}
									
									self.setActions();
								}
							});	
						}
					});	
				});
			});	
		});
	},
    
	
	setActions: function(){
	   	
		var categoriesStore = this.categoriesStore;
		
		if (categoriesStore.isLoaded() || categoriesStore.getCount() > 0){
			
			 // Destroy the #appLoadingIndicator element
        	Ext.fly('appLoadingIndicator').destroy();
			
			var profile = webcrumbz.profile.toLowerCase();
			
			// Initialize the actions panel
      		Ext.Viewport.add(Ext.create('LDPA.view.'+profile+'.Background', {zIndex: 1}));
		
			// Initialize the main panel
      		Ext.Viewport.add(Ext.create('LDPA.view.'+profile+'.Main', {zIndex: 2}));
				
			// set actions for each controller
			categoriesController.setActions(categoriesStore);
		}
	},
	
	
	saveCategoriesForOffline: function(records){
		var categoriesOfflineStore = this.categoriesOfflineStore;
		var newIds = [];
								
		// add records to local SQL DATABASE
		Ext.each(records, function(record){
			record.updateData();
			newIds.push(record.get("id"));
			
			var data = record.getData();
			var offlineRecord = categoriesOfflineStore.findRecord("categoryId", data.categoryId, 0, false, true, true);
			
			// update
			if (offlineRecord){
				offlineRecord.updateData(data);
			}
			// add
			else{
				var myRecord = Ext.create("LDPA.model.CategoriesOffline");
				myRecord.updateData(data);
			
				categoriesOfflineStore.add(myRecord);	
			}
		});
		
		
		// delete old records
		Ext.each(categoriesOfflineStore.getRange(), function(record){
			if (newIds.indexOf(record.get("categoryId")) == -1){
				categoriesOfflineStore.remove(record);
			}
		});
		
		// syncronize the categories offline store
		categoriesOfflineStore.sync();
	},
	
	
	// update category in local SQL DATABASE
	saveCategoryForOffline: function(record, categoryId){
		var categoriesOfflineStore = this.categoriesOfflineStore;
		var offlineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (offlineRecord){
			offlineRecord.updateData(record);
		}
		
		categoriesOfflineStore.sync();
	},
	
	
	// update articles in local SQL DATABASE
	saveArticlesForOffline: function(records, categoryId){
		var articlesOfflineStore = this.articlesOfflineStore;
		var categoriesStore = this.categoriesStore;
		var category = categoriesStore.findRecord("id",categoryId, 0, false, true, true);
		
		if (records.length > 0){
			var newIds = [];
			
			Ext.each(records, function(post){
				post.articleId = post.id;
				if (category){
					post.category = category.get("name");
					post.categoryId = categoryId;
				}
				delete post.id;
				
				newIds.push(post.articleId);
				
				var offlineRecord = articlesOfflineStore.findRecord("articleId", post.articleId, 0, false, true, true);
				
				// update
				if (offlineRecord){
					offlineRecord.updateData(post);
				}
				// add
				else{
					var myRecord = Ext.create("LDPA.model.ArticlesOffline", post);
					articlesOfflineStore.add(myRecord);	
				}
			})
			
			// delete old records
			Ext.each(articlesOfflineStore.getRange(), function(record){
				if (newIds.indexOf(record.get("articleId")) == -1 && record.get("categoryId") == categoryId){
					articlesOfflineStore.remove(record);
				}
			});
		}
		
		articlesOfflineStore.sync();	
	},
	
	
	saveArticleForOffline: function(post, articleId){
		// update articles in local SQL DATABASE
		var articlesOfflineStore = this.articlesOfflineStore;
		var offlineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		// update
		if (offlineRecord){
			offlineRecord.updateData(post);
			
			if (offlineRecord.get("categoryId") == 0){
				// search for the category id
				var category = this.categoriesStore.findRecord("name", offlineRecord.get("category"), 0, false, true, true);	
				if (category){
					offlineRecord.set("categoryId", category.get("categoryId"));
				}
			}
		}
		
		articlesOfflineStore.sync();
	},
	
	
	// update articles in local SQL DATABASE
	saveVideosForOffline: function(records){
		
		var videosOfflineStore = this.videosOfflineStore;
		var newIds = [];
								
		// add records to local SQL DATABASE
		Ext.each(records, function(record){
			record.updateData();
			newIds.push(record.get("id"));
			
			var data = record.getData();
			var offlineRecord = videosOfflineStore.findRecord("articleId", data.articleId, 0, false, true, true);
			
			// update
			if (offlineRecord){
				offlineRecord.updateData(data);
			}
			// add
			else{
				var myRecord = Ext.create("LDPA.model.VideoOffline");
				myRecord.updateData(data);
			
				videosOfflineStore.add(myRecord);	
			}
		});
		
		
		// delete old records
		Ext.each(videosOfflineStore.getRange(), function(record){
			if (newIds.indexOf(record.get("articleId")) == -1){
				videosOfflineStore.remove(record);
			}
		});
		
		// syncronize the video articles offline store
		videosOfflineStore.sync();
	},
	
	
	saveVideoForOffline: function(post, articleId){
		// update video articles in local SQL DATABASE
		var videosOfflineStore = this.videosOfflineStore;
		var offlineRecord = videosOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		// update
		if (offlineRecord){
			offlineRecord.updateData(post);
		}
		
		videosOfflineStore.sync();
	},
	
	
	saveImageForOffline: function(url){
		
		var imagesOfflineStore = this.imagesOfflineStore;
		var imagesLoadingList = this.imagesLoadingList;
		var record = imagesOfflineStore.findRecord("url", url, 0, false, true, true);
		
		if (!record || (record != null && !record.get("dataUrl"))){
			
			var id = (new Date()).getTime() + Math.floor(Math.random()*999999);
			
			imagesLoadingList.add({
				id: id,
				url: url,
				timestamp: new Date()
			})
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+"app/base64.php",
				params: {
					imgFilePath: url
				},
				success: function(result, request) {
					
					// create record
					if (!record){
						var item = Ext.create("LDPA.model.ImagesOffline", {
							url: url,
							dataUrl: result.data
						});
						imagesOfflineStore.add(item);
					}
					else{
						record.set("dataUrl", result.data);
					}
				}
			});
			
			this.waitImageToLoad();
		}	
	},
	
	waitImageToLoad: function(){
		var imagesOfflineStore = this.imagesOfflineStore;
		var imagesLoadingList = this.imagesLoadingList;
		
		if (this.interval){
			clearInterval(this.interval);
		}
		
		var me = this;
		this.interval = setInterval(function(){
			
			if (imagesLoadingList.getCount() > 0){
				Ext.each(imagesLoadingList.getRange(), function(record){
					var timer = (new Date()).getTime();
					var dif = (timer - record.get("timestamp").getTime()) / 1000;
					
					// wait 10 seconds for each image to finish converting
					if ( dif > 10 || record.get("status") == "completed"){
						imagesLoadingList.remove(record);	
					}
				})
			}
			else{
				clearInterval(me.interval);
				me.interval = null;
				
				imagesOfflineStore.sync();
			}
		}, 5000);
	}
	
});