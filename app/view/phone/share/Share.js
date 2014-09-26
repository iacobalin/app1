Ext.define("LDPA.view.phone.share.Share", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Component',
		'Ext.Button',
    ],
    config: {
        
		id: "sharePanel",
		title: 'Share',
		iconCls: 'share-icon',
		cls: 'share-details',
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		layout: {
			type: "vbox",
			pack: "center",
			align: "center"
		},
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				cls: 'top-titlebar',
				title: 'Share',
				items: [
					{
						align: 'left',
						ui: 'back',
						text: '&#206;napoi',
						handler: function(){
							var morePanel = this.up("#morePanel");
							var moreList = morePanel.down("#moreList");
							
							morePanel.animateActiveItem(moreList, {type: 'slide', direction: 'right'});
						}
					}
				]
			},
			{
				xtype	: "component",
				html	: "<p><b>Lec&#355;ia de prim ajutor</b> este un program de preven&#355;ie &#351;i educa&#355;ie pentru salvarea de vie&#355;i, care ofer&#259; solu&#355;ii la situa&#355;iile de urgen&#355;&#259; cele mai frecvente, care pot fi puse &#238;n practic&#259; &#238;n siguran&#355;&#259; de c&#259;tre persoane f&#259;r&#259; o preg&#259;tire medical&#259;. <!--<br/><br/>Aici sunt disponibile informa&#355;ii despre cum recunoa&#351;tem o urgen&#355;&#259; medical&#259;, cum putem oferi primul ajutor &#238;n cazul unei hemoragii, arsuri, intoxica&#355;ii, fracturi, cum s&#259; efectu&#259;m corect manevra Heimlich, dar &#351;i informatii despre preven&#355;ie &#351;i procedura de semnalare a unei situa&#355;ii de urgen&#355;&#259; la 112. --></p>",
                cls     : "share-text"
			},
			{
				xtype	: "panel",
				cls		: "share-button-box",
				items:	{
					xtype		: "button",
					text		: "Distribuie pe Facebook",
					baseCls    	: 'share-button-base',
					cls   		: 'share-facebook-button',
					pressedCls	: 'share-facebook-button-pressed',	
					iconCls		: 'facebook',
					iconmask	: true,
					hasDisabled	: false,
					handler		: function(btn){
						var webUrl = encodeURIComponent("http://lectiadeprimajutor.ro");
						var title = encodeURIComponent("Lectia de prim ajutor");
						
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
					scope		: this
				},
				scope	: this
			},
			
			{
				xtype	: "panel",
				cls		: "share-button-box",
				items:	{
					xtype		: "button",
					text		: "Distribuie pe Twitter",
					baseCls    	: 'share-button-base',
					cls   		: 'share-twitter-button',
					pressedCls	: 'share-twitter-button-pressed',	
					iconCls		: 'twitter',
					iconmask	: true,
					hasDisabled	: false,
					handler		: function(btn){
						var webUrl = "http://lectiadeprimajutor.ro";
						var title = "Viziteaza+site-ul:+";
						
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
					scope		: this
				},
				scope	: this
			},
			
			{
				xtype	: "panel",
				cls		: "share-button-box",
				items:	{
					xtype		: "button",
					text		: "Trimite unui prieten",
					baseCls    	: 'share-button-base',
					cls   		: 'share-email-button',
					pressedCls	: 'share-email-button-pressed',	
					iconCls		: 'email',
					iconmask	: true,
					hasDisabled	: false,
					handler		: function(btn){
						window.location = 'mailto:?subject=Lectia de prim ajutor';
					},
					scope		: this
				},
				scope	: this
			}
		]
    }
});