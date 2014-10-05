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

});