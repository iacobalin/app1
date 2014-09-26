Ext.define("LDPA.store.ImagesLoadingList", {
    extend: 'Ext.data.ArrayStore',
	requires: [
		'Ext.data.reader.Array'
	],
	    
	config: {
        fields: [
		   {name: 'scriptId', 	type: 'int'},
		   {name: 'url', 		type: 'string'},
		   {name: 'timestamp', 	type: 'date'},
		   {name: 'status', 	type: 'string',		defaultValue: "pending"}
		],
		pageSize: 500
    }
});
