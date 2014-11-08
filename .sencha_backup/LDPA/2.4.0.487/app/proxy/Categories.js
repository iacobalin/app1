Ext.define('LDPA.proxy.Categories', {
    extend: 'Ext.data.proxy.JsonP',
    
	    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json='+(Ext.os.is.Phone ? 'mobile' : 'tablet')+'.categories',
		timeout: 7000,
		
        reader: {
            type: 'json',
            rootProperty: 'categories'
        }
    },


    processResponse: function(success, operation, request, response, callback, scope){
		
		if (response && response.categories && response.categories.length > 0){
			
			// process categories
			var categories = categoriesController.processCategories(response.categories);
			
			this.callParent([success, operation, request, categories, callback, scope]);
		}
		else{
			this.callParent([success, operation, request, response, callback, scope]);	
		}
	}
});