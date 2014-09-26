Ext.define("LDPA.view.tablet.Main", {
    extend: 'Ext.tab.Panel',
    
	requires: [
        'Ext.field.Search',
        'Ext.form.Panel',
		'LDPA.view.tablet.home.Home',
		'LDPA.view.tablet.articles.Articles',
		'LDPA.view.tablet.video.Video',
		'LDPA.view.tablet.map.Map',
		'LDPA.view.tablet.news.News',
		'LDPA.view.tablet.contact.Contact',
		'LDPA.view.tablet.quiz.Quiz',
		'LDPA.view.tablet.share.Share',
		'LDPA.view.tablet.newsletter.Newsletter',
		'LDPA.view.tablet.questions.Questions',
		'LDPA.view.tablet.search.Search',
    ],
   
	config: {
		id: 'mainView',
		
		tabBarPosition: 'bottom',
        //cls: 'main-tabpanel',
		
		items: [{
			xtype: 'panel',
			docked: 'top',
			height: 54,
            cls: "top-bar",
            layout: {
                type: 'hbox',
                pack: 'end',
                align: 'center'
            },
            items: {
                xtype: 'searchfield',
                placeHolder: 'Caut\u0103...',
                width: 230,
                cls: 'search-bar'
            }
		}]
	},

    initialize: function(){
		
		// home
		var item = Ext.create("LDPA.view.tablet.home.Home");
		this.add(item);
		
		// articles
		var item = Ext.create("LDPA.view.tablet.articles.Articles");
		this.add(item);
		
		// video lessons
		var item = Ext.create("LDPA.view.tablet.video.Video");
		this.add(item);
		
		// hospitals map
		var item = Ext.create("LDPA.view.tablet.map.Map");
		this.add(item);
		
		// news from press
		var item = Ext.create("LDPA.view.tablet.news.News");
		this.add(item);
		
		// contact form
		var item = Ext.create("LDPA.view.tablet.contact.Contact");
		this.add(item);

		// quiz
		var item = Ext.create("LDPA.view.tablet.quiz.Quiz");
		this.add(item);

		// share
		var item = Ext.create("LDPA.view.tablet.share.Share");
		this.add(item);

		// newsletter
		var item = Ext.create("LDPA.view.tablet.newsletter.Newsletter");
		this.add(item);
		
		// send a question to a SMURD doctor
		var item = Ext.create("LDPA.view.tablet.questions.Questions");
		this.add(item);
		this.getTabBar().getItems().getAt(9).hide();
		
		// search 
		var item = Ext.create("LDPA.view.tablet.search.Search");
		this.add(item);
		this.getTabBar().getItems().getAt(10).hide();
		
		this.callParent(arguments);
	}
});
