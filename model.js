// Model class computes user scores, get/changes active users and so on
class Model {
    constructor() {
        // For performance the scores are stored in this array
        // The score for <m> image is equal to scoresVec[m-1]
        // For Aces, the score is one by default
        this.scoresVec = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    }

    init() {
        // Clear/initialize all values
        this.scores = [0, 0];
        this.roundScore = 0;
        this.activePlayer = 0;
        this.firstRallOfPlayer = true;
        this.holdCount = 0;
    }
    
    generateCards()
    {
        // Compute proper values of cards and scores for the current player
        let card_1, card_2;
        // Generate some kind of random card index
        if (this.holdCount <= 1 && this.firstRallOfPlayer) {
            card_1 = Math.floor(Math.random() * 52) + 1;
        }
        card_2 = Math.floor(Math.random() * 52) + 1;
        
        // Show cards
        this.onCardsChanged(card_1, card_2);
        
        // compute scores
        let score_1 = card_1 ? this.scoresVec[card_1 - 1] : 0;
        let score_2 = this.scoresVec[card_2 - 1];
        if (score_1 === 1 && score_2 >= 6) {
            score_1 = 11;
        }
        else if (score_2 === 1 && score_1 >= 6) {
            score_2 = 11;
        }
      
        const score = score_1 + score_2;
        this.scores[this.activePlayer] += score;
        const activeScore = this.scores[this.activePlayer];
        // Show scores
        this.onScoreChanged(this.activePlayer, activeScore, score);
    }
    
    onButtonRoll = () => {
        // Button "Get Card" is called, generated random cards.
        //For the first time for each player generate two cards, after - only one
        this.generateCards();
        this.firstRallOfPlayer = false;    
    }
  
    onButtonHold = () => {
        // Increase count of "Hold" calls
        ++this.holdCount;
        // If the first player ckicks "Hold", change active player to the opponent one
        if (this.holdCount === 1) {
            this.activePlayer = 1 - this.activePlayer;
            
            // for that player it would be the first roll
            this.firstRallOfPlayer = true;
            this.roundScore = 0;   
            this.onPlayerChanged();
        }
        else if (this.holdCount === 2) {
            // If the second player ckicks "Hold", compare scores and show the Winner or Drow
            if (this.scores[0] > this.scores[1]) {
                this.onShowTheWinner(0, this.activePlayer);
            }
            else if (this.scores[0] < this.scores[1]) {
                this.onShowTheWinner(1, this.activePlayer);    
            }
            else {
                this.onShowDraw(this.activePlayer);
            }
        }
    }
   
    // Setting proper callback functions
    bindOnCardsChanged(cb) {
        this.onCardsChanged = cb;
    }

    bindOnScoreChanged(cb) {
        this.onScoreChanged = cb;
    }

    bindOnPlayerChanged(cb) {
        this.onPlayerChanged = cb;
    }

    bindOnShowTheWinner(cb) {
        this.onShowTheWinner = cb;
    }

    bindOnShowDraw(cb) {
        this.onShowDraw = cb;
    }
}