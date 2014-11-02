var searchController;

Ext.define('LDPA.controller.tablet.Search', {
    extend: 'Ext.app.Controller',
	
	requires:[
		
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            searchField: {
				selector: "searchfield",
				autoCreate: true
			},
			
			searchView: {
				selector: "#searchView",
				autoCreate: true	
			},
			searchList: {
				selector: "#searchView #searchList",
				autoCreate: true	
			},
			searchPanel: {
				selector: "#searchView #searchPanel",
				autoCreate: true	
			}
        },
		
		control: {
			searchList: {
				itemtap: 'onSearchListItemTap'	
			},
			searchField: {
				keyup: 'onSearch'	
			}
		}
    },
	
	
	init: function() {
		searchController = this;
    },
	
	launch: function() {
		
    },
	
	
	processSearch: function(search){
		Ext.each(search, function(item){
			item.articleId = item.id;
		});
		
		return search;
	},
	
	
	onSearch : function(field, e){
		var keyCode = e.event.keyCode,
            searchField = this.getSearchField(),
			searchQuery = searchField.getValue();
		
        //the return keyCode is 13.
        if (keyCode == 13) {
           
			// ensure there is a search...
			if (!searchQuery) {
				return;
			}
			
			// create mask
			var mask = Ext.create("LDPA.view.MainMask", {
				disabled: true,
				spinner: true,
				closeFn: function(){
					searchView.fireEvent("closepanel");
				}
			});
			
			Ext.Viewport.add(mask);
			mask.show();
			
			
			// offline
			if (!LDPA.app.isOnline()){
				mask.fireEvent("close");
				
				alert(webcrumbz.offlineMsg);
			}
			// online
			else{
				// create search panel
				var profile = webcrumbz.profile.toLowerCase();
				var searchView = Ext.create("LDPA.view."+profile+".search.Search", {
					mask: mask,
					zIndex: mask.getZIndex()+1
				});
				
				Ext.Viewport.add(searchView);
				
				var self = this;
				var searchList = searchView.down("#searchList");
				
				searchList.getStore().loadPage(1, {
					filters: { 
						query: searchQuery.replace("%20", " ")
					},
					callback: function(records){
						
						if (records.length > 0){
							searchView.show();
						}
						else{
							alert("Nu exista niciun articol!")
							mask.fireEvent("close");
							searchView.fireEvent("closepanel");
						}
					}
				})
			}
			
			
			// set searh field empty and remove focus from it
			searchField.setValue('');
			searchField.blur();
        }
	},
	
	
	onSearchListItemTap: function(list, index, item, record){
		
		var searchPanel = this.getSearchPanel();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				
			}
		});
		
		Ext.Viewport.add(mask);
		searchPanel.setMask(mask);
		
		mask.show();
		
		// show article
		var articleId = record.get("articleId") || record.get("id");
		this.showArticle(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var searchView = this.getSearchView();
		var searchPanel = this.getSearchPanel();
		var mask = searchPanel.getMask();
		
		// scroll to top
		var articleInnerPanel = searchPanel.down("#articleInner");
		var scroller = articleInnerPanel.getScrollable().getScroller();
		scroller.scrollTo(0,0,true);
		
		// Make the JsonP request
		Ext.data.JsonP.request({
			url: webcrumbz.exportPath+'?json=tablet.post',
			params: {
				id: articleId,
				format: 'json',
			},
			failure: function(){
				// hide mask
				if (mask) mask.fireEvent("close");
			},
			success: function(result, request) {
				// hide mask
				if (mask) mask.fireEvent("close");
				
				result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
				
				result.post.articleId = result.post.id;
				
				// add content
				searchPanel.fireEvent("addcontent", result.post);
			}
		});
	}
});