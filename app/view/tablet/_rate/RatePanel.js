Ext.define("LDPA.view.tablet.rate.RatePanel", {
    extend: 'Ext.Panel',
	requires: [
        'Ext.TitleBar',
		'Ext.Panel',
		'Ext.Button'
    ],
    config: {
        
		itemId		: 'ratePanel',
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
					itemId		: 'star1',
                    baseCls    	: '',
                    //cls   		: 'note-star-button-selected',
					cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(1);	
					},
					scope		: this
				},
				{
					xtype		: "button",
					itemId		: 'star2',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(2);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					itemId		: 'star3',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(3);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					itemId		: 'star4',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star',
                    iconMask	: true,
					handler		: function(){
						this.selectRate(4);		
					},
					scope		: this
				},
				{
					xtype		: "button",
					itemId		: 'star5',
                    baseCls    	: '',
                    cls   		: 'note-star-button',
                    pressedCls	: '',
                    iconCls		: 'star',
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
					itemId	    : 'buttonVote',
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
					xtype		: "button",
					itemId		: 'buttonCancel',
					text		: 'Renun&#355;&#259;',
                    baseCls    	: 'cancel-note-button-base',
                    cls   		: 'cancel-note-button',
                    pressedCls	: 'cancel-note-button-pressed',
                    iconCls		: 'delete1',
                    iconMask	: true,
					handler		: function(){
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
		
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general'
		});
		
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: webcrumbz.exportPath+'?json=tablet.vote',
            params: {
                id: this.getPostId(),
                vote: this.getCurrentRate(),
				key: webcrumbz.key
            },
            success: function(result, request) {
               	var newRanking = result.ratings;
				
				//update details view
				var data = self.getOpener().getData();
				data.ranking = newRanking;
				self.getOpener().setData(data);
				self.getOpener().fireEvent("syncontent");
				
				self.hide();
				Ext.Viewport.unmask();
            }
        });
	},
});
