Ext.define("LDPA.view.tablet.media.MediaCarousel", {
    extend: 'Ext.Carousel',
	
	requires: [
		'LDPA.view.tablet.media.MediaCard'
	],
	
	config: {
		itemId: "mediaCarousel",
		
		noOfDefaultItems: 0,
		
		styleHtmlContent: true,
		scrollable: false,
		indicator: true,
        
		margin: 0,
		padding: 0,
        cls: 'media-carousel'
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setNoOfDefaultItems(this.getItems().length);
	}
});
