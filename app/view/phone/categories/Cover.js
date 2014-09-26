Ext.define("LDPA.view.phone.categories.Cover", {
    extend: 'Ext.Panel',
	
	config: {
		
		itemId: "cover",
		
		// custom properties
		
		
		// css properties
		cls: 'cover-box',
		
				
		// properties
		scrollable: null,
		tpl: new Ext.XTemplate(
            '<div class="vbox">',
				'<div class="flex">',
					'<div class="logo-box"><img src="'+webcrumbz.logo+'" style="width:170px;" /></div>',
					'<h1>Lectia de Prim Ajutor</h1>',
					'<h2>ghidul urgentelor medicale</h2>',
				'</div>',
				'<div class="footer" style="height: 180px; width: 100%";>',
					'<div class="logo-1"><img src="#" /></div>',
					'<div class="logo-2"><img src="#" /></div>',
					'<div class="logo-3"><img src="#" /></div>',
				'</div>',
			'</div>'
        ),
		
		items: [
			{
				xtype: "button",
				action: 'view-actions-panel',
				iconCls: 'menu',
				html: '&nbsp;',
				cls: 'actions-panel-button',
				pressedCls: 'pressed',
				width: 60,
				height: 60,
				top: 0,
				right: 0
			}
		]
	},
	
	
	initialize: function(){

        // add a handler for the orientationchange event of the viewport
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
		
		this.setData([]);
		
		this.callParent(arguments);
	},
	
	
    handleOrientationChange: function(){
        var data = this.getData().concat([]);
        this.setData(data);
		this.fireEvent("setactions");
    }
});
