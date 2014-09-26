Ext.define('LDPA.profile.Tablet', {
    extend: 'Ext.app.Profile',
	
	requires: [
		"LDPA.view.tablet.Main"
	],

    config: {
        name: 'Tablet',
       
		controllers: ['Home', 'Articles', 'Video', 'Map', 'News', 'Contact', 'Quiz', 'Share', 'Newsletter', 'Questions', 'Search']
	},
	
	isActive: function() {
       	return Ext.os.is.Tablet || Ext.os.is.Desktop;
		//return true;
	},
	
    launch: function(){
		
		// Initialize the main view
        Ext.Viewport.add(Ext.create('LDPA.view.tablet.Main'));
	}
});