Ext.define("LDPA.view.tablet.video.Video", {
    extend: 'Ext.Panel',
	
    requires: [
        'LDPA.view.tablet.video.VideoDetails',
		'LDPA.view.tablet.video.VideoComments',
		'LDPA.view.tablet.video.VideoList'
    ],
    config: {
        
		id: 'videoPanel',
		title: 'Lec&#355;ii video',
		iconCls: 'video',
		cls: 'video-box'
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		// add first section: video details
		var details = Ext.create("Ext.Panel",{
			cls: 'video-section-1',
			layout: {
				type: 'card'
			},
			items: [
				Ext.create("LDPA.view.tablet.video.VideoDetails"),
				Ext.create("LDPA.view.tablet.video.VideoComments")
			]
		});
		
		var list = Ext.create("LDPA.view.tablet.video.VideoList");
		
		this.add(details);
		this.add(list);
	}
});
