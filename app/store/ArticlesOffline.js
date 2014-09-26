Ext.define("LDPA.store.ArticlesOffline", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.ArticlesOffline',
    ],
	
	config: {
       	model: 'LDPA.model.ArticlesOffline'
    }
});
