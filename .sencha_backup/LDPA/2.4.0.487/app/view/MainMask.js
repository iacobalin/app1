Ext.define("LDPA.view.MainMask", {
    extend: 'Ext.Container',
	xtype: "mainmask",
	
	config: {
		
		// custom properties
		name: "mainMask",
		closeFn: Ext.emptyFn,									// a custom function that is called when the mask is closed
		spinner: false,
		
		// css properties
		cls: 'main-mask',										
		width: '100%',
		height: '100%',
		top: 0,
        left: 0,
		
		// properties
		hidden: true,
		showAnimation: {
			type: "fadeIn",
			duration: 400	
		},
		hideAnimation: {
			type: "fadeOut",
			duration: 400	
		},
		layout: {
			type: "vbox",
			pack: "center",
			align: "center"	
		}
	},
	
	initialize: function(){

        this.callParent(arguments);

        if (!this.getDisabled()){
			this.element.on("tap", this.onClose, this);
        	this.element.on("swipe", this.onClose, this);
		}
		
		this.on("close", this.onClose, this);
		this.on("addspinner", this.onAddSpinner, this);
		this.on("removespinner", this.onRemoveSpinner, this);
		
		if (this.getSpinner()){
			this.fireEvent("addspinner");
		}
	},


    onClose: function(){
		
		// run the close callback function
		this.getCloseFn().call();
		
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy();	
		}, 400);
    },
	
	
	// add loading spinner
	onAddSpinner: function(){
		
		var html = 	'<div class="loader">';
			html += 	'<div class="dot dot1"></div>';
			html += 	'<div class="dot dot2"></div>';
			html += 	'<div class="dot dot3"></div>';
			html += 	'<div class="dot dot4"></div>';
			html += '</div>';
		
		
		var spinner = Ext.create("Ext.Container", {
			itemId: "spinner",
			html: html
		});
		
		this.add(spinner);
	},
	
	
	// remove loading spinner
	onRemoveSpinner: function(){
		var spinner = this.down("#spinner");
		this.remove(spinner, true);
	}
	
});