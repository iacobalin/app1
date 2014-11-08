Ext.define("LDPA.view.tablet.map.HospitalsList", {
    extend: 'Ext.dataview.DataView',
	
	requires: [
		"LDPA.store.Hospitals"
	],
	
	config: {
		
		itemId: "hospitalsList",
		name: "hospitalsList",
				
		// custom properties
		opened: false,									// a flag indicating if the list is opened or not
		markers: [],
		selectedItem: null,
										
		// css properties
		cls: 'hospitals-list',
		itemCls: 'item',
		pressedCls: 'item-pressed',
		selectedCls: 'item-selected',
								
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		emptyText: '',
		useSimpleItems: true,
		variableHeights: true,
		itemTpl: new Ext.XTemplate(
            '<div class="name">{[this.parseName(values.name)]} <span class="distance">({[this.parseDistance(values.distance)]})</span></div>',
			
			'<tpl if="address.length &gt; 0">',
				'<div class="address hbox">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{[this.parseAddress(values.address)]}</div>' +
                '</div>',
			'</tpl>',

            '<tpl if="tablet.length &gt; 0">',
                '<div class="tablet hbox">' +
                    '<div class="icon">&nbsp;</div>' +
                    '<div class="text">{tablet}</div>' +
                '</div>',
            '</tpl>',

            '<tpl if="website.length &gt; 0">',
                '<div class="website hbox">' +
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
					
					if (distance < 1000){
						return distance + " m";	
					}
					
					return (distance/1000).toFixed(1)+" km";
				}
			}
        ),
		
		items: [
			{
				xtype: "panel",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "hospitals-bar",
				tpl: [
					'<div class="icon"></div>',
					'<div class="title"><h1>{hospitals} pe o raz&#259; de {radius}km</h1></div>'
				].join(""),
				layout: {
					type: "hbox",
					pack: "justify",
					align: "center"
				},
				items: [{
					xtype: "button",
					itemId: "toggleBtn",
					iconCls: 'toggle up',
					cls: 'open-button',
					pressedCls: 'pressed',
					width: 55,
					height: 55,
					top: 0,
					right: 0,
					html: '',
					align: 'right'
				}]
			}
		]
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Hospitals"));
		
		var toggleBtn = this.down("#toggleBtn");
		toggleBtn.on("tap", this.onToggleBtnTap, this);
		
		this.on("updatebar", this.onUpdateBar, this);
		this.on("updateheight", this.onUpdateHeight, this);
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
			var text = hospitals + " spitale";	
		}
		else if (hospitals == 1){
			var text = hospitals + " spital";	
		}
		else{
			var text = "0 spitale"	
		}
		
		this.down("#topBar").setData({
			hospitals: text,
			radius: radius	
		})
	},
	
	onUpdateHeight: function(){
		var height = Ext.Viewport.getWindowHeight() * 0.4;
		this.setHeight(height);
	},
	
	onToggleBtnTap: function(){
		
		var opened = !this.getOpened();
		this.setOpened(opened);
		
		if (opened){
			this.fireEvent("openpanel");
		}
		else{
			this.fireEvent("closepanel");
		}
	},
	
	handleOrientationChange: function(){
		this.refresh();
		this.fireEvent("updateheight");
	},
	
	
	onOpenPanel: function(){
		var translateValue = -this.getHeight() + this.down('#topBar').getHeight();
		var time = 0.4;
		
		var toggleBtn = this.down("#toggleBtn");
		toggleBtn.setIconCls("toggle down");
		
        this.setStyle({
            '-webkit-transition': 'all '+time+'s ease',
            '-moz-transition': 'all '+time+'s ease',
            '-o-transition': 'all '+time+'s ease',
            'transition': 'all '+time+'s ease',
            '-webkit-transform': 'translate3d(0px, ' + translateValue + 'px, 0px)',
            '-moz-transform': 'translate3d(0px, ' + translateValue + 'px, 0px)',
            '-ms-transform': 'translate3d(0px, ' + translateValue + 'px, 0px)',
            '-o-transform': 'translate3d(0px, ' + translateValue + 'px, 0px)',
            'transform': 'translate3d(0px, ' + translateValue + 'px, 0px)'
        });
	},
	
	onClosePanel: function(){
		var time = 0.4;
		
		var toggleBtn = this.down("#toggleBtn");
		toggleBtn.setIconCls("toggle up");
		
        this.setStyle({
            '-webkit-transition': 'all '+time+'s ease',
            '-moz-transition': 'all '+time+'s ease',
            '-o-transition': 'all '+time+'s ease',
            'transition': 'all '+time+'s ease',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-moz-transform': 'translate3d(0px, 0px, 0px)',
            '-ms-transform': 'translate3d(0px, 0px, 0px)',
            '-o-transform': 'translate3d(0px, 0px, 0px)',
            'transform': 'translate3d(0px, 0px, 0px)'
        });
	}
});
