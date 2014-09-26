Ext.define("LDPA.view.tablet.home.CategoriesList", {
    extend: 'Ext.List',
	
	config: {
        id: 'categoriesList',
		store: 'Categories',
		styleHtmlContent: true,
		scrollable: {
			direction: 'horizontal',
            indicators: false
		},
		inline: {
			wrap: false	
		},
		cls: 'home-categories-list',
		itemCls: '',
        pressedCls: 'item-pressed',
		itemTpl: new Ext.XTemplate('<tpl if="image">',
                                        '<img class="item-image" src="http://src.sencha.io/100/60/{image}" />',
                                        //'<div class="item-image"></div>',
                                    '</tpl>',
                                    '<tpl if="image.length == 0">',
                                        '<div class="item-image"></div>',
                                    '</tpl>',
                                    '<div class="item-name">{name}</div>'),
		emptyText: 'Nu exist&#259; categorii!',
        selectedCls: '',
		
		margin: "15px 0 0 0",
		padding: 0,
        height: 130
	},
	
	
	initialize: function(){
		this.callParent(arguments);
	}
	
});
