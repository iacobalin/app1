Ext.define("LDPA.store.Comments", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Comments',
		'LDPA.proxy.Comments'
    ],
	
	config: {
       	model: 'LDPA.model.Comments',
		sorters: {
			property : 'id',
			direction: 'ASC'
		}
    },
	
	initialize: function(){
		var proxy = Ext.create("LDPA.proxy.Comments");
		this.setProxy(proxy);
	}
});
