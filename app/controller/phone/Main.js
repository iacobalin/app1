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
		this.imagesLoadingList = Ext.create("LDPA.store.ImagesLoadingList");			// loading images store
		this.categoriesStore = Ext.create("LDPA.store.Categories");
		this.categoriesOfflineStore = Ext.create("LDPA.store.CategoriesOffline");
		this.articlesOfflineStore = Ext.create("LDPA.store.ArticlesOffline");
		this.videosOfflineStore = Ext.create("LDPA.store.VideosOffline");
		
		//this.categoriesOfflineStore.getModel().getProxy().dropTable();
		//this.articlesOfflineStore.getModel().getProxy().dropTable();
		//this.videosOfflineStore.getModel().getProxy().dropTable();
		//this.imagesOfflineStore.getModel().getProxy().dropTable();
	},
		
	
	launch: function() {
		
		var self = this;
		var categoriesStore = this.categoriesStore;
		var categoriesOfflineStore = this.categoriesOfflineStore;
		var articlesOfflineStore = this.articlesOfflineStore;
		var imagesOfflineStore = this.imagesOfflineStore;
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			disabled: true,
			spinner: true,
			closeFn: function(){
				
			}
		});
		
		Ext.Viewport.add(mask);
		mask.show();
		
		categoriesOfflineStore.load(function(){
			articlesOfflineStore.load(function(){
				imagesOfflineStore.load(function(){
					
					// offline loading
					if (!LDPA.app.isOnline()){
						mask.fireEvent("close");
						categoriesStore.add(categoriesOfflineStore.getRange());
						self.setActions();
					}
					// online loading
					else{
						// load categories
						categoriesStore.loadPage(1, {
							callback: function(records, operation){
								
								mask.fireEvent("close");
																
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
	},
    
	
	setActions: function(){
	   	
		var categoriesStore = this.categoriesStore;
		
		if (categoriesStore.isLoaded() || categoriesStore.getCount() > 0){
			
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
	}
});