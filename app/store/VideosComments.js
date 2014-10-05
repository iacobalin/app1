Ext.define("LDPA.store.VideoComments", {
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
