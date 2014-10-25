Ext.define("LDPA.view.phone.map.MapPanel", {
    extend: 'Ext.Map',
	
	requires: [
		"LDPA.view.phone.map.HospitalsList",
	],
	
	config: {
		
		itemId: "mapPanel",
				
		// custom properties
		mask: null,
		bottomBar: null,									// a reference of the bottom bar
		positions: [],										// an array with hospitals positions
		country: "",
								
		// css properties
		width: "100%",
		height: "100%",
		cls: 'map-panel',
		zIndex: 110,
						
		// properties
		useCurrentLocation: true,
		mapOptions: {
			zoom: 13,
			/*mapTypeControlOptions: {
				position: (google) ? google.maps.ControlPosition.LEFT_TOP : null
			}*/
		},
		items: [
			{
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "Harta spitalelor din zon&#259;",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			},
			{
				xtype: "panel",
				itemId: "bottomBar",
				height: 55,
				docked: "bottom",	  
				cls: "bottom-bar"	
			}
		],
		hidden: true,
		showAnimation: {
			type: "popIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "popOut",
			duration: 400,
			easing: "in"
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
		
		var closeBtn = this.down("#closeBtn"); 
		closeBtn.on("tap", this.onClosePanel, this);
		
		var hospitalsList = Ext.create("LDPA.view.phone.map.HospitalsList");
		this.down("#bottomBar").add(hospitalsList);
		hospitalsList.fireEvent("updateheight");
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onClosePanel: function(){
		this.hide();
	},
	
	
	handleOrientationChange: function(){
		
	}
});
