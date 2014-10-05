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
			}
        },
		
		control: {
			mapPanel: {
				createmarker: 'onCreateMarker',
			},
			/*hospitalsList: {
				itemtap: 'onVideosListItemTap'	
			}*/
		}
    },
	
	
	init: function() {
		mapController = this;
    },
	
	launch: function() {
		
    },
	
	
	/*processVideos: function(videos){
		Ext.each(videos, function(video){
			video.articleId = video.id;
		});
		
		return videos;
	},*/
	
	
	showMap: function(){
		
		// create map panel
		var profile = webcrumbz.profile.toLowerCase();
		var mapPanel = Ext.create("LDPA.view."+profile+".map.MapPanel");
		
		Ext.Viewport.add(mapPanel);
		
		mapPanel.show();
		
		
		// offline
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{
		
			var mapPanel = this.getMapPanel();
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
						types: ['hospital']
					};	
					
					var service = new google.maps.places.PlacesService(map);
					service.nearbySearch(request, mapController.onHospitalsSearchCallback);
				}
			}, 100);
			
			/*
			
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
			}, 8000);*/
		}
	},
	
	onHospitalsSearchCallback: function(results, status, pagination){
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var reference = results[i].reference;
				mapController.getHospitalDetails(reference);
			}
		}
		// ZERO_RESULTS
		else{
			//mapController.getHospitalsList().getStore().load(null);	
		}
	},
	
	
	getHospitalDetails: function(placeRef){
		var request = {
			reference: placeRef
		};
		
		var service = new google.maps.places.PlacesService(this.getMapPanel().getMap());
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
});