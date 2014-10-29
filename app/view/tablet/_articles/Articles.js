Ext.define("LDPA.view.tablet.articles.Articles", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.tablet.articles.CategoriesList',
		'LDPA.view.tablet.articles.CategoryDetails',
		'LDPA.view.tablet.articles.ArticleDetails',
		'LDPA.view.tablet.articles.ArticleComments',
		'LDPA.view.tablet.articles.ArticlesList'
    ],
    config: {
		
		itemId: 'articlesPanel',
		title: 'Solu&#355;ii de prim ajutor',
		iconCls: 'user_add',
		
		layout:{
			type: 'card'
		},

        cls: 'articles-box',
		
		margin: 0,
		padding: 0
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var categoriesList = Ext.create("LDPA.view.tablet.articles.CategoriesList");
		
		var group = Ext.create("Ext.Panel",{
			cls: 'articles-box',
			items: [
				Ext.create("Ext.Panel",{
					cls: 'articles-section-1',
					layout: {
						type: 'card'
					},
					items: [
						Ext.create("LDPA.view.tablet.articles.CategoryDetails"),
						Ext.create("LDPA.view.tablet.articles.ArticleDetails"),
						Ext.create("LDPA.view.tablet.articles.ArticleComments")
					]
				}),
				Ext.create("LDPA.view.tablet.articles.ArticlesList")
			]
		});
			
		this.add([categoriesList, group]);
	}
});
