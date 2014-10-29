Ext.define("LDPA.view.tablet.quiz.QuizCard", {
    extend: 'Ext.Panel',
	
	requires: [
		"Ext.field.Radio"
	],
	
	config: {
		index: 0,					
		carousel: null,
		data: null,
		isFilled: false,
		isCompleted: false,
		points: -1,
		
		itemId: null,
		styleHtmlContent: true,
		scrollable: null,
        cls: 'quiz-card',
		
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
		items: [
			{
				xtype: "component",
				tpl: new Ext.XTemplate("<h1>{question}</h1>"),
                cls: "quiz-question"
			},
			{
				xtype: "fieldset",
				defaults: {
					xtype: "radiofield",
					labelAlign: "right",
					labelWrap: true
				},
				items: null,
                cls: "quiz-radio"
			}
		]
		
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("painted", this.onPainted, this);
		this.on("setactions", this.onSetActions, this);
		this.on("resetcard", this.onResetCard, this);
	},
	
	
	onPainted: function(){
		
		if (this.getIsFilled() == true) return;
		
		this.fireEvent("setactions");
		
		this.setIsFilled(true);
	},
	
	onSetActions: function(){
		if (this.getData() == null) return;
		
		// build question 
		var questionBox = this.getItems().items[0];
		questionBox.setData(
			{
				question: this.getData().question
			}
		);
		
		// build answers
		var fieldSet = this.getItems().items[1];
		var answers = this.getData().answers;
		
		for (var i=0; i<answers.length; i++){
			var radio = Ext.create("Ext.field.Radio",{
				value: answers[i].points,
				label: answers[i].answer,
				name: "answers_"+this.getIndex()
			});
			fieldSet.add(radio);
			
			radio.element.dom.setAttribute("data-index",i);
			radio.element.on("tap", this.onRadioLabelTap, this);
		}
	},
	
	
	onRadioLabelTap: function(el,dom){
		var index = Ext.get(dom).up("div[data-index]").getAttribute("data-index");
		var radio = this.down("fieldset").getAt(index);
		radio.check();
		
		this.setPoints(radio.config.value);
		
		if (this.getIsCompleted() == false){
			this.setIsCompleted(true);
			
			this.getCarousel().fireEvent("questiondone");
		}
	},
	
	
	onResetCard: function(){
		this.setIsCompleted(false);
		this.setPoints(-1);
		
		for (var i=0; i<this.down("fieldset").getItems().length; i++){
			var radio = this.down("fieldset").getAt(i);
			radio.uncheck();
		}
	}
});
