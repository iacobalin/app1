Ext.define("LDPA.model.VideoArticlesOffline", {
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
			table: 'VideoArticles'
		}
	},
	
	updateData: function(data){
		for (prop in data){
			if (data[prop] != null && data[prop] != "" && prop != "id"){
				this.set(prop, data[prop]);
			}
		}
		
		this.setOfflineImage();
	},
	
	setOfflineImage: function(){
		var url = this.get('image') || this.get("featured_image");
		var imagesOffline = LDPA.app.imagesOffline;
		var imagesLoadingList = LDPA.app.imagesLoadingList;
		
		var record = imagesOffline.findRecord("url", url, 0, false, true, true);
		if (!record){
			var scriptId = Math.floor(Math.random()*999999);
			var script = document.createElement("script");
			
			imagesLoadingList.add({
				scriptId: scriptId,
				url: url,
				timestamp: new Date()
			})
			
			script.setAttribute("type","text/javascript");
			script.setAttribute("id","script-"+scriptId);
			script.setAttribute("data-image-url", encodeURIComponent(url));
			script.setAttribute("src", "http://src.sencha.io/data.LDPA.app.setOfflineImage-" + scriptId + "/" + "http://src.sencha.io/300/"+url);
			document.body.appendChild(script);	
		}
	}
});
