Ext.define("LDPA.view.phone.Background", {
    extend: 'Ext.Component',
    
	requires: [
        
    ],
    
	config: {
        
		id: 'mainBackground',
		
		// custom properties
		innerBox: null,										// a dom reference to the inner background box that have to be translated
		intervalAnim: null,									// a setInderval function
				
		// css properties
		top: 0,
		right: 0,
		width: "100%",
		height: "100%",
		
		tpl: new Ext.XTemplate(
			'<div style="width: 100%; height: 100%; overflow: hidden;">',
				'<div class="bg-inner-box" style="width: 100%; height: 100%;">',
					'<div style="width: 130%; height: 100%; background-image: url(\''+webcrumbz.backgroundImage+'\'); background-size: cover; background-position: center; background-repeat: no-repeat;">',
					
					'</div>',
				'</div>',
			'</div>'
		)
	},
	
	
	initialize: function(){
		
		this.callParent(arguments);
		this.setData("");
		
		this.on("translate", this.translateX, this);
		this.on("startanim", this.startAnim, this);
		this.on("stopanim", this.stopAnim, this);
		
		var innerBox = Ext.get(this.element.query("div[class=bg-inner-box]")[0]);
		this.setInnerBox(innerBox);
	},
	
	
	translateX: function(delta, cardIndex, time){
		
		var posX = 0;
		
		// for cover
		if (cardIndex == 0){
			
			// moving to the right
			if (delta >= 0){
				posX = 0;	
			}
			else{
				posX = (30 * delta) / Ext.Viewport.getWindowWidth();
			}
		}
		// for categories list
		else{
			// moving to the left
			if (delta <= 0){
				posX = -30;	
			}
			else{
				posX = -30 + (30 * delta) / Ext.Viewport.getWindowWidth();
			}	
		}
		
		var time = time || 0;
		var innerBox = this.getInnerBox();
		innerBox.setStyle({
            '-webkit-transition': 'all '+time+'s ease',
            '-moz-transition': 'all '+time+'s ease',
            '-o-transition': 'all '+time+'s ease',
            'transition': 'all '+time+'s ease',
            '-webkit-transform': 'translate3d(' + posX + '%, 0px, 0px)',
            '-moz-transform': 'translate3d(' + posX + '%, 0px, 0px)',
            '-ms-transform': 'translate3d(' + posX + '%, 0px, 0px)',
            '-o-transform': 'translate3d(' + posX + '%, 0px, 0px)',
            'transform': 'translate3d(' + posX + '%, 0px, 0px)'
        });
	},
	
	
	startAnim: function(cover){
		var me = this;
		var intervalAnim = this.getIntervalAnim();
		
		
		if (intervalAnim){
			clearInterval(intervalAnim);	
		}
		else{
			
			intervalAnim = setInterval(function(){
				
				var transform = cover.style.webkitTransform;
				var coverXpos = parseFloat(transform.match(/((|\-)\d+)px/g)[0]);
				coverXpos = Math.max(coverXpos, -Ext.Viewport.getWindowWidth())	
				
				me.fireEvent("translate", coverXpos, 0, 0);
				
				if (coverXpos == 0 || coverXpos <= -Ext.Viewport.getWindowWidth()){
					clearInterval(intervalAnim);	
				}
				
			}, 10);
		}
	},
	
	
	stopAnim: function(){
		var intervalAnim = this.getIntervalAnim();
		if (intervalAnim){
			clearInterval(intervalAnim);	
		}
	}
});
