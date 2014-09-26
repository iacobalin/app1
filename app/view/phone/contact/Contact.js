Ext.define("LDPA.view.phone.contact.Contact", {
    extend: 'Ext.form.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'Ext.field.Select',
		'Ext.Button',
    ],
    config: {
        
		id: 'contactForm',
		title: 'P&#259;rerea ta',
		iconCls: 'chat-icon',
		
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		
        cls: 'contact-form',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				cls: 'top-titlebar',
				title: 'P&#259;rerea ta',
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
				xtype: 'fieldset',
				title: 'P&#259;rerea ta conteaz&#259;',
				instructions: 'Scrie-ne dac&#259; vrei s&#259; ne semnalezi o situa&#355;ie medical&#259; cu care te-ai confruntat sau o solu&#355;ie de prim ajutor alternativ&#259;, precum &#351;i sugestii pentru &#238;mbun&#259;t&#259;&#355;irea aplica&#355;iei.<br/>C&#226;mpurile marcate cu * sunt obligatorii de completat!',
                cls: 'contact-fieldset',
				items: [
					{
						xtype: 'textfield',
						name : 'name',
						label: 'Nume',
						autoCapitalize: false,
						required: true,
					},
					{
						xtype: 'emailfield',
						name : 'email',
						label: 'E-mail',
						required: true,
					},
					{
						xtype: 'textareafield',
						label: 'Mesaj',
						maxRows: 4,
						name: 'message',
						required: true,
					}
				]
			},
			{
				xtype: 'component',
				html: 'De unde ai aflat prima dat&#259; de programul Lec&#355;ia de Prim Ajutor?',
				baseCls: '',
				style:{
					color: '#2A295F',
					fontSize: '20px',
					fontWeight: 'bold',
					lineHeight: '24px',
					padding: '15px 0px 10px',
					margin: 0,
					fontFamily: "'Helvetica Neue', Helvetica, Arial, cursive"
				},
			},
			{
				xtype: 'fieldset',
				cls: 'contact-fieldset',
				items: [
					{
						xtype: 'selectfield',
						name : 'source',
						labelWidth: 0,
						options: [
							{text: 'Alege o op\u021Biune',  value: 'Alege o optiune'},
							{text: 'De la televizor', value: 'De la televizor'},
							{text: 'Bloguri, site-uri',  value: 'Bloguri, site-uri'},
							{text: 'De la un prieten', value: 'De la un prieten'},
							{text: 'Din presa scris\u0103', value: 'Din presa scrisa'},
							{text: 'Motoare de c\u0103utare', value: 'Motoare de cautare'},
							{text: 'Alte surse', value: 'Alte surse'},
						]
					}
				]
			},
			{
				xtype: 'component',
				html: 'Cum &#355;i se par informa&#355;iile oferite pe aplica&#355;ia lectiadeprimajutor.ro?',
				baseCls: '',
				style:{
					color: '#2A295F',
					fontSize: '20px',
					fontWeight: 'bold',
					lineHeight: '24px',
					padding: '15px 0px 10px',
					margin: 0,
					fontFamily: "'Helvetica Neue', Helvetica, Arial, cursive"
				},
			},
			{
				xtype: 'fieldset',
				cls: 'contact-fieldset',
				items: [
					{
						xtype: 'selectfield',
						name : 'quality',
						labelWidth: 0,
						options: [
							{text: 'Alege o op\u021Biune',  value: 'Alege o optiune'},
							{text: 'Vitale / Indispensabile', value: 'Vitale / Indispensabile'},
							{text: 'Utile / Folositoare',  value: 'Utile / Folositoare'},
							{text: 'L\u0103muritoare', value: 'Lamuritoare'},
							{text: 'Neinteresante', value: 'Neinteresante'},
							{text: 'Nefolositoare', value: 'Nefolositoare'}
						]
					}
				]
			},
			{
				xtype			: "component",
				id				: "errorsPanel",
				cls				: "errors",
				tpl				: new Ext.XTemplate('<p>{message}</p>'),
			},
			{
				xtype: "button",
				text: "Trimite",
				padding: 10,
				width: 150,
				styleHtmlContent: true,
				style: {
					margin: "0 auto"
				}
			}
		]
    },
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});