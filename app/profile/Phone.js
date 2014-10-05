Ext.define('LDPA.profile.Phone', {
    extend: 'Ext.app.Profile',
	
	requires: [
		"LDPA.controller.phone.Main",
		"LDPA.controller.phone.Categories",
		"LDPA.controller.phone.Actions",
		"LDPA.controller.phone.Videos",
		"LDPA.controller.phone.Map",
		"LDPA.view.phone.Main",
		"LDPA.view.phone.Background"
	],
		
    config: {
        name: 'Phone',
       
	  	//controllers: ['Home', 'Video', 'Map', 'More']
		controllers: ['Main', 'Categories', 'Actions', 'Videos', 'Map']
    },

    isActive: function() {
       	return Ext.os.is.Phone;// || Ext.os.is.Desktop;
		//return true;
	},
	
	launch: function(){

		// Initialize the actions panel
      	Ext.Viewport.add(Ext.create('LDPA.view.phone.Background', {zIndex: 1}));
		
		// Initialize the main panel
      	Ext.Viewport.add(Ext.create('LDPA.view.phone.Main', {zIndex: 2}));
	}
});