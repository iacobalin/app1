Ext.define("LDPA.view.phone.actions.ActionsList", {
  	extend: 'Ext.List',
	
	requires: [
		"Ext.TitleBar",
		'LDPA.view.phone.actions.CallPanel',
		'LDPA.view.phone.actions.ContactForm',
		'LDPA.view.phone.actions.SharePanel',
		'LDPA.view.phone.actions.SettingsPanel'
	],
	
	config: {
		
		itemId: 'actionsList',
		name: 'actionsList',
		
		// custom properties
		mask: null,
		
		// css properties
		cls: 'actions-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
		height: 40,
		zIndex: 100,
				
		// properties
		scrollable:{
			direction: 'none',
		},
		inline: {
			wrap: false	
		},
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		itemTpl: new Ext.XTemplate(
			'<div style="{[ this.getItemSize(values.sequence-1); ]} padding-top: 2px; padding-bottom: 2px;">',
				'<div class="item-box vbox" style="">',
					'<div class="icon flex {icon}"></div>',
					'<div class="title">{title}</div>',
				'</div>',
			"</div>",
			{
				spacer: 4,
				minPadding: 10,
				minWidth: 100,
				maxWidth: 120,
				getItemSize: function(index){
					var vieportWidth = Ext.Viewport.getWindowWidth();
					
					// items per row
					var ln = Math.floor((vieportWidth - 2*this.minPadding) / this.minWidth);
					var itemWidth = Math.round((vieportWidth - 2*this.minPadding) / ln);
					itemWidth = Math.max(Math.min(itemWidth, this.maxWidth), this.minWidth);
					
					var itemHeight = Math.floor(3/4 * itemWidth);
					var generalPadding = Math.floor((vieportWidth - ln * itemWidth)/2);
					
					var extraWidth = 0;
					
					if ((index % ln) == 0){
						var paddingLeft = generalPadding + this.spacer/2;
						extraWidth = generalPadding;
					}
					else{
						var paddingLeft = this.spacer/2;	
					}
					
					if ((index+1 % ln) == 0){
						var paddingRight = generalPadding + this.spacer/2;	
						extraWidth = generalPadding;	
					}
					else{
						var paddingRight = this.spacer/2;
					}
					
					return "width: "+(itemWidth+extraWidth)+"px; height: "+itemHeight+"px; padding-left: "+paddingLeft+"px; padding-right: "+paddingRight+"px;";
				},
			}
		),
		items: [{
			xtype: "titlebar",
			itemId: "topBar",
			title: "Meniu",
			height: 40,
			docked: "top",	  
			cls: "menu-bar",
			items: [
				{
					xtype: "button",
					itemId: 'backBtn',
					iconCls: 'back',
					html: "&nbsp;",
					cls: "back-btn",
					pressedCls: "pressed",
					align: 'left'
				}
			]
		}],
		data: [
			{ title: 'Apel 112', type: 'call', icon: 'call', sequence: 1 },
			{ title: 'Lec&#355;ii video', type: 'video', icon: 'video', sequence: 2 },
			{ title: 'Hart&#259; spitale', type: 'map', icon: 'map', sequence: 3 },
			{ title: 'P&#259;rerea ta', type: 'comment', icon: 'comment', sequence: 4 },
			{ title: 'Share', type: 'share', icon: 'share', sequence: 5 },
			{ title: 'Set&#259;ri offline', type: 'settings', icon: 'settings', sequence: 6 }
		],
		hidden: true,
		showAnimation: {
			type: "slide",
			direction: "down",
			duration: 300,
			easing: "out"
		},
		hideAnimation: {
			type: "slideOut",
			direction: "up",
			duration: 300,
			easing: "in"
		}
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		//this.on("itemtap", this.onListItemTap, this);
		
		var backBtn = this.down("#backBtn");
		backBtn.on("tap", this.onBackBtnTap, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		this.on("painted", this.onPainted, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	
	onPainted: function(){
		
		var vieportWidth = Ext.Viewport.getWindowWidth();
		var minPadding = 10;
		var minWidth = 100;
		var maxWidth = 120;
					
		// items per row
		var ln = Math.floor((vieportWidth - 2*minPadding) / minWidth);
		var itemWidth = Math.round((vieportWidth - 2*minPadding) / ln);
			itemWidth = Math.max(Math.min(itemWidth, maxWidth), minWidth);
		
		var itemHeight = Math.floor(3/4 * itemWidth);
		
		// compute list's height
		var rows = Math.ceil(this.getData().length / ln);
		var listHeight = rows * itemHeight + this.down("#topBar").getHeight();		
		
		this.setHeight(listHeight+10);
	},
	
	
	onBackBtnTap: function(){
		this.getMask().fireEvent("close");	
	},
		
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy(true);	
		}, 400);
	},
	
	handleOrientationChange: function(){
		this.refresh();	
		this.onPainted();
	}
});
