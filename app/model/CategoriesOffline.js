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
		
		this.setOfflineImage();
	},
	
	setOfflineImage: function(){
		var url = this.get('image');
		var imagesOffline = mainController.imagesOffline;
		var imagesLoadingList = mainController.imagesLoadingList;
		
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
			script.setAttribute("src", "http://src.sencha.io/data.LDPA.app.setOfflineImage-" + scriptId + "/" + "http://src.sencha.io/290/"+url);
			document.body.appendChild(script);	
		}
	}
});
