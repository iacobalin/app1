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
		
		// show mask
		// ........
		
		categoriesOfflineStore.load(function(){
			articlesOfflineStore.load(function(){
				imagesOfflineStore.load(function(){
					
					// offline loading
					if (!LDPA.app.isOnline()){
						categoriesStore.add(categoriesOfflineStore.getRange());
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
	},
    
	
	setActions: function(){
	   	
		var categoriesStore = this.categoriesStore;
		
		if (categoriesStore.isLoaded()){
			
			// set actions for each controller
			categoriesController.setActions(categoriesStore);
		}
	},
	
	
	verifyResizeImage: function(width, height){
        var allowedInterval = webcrumbz.imageInterval;
        
        if (width < allowedInterval.minWidth || width > allowedInterval.maxWidth || height < allowedInterval.minHeight || height > allowedInterval.maxHeight){
            return true;
        }
        return false;
    }
});