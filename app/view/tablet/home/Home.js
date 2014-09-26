Ext.define("LDPA.view.tablet.home.Home", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.tablet.home.VideoCarousel',
		'LDPA.view.tablet.home.CategoriesList',
        'LDPA.view.tablet.home.ButtonsPanel'
    ],
    config: {
        
		id: 'homePanel',
		title: 'Home',
		iconCls: 'home',
		cls: 'home-box'
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		
		// add first section: video posts and category list
		var item1 = Ext.create("Ext.Panel",{
                id: 'section1',
                cls: 'home-section-1',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                }
            }),
            carousel = Ext.create("LDPA.view.tablet.home.VideoCarousel",{
                flex: 1
            }),
            list = Ext.create("LDPA.view.tablet.home.CategoriesList"),
            buttons = Ext.create("LDPA.view.tablet.home.ButtonsPanel");

        item1.add([carousel, list]);
		this.add([item1, buttons]);
		
	},

	
	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
	}
});
