Ext.define('LDPA.proxy.Articles', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.articles',
    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json='+((Ext.os.is.Phone)? 'mobile' : 'tablet') +'.search',
        timeout: 7000,
		
        reader: {
            type: 'json',
            rootProperty: 'posts'
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
            
			if (filter.query){
				Ext.apply(params, {
					q: filter.query,
					key: webcrumbz.key
				});
			}
			
			this.setExtraParams(params);
		}
		
		var request = this.callParent(arguments);

        return request;
    }
});