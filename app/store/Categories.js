Ext.define("LDPA.store.Categories", {
    extend: 'Ext.data.Store',
	requires: [
		'LDPA.proxy.Categories',
		'LDPA.model.Categories'
	],
    
	config: {
        model: 'LDPA.model.Categories',
		sorters: {
			property : 'sequence',
			direction: 'ASC'
		}
    },
	
	initialize: function(){
		var proxy = Ext.create("LDPA.proxy.Categories");
		this.setProxy(proxy);
	}
});
