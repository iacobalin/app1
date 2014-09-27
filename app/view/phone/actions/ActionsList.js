Ext.define("LDPA.view.phone.actions.ActionsList", {
  	extend: 'Ext.List',
	
	requires: [
		
	],
	
	config: {
		
		itemId: 'actionsList',
		
		// custom properties
		
		// css properties
		cls: 'actions-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
				
		// properties
		scrollable:{
			direction: 'none',
		},
		inline: {
			wrap: true	
		},
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		itemTpl: new Ext.XTemplate(
			"<div style='{[ this.getItemSize(); ]}'>",
				"<div class='{icon}'></div>",
				"<div class='title'>{title}</div>",
			"</div>",
			{
				spacer: 12,
				minPadding: 30,
				minWidth: 200,
				maxWidth: 240,
				getItemSize: function(){
					var vieportWidth = Ext.Viewport.getWindowWidth();
					
					// items per row
					var ln = Math.floor((vieportWidth - 2*this.minPadding) / this.minWidth);
					var itemWidth = Math.round((vieportWidth - 2*this.minPadding - (ln-1)*this.spacer) / ln);
					itemWidth = Math.max(Math.min(itemWidth, this.maxWidth), this.minWidth);
					
					var itemHeight = Math.floor(3/4 * itemWidth);
					return "width: "+itemWidth+"px; height: "+itemHeight+"px;";
				}
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
			{ title: 'Apel 112', type: 'call', icon: 'call' },
			{ title: 'Lectii video', type: 'video', icon: 'video' },
			{ title: 'Harta spitale', type: 'map', icon: 'map' },
			{ title: 'Parerea ta', type: 'comment', icon: 'comment' },
			{ title: 'Share', type: 'share', icon: 'share' },
			{ title: 'Setari offline', type: 'settings', icon: 'settings' }
		],
		showAnimation: {
			type: "slide",
			direction: "down",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "slideOut",
			direction: "up",
			duration: 400,
			easing: "in"
		}
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("itemtap", this.onListItemTap, this);
		
		var backBtn = this.down("#backBtn");
		backBtn.on("tap", this.onBackBtnTap, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
	},
	
	
	onListItemTap: function(list, index, item, record){
		
		switch (record.get("type")){
			
			case "call":
				break;
				
			case "video":
				break;
				
			case "map":
				break;
				
			case "comment":
				break;
				
			case "share":
				break;
				
			case "settings":
				break;
				
			default: break;	
		}
	},
	
	
	onBackBtnTap: function(){
		this.getMask().fireEvent("close");	
	},
		
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();	
	}
});
