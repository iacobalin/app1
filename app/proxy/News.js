Ext.define('LDPA.proxy.News', {
    extend: 'Ext.data.proxy.JsonP',
    
	    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json='+(Ext.os.is.Phone ? 'mobile' : 'tablet')+'.news',
		timeout: 7000,
		
        reader: {
            type: 'json',
            rootProperty: 'news'
        }
    },


    processResponse: function(success, operation, request, response, callback, scope){
		
		if (response && response.news && response.news.length > 0){
			
			// process news
			var news = newsController.processNews(response.news);
			
			this.callParent([success, operation, request, news, callback, scope]);
		}
		else{
			this.callParent([success, operation, request, response, callback, scope]);	
		}
	}
});