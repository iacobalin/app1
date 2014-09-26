Ext.define("LDPA.view.tablet.map.GoogleMap", {
    extend: 'Ext.Map',
	
    requires: [
        "Ext.util.Geolocation",
	],
    config: {
        isFilled: false,
		positions: [],				// an array with hospitals positions
		country: "",
		
		id: 'mapPanel',
		cls: 'map-box',
		
		useCurrentLocation: true,
		
		margin: 0,
		padding: 0,
							
		mapOptions: {
			zoom: 13,
			mapTypeControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			}
		},
		
		
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var geo = Ext.create('Ext.util.Geolocation', {
			autoUpdate: false
		});
		geo.updateLocation();
		
		this.setUseCurrentLocation(geo);
		
		this.on("painted",this.onPainted, this);
	},
	
	onPainted: function(){
		this.setIsFilled(true);	
	}
	
});
