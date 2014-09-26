Ext.define("LDPA.view.phone.map.GoogleMap", {
    extend: 'Ext.Map',
	
    requires: [
        "Ext.util.Geolocation",
	],
    config: {
        isFilled: false,
		positions: [],				// an array with hospitals positions
		country: "",
		
		itemId: 'googleMap',
		cls: 'map-box',
		
		useCurrentLocation: true,
		
		margin: 0,
		padding: 0,
							
		mapOptions: {
			zoom: 13,
			/*mapTypeControlOptions: {
				position: (google) ? google.maps.ControlPosition.LEFT_TOP : null
			}*/
		}
    },
	
	constructor: function(){
		this.callParent(arguments);
		
		if (!(window.google || {}).maps) {
            this.setHtml('Pentru a vizualiza harta cu spitale trebuie sa aveti conexiune la internet!');
        }
	},
	
	initialize: function(){
		this.callParent(arguments);
	}
});
