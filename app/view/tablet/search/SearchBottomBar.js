Ext.define("LDPA.view.tablet.search.SearchBottomBar", {
    extend: 'Ext.Panel',
	  
	requires: [
		"LDPA.view.tablet.rate.RatePanel",
		"LDPA.view.tablet.comments.CommentsPanel"
	],  
	   
	config: {
		
		itemId: "bottomBar",
		
		// custom properties
		mask: null,
		openedHeight: 550,				// the height of this panel when it is opened
		closedHeight: 0,				// the visible height of this panel when it is closed
		status: 'closed',				// opened or closed
				
		// css properties
		height: 60,
		width: "100%",
		bottom: 0,  
		left: 0,
		cls: "article-bottom-bar",
		zIndex: 102,
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
		// properties
        items: [
			{
				xtype: 'panel',
				itemId: "buttons",
				layout: {
					type: 'hbox',
					pack: 'end',
					align: 'center'	
				},
				cls: 'buttons-panel',
				items: [
					{
						xtype: "button",
						itemId: "commentsBtn",
						action: 'view-comments',
						iconCls: 'comments',
						html: '',
						cls: 'comments-button',
						pressedCls: 'pressed',
						handler: function(btn){
							var articlePanel = btn.up("#searchPanel");
							var bottomBar = articlePanel.down("#bottomBar");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								var status = bottomBar.getStatus();
								if (status == "opened"){
									bottomBar.fireEvent("closemenu");
								}
								else{
									bottomBar.fireEvent("openmenu");
								}
								
							}
						},
						scope: this
					},
					{
						xtype: "button",
						itemId: "rateBtn",
						action: 'rate-article',
						iconCls: 'rate',
						html: '',
						cls: 'rating-button',
						pressedCls: 'pressed',
					}
				]
			},
		]	
	},

	initialize: function(){
        this.callParent(arguments);
		
		var rateBtn = this.down("#rateBtn");
		rateBtn.on("tap", this.onRateBtnTap, this);
		
		this.on("updatedata", this.onUpdateData, this);
		this.on("openmenu", this.onOpenMenu, this);
		this.on("closemenu", this.onCloseMenu, this);
		this.on("updatemenu", this.onUpdateMenu, this);
		this.on("setmask", this.onSetMask, this);
		
		// add comments panel
		var commentsPanel = Ext.create("LDPA.view.tablet.comments.CommentsPanel");
		this.add(commentsPanel);
		
		var buttons = this.down("#buttons");
		buttons.on("showbuttons", this.onShowButtons, this);
		buttons.on("hidebuttons", this.onHideButtons, this);
	},
	
	
	onUpdateData: function(values){
		var rateBtn = this.down("#rateBtn");
		rateBtn.setBadgeText(values.ratings);
		
		var commentsBtn = this.down("#commentsBtn");
		commentsBtn.setBadgeText(values.comment_count);
		
		var commentsPanel = this.down("#commentsPanel");
		commentsPanel.setArticleId(values.articleId);
		commentsPanel.setLoaded(false);
	},
	
	
	onRateBtnTap: function(){
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				ratePanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create category view
		var profile = webcrumbz.profile.toLowerCase();
		var ratePanel = Ext.create("LDPA.view."+profile+".rate.RatePanel", {
			mask: mask,
			articlePanel: this.up("#searchPanel"),
			zIndex: mask.getZIndex()+1,
		});
		
		Ext.Viewport.add(ratePanel);
		
		mask.show();
		ratePanel.show();
	},
	
	
	onOpenMenu: function(){
		var self = this;
		this.setStatus("opened");
		var to = -this.getOpenedHeight() + this.getClosedHeight();
		
		Ext.defer(function(){
			var duration = 0.4;
			self.setStyle({
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
		}, 400);
				
		this.fireEvent("setmask");
		
		this.down("#commentsPanel").fireEvent("setactions");
	},
	
	
	onCloseMenu: function(){
		this.setStatus("closed");
		
		var duration = 0.4;
		this.setStyle({
            '-webkit-transition': 'all ' + duration + 's ease',
            '-moz-transition': 'all ' + duration + 's ease',
            '-o-transition': 'all ' + duration + 's ease',
            'transition': 'all ' + duration + 's ease',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
            '-moz-transform': 'translate3d(0px, 0px, 0px)',
            '-ms-transform': 'translate3d(0px, 0px, 0px)',
            '-o-transform': 'translate3d(0px, 0px, 0px)',
            'transform': 'translate3d(0px, 0px, 0px)'
        });
		
		var mask = this.getMask();
		if (mask){
			mask.fireEvent("close");
		}
	},
	
	onUpdateMenu: function(){
				
		if (this.getStatus() == 'opened'){
			var to = -this.getOpenedHeight();
		
			var duration = 0;
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
	},
	
	
	onShowButtons: function(){
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
	
	
	onHideButtons: function(){
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
	},
	
	
	onSetMask: function(){
		
		var panel = this.up("#searchPanel");
		var bar = this;
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: false,
			zIndex: 101,
			closeFn: function(){
				Ext.defer(function(){
					bar.fireEvent("closemenu");
				}, 200);
			}
		});
		
		panel.add(mask);
		mask.show();
		
		this.setMask(mask);
	}
});
