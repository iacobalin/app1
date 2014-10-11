Ext.define("LDPA.store.Articles", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Articles',
    ],
	
	config: {
       	model: 'LDPA.model.Articles'
    },
	
	initialize: function(){
		var proxy = Ext.create("LDPA.proxy.Articles");
		this.setProxy(proxy);
	}
});
