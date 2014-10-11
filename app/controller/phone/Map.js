var mapController;

Ext.define('LDPA.controller.phone.Map', {
    extend: 'Ext.app.Controller',
	
	requires:[
		
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            mapPanel: {
				selector: "#mapPanel",
				autoCreate: true	
			},
			hospitalsList: {
				selector: "#mapPanel #hospitalsList",
				autoCreate: true	
			}
        },
		
		control: {
			hospitalsList: {
				itemtap: 'onHospitalsListItemTap'	
			}
		}
    },
	
	
	init: function() {
		mapController = this;
    },
	
	launch: function() {
		
    },
	
	
	showMap: function(){
		
		// create map panel
		var profile = webcrumbz.profile.toLowerCase();
		
		if (!Ext.Viewport.down("#mapPanel")){
			
			// offline
			if (!LDPA.app.isOnline()){
				alert(webcrumbz.offlineMsg);
			}
			// online
			else{
				var mapPanel = Ext.create("LDPA.view."+profile+".map.MapPanel");
				Ext.Viewport.add(mapPanel);
				var map = mapPanel.getMap();
				
				var interval = setInterval(function(){
					var geo = mapPanel.getGeo();
					
					if (geo._latitude && geo._longitude){
						var position = new google.maps.LatLng(geo._latitude, geo._longitude);
						var geocoder = new google.maps.Geocoder();
						
						// find country
						geocoder.geocode({'latLng': position},
							function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									var adr = results[0].formatted_address.split(",");
									mapPanel.setCountry(adr[adr.length-1].toLowerCase());
								}
							}
						);
						
						new google.maps.Marker({
							position: position,
							map: map
						});
						
						clearInterval(interval);
						
						// search hospitals
						var request = {
							location: position,
							radius: '15000',
							types: ['hospital'],
							language: "ro"
						};	
						
						var service = new google.maps.places.PlacesService(map);
						service.nearbySearch(request, mapController.onHospitalsSearchCallback);
					}
				}, 100);
			}
		}
		else{
			var mapPanel = Ext.Viewport.down("#mapPanel");
		}
		
		mapPanel.show();
	},
	
	onHospitalsSearchCallback: function(results, status, pagination){
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			
			mapController.getHospitalsList().fireEvent("updatebar",{
				hospitals: results.length,
				radius: '15'
			})
			
			var i=0;
			var interval = setInterval(function(){
				var reference = results[i].reference;
				mapController.getHospitalDetails(reference);
				
				i++;
				if (i == results.length){
					clearInterval(interval);	
				}
			}, 300);
		}
		// ZERO_RESULTS
		else{
			mapController.getHospitalsList().getStore().load(null);	
		}
	},
	
	
	getHospitalDetails: function(placeRef){
		var request = {
			reference: placeRef
		};
		
		if (this.getMapPanel() != null){
			if (this.getMapPanel().getMap() != null){
				var service = new google.maps.places.PlacesService(this.getMapPanel().getMap());
				service.getDetails(request, this.hospitalDetailsCallback);
			}
		}
	},
	
	
	hospitalDetailsCallback: function(place, status){
		
		if (status == google.maps.places.PlacesServiceStatus.OK && mapController.getMapPanel() != null) {
		  	var mapPanel = mapController.getMapPanel();
			var geo = mapPanel.getGeo();
			var cLat = geo._latitude;
			var cLng = geo._longitude;
			
			var i = 0, placeLat, placeLng;
			for (var prop in place.geometry.location){
				i++;
				
				// latitude
				if (i == 1){
					placeLat = place.geometry.location[prop];
				}
				// longitude
				else if (i == 2){
					placeLng = place.geometry.location[prop];
				}
			}
			
			var latLngA = new google.maps.LatLng(cLat, cLng);
			var latLngB = new google.maps.LatLng(placeLat, placeLng);
			
			var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
			
			var hospital = Ext.create("LDPA.model.Hospitals",{
				id: place.id,
				name: place.name,
				address: place.formatted_address || "",
				phone: place.formatted_phone_number || "",
				website: place.website || "",
				distance: Math.round(distance),
				lat: placeLat,
				lng: placeLng
			});
			
			
			mapController.getHospitalsList().getStore().add(hospital);
			
			mapController.onCreateMarker(hospital);
		}	
	},
	
	
	onCreateMarker: function(hospital){
		
		var mapPanel = this.getMapPanel();
		var hospitalsList = this.getHospitalsList();
		
		// add hospital marker
		var position = new google.maps.LatLng(hospital.get("lat"), hospital.get("lng"));
		
		var shadow = new google.maps.MarkerImage("resources/images/phone/shadow-hmarker.png",
			new google.maps.Size(40.0, 31.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(12, 31)
		);
		var marker = new google.maps.Marker({
			position: position,
			map: mapPanel.getMap(),
			title: hospital.get("name"),
			icon: "resources/images/phone/hmarker.png",
			animation: google.maps.Animation.DROP,
			shadow: shadow,
			
			// custom properties added by me
			id: hospital.get("id"),
			selectedIcon: "resources/images/phone/hsmarker.png",
			defaultIcon: "resources/images/phone/hmarker.png",
		});
		
		google.maps.event.addListener(marker, 'click', function(){
			mapController.onMarkerTap(marker);														
		});
				
		hospitalsList.config.markers.push(marker);
		mapPanel.config.positions.push(position);
	},
	
	
	onHospitalsListItemTap: function(list, index, el, record){

		var id = record.get("id");
		
		// find marker
		var marker;
		var markers = list.getMarkers();
		for (var i=0; i<markers.length; i++){
			if (markers[i].id == id){
				marker = markers[i];
				break;
			}
		}
		
		// change current marker icon
		marker.setIcon(marker.selectedIcon);
		
		var position = new google.maps.LatLng(record.get("lat"), record.get("lng"));
		this.getMapPanel().getMap().panTo(position);
		
		// get previous selected marker to change it's icon
		if (list.getSelectedItem() && list.getSelectedItem() != record){
			var prevMarker;
			for (var i=0; i<markers.length; i++){
				if (markers[i].id == list.getSelectedItem().get("id")){
					prevMarker = markers[i];
					break;
				}
			}
			prevMarker.setIcon(prevMarker.defaultIcon);	
		}
		
		list.setSelectedItem(record);
	},
	
	
	onMarkerTap: function(marker){
		
		var hospitalsList = this.getHospitalsList();
		
		// open hospitals list
		hospitalsList.fireEvent("openpanel");
		hospitalsList.setOpened(true);
		
		// change current marker icon
		marker.setIcon(marker.selectedIcon);
		
		var record = hospitalsList.getStore().findRecord("id",marker.id,0, false, true, true);
		var markers = hospitalsList.getMarkers();
		
		// get previous selected marker to change it's icon
		if (hospitalsList.getSelectedItem() && hospitalsList.getSelectedItem() != record){
			var prevMarker;
			for (var i=0; i<markers.length; i++){
				if (markers[i].id == hospitalsList.getSelectedItem().get("id")){
					prevMarker = markers[i];
					break;
				}
			}
			prevMarker.setIcon(prevMarker.defaultIcon);	
		}
		
		hospitalsList.setSelectedItem(record);
		hospitalsList.select(record, false);
		
			
		// scroll the list to the selected item
		var store = hospitalsList.getStore(),
			selected = hospitalsList.getSelection()[0],
			idx = store.indexOf(selected),
			el = hospitalsList.getItemAt(idx),
			offsetY = Ext.get(el).dom.offsetTop,
			offsetX = 0;
		
		hospitalsList.getScrollable().getScroller().scrollTo(offsetX, offsetY, true);
		
	},
});