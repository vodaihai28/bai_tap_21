 const board = document.getElementById('game-board');
        const moveDisplay = document.getElementById('move-count');
        let cards = ['🍎', '🍌', '🍇', '🍊', '🍎', '🍌', '🍇', '🍊'];
        let flippedCards = [];
        let matchedCount = 0;
        let moves = 0;
        let isLock = false;

        // JS: Shuffle cards (Thuật toán Fisher-Yates)
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createBoard() {
            board.innerHTML = '';
            shuffle(cards).forEach((icon, index) => {
                const cardEl = document.createElement('div');
                cardEl.classList.add('card');
                cardEl.dataset.icon = icon;
                cardEl.innerHTML = `
                    <div class="card-front">?</div>
                    <div class="card-back">${icon}</div>
                `;
                cardEl.addEventListener('click', flipCard);
                board.appendChild(cardEl);
            });
        }

        // JS: Logic flip/check match
        function flipCard() {
            if (isLock || this.classList.contains('flipped') || flippedCards.includes(this)) return;

            this.classList.add('flipped');
            flippedCards.push(this);
            
            moves++;
            moveDisplay.innerText = moves;

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }

        function checkMatch() {
            isLock = true;
            const [card1, card2] = flippedCards;

            if (card1.dataset.icon === card2.dataset.icon) {
                matchedCount += 2;
                flippedCards = [];
                isLock = false;
                if (matchedCount === cards.length) {
                    setTimeout(() => alert(`Chúc mừng! Bạn thắng với ${moves} lượt click.`), 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    isLock = false;
                }, 1000);
            }
        }

        function resetGame() {
            moves = 0;
            matchedCount = 0;
            flippedCards = [];
            isLock = false;
            moveDisplay.innerText = '0';
            createBoard();
        }

        // Khởi tạo game lần đầu
        createBoard();