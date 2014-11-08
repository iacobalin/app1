Ext.define("LDPA.view.phone.Main", {
    extend: 'Ext.Carousel',
    
	requires: [
        "LDPA.view.phone.categories.Cover",
		"LDPA.view.phone.categories.CategoriesList"
    ],
    
	config: {
        
		id: 'mainView',
		
		// custom properties
		backgroundCard: null,								// a reference to the background card
		dragBlocked: false,									// a flag indicating if the drag event is suspended or not
		
		// css properties
		cls: 'carousel',
		
		// properties
		activeItem: 0,
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
		
		var categoriesList = Ext.create("LDPA.view.phone.categories.CategoriesList", {
			hidden: true
		});
		this.add(categoriesList);
		
		
		var backgroundCard = Ext.Viewport.down("#mainBackground");
		this.setBackgroundCard(backgroundCard);
		
		this.on("move", this.onCardMove, this);
	},
	
	
	onDragStart: function() {
		
		if (!this.getDragBlocked()){
			var backgroundCard = this.getBackgroundCard();
			backgroundCard.fireEvent("stopanim");
		}
				
		this.callParent(arguments);	
	},
	
	onDragEnd: function() {
		
		if (!this.getDragBlocked()){
			//var cover = Ext.get(dom).findParent("div.x-carousel-inner")
			var cover = this.element.query(".cover-box")[0];
			var dom = Ext.get(cover).findParent("div.x-carousel-item");
			
			var backgroundCard = this.getBackgroundCard();
			backgroundCard.fireEvent("startanim", dom);
		}
		
		this.callParent(arguments);
    },
	
	
	onDrag: function(e, dom){
		
		if (dom && !this.getDragBlocked()){
			
			var backgroundCard = this.getBackgroundCard();
			
			// cover
			if (Ext.get(dom).findParent("div.cover-box")){
				var delta = e.deltaX;
				
				backgroundCard.fireEvent("translate", delta, 0);
			}
			// categories list
			else if (Ext.get(dom).findParent("div.categories-list")){
				var delta = e.deltaX;
				
				backgroundCard.fireEvent("translate", delta, 1);
			}
		}
		
		this.callParent(arguments);	
	}
});
