Ext.define("LDPA.view.phone.Main", {
    extend: 'Ext.Carousel',
    
	requires: [
        "LDPA.view.phone.categories.Cover",
		"LDPA.view.phone.categories.CategoriesList"
    ],
    
	config: {
        id: 'mainView',
		
		// css properties
		cls: 'carousel',
		
		// properties
		indicator: false,
		animation: {
            duration: 600,
            easing: {
                type: 'ease-out'
            }
        },
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var cover = Ext.create("LDPA.view.phone.categories.Cover");
		this.add(cover);
		
		var CategoriesList = Ext.create("LDPA.view.phone.categories.CategoriesList");
		this.add(CategoriesList);
	}
});
