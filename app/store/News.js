Ext.define("LDPA.store.News", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.News',
    ],
	
	config: {
       	model: 'LDPA.model.News',
		sorters: {
			property : 'id',
			direction: 'DESC'
		}
	}
});
