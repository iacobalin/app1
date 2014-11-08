Ext.define("LDPA.view.phone.categories.Category", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.phone.categories.CategoryPanel',
		'LDPA.view.phone.categories.ArticlePanel'
	],
	
	config: {
		
		itemId: "categoryView",
				
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
		
		var categoryPanel = Ext.create("LDPA.view.phone.categories.CategoryPanel");
		this.add(categoryPanel);
		
		var articlePanel = Ext.create("LDPA.view.phone.categories.ArticlePanel");
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
});
