Ext.define("LDPA.view.tablet.map.Map", {
    extend: 'Ext.Panel',
	
    requires: [
        "Ext.Map",
		"LDPA.view.tablet.map.GoogleMap",
		"LDPA.view.tablet.map.HospitalsList"
    ],
    config: {
        
		title: 'Hart&#259; spitale',
		iconCls: 'locate4',
		cls: 'map-container',
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var googleMap = Ext.create("LDPA.view.tablet.map.GoogleMap");
		this.add(googleMap);
		
		var panel = Ext.create("Ext.Panel",{
			itemId:  'hospitalsBox',
			cls: 'hospitals-box',					   
		});
		
		var hospitalsList = Ext.create("LDPA.view.tablet.map.HospitalsList");
		panel.add(hospitalsList);
		this.add(panel);
	}
});
