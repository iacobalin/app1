Ext.define("LDPA.model.Comments", {
    extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.JsonP',
	],
	
	config: {
		fields: [
			{name: 'id',  			type: 'int'},
			{name: 'article_id',	type: 'int'},
			{name: 'user',   		type: 'string'},
			{name: 'email',   		type: 'string'},
			{name: 'comment',   	type: 'string'},
			{name: 'date',   		type: 'string'},
		],
		
		validations: [
			{type:  'presence', name: 'user',		message : "Numele este obligatoriu de completat!"},
			{type:  'presence', name: 'email', 		message : "Adresa de e-mail este obligatorie de completat!"},
			{type:  'email',   	name: 'email', 		message	: "Adresa de e-mail este invalid&#259;!"},
			{type : 'presence', name: 'comment',	message : "Adaug&#259; un comentariu!"}
		]
	},
});
