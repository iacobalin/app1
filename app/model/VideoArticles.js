Ext.define("LDPA.model.VideoArticles", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.JsonP'
	],
	
	config: {
		fields: [
			{name: 'id',  				type: 'int'},
			{name: 'articleId',  		type: 'int'},
			{name: 'title',  			type: 'string'},
			{name: 'video_link',		type: 'string'},
			{name: 'link',				type: 'string'},
			{name: 'image',				type: 'string'},
			{name: 'featured_image',	type: 'string'},
			{name: 'comment_count', 	type: 'int'},
			{name: 'comment_link', 		type: 'string'},
			{name: 'ranking', 			type: 'string'},
			{name: 'content', 			type: 'string'},
			{name: 'comments', 			type: 'object'},
		],
		
		hasMany: {
			model: 'LDPA.model.Comments',
			name: 'comments',
			associationKey: 'comments'
		},
		
		proxy: {
			type: 'jsonp',
			url : webcrumbz.exportPath+'?json='+(Ext.os.is.Phone ? 'mobile' : 'tablet')+'.video_lessons',
			//url : 'data/Video.json',
			timeout: 7000,
			reader: {
				type: 'json',
				rootProperty: 'posts'
			}
		},
	},
	
	updateData: function(){
		this.set("articleId", this.get("id"));
	}
});
