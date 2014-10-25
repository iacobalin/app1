Ext.application({
    name: 'LDPA',

    requires: [
        'Ext.MessageBox'
    ],
	
	profiles: 		['Phone'],

    icon: {
		'40': 'resources/icons/40x40.png',
		'50': 'resources/icons/50x50.png',
		'57': 'resources/icons/57x57.png',
		'60': 'resources/icons/60x60.png',
        '72': 'resources/icons/72x72.png',
		'76': 'resources/icons/76x76.png',
		'80': 'resources/icons/80x80.png',
        '114': 'resources/icons/114x114.png',
		'120': 'resources/icons/120x120.png',
        '144': 'resources/icons/144x144.png',
		'152': 'resources/icons/152x152.png'
    },

    isIconPrecomposed: true,

    startupImage: {
       	'320x460': 'resources/startup/320x460.jpg',
		'320x480': 'resources/startup/320x480.png',
        '640x920': 'resources/startup/640x920.png',
		'640x960': 'resources/startup/640x960.png',
		'640x1136': 'resources/startup/640x1136.png',
        '768x1004': 'resour',
		'768x1024': 'resources/startup/768x1024.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1496x2048': 'resources/startup/1496x2048.png',
		'1536x2008': 'resources/startup/1536x2008.png',
        '1536x2048': 'resources/startup/1536x2048.png'
    },

    launch: function() {
       	
       	// a hack used for Android (4+) browsers, to handle the Viewport's orientation change event
		Ext.Viewport.bodyElement.on('resize', Ext.emptyFn, this, { buffer: 1});
		if (Ext.versions.touch.major >= 2 && Ext.versions.touch.minor > 0 && Ext.os.is.Android) {
           	Ext.Viewport.getWindowWidth = function() {return window.innerWidth;};
            Ext.Viewport.getWindowHeight = function() {return window.innerHeight;};
            Ext.Viewport.addWindowListener('resize', Ext.Function.bind(Ext.Viewport.onResize, Ext.Viewport));
			
			Ext.Viewport.updateSize();                                      //added
            Ext.Viewport.orientation = Ext.Viewport.determineOrientation(); //added
		}
		
		// save current profile
		webcrumbz.profile = this.getCurrentProfile().getName().toLowerCase();
    },

    onUpdated: function() {
         window.location.reload();
    },
	
	isOnline: function(){
		return navigator.onLine;
		//return false;
	}
});
