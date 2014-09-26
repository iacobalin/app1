Ext.define("LDPA.view.phone.home.Home", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.phone.home.HomeView',
		'LDPA.view.phone.home.CategoryDetails',
		'LDPA.view.phone.home.ArticleDetails',
		'LDPA.view.phone.home.ResultsList'
    ],
    config: {
        
		id: 'homePanel',
		title: 'Caut&#259;',
		iconCls: 'search-icon',
		layout: 'card'
    },
	
	
	initialize: function(){
		
		// home view
		var item = Ext.create("LDPA.view.phone.home.HomeView");
		this.add(item);
		
		// category view
		var item = Ext.create("LDPA.view.phone.home.CategoryDetails");
		this.add(item);
		
		// article view
		var item = Ext.create("LDPA.view.phone.home.ArticleDetails");
		this.add(item);
		
		// results list
		var item = Ext.create("LDPA.view.phone.home.ResultsList");
		this.add(item);
		
		this.callParent(arguments);
	}
});
