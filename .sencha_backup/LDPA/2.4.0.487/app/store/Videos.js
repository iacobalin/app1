Ext.define("LDPA.store.Videos", {
    extend: 'Ext.data.Store',
	requires: [
        'LDPA.model.Video',
		'LDPA.proxy.Videos'
    ],
	
	config: {
       	model: 'LDPA.model.Video',
		sorters: {
			property : 'articleId',
			direction: 'DESC'
		}
    },
	
	initialize: function(){
		var proxy = Ext.create("LDPA.proxy.Videos");
		this.setProxy(proxy);
	}
});
