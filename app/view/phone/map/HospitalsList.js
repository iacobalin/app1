Ext.define("LDPA.view.phone.map.HospitalsList", {
    extend: 'Ext.dataview.DataView',
	
	requires: [
		"LDPA.store.Hospitals"
	],
	
	config: {
		
		itemId: "hospitalsList",
		name: "hospitalsList",
				
		// custom properties
										
		// css properties
		cls: 'hospitals-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
								
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
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
		
		items: [
			{
				xtype: "panel",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				tpl: '<div><h1>{hospitals} pe o raza de {radius}km</h1></div>',
				layout: {
					type: "hbox",
					pack: "justify",
					align: "center"
				},
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					top: 0,
					right: 0,
					html: '',
					align: 'right'
				}]
			}
		]
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Videos"));
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onClosePanel, this);
		
		this.on("updatebar", this.onUpdateBar, this);
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},
	
	
	onUpdateBar: function(options){
		var hospitals = options.hospitals;
		var radius = options.radius;
		
		if (hospitals > 1){
			var text = hospitals + " Spitale";	
		}
		else if (hospitals == 1){
			var text = hospitals + " Spital";	
		}
		else{
			var text = "0 Spitale"	
		}
		
		this.down("#topBar").setData({
			hospitals: text,
			radius: radius	
		})
		
		console.log(this.down("#topBar").getData())
	},
	
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");
	},
	
	handleOrientationChange: function(){
		this.refresh();
	}
});
