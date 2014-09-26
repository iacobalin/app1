Ext.define("LDPA.model.Hospitals", {
    extend: 'Ext.data.Model',
	
	
	config: {
		fields: [
			{name: 'id',  			type: 'string'},
			{name: 'name',  		type: 'string'},
			{name: 'address',		type: 'string'},
			{name: 'phone',			type: 'string'},
			{name: 'website',		type: 'string'},
			{name: 'distance',		type: 'float'},
			{name: 'lat',			type: 'float'},
			{name: 'lng',			type: 'float'},
		],
	}
});
