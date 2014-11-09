var categoriesController;

Ext.define('LDPA.controller.phone.Categories', {
    extend: 'Ext.app.Controller',
	
	requires:[
		'Ext.util.DelayedTask',
		'LDPA.proxy.Articles'
	],

    config: {
        
		refs: {
            mainView: '#mainView',
            categoriesList: "#mainView #categoriesList",
			
			categoryView: {
				selector: "#categoryView",
				autoCreate: true
			},
			articlesList: {
				selector: "#categoryView #articlesList",
				autoCreate: true	
			},
			articlePanel: {
				selector: "#categoryView #articlePanel",
				autoCreate: true	
			},
			searchList: {
				selector: "#searchView #searchList",
				autoCreate: true	
			},
			searchField: '#mainView #categoriesList searchfield'
        },
		
		control: {
			categoriesList: {
				itemtap: 'onCategoriesListItemTap'	
			},
			articlesList: {
				itemtap: 'onArticlesListItemTap'	
			},
			searchList: {
				itemtap: 'onSearchListItemTap'	
			},
			searchField: {
				keyup: 'onSearch'	
			}
		}
    },
	
	
	init: function() {
		categoriesController = this;
    },
	
	launch: function() {
		
    },
	
	
	processCategories: function(categories){
		Ext.each(categories, function(category){
			category.categoryId = category.id;
			category.sequence = category.order;
		});
		
		return categories;
	},
	
	
	setActions: function(categoriesStore){
		var categoriesList = this.getCategoriesList();
		
		// add content
		categoriesList.getStore().add(categoriesStore.getRange());
		Ext.defer(function(){
			categoriesList.show();
		}, 500);
	},
	
	
	onCategoriesListItemTap: function(list, index, item, record){
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				//categoryDetails.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create category view
		var profile = webcrumbz.profile.toLowerCase();
		var categoryView = Ext.create("LDPA.view."+profile+".categories.Category", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(categoryView);
		
		mask.show();
		
		// show category
		var categoryId = record.get("categoryId");
		this.showCategory(categoryId);
	},
	
	
	showCategory: function(categoryId){
		
		var self = this;
		var categoryView = this.getCategoryView();
		var mask = categoryView.getMask();
		
		// offline loading
		if (!mainController.isOnline()){
			// hide mask
			mask.fireEvent("close");
			
			// show category from offline			
			this.showCategoryFromOffline(categoryId);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.category',
				params: {
					id: categoryId,
					format: 'json',
				},
				failure: function(){
					// hide mask
					mask.fireEvent("close");
					
					// show category from offline			
					self.showCategoryFromOffline(categoryId);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					// add content
					categoryView.down("#categoryPanel").fireEvent("addcontent", result);
					
					// save category for offline
					mainController.saveCategoryForOffline(result, categoryId);
					
					// save articles for offline
					mainController.saveArticlesForOffline(result.posts, categoryId);
					
					// show category
					categoryView.show();
				}
			});	
		}
	},
	
	
	showCategoryFromOffline: function(categoryId){
		var categoryView = this.getCategoryView();
		
		var categoriesOfflineStore = mainController.categoriesOfflineStore;
		var articlesOfflineStore = mainController.articlesOfflineStore;
		
		var categoryOfflineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (categoryOfflineRecord){
			
			articlesOfflineStore.filter("categoryId", categoryId);
			
			articlesOfflineStore.load(function(records){
				var data = categoryOfflineRecord.getData();
				data.posts = records;
				
				articlesOfflineStore.clearFilter();	
				
				// add content
				categoryView.down("#categoryPanel").fireEvent("addcontent", categoryOfflineRecord.getData());
				
				// show category
				categoryView.show();
			})
		}
	},
	
	
	onArticlesListItemTap: function(list, index, item, record){
		
		var articlePanel = this.getArticlePanel();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				//categoryDetails.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		articlePanel.setMask(mask);
		
		mask.show();
		
		// show article
		var articleId = record.get("articleId") || record.get("id");
		this.showArticle(articleId);
	},
	
	onSearchListItemTap: function(list, index, item, record){
		
		var articlePanel = list.getParent().down("#articlePanel");
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: true,
			disabled: true,
			closeFn: function(){
				//categoryDetails.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		articlePanel.setMask(mask);
		
		mask.show();
		
		// show article
		var articleId = record.get("id");
		this.showArticleBySearch(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var categoryView = this.getCategoryView();
		var articlePanel = this.getArticlePanel();
		var mask = articlePanel.getMask();
		
		// offline loading
		if (!mainController.isOnline()){
			// hide mask
			mask.fireEvent("close");
			
			// show article from offline			
			this.showArticleFromOffline(articleId);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.post',
				params: {
					id: articleId,
					format: 'json',
				},
				failure: function(){
					// hide mask
					mask.fireEvent("close");
					
					// show article from offline
					self.showArticleFromOffline(articleId);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
					
					// save article for offline
					mainController.saveArticleForOffline(result.post, articleId);
					
					result.post.articleId = result.post.id;
					
					// add content
					articlePanel.fireEvent("addcontent", result.post);	
					
					// show article panel
					categoryView.animateActiveItem(articlePanel, {type: "slide", direction: "left"})
				}
			});	
		}
	},
	
	
	showArticleFromOffline: function(articleId){
		
		var categoryView = this.getCategoryView();
		var articlePanel = this.getArticlePanel();
				
		var articlesOfflineStore = mainController.articlesOfflineStore;
		var articleOfflineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		if (articleOfflineRecord){
			
			var imagesOfflineStore = mainController.imagesOfflineStore;
			var content = articleOfflineRecord.get("content");
			var srcs = content.match(/src\=\"[a-zA-Z0-9\:\/\.\-\%\_]+\.(jpg|png|gif)\"/g);
			
			Ext.each(srcs, function(src){
				src = src.replace('src="',"");
				src = src.replace('"',"");
				
				var record = imagesOfflineStore.findRecord("url", src, 0, false, true, true);
				if (record){
					content = content.replace(src, record.get("dataUrl"));
				}
			});
			
			articleOfflineRecord.set("content", content);
							
			var data = articleOfflineRecord.getData();
			
			// add content
			articlePanel.fireEvent("addcontent", data);	
			
			// show article panel
			categoryView.animateActiveItem(articlePanel, {type: "slide", direction: "left"})
		}
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
					
				}
			});
			
			Ext.Viewport.add(mask);
			mask.show();
			
			
			// offline
			if (!mainController.isOnline()){
				mask.fireEvent("close");
				
				alert(webcrumbz.offlineMsg);
			}
			// online
			else{
				// create search panel
				var profile = webcrumbz.profile.toLowerCase();
				var searchView = Ext.create("LDPA.view."+profile+".categories.Search", {
					mask: mask,
					zIndex: mask.getZIndex()+1
				});
				
				Ext.Viewport.add(searchView);
				
				var searchList = searchView.down("#searchList");
				searchList.getStore().loadPage(1, {
					filters: { 
						query: searchQuery.replace("%20", " ")
					},
					callback: function(){
						
						mask.fireEvent("close");
						searchView.show();	
					}
				})	
			}
			
			
			// set searh field empty and remove focus from it
			searchField.setValue('');
			searchField.blur();
        }
	},
	
	showArticleBySearch: function(articleId){
		var self = this;
		var searchList = this.getSearchList();
		var searchView = searchList.getParent();
		var articlePanel = searchView.down("#articlePanel");
		var mask = articlePanel.getMask();
		
		// Make the JsonP request
		Ext.data.JsonP.request({
			url: webcrumbz.exportPath+'?json=mobile.post',
			params: {
				id: articleId,
				format: 'json',
			},
			failure: function(){
				// show article from offline
				self.showArticleFromOffline(articleId);
			},
			success: function(result, request) {
				// hide mask
				mask.fireEvent("close");
				
				result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
				
				// save article for offline
				//self.saveArticleForOffline(result.post, articleId);
				
				//result.post.content = result.post.content.replace(/src=\"/gi,'src="http://src.sencha.io/-10/');
				result.post.articleId = result.post.id;
				
				// add content
				articlePanel.fireEvent("addcontent", result.post);	
				
				// show article panel
				searchView.animateActiveItem(articlePanel, {type: "slide", direction: "left"})
			}
		});	
	}
	
});