Ext.define("LDPA.view.tablet.search.Search", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.search.SearchPanel',
		'LDPA.view.tablet.search.SearchList'
	],
	
	config: {
		
		itemId: "searchView",
				
		// custom properties
		mask: null,
		
								
		// css properties
		layout: {
			type: 'fit'	
		},
		cls: "search-container",
		width: "100%",
		height: "100%",
		zIndex: 101,
						
		// properties
		scrollable: null,
		items: [
			{
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "Rezultatele c&#259;ut&#259;rii",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			},
			{
				xtype: 'panel',
				itemId: "searchBox",
				cls: "search-box",
				layout: {
					type: "hbox",
					pack: "justify",
					align: "stretch"	
				},
				flex: 1
			}
		],
		hidden: true,
		showAnimation: {
			type: "slideIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "slideOut",
			duration: 400,
			easing: "in"
		},
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var searchBox = this.down("#searchBox");
		
		var searchPanel = Ext.create("LDPA.view.tablet.search.SearchPanel");
		searchBox.add(searchPanel);
		
		var searchList = Ext.create("LDPA.view.tablet.search.SearchList");
		searchBox.add(searchList);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
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
	
	onCloseBtnTap: function(){
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	}
});
