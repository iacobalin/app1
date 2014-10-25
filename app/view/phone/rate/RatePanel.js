Ext.define("LDPA.view.phone.rate.RatePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "ratePanel",
				
		// custom properties
		mask: null,
		articlePanel: null,									// a reference to articlePanel
		rate: 0,											// current rate
										
		// css properties
		cls: 'rate-panel',
		width: "85%",
		height: 200,
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
				html: "Noteaz&#259; acest articol",
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
						iconCls: 'star',
						height: 45,
						width: 38,
						html: '',
						rate: 1
					},
					{
						xtype: "button",
						itemId: "star2",
						cls: "empty-star",
						pressedCls: 'filled-star',
						iconCls: 'star',
						height: 45,
						width: 38,
						html: '',
						rate: 2
					},
					{
						xtype: "button",
						itemId: "star3",
						cls: "empty-star",
						pressedCls: 'filled-star',
						iconCls: 'star',
						height: 45,
						width: 38,
						html: '',
						rate: 3
					},
					{
						xtype: "button",
						itemId: "star4",
						cls: "empty-star",
						pressedCls: 'filled-star',
						iconCls: 'star',
						height: 45,
						width: 38,
						html: '',
						rate: 4
					},
					{
						xtype: "button",
						itemId: "star5",
						cls: "empty-star",
						pressedCls: 'filled-star',
						iconCls: 'star',
						height: 45,
						width: 38,
						html: '',
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
				iconCls: 'send',
				html: 'Noteaz&#259;',
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
		var rate = btn.config.rate;
		this.setRate(rate);
		
		// add filled starS
		for (var i=1; i<=rate; i++){
			var starBtn = this.down("#star"+i);
			starBtn.removeCls(starBtn.getPressedCls());
			starBtn.addCls(starBtn.getPressedCls());
		}
		
		// add empty stars
		for (var j=rate+1; j<=5; j++){
			var starBtn = this.down("#star"+j);	
			starBtn.removeCls(starBtn.getPressedCls());
		}
	},
	
	
	onSendBtnTap: function(){
		
		if (this.getRate() == 0) return;
		
		var articlePanel = this.getArticlePanel();
		var article = articlePanel.getData();
		
		var self = this;
		var callback = function(values){
			
			// close rate panel
			self.onCloseBtnTap();
			
			// update article's bottom bar
			articlePanel.down("#bottomBar").fireEvent("updatedata", values);
		}
		
		// send rate value to server
		actionsController.rateArticle({
			articleId: article.id,
			rate: this.getRate(),
			callback: callback
		})
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
	},
});
