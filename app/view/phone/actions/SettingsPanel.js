Ext.define("LDPA.view.phone.actions.SettingsPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "settingsPanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'settings-panel',
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
				html: "Set&#259;ri offline",
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
				html: "<p>Preg&#259;te&#351;te aplica&#355;ia pentru operare &#238;n modul offline prin desc&#259;rcarea articolelor &#238;n memoria dispozitivului mobil.</p>"
			},
			{
				xtype: 'component',
				itemId: "lastDateBox",
				height: 40,
				tpl: new Ext.XTemplate(
					'<p><b>Ultima actualizare:</b> </span><span>{[this.transformDate(values.date)]}</p>',
					{
						transformDate: function(date){
							if (typeof date == "object"){
								var strDateTime = [[this.addZero(date.getDate()), this.addZero(date.getMonth() + 1), date.getFullYear()].join("/"), [this.addZero(date.getHours()), this.addZero(date.getMinutes())].join(":"), date.getHours() >= 12 ? "PM" : "AM"].join(" ");
								return strDateTime;
							}
							return date;
						},
						addZero: function(num){
							return (num >= 0 && num < 10) ? "0" + num : num + "";	
						}
					}
				),
               	data: {
					date: (window.localStorage.lastDownloadDate) ? new Date(window.localStorage.lastDownloadDate) : "-"	
				},
				cls: 'settings-text-small'
			},
			{
				xtype: "component",
				itemId: "progressBar",
				height: 80,
				cls: "progress-box",
				tpl: new Ext.XTemplate(
					'<div class="progress-bar">',
						'<div class="progress" style="width: {progress}%"></div>',
						'<div class="bg"></div>',
					'</div>'
				),
				data:{
					progress: 0	
				},
				hidden: true,
				showAnimation: {
					type: "fadeIn",
					duration: 200,
					easing: "out"
				}
			},
			{
				xtype: "button",
				itemId: "settingsBtn",
				docked: "bottom",
				width: 160,
				height: 40,
				cls: "settings-button",
				iconCls: 'download',
				pressedCls: "pressed",
				html: 'Descarc&#259; articole',
				handler: function(btn){
					
					// offline
					if (!LDPA.app.isOnline()){
						alert(webcrumbz.offlineMsg);
					}
					// online
					else{
						btn.hide();
						Ext.defer(function(){
							btn.getParent().down("#progressBar").show();
						}, 200);
						actionsController.downloadContent();
					}
				},
				scope: this,
				hideAnimation: {
					type: "fadeOut",
					duration: 200,
					easing: "in"
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
