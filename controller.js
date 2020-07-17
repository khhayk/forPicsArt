/*
GAME RULES:

This game is an open version of Black Jack, in which players see also opponents cards.
The game has 2 players, in each turn, a player rolls a card as many times as he wishes. Each result get sadded to his score.
The value of cards two through ten is their pip value (2 through 10). Face cards (Jack, Queen, and King) are all worth ten. Aces can be worth one or eleven.
Each player by chousing roll first time, get two cards, in which Ace is considered as eleven if it's pair >= six, otherwise considered as one.
- If the player's score becomes equal to 21, he wins.
- If the player's score exceeds 21, he loses.
The player can choose to 'Hold' any time, which means that it's the next player's turn.
The second player rolls a card as many times as he wishes:
- If the player's score becomes equal to 21, he wins.
- If the player's score exceeds 21, he loses.
He can choose to 'Hold', in which case the scores are being compared.
If two scores are equal, it is "Draw".


Note that there can be more than one card sets (up to six sets), so duplication of cards are allowed.
*/

// Controller class controls events/listeners and callbacks of model/view.
class Controller {
    // Constructing the controller
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.setupListeners();
    };
    
    init() {
        // Call init of it's members
        this.model.init();
        this.view.init();
    }
    
    setupListeners() {
        // Setup event listeners for "Get Card" button, "Hold" button and "New Game" button
        document.querySelector('.btn-roll').addEventListener('click', this.model.onButtonRoll);
        document.querySelector('.btn-hold').addEventListener('click', this.model.onButtonHold);
        document.querySelector('.btn-new').addEventListener('click', this.reset);
        
        // Setup callbacks for changes in model to reflect in view
        this.model.bindOnCardsChanged(this.view.displayCards);
        this.model.bindOnScoreChanged(this.view.updateScores);
        this.model.bindOnPlayerChanged(this.view.changePlayer);
        this.model.bindOnShowTheWinner(this.view.showTheWinner);
        this.model.bindOnShowDraw(this.view.showDraw);
        
        // Setup callbacks for changes in view to reflect in model
        this.view.bindOnHold(this.model.onButtonHold);
    };
    
    reset = () => {
        // Calling init will reset all states for beginning a new game
        this.init();
    }
}

// Creating the application(game)
const app = new Controller(new Model(), new View());