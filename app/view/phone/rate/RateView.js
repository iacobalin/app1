Ext.define("LDPA.view.phone.rate.RateView", {
    extend: 'Ext.Panel',
	xtype: 'rateview',
    requires: [
        'Ext.TitleBar',
		'Ext.Panel',
		'Ext.Button'
    ],
    config: {
        
		id			: 'rateView',
		centered 	: true,
		modal		: true,
		hideOnMaskTap: true,
		floatingCls	: '',
		layout		: {
			type: 'vbox',
			pack: 'center'
		},
		items		: [],
		
		titleBar	: null,
		starsPanel	: null,
		buttonsPanel: null,
		opener		: null,
		
		currentRate	: 0,
		postId		: 0,
		postRanking	: 0,
        cls: 'rate-view'
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("painted", this.onPainted, this);
		//this.on("updatedata", this.onUpdateData, this);
	},
	
	onPainted: function(){
		this.setItems(this.buildItems());
	},
	
	buildItems: function(){
		
		this.setTitleBar(Ext.create("Ext.TitleBar", {
			docked: 'top',
			title: 'Noteaz&#259; acest articol',
		}));

        
		this.setStarsPanel(Ext.create("Ext.Panel", {
			layout: {
				type: 'hbox',
				pack: 'center',
				align: 'center'
			},
            cls:'rate-stars-container',
			items: [
				{
					xtype		: "button",
					id			: 'star1',
                    baseCls    	: '',
                    //cls   		: 'note-star-button-selected',
					cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star3',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(1);	
					},
					scope		: this
				},
				{
					xtype		: "button",
					id			: 'star2',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star3',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(2);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					id			: 'star3',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star3',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(3);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					id			: 'star4',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star3',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(4);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					id			: 'star5',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star3',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(5);		
					},
					scope		: this
				}
			]							  
		}));
		
		
		this.setButtonsPanel(Ext.create("Ext.Panel", {
			layout: {
				type: 'hbox',
				pack: 'center',
				align: 'center'
			},
            cls: 'rate-buttons-container',
			items: [
				{
					xtype	    : "button",
					id		    : 'buttonVote',
					text	    : 'Noteaz&#259;',
                    baseCls    	: 'ok-note-button-base',
                    cls   		: 'ok-note-button',
                    pressedCls	: 'ok-note-button-pressed',
                    iconCls		: 'check2',
                    iconMask	: true,
					handler	    : function(){
						this.sendRating();	
					},
					scope	    : this
				},
				{
					xtype	: "button",
					id		: 'buttonCancel',
					text	: 'Renun&#355;&#259;',
                    baseCls    	: 'cancel-note-button-base',
                    cls   		: 'cancel-note-button',
                    pressedCls	: 'cancel-note-button-pressed',
                    iconCls		: 'delete1',
                    iconMask	: true,
					handler	: function(){
						this.hide();	
					},
					scope	: this
				}
			]							
		}));
		
		return [this.getTitleBar(), this.getStarsPanel(), this.getButtonsPanel()];
	},
	
	
	selectRate: function(rate){
		this.setCurrentRate(rate);
		
		var starPanel = this.getStarsPanel();
		
		for (var i=1; i<=this.getCurrentRate(); i++){
			var button = starPanel.down("#star"+i);
			button.setCls("note-star-button-selected");
		}
		
		for (var i=this.getCurrentRate()+1; i<=5; i++){
			var button = starPanel.down("#star"+i);
			button.setCls("note-star-button");
		}
	},
	
	
	sendRating: function(){
		if (this.getCurrentRate() == 0) return;
		
		var self = this;
		var postId = this.getPostId();
		
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general'
		});
		
		
		// offline
		if (!LDPA.app.isOnline()){
			Ext.Viewport.unmask();
			
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{
		
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.vote',
				params: {
					id: postId,
					vote: this.getCurrentRate(),
					key: webcrumbz.key
				},
				success: function(result, request) {
					var newRanking = result.ratings;
					var newNoComments = result.comment_count;
					
					//update details view
					var data = self.getOpener().getData();
					data.ranking = newRanking;
					data.comment_count = newNoComments;
					self.getOpener().setData(data);
					
					var backPanel = self.getOpener().getBackPanel();
					
					// articles and search
					if (backPanel){
						var list = backPanel.down("#categoryArticlesList");
						
						// articles
						if (list){
							// update content
							list.updateArticleItem(data);
						}
						// search
						else{
							//update list view
							var store = backPanel.getStore();
							var record = store.findRecord("id", postId, 0, false, true, true);
							record.set("ranking", newRanking);
							record.set("comment_count", newNoComments);
						}
					}
					// video
					else{
						// update video list view
						var store = Ext.Viewport.down("#videoList").getStore();
						var record = store.findRecord("id", postId, 0, false, true, true);
						record.set("ranking", newRanking);
						record.set("comment_count", newNoComments);
					}
					
					self.hide();
					Ext.Viewport.unmask();
				}
			});
		}
	},
});
