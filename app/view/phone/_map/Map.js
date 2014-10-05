Ext.define("LDPA.view.phone.map.Map", {
    extend: 'Ext.Panel',
	
    requires: [
        "LDPA.view.phone.map.GoogleMap",
		"LDPA.view.phone.map.HospitalsList"
    ],
    config: {
        
		id: 'mapPanel',
		title: 'Hart&#259; spitale',
		iconCls: 'map-icon',
		cls: 'map-panel',
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Spitale',
				items: [
					{
						align: 'right',
						itemId: "hospitalsBtn",
						iconCls: 'hospitals-icon'
					}
				]
			}
		]
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var googleMap = Ext.create("LDPA.view.phone.map.GoogleMap");
		this.add(googleMap);
		
		
		var hospitalsList = Ext.Viewport.add(Ext.create('LDPA.view.phone.map.HospitalsList', {
			hidden: true	
		}));
	}
});
