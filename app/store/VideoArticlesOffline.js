Ext.define("LDPA.store.VideoArticlesOffline", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.VideoArticlesOffline',
    ],
	
	config: {
       	model: 'LDPA.model.VideoArticlesOffline',
		sorters: {
			property : 'articleId',
			direction: 'DESC'
		}
		
    }
});
