Ext.define("LDPA.view.tablet.newsletter.Newsletter", {
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
        
		id: 'newsletterForm',
		title: 'Newsletter',
		iconCls: 'mail',
		
		styleHtmlContent: true,
        scrollable: null,
		cls: 'newsletter-form',
		
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
		
		items: [
			{
				xtype: 'component',
                cls: 'newsletter-top',
				html: '<div class="bar">' +
                        //'<img src="resources/images/newsletter.png" />'+
					    '<h1>Aboneaz&#259;-te la newsletter</h1>'+
                    '</div>' +
					'<p>Vrei s&#259; prime&#351;ti ultimele nout&#259;&#355;i din domeniul acord&#259;rii primului ajutor? Aboneaz&#259;-te la newsletter-ul Lec&#355;ia de prim ajutor.</p>'
			},
			{
				xtype: 'fieldset',
				instructions: 'C&#226;mpurile marcate cu * sunt obligatorii de completat!',
                cls: 'newsletter-fieldset',
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
					}
				]
			},
			{
				xtype			: "component",
				itemId			: "errorsPanel",
				cls				: "newsletter-errors",
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
