Ext.define("LDPA.view.phone.more.Settings", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Component',
		'Ext.Button',
    ],
    config: {
        
		id: "settingsPanel",
		title: 'Set&#259;ri',
		iconCls: 'settings-icon',
		cls: 'settings-details',
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
				title: 'Set&#259;ri',
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
				xtype: 'component',
				html: '<p>Preg&#259;te&#351;te aplica&#355;ia pentru operare &#238;n modul offline prin desc&#259;rcarea articolelor &#238;n memoria dispozitivului mobil.<br/><br/></p>',
                cls: 'settings-text'
			},
			{
				xtype: 'button',
				itemId: "btnDownload",
				ui: 'confirm',
				text: '<a style="font-size:20px; text-decoration:none; color:white; width:100%; height:100%;">Descarc&#259; articole</a>',
				width: 220,
				height: 48,
                cls: 'settings-button',
                pressedCls: 'settings-button-pressed',
				handler: function(){
					//console.log("suna")	
				}
			},
			{
				xtype: 'component',
				itemId: "lastDateBox",
				tpl: new Ext.XTemplate(
					'<span><b>Ultima actualizare:</b> </span><span>{[this.transformDate(values.date)]}</span>',
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
		]
    }
});