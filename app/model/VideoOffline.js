Ext.define("LDPA.model.VideoOffline", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Sql',
	],
	
	config: {
		fields: [
			{name: 'articleId',  		type: 'int'},
			{name: 'title',  			type: 'string'},
			{name: 'video_link',		type: 'string',			defaultValue: ""},
			{name: 'link',				type: 'string',			defaultValue: ""},
			{name: 'image',				type: 'string',			defaultValue: ""},
			{name: 'featured_image',	type: 'string',			defaultValue: ""},
			{name: 'comment_count', 	type: 'int',			defaultValue: 0},
			{name: 'comment_link', 		type: 'string',			defaultValue: ""},
			{name: 'ranking', 			type: 'string', 		defaultValue: 0},
			{name: 'content', 			type: 'string', 		defaultValue: ""}
		],
		
		proxy: {
			type: 'sql',
			database: 'LDPA',
			table: 'Videos'
		}
	},
	
	updateData: function(data){
		for (prop in data){
			if (data[prop] != null && data[prop] != "" && prop != "id"){
				this.set(prop, data[prop]);
			}
		}
		
		var url = this.get('image') || this.get("featured_image");
		mainController.saveImageForOffline(url);
	}
});
