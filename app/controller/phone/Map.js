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
			mapPanel: {
				createmarker: 'onCreateMarker',
			},
			hospitalsList: {
				itemtap: 'onVideosListItemTap'	
			}
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
		}
	},
	
	onHospitalsSearchCallback: function(results, status, pagination){
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			
			var i=0;
			var interval = setInterval(function(){
				var reference = results[i].reference;
				mapController.getHospitalDetails(reference);
				
				i++;
				if (i == results.length){
					clearInterval(interval);	
				}
			}, 300);
			
			mapController.getHospitalsList().fireEvent("updatebar",{
				hospitals: results.length,
				radius: '15'
			})
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
		
		var service = new google.maps.places.PlacesService(this.getMapPanel().getMap());
		service.getDetails(request, this.hospitalDetailsCallback);
	},
	
	
	hospitalDetailsCallback: function(place, status){
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
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
				distance: distance,
				lat: placeLat,
				lng: placeLng
			});
			
			
			mapController.getHospitalsList().getStore().add(hospital);
			
			//mapController.getGoogleMap().fireEvent("createmarker", hospital);
		}	
	},
});