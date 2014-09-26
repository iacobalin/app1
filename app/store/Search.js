Ext.define("LDPA.store.Search", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Articles',
		'LDPA.proxy.Articles',
    ],
	
	config: {
       	model: 'LDPA.model.Articles',
		/*sorters: {
			property : 'id',
			direction: 'DESC'	
		},*/
				
		proxy: {
			type: 'articles'
		}
    }
});
