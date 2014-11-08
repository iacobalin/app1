Ext.define("LDPA.store.ImagesOffline", {
    extend: 'Ext.data.Store',
	requires: [
		'LDPA.model.ImagesOffline'
	],
    
	config: {
        storeId: 'ImagesOffline',
		model: 'LDPA.model.ImagesOffline',
		pageSize: 500
    }
});
