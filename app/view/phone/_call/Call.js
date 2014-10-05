Ext.define("LDPA.view.phone.call.Call", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Button',
    ],
    config: {
        
		title: 'Apel 112',
		iconCls: 'phone-icon',
		cls: "call-details",
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
		
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Apel serviciu de urgen&#355;&#259;'
			},
			{
				xtype: 'component',
				html: '<p>&#206;nainte de a continua apelul, g&acirc;nde&#351;te-te &#238;nc&#259; o dat&#259; dac&#259; este &#238;ntr-adev&#259;r nevoie de asisten&#355;a IMEDIAT&#258; a Salv&#259;rii, Poli&#355;iei sau Pompierilor &#238;n situa&#355;ia &#238;n care te afli.<br/><br/></p>',
                cls: 'call-text'
			},
			{
				xtype: 'button',
				ui: 'confirm',
				text: '<a href="tel:112" style="font-size:20px; text-decoration:none; color:white; width:100%; height:100%;">Apeleaz&#259; 112</a>',
				width: 150,
				height: 48,
                cls: 'call-button',
                pressedCls: 'call-button-pressed',
				handler: function(){
					//console.log("suna")	
				}
			}
		]
    }
});