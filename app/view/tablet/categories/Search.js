Ext.define("LDPA.view.tablet.categories.Search", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.categories.SearchList',
		'LDPA.view.tablet.categories.ArticlePanel'
	],
	
	config: {
		
		itemId: "searchView",
				
		// custom properties
		mask: null,
		
								
		// css properties
		layout: {
			type: 'card'	
		},
		width: "100%",
		height: "100%",
						
		// properties
		scrollable: null,
		hidden: true,
		showAnimation: {
			type: "popIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "popOut",
			duration: 400,
			easing: "in"
		},
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var searchList = Ext.create("LDPA.view.tablet.categories.SearchList");
		this.add(searchList);
		
		var articlePanel = Ext.create("LDPA.view.tablet.categories.ArticlePanel", {
			fromSearch: true	
		});
		this.add(articlePanel);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy(true);	
		}, 400);
	},
	
	onCloseBtnTap: function(){
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	},
});
