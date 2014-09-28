Ext.define("LDPA.view.phone.CloseButton", {
    extend: 'Ext.Button',
	xtype: 'closebutton',
	   
	config: {
		
		// custom properties
		action: 'close',
		
		// css properties
		iconCls: 'close',
		cls: 'close-button',
		pressedCls: 'pressed',
		width: 60,
		height: 60,
		top: 0,
		right: 0,
		
		// properties
        html: '&nbsp;'
	},

	initialize: function(){
        this.callParent(arguments);
		
		this.on("showbtn", this.onShowBtn, this);
		this.on("hidebtn", this.onHideBtn, this);
	},
	
	
	onShowBtn: function(){
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
	
	
	onHideBtn: function(){
		var duration = 0.4;
		
		// slide in
		var to = -70;
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
