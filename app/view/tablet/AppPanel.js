Ext.define("LDPA.view.tablet.AppPanel", {
    extend: 'Ext.Panel',
    
	requires: [
        "LDPA.view.tablet.Background",
		"LDPA.view.tablet.Main"
    ],
    
	config: {
        
		id: 'appPanel',
		
		// custom properties
		
		// css properties
		layout: {
			type: "fit"	
		}
		
		// properties
		
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		// Initialize the actions panel
      	this.add(Ext.create('LDPA.view.tablet.Background', {zIndex: 2}));
		
		// Initialize the main panel
      	this.add(Ext.create('LDPA.view.tablet.Main', {zIndex: 3}));
		
		// add events
		this.on("closepanel", this.onClosePanel, this);
        this.on("openpanel", this.onOpenPanel, this);
	},
	
	
	onOpenPanel: function(){
		var translateValue = -300;
		var time = 0.6;
		
        this.setStyle({
            '-webkit-transition': 'all '+time+'s ease',
            '-moz-transition': 'all '+time+'s ease',
            '-o-transition': 'all '+time+'s ease',
            'transition': 'all '+time+'s ease',
            '-webkit-transform': 'translate3d(' + translateValue + 'px, 0px, 0px)',
            '-moz-transform': 'translate3d(' + translateValue + 'px, 0px, 0px)',
            '-ms-transform': 'translate3d(' + translateValue + 'px, 0px, 0px)',
            '-o-transform': 'translate3d(' + translateValue + 'px, 0px, 0px)',
            'transform': 'translate3d(' + translateValue + 'px, 0px, 0px)'
        });
	},
	
	onClosePanel: function(){
		var time = 0.4;
		
        this.setStyle({
            '-webkit-transition': 'all '+time+'s ease',
            '-moz-transition': 'all '+time+'s ease',
            '-o-transition': 'all '+time+'s ease',
            'transition': 'all '+time+'s ease',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-moz-transform': 'translate3d(0px, 0px, 0px)',
            '-ms-transform': 'translate3d(0px, 0px, 0px)',
            '-o-transform': 'translate3d(0px, 0px, 0px)',
            'transform': 'translate3d(0px, 0px, 0px)'
        });
	}
});
