Ext.define('LDPA.profile.Tablet', {
    extend: 'Ext.app.Profile',
	
	requires: [
		"LDPA.controller.tablet.Main",
		"LDPA.controller.tablet.Categories",
		"LDPA.controller.tablet.Actions",
		"LDPA.controller.tablet.Videos",
		"LDPA.controller.tablet.Map",
		"LDPA.controller.tablet.Comments",
		"LDPA.view.tablet.Main",
		"LDPA.view.tablet.Background"
	],

    config: {
        name: 'Tablet',
       
		//controllers: ['Home', 'Articles', 'Video', 'Map', 'News', 'Contact', 'Quiz', 'Share', 'Newsletter', 'Questions', 'Search']
		controllers: ['Main', 'Categories', 'Actions', 'Videos', 'Map', 'Comments']
	},
	
	isActive: function() {
       	//return Ext.os.is.Tablet || Ext.os.is.Desktop;
		return true;
	},
	
    launch: function(){
		
		// Initialize the main view
       // Ext.Viewport.add(Ext.create('LDPA.view.tablet.Main'));
	}
});