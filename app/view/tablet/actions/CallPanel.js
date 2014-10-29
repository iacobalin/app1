Ext.define("LDPA.view.tablet.actions.CallPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "callPanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'call-panel',
		width: "85%",
		height: 250,
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
				html: "Apel serviciu de urgen&#355;&#259;",
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
				cls: 'content',
				html: "<p>&#206;nainte de a continua apelul, g&acirc;nde&#351;te-te &#238;nc&#259; o dat&#259; dac&#259; este &#238;ntr-adev&#259;r nevoie de asisten&#355;a IMEDIAT&#258; a Salv&#259;rii, Poli&#355;iei sau Pompierilor &#238;n situa&#355;ia &#238;n care te afli.</p>"
			},
			{
				xtype: "button",
				itemId: "callBtn",
				docked: "bottom",
				width: 140,
				height: 40,
				cls: "call-button",
				pressedCls: "pressed",
				iconCls: 'call',
				html: '<a href="tel:112" style="text-decoration:none; width:100%; height:100%;">Apeleaz&#259; 112</a>',
				handler: function(btn){
					window.open('tel:112', '_system');	
				},
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
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	}
});
