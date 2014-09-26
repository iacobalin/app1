Ext.define("LDPA.store.VideoArticles", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.VideoArticles',
    ],
	
	config: {
       	model: 'LDPA.model.VideoArticles',
		sorters: {
			property : 'articleId',
			direction: 'DESC'
		}
		
    }
});
