Ext.define("LDPA.model.ImagesOffline", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Sql',
	],	
		
	config: {
		fields: [
			{name: 'url',  			type: 'string'},
			{name: 'dataUrl', 		type: 'string'}
		],
		
		proxy: {
			type: 'sql',
			database: 'LDPA',
			table: 'Images'
		}
	}
});
