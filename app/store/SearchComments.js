Ext.define("LDPA.store.SearchComments", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Comments',
    ],
	
	config: {
       	model: 'LDPA.model.Comments',
		sorters: {
			property : 'id',
			direction: 'ASC'
		}
		
    }
});
