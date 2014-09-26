Ext.define("LDPA.model.Articles", {
    extend: 'Ext.data.Model',
	requires: [
		
	],
	
	config: {
		fields: [
			{name: 'id',  			type: 'int'},
			{name: 'articleId',  	type: 'int'},
			{name: 'categoryId',  	type: 'int',			defaultValue: 0},
			{name: 'category',  	type: 'string', 		defaultValue: ""},
			{name: 'title',  		type: 'string'},
			{name: 'content',		type: 'string'},
			{name: 'comment_count', type: 'int'},
			{name: 'comment_link', 	type: 'string'},
			{name: 'ranking', 		type: 'string'},
			{name: 'comments', 		type: 'object'},
			{name: 'link', 			type: 'string'},
			
		],
		
		hasMany: {
			model: 'LDPA.model.Comments',
			name: 'comments',
			associationKey: 'comments'
		},
	},
	
	updateData: function(){
		this.set("articleId", this.get("id"));
	}
});
