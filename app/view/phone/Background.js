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
		height: "100%",
		
		tpl: new Ext.XTemplate(
			'<div style="width: 100%; height: 100%; overflow: hidden;">',
				'<div style="width: 130%; height: 100%; background-image: url(\''+webcrumbz.backgroundImage+'\'); background-size: cover; background-repeat: no repeat;">',
					
				'</div>',
			'</div>'
		)
	},
	
	
	initialize: function(){
		
		this.callParent(arguments);
		this.setData("");
	}
});
