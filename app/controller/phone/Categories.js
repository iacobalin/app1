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
			}
        },
		
		control: {
			categoriesList: {
				itemtap: 'onCategoriesListItemTap'	
			},
			articlesList: {
				itemtap: 'onArticlesListItemTap'	
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
		if (!LDPA.app.isOnline()){
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
					// show category from offline			
					self.showCategoryFromOffline(categoryId);
				},
				success: function(result, request) {
					// hide mask
					mask.fireEvent("close");
					
					// add content
					categoryView.down("#categoryPanel").fireEvent("addcontent", result);
					
					// save categories for offline
					//self.saveCategoryForOffline(result, categoryId);
					
					// save articles for offline
					//self.saveArticlesForOffline(result.posts, categoryId);
					
					// show category
					categoryView.show();
				}
			});	
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
		var articleId = record.get("id");
		this.showArticle(articleId);
	},
	
	
	showArticle: function(articleId){
		
		var self = this;
		var categoryView = this.getCategoryView();
		var articlePanel = this.getArticlePanel();
		var mask = articlePanel.getMask();
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// show category from offline			
			this.showCategoryFromOffline(articleId);
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
					categoryView.animateActiveItem(articlePanel, {type: "slide", direction: "left"})
				}
			});	
		}
	},
});