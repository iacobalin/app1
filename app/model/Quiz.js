Ext.define("LDPA.model.Quiz", {
    extend: 'Ext.data.Model',
	requires: [
		
	],
	
	config: {
		fields: [
			{name: 'id',  			type: 'int'},
			{name: 'question', 		type: 'string'},
			{name: 'answers',		type: 'object'},
		]
	},
});
