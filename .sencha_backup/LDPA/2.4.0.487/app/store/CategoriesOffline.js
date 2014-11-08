Ext.define("LDPA.store.CategoriesOffline", {
    extend: 'Ext.data.Store',
	requires: [
		'LDPA.model.CategoriesOffline'
	],
    
	config: {
        storeId: 'CategoriesOffline',
		model: 'LDPA.model.CategoriesOffline',
		sorters: {
			property : 'sequence',
			direction: 'ASC'
		},
		pageSize: 500
    }
});
