Ext.define("LDPA.store.News", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.News',
		'LDPA.proxy.News'
    ],
	
	config: {
       	model: 'LDPA.model.News',
		sorters: {
			property : 'id',
			direction: 'DESC'
		}
	},
	
	initialize: function(){
		var proxy = Ext.create("LDPA.proxy.News");
		this.setProxy(proxy);
	}
});
