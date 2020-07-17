// View class works with UI parts
class View {
    constructor() {
    };
    
    init = () => {
        // Initializing context of the window
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        
        // Initializing cards as closed cards
        document.querySelector('.card_1').style.display = 'block';
        document.querySelector('.card_1').src = 'PNG/back.png';
        document.querySelector('.card_2').style.display = 'block';
        document.querySelector('.card_2').src = 'PNG/back.png';
        
        // At the beginning there is no hold called, so setting firstHoldCalled to false;
        this.firstHoldCalled = false;
        
        // Enable  buttons -- used for proper working after "New Game" button clicked    
        this.disableButtons(false);
    };
    
    disableButtons(disabled) {
        // Disable/enable buttons. Players should not be able to click that buttons
        document.querySelector('.btn-roll').disabled = disabled;
        document.querySelector('.btn-hold').disabled = disabled;
    }

    displayCards(card_1, card_2) {
        // If card_1 is defined, show two cards, otherwise - only one card.
        let cardDOM_1 = document.querySelector('.card_1');
        let cardDOM_2 = document.querySelector('.card_2');
       
        if (card_1) {
            cardDOM_1.style.display = 'block';
            cardDOM_1.src = 'PNG/' + card_1 + '.png';
        }
        else {
            cardDOM_1.style.display = 'none';
            cardDOM_1.src = '';
        }
        
        cardDOM_2.style.display = 'block';
        cardDOM_2.src = 'PNG/' + card_2 + '.png';
    };
    
    updateScores = (activePlayer, score, currentScore) => {
        // Update scores for current player
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        document.querySelector('#score-' + activePlayer).textContent = score;
        
        // If current player's score is equal to 21, he wins
        if (score == 21) {
            this.showTheWinner(activePlayer, activePlayer);
        }
        // If current player's score is greater then 21, he loses
        if (score > 21) {
            this.showTheWinner(1 - activePlayer, activePlayer);
        }
    }
    
    showTheWinner = (winnerPlayer, activePlayer) => {
        // Disable buttons. Players should not be able to click that buttons
        this.disableButtons(true);
        
        // Show the winner
        document.querySelector('#name-' + winnerPlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + winnerPlayer + '-panel').classList.add('winner');
    }

    showDraw = (activePlayer) => {
        // Disable buttons. Players should not be able to click that buttons
        this.disableButtons(true);
        
        // Show "Draw" for both players
        document.querySelector('#name-0').textContent = 'Draw!';
        document.querySelector('#name-1').textContent = 'Draw!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }

    changePlayer = () => {
        // Change the active player, called after "Hold" button click
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        // The player is changed, so toggle active states
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // Do not show any cards until the active player ckicks "Get Card" button
        if (document.querySelector('.card_1')) {
                document.querySelector('.card_1').style.display = 'none';
        }
        document.querySelector('.card_2').style.display = 'none';
    }
    
    // Setting proper callback function
    bindOnHold(cb) {
       this.onButtonHold = cb;
   }
}