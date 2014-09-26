Ext.define("LDPA.model.ArticlesOffline", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Sql',
	],
	
	config: {
		fields: [
			{name: 'articleId',  	type: 'int'},
			{name: 'categoryId',  	type: 'int',			defaultValue: 0},
			{name: 'category',  	type: 'string', 		defaultValue: ""},
			{name: 'title',  		type: 'string'},
			{name: 'content',		type: 'string', 		defaultValue: ""},
			{name: 'comment_count', type: 'int',			defaultValue: 0},
			{name: 'comment_link', 	type: 'string',			defaultValue: ""},
			{name: 'ranking', 		type: 'string',			defaultValue: 0},
			{name: 'link', 			type: 'string',			defaultValue: ""}
		],
		
		proxy: {
			type: 'sql',
			database: 'LDPA',
			table: 'Articles'
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
		var imagesOffline = LDPA.app.imagesOffline;
		var imagesLoadingList = LDPA.app.imagesLoadingList;
		var content = this.get("content");
		
		if (content){		
			var srcs = content.match(/src\=\"[a-zA-Z0-9\:\/\.\-\%\_]+\.(jpg|png|gif)\"/g);
			Ext.each(srcs, function(src){
				src = src.replace('src="',"");
				src = src.replace('"',"");
				
				var record = imagesOffline.findRecord("url", src, 0, false, true, true);
				if (!record){
					var scriptId = Math.floor(Math.random()*999999);
					var script = document.createElement("script");
					
					imagesLoadingList.add({
						scriptId: scriptId,
						url: src,
						timestamp: new Date()
					})
					
					script.setAttribute("type","text/javascript");
					script.setAttribute("id","script-"+scriptId);
					script.setAttribute("data-image-url",encodeURIComponent(src));
					script.setAttribute("src", "http://src.sencha.io/data.LDPA.app.setOfflineImage-" + scriptId + "/" + "http://src.sencha.io/290/"+src);
					document.body.appendChild(script);	
				}
			});
		}
	}
});
