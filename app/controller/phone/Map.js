var mapController;

Ext.define('LDPA.controller.phone.Map', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            mapPanel: "#mapPanel",
			googleMap: '#mapPanel #googleMap',
			hospitalsList: '#hospitalsList',
			hospitalsBtn: "#mapPanel #hospitalsBtn",
			hospitalsCloseBtn: "#hospitalsList #closeBtn"
        },
		
		control: {
			googleMap: {
				maprender: 'onMapRender',
				createmarker: 'onCreateMarker',
			},
			hospitalsList: {
				itemtap: 'onHospitalsListItemTap'	
			},
			hospitalsBtn: {
				tap: 'onHospitalsBtnTap'	
			},
			hospitalsCloseBtn: {
				tap: 'onHospitalsCloseBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		mapController = this;
    },
	
	
	onMapRender: function(comp){
		
		// offline
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{
		
			var googleMap = this.getGoogleMap();
			var map = googleMap.getMap();
			var position = new google.maps.LatLng(comp._geo.getLatitude(),comp._geo.getLongitude());
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({'latLng': position},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var adr = results[0].formatted_address.split(",");
						googleMap.setCountry(adr[adr.length-1].toLowerCase());
					}
				}
			);
			
			
			new google.maps.Marker({
				position: position,
				map: map
			});	
			
			
			// request 1
			var request1 = {
				location: position,
				radius: '20000',
				types: ['hospital'],
				name: 'spital'
			};
			
			// request 2
			var request2 = {
				location: position,
				radius: '20000',
				types: ['hospital'],
				name: 'spitalul'
			};
			
			// request 3
			var request3 = {
				location: position,
				radius: '20000',
				types: ['hospital']
			};
			
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request1, this.onHospitalsSearchCallback);
			
			
			setTimeout(function(){
				if (googleMap.getCountry() == "romania"){
					service.nearbySearch(request2, mapController.onHospitalsSearchCallback);
				}
			}, 3500);
			
			setTimeout(function(){
				if (googleMap.getCountry() != "romania"){
					service.nearbySearch(request3, mapController.onHospitalsSearchCallback);
				}
			}, 8000);
		}
	},
	
	
	onHospitalsSearchCallback: function(results, status, pagination){
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var reference = results[i].reference;
				mapController.getHospitalDetails(reference);
			}
			
			pagination.nextPage()
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
		
		var service = new google.maps.places.PlacesService(this.getGoogleMap().getMap());
		service.getDetails(request, this.hospitalDetailsCallback);
	},
	
	
	hospitalDetailsCallback: function(place, status){
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		  	var cLat = mapController.getGoogleMap()._geo.getLatitude();
			var cLng = mapController.getGoogleMap()._geo.getLongitude();
			
			var placeLat = place.geometry.location.Ya || place.geometry.location.lb;
			var placeLng = place.geometry.location.Za || place.geometry.location.mb;
						
			var latLngA = new google.maps.LatLng(cLat, cLng);
			var latLngB = new google.maps.LatLng(placeLat, placeLng);
			
			var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
			
			var hospital = Ext.create("LDPA.model.Hospitals",{
				id: place.id,
				name: place.name,
				address: place.formatted_address || "",
				phone: place.formatted_phone_number || "",
				website: place.website || "",
				distance: distance,
				lat: placeLat,
				lng: placeLng
			});
			
			
			mapController.getHospitalsList().getStore().add(hospital)
			
			mapController.getGoogleMap().fireEvent("createmarker", hospital);
		}	
	},
	
	
	onCreateMarker: function(hospital){
		var map = this.getGoogleMap();
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
			map: map.getMap(),
			title: hospital.get("name"),
			icon: "resources/images/phone/hmarker.png",
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
		map.config.positions.push(position);
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
		this.getGoogleMap().getMap().panTo(position);
		
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
		
		this.getHospitalsCloseBtn().fireEvent("tap");
	},
	
	
	onMarkerTap: function(marker){
		
		var hospitalsList = this.getHospitalsList();
		
		// open hospitals list
		hospitalsList.show();
		
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
			els = hospitalsList.container.getInnerItems(),
			el = els[idx].bodyElement;
			offset = Ext.get(el).dom.offsetTop;
		
		
		var offsetX = 0;
		var offsetY = offset;
		
		hospitalsList.getScrollable().getScroller().scrollTo(offsetX, offsetY, true); 
		
	},
	
	onHospitalsBtnTap: function(){
		
		// offline
		if (!LDPA.app.isOnline()){
			Ext.Viewport.unmask();
			
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{
			this.getHospitalsList().show();	
		}
	},
	
	onHospitalsCloseBtnTap: function(){
		this.getHospitalsList().hide();	
	}
});