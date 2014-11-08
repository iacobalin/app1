Ext.define("LDPA.store.Quiz", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Quiz',
    ],
	
	config: {
       	model: 'LDPA.model.Quiz',
		sorters: {
			property : 'id',
			direction: 'ASC'
		}
		
    }
});
