Ext.define("LDPA.view.phone.video.Video", {
    extend: 'Ext.Panel',
	
    requires: [
        'Ext.TitleBar',
	   	'LDPA.view.phone.video.VideoList',
	   	'LDPA.view.phone.video.VideoDetails'
    ],
	
    config: {
        
		id: 'videoPanel',
		title: 'Lec&#355;ii video',
		iconCls: 'video-icon',
		layout: 'card',
        cls: 'videos-panel'
    },
	
	
	initialize: function(){
		
		// videos list
		var item = Ext.create("LDPA.view.phone.video.VideoList");
		this.add(item);
		
		// video details
		var item = Ext.create("LDPA.view.phone.video.VideoDetails");
		this.add(item);
		
		this.callParent(arguments);
	}
});