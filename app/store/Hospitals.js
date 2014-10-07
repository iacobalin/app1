Ext.define("LDPA.store.Hospitals", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Hospitals',
    ],
	
	config: {
       	model: 'LDPA.model.Hospitals',
		sorters: {
			property: 'distance',
			direction: 'ASC'
		}
	}
});
