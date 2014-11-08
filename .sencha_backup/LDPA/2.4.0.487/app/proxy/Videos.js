Ext.define('LDPA.proxy.Videos', {
    extend: 'Ext.data.proxy.JsonP',
    
	    
    config: {
        // This is the url we always query when searching for posts
        url: webcrumbz.exportPath+'?json='+(Ext.os.is.Phone ? 'mobile' : 'tablet')+'.video_lessons',
		timeout: 7000,
		
        reader: {
            type: 'json',
            rootProperty: 'posts'
        }
    },


    processResponse: function(success, operation, request, response, callback, scope){
		
		if (response && response.posts && response.posts.length > 0){
			
			// process videos
			var videos = videosController.processVideos(response.posts);
			
			this.callParent([success, operation, request, videos, callback, scope]);
		}
		else{
			this.callParent([success, operation, request, response, callback, scope]);	
		}
	}
});