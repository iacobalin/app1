Ext.define("LDPA.view.tablet.news.News", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.tablet.news.NewsDetails',
		'LDPA.view.tablet.news.NewsComments',
		'LDPA.view.tablet.news.NewsList'
    ],
    config: {
        
		id: 'newsPanel',
		title: 'Nout&#259;&#355;i',
		iconCls: 'rss',
		cls: 'news-box'
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		// add first section: news details
		var details = Ext.create("Ext.Panel",{
			cls: 'news-section-1',
			layout: {
				type: 'card'
			},
			items: [
				Ext.create("LDPA.view.tablet.news.NewsDetails"),
				Ext.create("LDPA.view.tablet.news.NewsComments")
			]
		});
		
		var list = Ext.create("LDPA.view.tablet.news.NewsList");
		
		this.add(details);
		this.add(list);
	}
});
