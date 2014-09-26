Ext.define("LDPA.view.tablet.home.VideoCarousel", {
    extend: 'Ext.Carousel',
	
	requires: [
		'LDPA.view.tablet.home.VideoCard'
	],
	
	config: {
		id: "videoCarousel",
		
		store: null,												// categories store
		noOfDefaultItems: 0,
		
		styleHtmlContent: true,
		scrollable: null,
		indicator: true,
        
		margin: 0,
		padding: 0,
        cls: 'video-carousel'
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setNoOfDefaultItems(this.getItems().length);
		
		// create the carousel's store with loaded video posts
		this.setStore(Ext.create("LDPA.store.VideoArticles"));
	}
});
