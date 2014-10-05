Ext.define("LDPA.view.phone.more.More", {
    extend: 'Ext.Panel',
	
    requires: [
        "LDPA.view.phone.more.MoreList",
		"LDPA.view.phone.contact.Contact",
		"LDPA.view.phone.share.Share",
		"LDPA.view.phone.more.Settings"
    ],
    config: {
        
		id: 'morePanel',
		title: 'Altele',
		iconCls: 'more-icon',
		layout: 'card',
        cls: 'more-panel'
    },
	
	
	initialize: function(){
		
		// more items list
		var item = Ext.create("LDPA.view.phone.more.MoreList");
		this.add(item);
		
		// contact form
		var item = Ext.create("LDPA.view.phone.contact.Contact");
		this.add(item);
		
		// share panel
		var item = Ext.create("LDPA.view.phone.share.Share");
		this.add(item);
		
		// settings panel
		var item = Ext.create("LDPA.view.phone.more.Settings");
		this.add(item);
		
		this.callParent(arguments);
	}
});
