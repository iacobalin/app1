Ext.define('LDPA.view.phone.home.SearchBar', {
    extend: 'Ext.form.Panel',
    
    requires: [
		'Ext.field.Search', 
		'Ext.form.Panel'
	],

    config: {
		cls: 'search-toolbar',
		items: {
			xtype: 'titlebar',
			docked: 'top',
			ui: 'light',
			padding: 5,
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'stretch'
			},
			items: {
				xtype: 'searchfield',
				placeHolder: 'Caut\u0103...',
                cls: 'search-field',
                flex: 1
			}
		}
    }
});