Ext.define("LDPA.model.CategoriesOffline", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Sql',
	],	
		
	config: {
		fields: [
			{name: 'categoryId', 	type: 'int'},
			{name: 'name',  		type: 'string'},
			{name: 'description',   type: 'string',		defaultValue: ""},
			{name: 'image', 		type: 'string'},
			{name: 'sequence', 		type: 'int'}
		],
		
		hasMany: {
			model: 'LDPA.model.Articles',
			name: 'posts',
			associationKey: 'posts'
		},
		
		proxy: {
			type: 'sql',
			database: 'LDPA',
			table: 'Categories'
		}
	},
	
	updateData: function(data){
		for (prop in data){
			if (data[prop] != null && data[prop] != "" && prop != "id"){
				this.set(prop, data[prop]);
			}
		}
		
		var url = this.get('image');
		mainController.saveImageForOffline(url);
	}
});
