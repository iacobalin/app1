Ext.define("LDPA.view.tablet.home.ButtonsPanel", {
    extend: 'Ext.Panel',
	
	config: {
        cls: 'buttons-panel',

        scrollable: null,

        items: [
            {
                xtype: 'button',
                cls: 'home-map-button',
                action: 'viewMap',
                pressedCls: 'home-map-button-pressed',
                html: '<div class="home-map-inner">Caută spital în zona ta!</div>'
            },
			{
                xtype: 'button',
                cls: 'home-question-button',
				action: 'viewQuestions',
                pressedCls: 'home-question-button-pressed',
                html: '<div class="home-question-inner">Ai o nel&#259;murire?<br/>Medicul SMURD &#238;&#355;i r&#259;spunde</div>'
            },
            {
                xtype: 'button',
                cls: 'home-quiz-button',
                action: 'viewQuiz',
				pressedCls: 'home-quiz-button-pressed',
                html: '<div class="home-quiz-inner-title">QUIZ</div>'+
                    '<div class="home-quiz-inner-content">Testeaz&#259;-&#355;i cuno&#351;tin&#355;ele despre acordarea primului ajutor</div>'
			}
		]
    },
	
	initialize: function(){
		
		this.callParent(arguments);
	}

});
