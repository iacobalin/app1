Ext.define("LDPA.store.ImagesLoadingList", {
    extend: 'Ext.data.ArrayStore',
	requires: [
		'Ext.data.reader.Array'
	],
	    
	config: {
        pageSize: 500,
		fields: [
		   {name: 'id', 		type: 'auto'},
		   {name: 'url', 		type: 'string'},
		   {name: 'timestamp', 	type: 'date'},
		   {name: 'status', 	type: 'string',		defaultValue: "pending"}			// pending, completed
		],
		autoLoad: true
    }
});
