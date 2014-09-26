var categoriesController;

Ext.define('LDPA.controller.Categories', {
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
	}
});