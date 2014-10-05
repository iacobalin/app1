Ext.define("LDPA.view.phone.home.ArticleDetails", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
        'Ext.Toolbar',
		'LDPA.view.phone.rate.RateView'
    ],
    config: {
        backPanel: null,
		
		itemId: 'articleDetails',
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		cls: 'post-view',
		
		tpl: new Ext.XTemplate(
			'<h1 class="title">{title}</h1>'+
            '<tpl if="category">',
				'<h2 class="category"><span>Categorie</span>: {category}</h2>',
			'</tpl>',
            '<div class="content">{content}</div>'
		),
		
		layout: 'fit',
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				cls: 'top-titlebar',
				title: 'Detalii',
				items: [
					{
						align: 'left',
						ui: 'back',
						text: '&#206;napoi',
						handler: function(){
							var articleDetails = this.up("#articleDetails");
							var homePanel = articleDetails.up("#homePanel");
							
							homePanel.animateActiveItem(articleDetails.getBackPanel() || 0, {type: 'slide', direction: 'right'});
						}
					}
				]
			},
			{
				xtype: "panel",
				docked: 'bottom',
				title: '',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'start'
				},
				cls: 'bottom-toolbar',
				items: [
					{
						xtype		: "button",
						text		: "Share",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'facebook4',
						hasDisabled	: false,
						handler		: function(btn){
							var articleDetails = this.up("#articleDetails");
							
							var webUrl = encodeURIComponent(articleDetails.getData().link);
							var title = encodeURIComponent(articleDetails.getData().title);
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
							
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", "http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						text		: "Tweet",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'twitter4',
						hasDisabled	: false,
						handler		: function(btn){
							var articleDetails = this.up("#articleDetails");
							
							var webUrl = articleDetails.getData().link;
							//var title = this.getData().title;
							var title = "Citeste+acest+articol:+";
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						itemId		: "articleCommentBtn",
						text		: "0",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'chat4',
						hasDisabled	: false,
						handler		: function(btn){
							var articleDetails = this.up("#articleDetails");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								var a = document.createElement("a");
								a.setAttribute("href", articleDetails.getData().comment_link);
								a.setAttribute("target", "_blank");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);
							}
						},
					},
					{
						xtype		: "button",
						itemId		: "articleVoteBtn",
						text		: "0",
						baseCls    	: 'button-base',
						cls   		: 'button',
						pressedCls	: 'button-pressed',
						iconCls		: 'star2',
						hasDisabled	: false,
						handler		: function(btn){
							var articleDetails = this.up("#articleDetails");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								articleDetails.openRatePanel();
							}
						},
					}
				]
			}
		]
    },
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("updatedata", this.onUpdateData, this);
	},
	
	
	onUpdateData: function(panel, data){
		var articleVoteBtn = panel.down("#articleVoteBtn");
		var articleCommentBtn = panel.down("#articleCommentBtn");
		
		articleVoteBtn.setText(String(data.ranking));
		articleCommentBtn.setText(String(data.comment_count));
	},
	
	
	openRatePanel: function(){
		
		this.ratePanel = Ext.Viewport.down("rateview");
		if (this.ratePanel){
			this.ratePanel.destroy();
		}
		
		this.ratePanel = Ext.create('LDPA.view.phone.rate.RateView', {opener: this, postId: this.getData().id, postRanking: this.getData().ranking});
		Ext.Viewport.add(this.ratePanel);
		this.ratePanel.show('pop');
	}
	
});
