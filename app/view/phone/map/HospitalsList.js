Ext.define("LDPA.view.phone.map.HospitalsList", {
    extend: 'Ext.List',

	config: {
        markers: [],
		selectedItem: null,
		
		id: 'hospitalsList',
		store: 'Hospitals',
				
		cls: 'hospitals-list',
		selectedCls: 'list-item-selected',
		pressedCls: 'list-item-pressed',
		itemCls: 'list-item',
		modal: true,
		hideOnMaskTap: false,
		showAnimation: {
			type: 'popIn',
			duration: 250,
			easing: 'ease-out'	
		},
		hideAnimation: {
			type: 'popOut',
			duration: 250,
			easing: 'ease-out'	
		},
		centered: true,
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		width: '100%',
		height: '100%',
				
		itemTpl: new Ext.XTemplate(
            '<div class="name">{[this.parseName(values.name)]} <span class="distance">({[this.parseDistance(values.distance)]} m)</span></div>',
			
			'<tpl if="address.length &gt; 0">',
				'<div class="item address">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{[this.parseAddress(values.address)]}</div>' +
                '</div>',
			'</tpl>',

            '<tpl if="phone.length &gt; 0">',
                '<div class="item phone">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{phone}</div>' +
                '</div>',
            '</tpl>',

            '<tpl if="website.length &gt; 0">',
                '<div class="item website">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text"><a href="{website}" target="_blank">{[this.parseWebsite(values.website)]}</a></div>' +
                '</div>',
            '</tpl>',
			{
				parseName: function(name){
					if (name.toLowerCase().indexOf("hospital") != -1){
						name = name.replace(/[h|H]ospital/g,"");
						name = "Spitalul "+ name;
					}
					return name;
				},
				parseAddress: function(address){
					address = address.replace("Bucharest","Bucure&#x15F;ti");
					return address;	
				},
				parseWebsite: function(website){
					website = website.replace(/http\:\/\/(www\.|)/g, "");
					website = website.split("/")[0];
					return website;
				},
				parseDistance: function(distance){
					return Math.round(distance)	
				}
			}
        ),
		
		emptyText: 'Nu exist&#259; spitale pe o raz&#259; de 20 de km!',

		items: [
			{
				xtype: 'titlebar',
				itemId: 'mapBar',
				docked: 'top',
				cls: 'bar',
				title: 'Spitale din zona',
				items: [
					{
						align: 'right',
						itemId: "closeBtn",
						iconCls: 'close-icon',
					}
				]
			}
		]
	},


	initialize: function(){
		this.callParent(arguments);
	}

});
