Ext.define("LDPA.model.Categories", {
    extend: 'Ext.data.Model',
	requires: [
		'LDPA.model.Articles'
	],
	
	config: {
		fields: [
			{name: 'id',  			type: 'int'},
			{name: 'categoryId',	type: 'int'},
			{name: 'name',  		type: 'string'},
			{name: 'description',   type: 'string'},
			{name: 'image', 		type: 'string'},
			{name: 'order', 		type: 'int'},
			{name: 'sequence', 		type: 'int'},
			{name: 'posts', 		type: 'object'},
		],
		
		hasMany: {
			model: 'LDPA.model.Articles',
			name: 'posts',
			associationKey: 'posts'
		}
	},
	
	/*updateData: function(){
		this.set("categoryId", this.get("id"));
		this.set("sequence", this.get("order"));
	}*/
});
