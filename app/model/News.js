Ext.define("LDPA.model.News", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.JsonP'
	],
	
	config: {
		fields: [
			{name: 'id',  			type: 'int'},
			{name: 'title',  		type: 'string'},
			{name: 'image',			type: 'string'},
			{name: 'content',		type: 'string'},
			{name: 'comment_count', type: 'int'},
			{name: 'ranking', 		type: 'string'},
			{name: 'comments', 		type: 'object'},
			{name: 'link', 		type: 'string'},
		],
		
		hasMany: {
			model: 'LDPA.model.Comments',
			name: 'comments',
			associationKey: 'comments'
		},
		
		proxy: {
			type: 'jsonp',
			url : webcrumbz.exportPath+'?json=tablet.news',
			//url: 'data/News.json',
			reader: {
				type: 'json',
				rootProperty: 'news'
			}
		},
	},
});
