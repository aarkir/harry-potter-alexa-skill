'use strict';

var AlexaSkill = require('./AlexaSkill'),
    recipes = require('./recipes');

var APP_ID = 'amzn1.echo-sdk-ams.app.2ca28ae4-09ac-457a-8037-9681e5d81db1';

var HarryPotterCharacters = function () {
    AlexaSkill.call(this, APP_ID);
};

HarryPotterCharacters.prototype = Object.create(AlexaSkill.prototype);
HarryPotterCharacters.prototype.constructor = HarryPotterCharacters;

HarryPotterCharacters.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Characters for Harry Potter. You can ask a question like, who is Neville Longbottom? ... Now, what can I help you with.";
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

HarryPotterCharacters.prototype.intentHandlers = {
    "RecipeIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = itemName,
            recipe = recipes[itemName],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know who " + itemName + " is. What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that person. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using Characters for Harry Potter. Until next time";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using Characters for Harry Potter. Until next time";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask for a short description of characters in Harry Potter such as, who's Cho Chang, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, who is Cedric Diggory, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var harryPotterCharacters = new HarryPotterCharacters();
    harryPotterCharacters.execute(event, context);
};
