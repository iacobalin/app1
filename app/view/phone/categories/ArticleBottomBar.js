Ext.define("LDPA.view.phone.categories.ArticleBottomBar", {
    extend: 'Ext.Panel',
	   
	config: {
		
		itemId: "bottomBar",
		
		// custom properties
				
		// css properties
		height: 50,
		width: "100%",
		bottom: 0,  
		left: 0,
		cls: "bottom-bar",
		layout: {
			type: "hbox",
			pack: "justify",
			align: "stretch"
		},
		
		// properties
        items: [
			{
				xtype: "button",
				action: 'view-comments',
				iconCls: 'comments',
				html: '',
				cls: 'comments-button',
				pressedCls: 'pressed',
				flex: 1,
			},
			{
				xtype: "button",
				action: 'rate-article',
				iconCls: 'rate',
				html: '',
				cls: 'rating-button',
				pressedCls: 'pressed',
				flex: 1
			}
		]	
	},

	initialize: function(){
        this.callParent(arguments);
		
		this.on("showbar", this.onShowBar, this);
		this.on("hidebar", this.onHideBar, this);
	},
	
	
	onShowBar: function(){
		var duration = 0.4;
		
		// slide in
		var to = 0;
		this.setStyle({
			'-webkit-transition': 'all ' + duration + 's ease',
			'-moz-transition': 'all ' + duration + 's ease',
			'-o-transition': 'all ' + duration + 's ease',
			'transition': 'all ' + duration + 's ease',
			'-webkit-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-moz-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-ms-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-o-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'transform': 'translate3d(0px, ' + to + 'px, 0px)'
		});
	},
	
	
	onHideBar: function(){
		var duration = 0.4;
		
		// slide in
		var to = 70;
		this.setStyle({
			'-webkit-transition': 'all ' + duration + 's ease',
			'-moz-transition': 'all ' + duration + 's ease',
			'-o-transition': 'all ' + duration + 's ease',
			'transition': 'all ' + duration + 's ease',
			'-webkit-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-moz-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-ms-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'-o-transform': 'translate3d(0px, ' + to + 'px, 0px)',
			'transform': 'translate3d(0px, ' + to + 'px, 0px)'
		});
	}
});
