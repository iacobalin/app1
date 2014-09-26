Ext.define('LDPA.proxy.Articles', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.articles',
    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json='+((Ext.os.is.Phone)? 'mobile' : 'tablet') +'.search',
        
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
      	
	   	var request = this.callParent(arguments),
            filter  = operation.getFilters(),
            params  = request.getParams();
		
        Ext.apply(params, {
            page: operation.getPage()
        });
		
        if (filter) {
            delete params.filter;
            Ext.apply(params, {
                q: filter.q,  // pass in the query string to the search api
				key: filter.key
            });

            request.setParams(params);
            request.setUrl(this._url);
			
            // As we're modifiying the request params, we need to regenerate the url now
            request.setUrl(this.buildUrl(request));
        }

        return request;
    }
});