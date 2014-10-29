Ext.define("LDPA.view.tablet.share.Share", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Component',
		'Ext.Button'
    ],
    config: {
        
		id: 'sharePanel',
		title: 'Share',
		iconCls: 'share',
		
		styleHtmlContent: true,
		scrollable: null,
		
		layout: {
			type: "vbox",
			pach: "center",
			align: "center"
		},
        cls: 'share-panel',
		
		
		items: [
			{
                xtype:"component",
                html:"<div class='bar'>" +
                        "<h1>Share</h1>" +
                    "</div>" +
                    "<p><strong>Lec&#355;ia de prim ajutor</strong> este un program de preven&#355;ie &#351;i educa&#355;ie pentru salvarea de vie&#355;i, care ofer&#259; solu&#355;ii la situa&#355;iile de urgen&#355;&#259; cele mai frecvente, care pot fi puse &#238;n practic&#259; &#238;n siguran&#355;&#259; de c&#259;tre persoane f&#259;r&#259; o preg&#259;tire medical&#259;.</p>",
                cls:"share-top"
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
						
						// open a new link
						var a = document.createElement("a");
						a.setAttribute("href", "http://www.facebook.com/sharer.php?u="+webUrl+"&t="+title);
						a.setAttribute("target", "_blank");
						
						var clickEvent = document.createEvent("MouseEvent");
						clickEvent.initMouseEvent("click", true, true, window, 0);
						a.dispatchEvent(clickEvent);
					},
					scope		: this
				},
				scope	: this
			},
			{
				xtype	: "spacer",
				height: 15
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
						
						// open a new link
						var a = document.createElement("a");
						a.setAttribute("href", "http://www.twitter.com/?status="+title+"+"+webUrl);
						a.setAttribute("target", "_blank");
						
						var clickEvent = document.createEvent("MouseEvent");
						clickEvent.initMouseEvent("click", true, true, window, 0);
						a.dispatchEvent(clickEvent);
					},
					scope		: this
				},
				scope	: this
			},
			{
				xtype	: "spacer",
				height: 15
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
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});
