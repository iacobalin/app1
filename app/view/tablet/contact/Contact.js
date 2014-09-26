Ext.define("LDPA.view.tablet.contact.Contact", {
    extend: 'Ext.form.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'Ext.field.Select',
		'Ext.Button'
    ],
    config: {
        
		id: 'contactForm',
		title: 'P&#259;rerea ta',
		iconCls: 'chat1',
		
		styleHtmlContent: true,
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		cls: 'contact-form',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'center'
		},
		
		items: [
            {
                xtype: 'component',
                html: 'P&#259;rerea ta conteaz&#259;',
                cls: 'contact-bar',
                docked: 'top'

            },
			{
				xtype: 'fieldset',
				//title: 'P&#259;rerea ta conteaz&#259;',
				instructions: 'Scrie-ne dac&#259; vrei s&#259; ne semnalezi o situa&#355;ie medical&#259; cu care te-ai confruntat sau o solu&#355;ie de prim ajutor alternativ&#259;, precum &#351;i sugestii pentru &#238;mbun&#259;t&#259;&#355;irea aplica&#355;iei.<br/>C&#226;mpurile marcate cu * sunt obligatorii de completat!',
                cls: 'contact-fieldset',
				items: [
					{
						xtype: 'textfield',
						name : 'name',
						label: 'Nume',
						autoCapitalize: false,
						required: true
					},
					{
						xtype: 'emailfield',
						name : 'email',
						label: 'E-mail',
						required: true
					},
					{
						xtype: 'textareafield',
						label: 'Mesaj',
						maxRows: 8,
						name: 'message',
						required: true
					}
				]
			},
			{
				xtype: 'component',
				html: 'De unde ai aflat prima dat&#259; de programul Lec&#355;ia de Prim Ajutor?',
				cls: 'contact-question-title'
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
							{text: 'De pe Facebook', value: 'De pe Facebook'},
							{text: 'De la televizor', value: 'De la televizor'},
							{text: 'Bloguri, site-uri',  value: 'Bloguri, site-uri'},
							{text: 'De la un prieten', value: 'De la un prieten'},
							{text: 'Din presa scris\u0103', value: 'Din presa scrisa'},
							{text: 'Motoare de c\u0103utare', value: 'Motoare de cautare'},
							{text: 'Alte surse', value: 'Alte surse'}
						]
					}
				]
			},
			{
				xtype: 'component',
				html: 'Cum &#355;i se par informa&#355;iile oferite pe aplica&#355;ia lectiadeprimajutor.ro?',
                cls: 'contact-question-title'
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
				itemId			: "errorsPanel",
				cls				: "contact-errors",
				tpl				: new Ext.XTemplate('<p>{message}</p>')
			},
			{
				xtype: "button",
				text: "Trimite",
				styleHtmlContent: true,
                cls: 'send-contact-form-button',
                pressedCls: 'send-contact-form-button-pressed'
			}
		]
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});
