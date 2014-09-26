Ext.define("LDPA.model.Contact", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.JsonP'
	],
	
	config: {
		fields: [
			{name: 'name',  	type: 'string'},
			{name: 'email',  	type: 'string'},
			{name: 'source',   	type: 'string'},
			{name: 'quality',  	type: 'string'},
			{name: 'message', 	type: 'string'},
		],
		
		validations: [
			{type:  'presence', name: 'name',		message : "Numele este obligatoriu de completat!"},
			{type:  'presence', name: 'email', 		message : "Adresa de e-mail este obligatorie de completat!"},
			{type:  'email',   	name: 'email', 		message	: "Adresa de e-mail este invalid&#259;!"},
			{type : 'presence', name: 'message',	message : "Adaug&#259; un comentariu!"}
		],
	},
});
