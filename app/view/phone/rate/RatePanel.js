Ext.define("LDPA.view.phone.rate.RatePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "ratePanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'rate-panel',
		width: "85%",
		height: 220,
		maxWidth: 320,
		centered: true,
		layout: {
			type: "vbox",
			pack: "justify",
			align: "stretch"	
		},
						
		// properties
		scrollable: null,
		hidden: true,
		showAnimation: {
			type: "popIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "popOut",
			duration: 400,
			easing: "in"
		},
		items: [
			{
				xtype: "container",
				docked: "top",
				html: "Noteaza acest articol",
				height: 50,
				width: '100%',
				cls: "header",
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
					html: '&nbsp;'
				}]
			},
			{
				xtype: "panel",
				flex: 1,
				layout: {
					type: "hbox",
					pack: "center",
					align: "center"	
				},
				items: [
					{
						xtype: "button",
						itemId: "star1",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;'
					},
					{
						xtype: "button",
						itemId: "star2",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;'
					},
					{
						xtype: "button",
						itemId: "star3",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;'
					},
					{
						xtype: "button",
						itemId: "star4",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;'
					},
					{
						xtype: "button",
						itemId: "star5",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;'
					}
				]
			},
			{
				xtype: "button",
				itemId: "sendBtn",
				docked: "bottom",
				width: 140,
				height: 40,
				cls: "send-button",
				iconCls: '',
				html: 'Noteaza',
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
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
		this.getMask().fireEvent("close");	
	},
});
