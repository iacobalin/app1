Ext.define("LDPA.view.phone.Background", {
    extend: 'Ext.Component',
    
	requires: [
        
    ],
    
	config: {
        id: 'mainBackground',
		
		// css properties
		top: 0,
		right: 0,
		width: "100%",
		height: "100%"
	},
	
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});
