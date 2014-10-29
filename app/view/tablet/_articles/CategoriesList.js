Ext.define("LDPA.view.tablet.articles.CategoriesList", {
    extend: 'Ext.List',
	
	config: {
        itemId: 'categoriesList',
		store: 'Categories',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,
		
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		
		cls: "categories-list",

		itemCls: 'categories-list-item',
		itemTpl: new Ext.XTemplate(
            '<tpl if="image">',
                '<img class="item-image" src="http://src.sencha.io/150/100/{image}" />',
            '</tpl>',
            '<tpl if="image.length == 0">',
                '<div class="item-image"></div>',
            '</tpl>',
            '<div class="item-name">{name}</div>'),
		
		emptyText: 'Nu exist&#259; categorii!',
        pressedCls: "item-pressed",
        selectedCls: '',

		margin: 0
	},
	
	
	initialize: function(){
		this.callParent(arguments);
	}
});
