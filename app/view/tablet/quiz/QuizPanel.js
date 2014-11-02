Ext.define("LDPA.view.tablet.quiz.QuizPanel", {
    extend: 'Ext.form.Panel',
	
	requires: [
        "LDPA.view.tablet.quiz.QuizQuestions",
		"LDPA.view.tablet.quiz.QuizResults",
	],
	
	config: {
		
		itemId: "quizPanel",
				
		// custom properties
		mask: null,
		
								
		// css properties
		cls: 'quiz-panel',
		width: "80%",
		height: "80%",
		maxHeight: 600,
		centered: true,
		floatingCls: "normal",
		layout: {
			type: 'card'
		},
						
		// properties
		scrollable: null,
		items: [
			{
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "Quiz",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			}
		],
		hidden: true,
		showAnimation: {
			type: "slideIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "slideOut",
			duration: 400,
			easing: "in"
		},
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		var question = Ext.create("LDPA.view.tablet.quiz.QuizQuestions");
		this.add(question);
		
		var results = Ext.create("LDPA.view.tablet.quiz.QuizResults");
		this.add(results);
		
		this.on("addcontent", this.onAddContent, this);
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
	},
	
	onAddContent: function(){
		var carousel = this.down("#quizCarousel");
		
		var items = quiz;
		carousel.getStore().add(items.quiz);
		carousel.fireEvent("buildcards");
		carousel.setResults(items.results);	
	},
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy(true);	
		}, 400);
	},
	
	onCloseBtnTap: function(){
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	}
});
