Ext.define("LDPA.view.tablet.map.HospitalsList", {
    extend: 'Ext.List',

	config: {
        markers: [],
		selectedItem: null,
		
		id: 'hospitalsList',
		store: 'Hospitals',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,

        cls: "hospitals-list",

		itemCls: 'hospitals-list-item',
        selectedCls: 'hospitals-list-item-selected',
        pressedCls: 'hospitals-list-item-pressed',
		itemTpl: new Ext.XTemplate(
            '<div class="name">{[this.parseName(values.name)]} <span class="distance">({[this.parseDistance(values.distance)]} m)</span></div>',
			
			'<tpl if="address.length &gt; 0">',
				'<div class="item address">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{[this.parseAddress(values.address)]}</div>' +
                '</div>',
			'</tpl>',

            '<tpl if="phone.length &gt; 0">',
                '<div class="item phone">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{phone}</div>' +
                '</div>',
            '</tpl>',

            '<tpl if="website.length &gt; 0">',
                '<div class="item website">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text"><a href="{website}" target="_blank">{[this.parseWebsite(values.website)]}</a></div>' +
                '</div>',
            '</tpl>',
			{
				parseName: function(name){
					if (name.toLowerCase().indexOf("hospital") != -1){
						name = name.replace(/[h|H]ospital/g,"");
						name = "Spitalul "+ name;
					}
					return name;
				},
				parseAddress: function(address){
					address = address.replace("Bucharest","Bucure&#x15F;ti");
					return address;	
				},
				parseWebsite: function(website){
					website = website.replace(/http\:\/\/(www\.|)/g, "");
					website = website.split("/")[0];
					return website;
				},
				parseDistance: function(distance){
					return Math.round(distance)	
				}
			}
        ),
		
		emptyText: 'Nu exist&#259; spitale pe o raz&#259; de 20 de km!',

		items: [
			{
				xtype: 'component',
				itemId: 'mapBar',
				docked: 'top',
				cls: 'bar',
				html: '<h1>Spitale din zona</h1>',
				listeners: {
					// scroll the map to current position
					tap: {
						fn: function() {
							var map = mapController.getMapPanel();
							var position = new google.maps.LatLng(map._geo.getLatitude(), map._geo.getLongitude());
							mapController.getMapPanel().getMap().panTo(position);
						},
						element: 'element'
					}
				}
			}
		]
	},


	initialize: function(){
		this.callParent(arguments);

		this.handleOrientationChange();

		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('resize', 'handleOrientationChange', this, {buffer: 50 });
		
	},


	handleOrientationChange: function(){

		var hospitalsList = this;
		var orientation = this.getOrientation();

		hospitalsList.getScrollable().getScroller().scrollTo(0,0);

		if (orientation == "landscape"){

			hospitalsList.setScrollable({
                direction: 'vertical',
                indicators: false
            });

			hospitalsList.setInline({
                wrap: true
            });

		} else{

			hospitalsList.setScrollable({
                direction: 'horizontal',
                indicators: false
            });

			hospitalsList.setInline({
                wrap: false
            });

        }

		hospitalsList.refresh();

    },


	getOrientation: function(){
		return Ext.Viewport.getWindowWidth() > Ext.Viewport.getWindowHeight() ? "landscape" : "portrait";
    }

});
