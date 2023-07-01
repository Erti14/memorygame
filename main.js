var images = [
    "images/donut1.jpg",
    "images/donut2.jpg",
    "images/donut3.jpg",
    "images/donut4.jpg",
    "images/donut5.jpg",
    "images/donut6.jpg",
    "images/donut7.jpg",
    "images/donut8.jpg"

  ];

  var gameBoard = document.getElementById('game-board');
  var cards = [];
  var flippedCards = [];
  var matchedCards = [];
  var currentPlayer = 1;
  var player1Pairs = 0;
  var player2Pairs = 0;


  for (var i = 0; i < 16; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    card.dataset.image = images[Math.floor(i / 2)];
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  }

  shuffleCards();


  function shuffleCards() {
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = cards[i].dataset.image;
      cards[i].dataset.image = cards[j].dataset.image;
      cards[j].dataset.image = temp;
    }
  }

  function flipCard() {
    if (flippedCards.length < 2 && !matchedCards.includes(this)) {
      this.style.backgroundImage = 'url(' + this.dataset.image + ')';
      flippedCards.push(this);
      this.classList.add('player' + currentPlayer);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }


  function checkMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

    if (card1.dataset.image === card2.dataset.image) {
      card1.style.boxShadow = getPlayerBoxShadowColor(currentPlayer);
      card2.style.boxShadow = getPlayerBoxShadowColor(currentPlayer);
      matchedCards.push(card1, card2);
      updateScore();
      checkGameEnd();
    } else {
      card1.style.backgroundImage = '';
      card2.style.backgroundImage = '';
      card1.classList.remove('player' + currentPlayer);
      card2.classList.remove('player' + currentPlayer);
      if (currentPlayer === 1) {
        currentPlayer = 2;
      } else {
        currentPlayer = 1;
      }

    }

    flippedCards = [];
  }


  function updateScore() {
    if (currentPlayer === 1) {
      player1Pairs++;
      document.getElementById('player1').textContent = 'Score: ' + player1Pairs;
    } else {
      player2Pairs++;
      document.getElementById('player2').textContent = 'Score: ' + player2Pairs;
    }
  }

  function getPlayerBoxShadowColor(player) {
    if (player === 1) {
      return '5px 5px 20px #f20090';
    } else {
      return '5px 5px 20px #56cfe3';
    }
  }


  function checkGameEnd() {
    if (matchedCards.length === cards.length) {

      var result;

      if (player1Pairs > player2Pairs) {

        result = 'Player 1 won';
        window.alert(result);
        document.location.reload();


      }
      else if (player2Pairs > player1Pairs) {
        result = 'Player 2 won';
        window.alert(result);
        document.location.reload();

      }
      else {
        result = "It's a tie";
        window.alert(result);
        document.location.reload();
      }

    }


  }
