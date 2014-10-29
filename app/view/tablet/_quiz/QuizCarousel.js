Ext.define("LDPA.view.tablet.quiz.QuizCarousel", {
    extend: 'Ext.Carousel',
	
    requires: [
        'LDPA.view.tablet.quiz.QuizCard'
    ],
    config: {
        
		itemId: 'quizCarousel',
		
		store: null,												// quiz store
		results: null,
		noOfDefaultItems: 0,
		completed: 0,
		
		styleHtmlContent: true,
		scrollable: null,
		indicator: true,
		margin: 0,
		padding: 0,
        cls: 'quiz-carousel',
		
		items: [
			{
				xtype: 'panel',
				itemId: 'quizNav',
				docked: 'bottom',
				width: '100%',
				cls: 'quiz-progress-box',
				layout:{
					type: 'card'
				},
				items: [
					{
						xtype: 'component',
						itemId: 'progressBar',
						cls: 'progress-bar-container',
						html:
                            '<div class="title">' +
                                '<div>Completat:</div>' +
                                '<div id="quiz-percentage">0%</div>'+
                            '</div>' +
                            '<div class="progress-box"><div class="progress-bar"></div></div>'
					},
					{
						xtype: 'button',
						itemId: 'sendBtn',
						action: 'sendQuiz',
						text: 'Trimite raspunsurile',
                        styleHtmlContent: true,
                        cls: 'send-quiz-form-button',
                        pressedCls: 'send-quiz-form-button-pressed'
					}
				]
			}
		]
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.setNoOfDefaultItems(this.getItems().length);
		
		// create the carousel's store with loaded quiz questions
		this.setStore(Ext.create("LDPA.store.Quiz"));
	}
});
