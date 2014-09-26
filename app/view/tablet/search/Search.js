Ext.define("LDPA.view.tablet.search.Search", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.tablet.search.ArticleDetails',
		'LDPA.view.tablet.search.ArticleComments',
		'LDPA.view.tablet.search.ArticlesList'
    ],
    config: {
        
		itemId: 'searchPanel',
		title: 'Caut&#259;',
		iconCls: 'search',
		
		layout:{
			type: 'card'
		},

        cls: 'search-box',
		
		margin: 0,
		padding: 0
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var emptyCard = Ext.create("Ext.Component",{
			itemId: 'emptyCard',
			cls: 'no-results',
			tpl: new Ext.XTemplate('<p>Nu exist&#259; rezultate pentru: <span style="color:red">{query}</span></p>')
		});
		
		var group = Ext.create("Ext.Panel",{
			cls: 'articles-box',
			items: [
				Ext.create("Ext.Panel",{
					cls: 'articles-section-1',
					layout: {
						type: 'card'
					},
					items: [
						Ext.create("LDPA.view.tablet.search.ArticleDetails"),
						Ext.create("LDPA.view.tablet.search.ArticleComments")
					]
				}),
				Ext.create("LDPA.view.tablet.search.ArticlesList",{
					itemId: 'searchArticlesList'		   
				})
			]
		});
		
		this.add([emptyCard, group]);
	}
});
