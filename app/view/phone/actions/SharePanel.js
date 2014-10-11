Ext.define("LDPA.view.phone.actions.SharePanel", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		
		itemId: "sharePanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'share-panel',
		width: "85%",
		height: "85%",
		maxWidth: 320,
		maxHeight: 450,
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
				html: "Distribuie",
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
					html: ''
				}]
			},
			{
				xtype: "component",
				cls: 'content',
				html: "<p><b>Lec&#355;ia de prim ajutor</b> este un program de preven&#355;ie &#351;i educa&#355;ie pentru salvarea de vie&#355;i, care ofer&#259; solu&#355;ii la situa&#355;iile de urgen&#355;&#259; cele mai frecvente, care pot fi puse &#238;n practic&#259; &#238;n siguran&#355;&#259; de c&#259;tre persoane f&#259;r&#259; o preg&#259;tire medical&#259;. <!--<br/><br/>Aici sunt disponibile informa&#355;ii despre cum recunoa&#351;tem o urgen&#355;&#259; medical&#259;, cum putem oferi primul ajutor &#238;n cazul unei hemoragii, arsuri, intoxica&#355;ii, fracturi, cum s&#259; efectu&#259;m corect manevra Heimlich, dar &#351;i informatii despre preven&#355;ie &#351;i procedura de semnalare a unei situa&#355;ii de urgen&#355;&#259; la 112. --></p>"
			},
			{
				xtype: "container",
				flex: 1,
				items: [
					{
						xtype: "button",
						itemId: "facebookBtn",
						iconCls: 'facebook',
						cls: 'facebook-button',
						pressedCls: 'pressed',
						width: 200,
						height: 50,
						html: 'Facebook',
						handler: function(btn){
							var webUrl = encodeURIComponent("http://lectiadeprimajutor.ro");
							var title = encodeURIComponent("Lectia de prim ajutor");
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								/*var a = document.createElement("a");
								a.setAttribute("href", "http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title);
								a.setAttribute("target", "_system");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);*/
								
								window.open("http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title, '_system');
							}
						},
						scope: this
					},
					{
						xtype: "button",
						itemId: "twitterBtn",
						iconCls: 'twitter',
						cls: 'twitter-button',
						pressedCls: 'pressed',
						width: 200,
						height: 50,
						html: 'Twitter',
						handler: function(btn){
							var webUrl = "http://lectiadeprimajutor.ro";
							var title = "Viziteaza+site-ul:+";
							
							// offline
							if (!LDPA.app.isOnline()){
								alert(webcrumbz.offlineMsg);
							}
							// online
							else{
								// open a new link
								/*var a = document.createElement("a");
								a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
								a.setAttribute("target", "_system");
								
								var clickEvent = document.createEvent("MouseEvent");
								clickEvent.initMouseEvent("click", true, true, window, 0);
								a.dispatchEvent(clickEvent);*/
								window.open("http://www.twitter.com/?status="+title+"+"+webUrl, '_system');
							}
						},
						scope: this
					},
					{
						xtype: "button",
						itemId: "emailBtn",
						iconCls: 'email',
						cls: 'email-button',
						pressedCls: 'pressed',
						width: 200,
						height: 50,
						html: 'E-mail',
						handler: function(btn){
							window.location = 'mailto:?subject=Lectia de prim ajutor';
						},
						scope: this
					}
				]
			},
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
