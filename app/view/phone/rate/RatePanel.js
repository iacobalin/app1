Ext.define("LDPA.view.phone.rate.RatePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "ratePanel",
				
		// custom properties
		mask: null,
		articlePanel: null,									// a reference to articlePanel
										
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
						html: '&nbsp;',
						rate: 1
					},
					{
						xtype: "button",
						itemId: "star2",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;',
						rate: 2
					},
					{
						xtype: "button",
						itemId: "star3",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;',
						rate: 3
					},
					{
						xtype: "button",
						itemId: "star4",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;',
						rate: 4
					},
					{
						xtype: "button",
						itemId: "star5",
						cls: "empty-star",
						pressedCls: 'filled-star',
						height: 45,
						width: 45,
						html: '&nbsp;',
						rate: 5
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
		
		var sendBtn = this.down("#sendBtn");
		sendBtn.on("tap", this.onSendBtnTap, this);
		
		for (var i=1; i<=5; i++){
			var starBtn = this.down("#star"+i);
			starBtn.on("tap", this.onStarBtnTap, this);	
		}
	},
	
	
	onStarBtnTap: function(btn){
		var rate = btn.getRate();
		console.log(rate);
	},
	
	
	onSendBtnTap: function(){
		
		var articlePanel = this.getArticlePanel();
		var article = articlePanel.getData();
		
		var callback = function(values){
			this.onClosePanel();
			console.log(values);
			// update article's bottom bar
			articlePanel.down("#bottomBar").fireEvent("updatedata", values);
		}
		
		actionsController.rateArticle({
			articleId: article.id,
			callback: callback
		})
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		this.onCloseBtnTap();
		
		var me = this;
		Ext.defer(function(){
			me.destroy(true);	
		}, 400);
	},
	
	onCloseBtnTap: function(){
		if (this.getMask()) 
			this.getMask().fireEvent("close");	
	},
});
