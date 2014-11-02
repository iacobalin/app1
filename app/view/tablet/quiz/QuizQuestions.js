Ext.define("LDPA.view.tablet.quiz.QuizQuestions", {
    extend: 'Ext.Panel',
	
    requires: [
        "LDPA.view.tablet.quiz.QuizCarousel"
    ],
    config: {
        
		itemId: 'quizQuestions',
		cls: "quiz-questions",
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
		items: [
			{
				xtype: "component",
                cls: "quiz-top",
				html: "<p>R&#259;spunde la &#238;ntreb&#259;rile de prim ajutor, c&#226;&#351;tig&#259; jocul &#351;i demonstreaz&#259; c&#259; e&#351;ti Doctor priceput!</p>"
				
			},
			{
				xtype: 'panel',
				itemId: 'quizNav',
				docked: 'bottom',
				width: 300,
				height: 70,
				cls: 'progress-box',
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
						xtype: "button",
						itemId: "sendBtn",
						action: 'sendQuiz',
						width: 160,
						height: 40,
						cls: "send-button",
						iconCls: '',
						pressedCls: "pressed",
						html: 'Trimite'
					}
				]
			}
			/*{
				xtype: "button",
				action: "quizPrev",
				text: "",
				top: "50%",
				left: "-36px",
				hidden: true,
                iconCls: 'previous',
                cls: 'quiz-previous-button',
                pressedCls: 'quiz-previous-button-pressed'
			},
			{
				xtype: "button",
				action: "quizNext",
				text: "",
				top: "50%",
				right: '-36px',
				hidden: true,
                iconCls: 'next',
                cls: 'quiz-next-button',
                pressedCls: 'quiz-next-button-pressed'
			},*/
		]
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var quizCarousel = Ext.create("LDPA.view.tablet.quiz.QuizCarousel");
		this.add(quizCarousel);
	}
});
