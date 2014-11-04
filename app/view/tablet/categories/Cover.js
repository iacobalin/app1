Ext.define("LDPA.view.tablet.categories.Cover", {
    extend: 'Ext.Panel',
	
	config: {
		
		itemId: "cover",
		
		// custom properties
		
		
		// css properties
		cls: 'cover-box',
		
				
		// properties
		scrollable: null,
		tpl: new Ext.XTemplate(
            '<div class="vbox flex">',
				'<div class="logo-container vbox flex">',
					'<div class="logo-box"><div class="logo-icon"></div></div>',
					'<div class="logo-text"></div>',
				'</div>',
				'<div class="footer" style="height: 130px; width: 100%";>',
					'<div class="logos">',
						'<div class="logo-ing"><div></div></div>',
						'<div class="logo-mai-mult-verde"><div></div></div>',
						'<div class="logo-smurd"><div></div></div>',
					'</div>',
				'</div>',
			'</div>'
        ),
		
		items: [
			{
				xtype: "button",
				action: 'view-actions-panel',
				iconCls: 'menu',
				html: '',
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
