Ext.define("LDPA.store.VideosOffline", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.VideoOffline',
    ],
	
	config: {
       	model: 'LDPA.model.VideoOffline',
		sorters: {
			property : 'articleId',
			direction: 'DESC'
		}
		
    }
});
