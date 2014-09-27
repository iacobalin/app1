var mainController;

Ext.define('LDPA.controller.Main', {
    extend: 'Ext.app.Controller',
	
	requires: [
        'LDPA.store.ImagesOffline',
		'LDPA.store.ImagesLoadingList',
		'LDPA.store.Categories',
		'LDPA.store.CategoriesOffline',
		'LDPA.view.MainMask',
		'LDPA.view.phone.actions.ActionsList',
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
		
		this.imagesOffline = Ext.create("LDPA.store.ImagesOffline");				// offline images store
		this.imagesLoadingList = Ext.create("LDPA.store.ImagesLoadingList");		// loading images store
		this.categoriesStore = Ext.create("LDPA.store.Categories");
		this.categoriesOfflineStore = Ext.create("LDPA.store.CategoriesOffline");
	},
		
	
	launch: function() {
		
		var self = this;
		var categoriesStore = this.categoriesStore;
		
		if (LDPA.app.isOnline()){
			// load categories
			categoriesStore.loadPage(1, {
				callback: function(records, operation){
					self.setActions();
				}
			});	
		}
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