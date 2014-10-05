Ext.define("LDPA.view.phone.home.HomeView", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'LDPA.view.phone.home.SearchBar',
		'LDPA.view.phone.home.CategoriesList'
    ],
    config: {
        
		id: 'homeView',
		styleHtmlContent: true,
		scrollable: null,
		layout: 'fit',
		
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'LDPA',
                cls: 'home-toolbar'
			}
		]
    },
	
	
	initialize: function(){
		
		// search bar
		var item = Ext.create("LDPA.view.phone.home.SearchBar", {
			docked: 'top'
		});
		this.add(item);
		
		// categories list
		var item = Ext.create("LDPA.view.phone.home.CategoriesList", {
			flex: 1
		});
		this.add(item);
		
		this.callParent(arguments);
	}
});
