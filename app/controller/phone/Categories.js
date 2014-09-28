var categoriesController;

Ext.define('LDPA.controller.phone.Categories', {
    extend: 'Ext.app.Controller',
	
	requires:[
		'Ext.util.DelayedTask',
		'LDPA.proxy.Articles'
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            categoriesList: "#mainView #categoriesList"
        },
		
		control: {
			categoriesList: {
				itemtap: 'onCategoriesListItemTap'	
			}
		}
    },
	
	
	init: function() {
		categoriesController = this;
    },
	
	launch: function() {
		
    },
	
	
	processCategories: function(categories){
		Ext.each(categories, function(category){
			category.categoryId = category.id;
			category.sequence = category.order;
		});
		
		return categories;
	},
	
	
	setActions: function(categoriesStore){
		var categoriesList = this.getCategoriesList();
		
		// add content
		categoriesList.getStore().add(categoriesStore.getRange());
	},
	
	
	onCategoriesListItemTap: function(list, index, item, record){
		
		var self = this;
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			closeFn: function(){
				//categoryDetails.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create credits panel
		var profile = webcrumbz.profile.toLowerCase();
		var categoryDetails = Ext.create("LDPA.view."+profile+".categories.Category", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(categoryDetails);
		
		mask.show();
		
		
		var categoryId = record.get("categoryId");
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// show category from offline			
			this.showCategoryFromOffline(categoryId);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.category',
				params: {
					id: categoryId,
					format: 'json',
				},
				failure: function(){
					// show category from offline			
					self.showCategoryFromOffline(categoryId);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					// add content
					categoryDetails.down("#categoryPanel").fireEvent("addcontent", result);
					
					// save categories for offline
					//self.saveCategoryForOffline(result, categoryId);
					
					// save articles for offline
					//self.saveArticlesForOffline(result.posts, categoryId);
					
					// show category
					categoryDetails.show();
				}
			});	
		}
	}
});