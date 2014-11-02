Ext.define("LDPA.view.tablet.actions.ActionsList", {
  	extend: 'Ext.List',
	
	requires: [
		"Ext.TitleBar",
		'LDPA.view.tablet.actions.CallPanel',
		'LDPA.view.tablet.actions.ContactForm',
		'LDPA.view.tablet.actions.SharePanel',
		'LDPA.view.tablet.actions.SettingsPanel',
		'LDPA.view.tablet.actions.NewsletterForm',
		'LDPA.view.tablet.actions.QuestionForm'
	],
	
	config: {
		
		itemId: 'actionsList',
		name: 'actionsList',
		
		// custom properties
		//mask: null,
		
		// css properties
		cls: 'actions-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
		top: 0,
		right: 0,
		width: 300,
        height: '100%',
		itemHeight: 60,
				
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		itemTpl: new Ext.XTemplate(
			'<div style="height: 60px;">',
				'<div class="item-box hbox" style="">',
					'<div class="icon {icon}"></div>',
					'<div class="title flex">{title}</div>',
				'</div>',
			'</div>'
		),
		items: [{
			xtype: "panel",
			itemId: "searchBar",
			height: 45,
			docked: "top",	  
			cls: "menu-bar",
			layout: {
				type: "hbox",
				pack: "justify",
				align: "stretch"
			},
			items: [
				{
					xtype: 'searchfield',
					placeHolder: 'Caut\u0103...',
					cls: 'search-field',
					flex: 1
				}
			]
		}],
		data: [
			{ title: 'Lec&#355;ii video', type: 'video', icon: 'video', sequence: 1 },
			{ title: 'Hart&#259; spitale', type: 'map', icon: 'map', sequence: 2 },
			{ title: 'Nout&#259;&#355;i', type: 'news', icon: 'news', sequence: 3 },
			{ title: 'P&#259;rerea ta', type: 'comment', icon: 'comment', sequence: 4 },
			{ title: 'Quiz', type: 'quiz', icon: 'quiz', sequence: 5 },
			{ title: 'Share', type: 'share', icon: 'share', sequence: 6 },
			{ title: 'Newsletter', type: 'newsletter', icon: 'newsletter', sequence: 7 },
			{ title: 'Ai o nel&#259;murire?', type: 'ask', icon: 'ask', sequence: 8 },
			{ title: 'Set&#259;ri offline', type: 'settings', icon: 'settings', sequence: 9 }
		],
		hidden: true
    },
	
	initialize: function(){
		this.callParent(arguments);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
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
	
	handleOrientationChange: function(){
		this.refresh();	
	}
});
