Ext.define('LDPA.proxy.Comments', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.comments',
    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json=tablet.comments',
        timeout: 7000,
		
        reader: {
            type: 'json',
            rootProperty: 'comments'
        }
    },

    filterParam: undefined,

    /**
     * We need to add a slight customization to buildRequest - we're just checking for a filter on the
     * Operation and adding it to the request params/url, and setting the start/limit if paging
     */
    buildRequest: function(operation) {
      	
	   	var filter  = operation.getFilters(),
            params  = new Object();
		
		
		if (filter) {
            
			if (filter.articleId){
				Ext.apply(params, {
					id: filter.articleId,
					key: webcrumbz.key
				});
			}
			
			this.setExtraParams(params);
		}
		
		var request = this.callParent(arguments);

        return request;
    }
});