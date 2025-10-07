// Game logic - Timeline Triết Học Mác
class PhilosophyTimelineGame {
    constructor() {
        this.score = 0;
        this.completedSets = 0;
        this.totalSets = 7;
        this.draggedCard = null;
        this.selectedCard = null; // Track selected card for click mode
        this.placedCards = new Map(); // Track placed cards
        
        this.init();
    }

    init() {
        this.createCards();
        this.setupEventListeners();
        this.updateUI();
    }

    createCards() {
        const { correctSets, traps } = gameData;
        
        // Create arrays for all cards
        const timeCards = [];
        const workCards = [];
        
        // Add correct cards
        correctSets.forEach(set => {
            timeCards.push({ id: set.id, content: set.time, type: 'time', isCorrect: true });
            workCards.push({ id: set.id, content: set.work, type: 'work', isCorrect: true });
        });
        
        // Add trap cards
        traps.times.forEach((time, index) => {
            timeCards.push({ id: `trap-time-${index}`, content: time, type: 'time', isCorrect: false });
        });
        traps.works.forEach((work, index) => {
            workCards.push({ id: `trap-work-${index}`, content: work, type: 'work', isCorrect: false });
        });
        
        // Shuffle cards
        this.shuffleArray(timeCards);
        this.shuffleArray(workCards);
        
        // Render cards
        this.renderCards('timeCards', timeCards);
        this.renderCards('workCards', workCards);
    }

    renderCards(containerId, cards) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.type}-card ${!card.isCorrect ? 'trap' : ''}`;
            cardElement.textContent = card.content;
            cardElement.draggable = true;
            cardElement.dataset.id = card.id;
            cardElement.dataset.type = card.type;
            cardElement.dataset.correct = card.isCorrect;
            
            container.appendChild(cardElement);
        });
    }

    setupEventListeners() {
        // Drag events for cards
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                this.draggedCard = e.target;
                e.target.classList.add('dragging');
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
                this.draggedCard = null;
            }
        });

        // Click events for cards
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('card')) {
                if (!e.target.draggable) {
                    // Click on placed card - return to deck (only if game not completed)
                    if (this.completedSets < this.totalSets) {
                        this.returnCardToDeck(e.target);
                    }
                } else {
                    // Click on deck card - select it (only if game not completed)
                    if (this.completedSets < this.totalSets) {
                        this.selectCard(e.target);
                    }
                }
            }
        });
        
        // Drop events for slots
        document.querySelectorAll('.slot').forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });
            
            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });
            
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                this.handleDrop(slot);
            });

            // Click events for slots
            slot.addEventListener('click', () => {
                if (this.selectedCard && this.completedSets < this.totalSets) {
                    this.handleSlotClick(slot);
                }
            });
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
            this.hideModal();
        });

        // Close detail modal button
        document.getElementById('closeDetailBtn').addEventListener('click', () => {
            this.hideDetailModal();
        });
    }

    selectCard(card) {
        // Deselect previous card
        document.querySelectorAll('.card.selected').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Select new card
        card.classList.add('selected');
        this.selectedCard = card;
        
        // Add clickable style to compatible slots
        this.updateSlotStyles();
    }

    updateSlotStyles() {
        document.querySelectorAll('.slot').forEach(slot => {
            if (this.selectedCard) {
                const cardType = this.selectedCard.dataset.type;
                const slotType = slot.dataset.type;
                
                if (cardType === slotType && !slot.querySelector('.card')) {
                    slot.classList.add('clickable');
                } else {
                    slot.classList.remove('clickable');
                }
            } else {
                slot.classList.remove('clickable');
            }
        });
    }

    handleSlotClick(slot) {
        const cardType = this.selectedCard.dataset.type;
        const slotType = slot.dataset.type;
        
        // Check if card type matches slot type
        if (cardType !== slotType) {
            this.showError(slot);
            this.deselectCard();
            return;
        }
        
        // Check if slot is already filled
        if (slot.querySelector('.card')) {
            this.showError(slot);
            this.deselectCard();
            return;
        }
        
        // Place card in slot
        this.placeCard(slot, this.selectedCard);
        this.deselectCard();
    }

    deselectCard() {
        if (this.selectedCard) {
            this.selectedCard.classList.remove('selected');
            this.selectedCard = null;
            this.updateSlotStyles();
        }
    }

    handleDrop(slot) {
        if (!this.draggedCard) return;
        
        const cardType = this.draggedCard.dataset.type;
        const slotType = slot.dataset.type;
        
        // Check if card type matches slot type
        if (cardType !== slotType) {
            this.showError(slot);
            return;
        }
        
        // Check if slot is already filled
        if (slot.querySelector('.card')) {
            this.showError(slot);
            return;
        }
        
        // Place card in slot
        this.placeCard(slot, this.draggedCard);
    }

    placeCard(slot, sourceCard) {
        const card = sourceCard.cloneNode(true);
        card.draggable = false;
        card.classList.remove('dragging', 'selected');
        
        // Clear slot content and add card
        slot.innerHTML = '';
        slot.appendChild(card);
        slot.classList.add('filled');
        
        // Remove original card from deck
        sourceCard.remove();
        
        // Track placed card
        const matchSlot = slot.closest('.match-slot');
        const setId = matchSlot.dataset.set;
        this.placedCards.set(`${setId}-${slot.dataset.type}`, {
            cardId: card.dataset.id,
            isCorrect: card.dataset.correct === 'true'
        });
        
        // Check if set is complete
        this.checkSetCompletion(matchSlot);
    }

    checkSetCompletion(matchSlot) {
        const setId = matchSlot.dataset.set;
        const slots = matchSlot.querySelectorAll('.slot');
        
        // Check if all slots in this set are filled
        const filledSlots = Array.from(slots).filter(slot => slot.classList.contains('filled'));
        if (filledSlots.length < 2) return;
        
        // Check if the combination is correct
        const timeCard = this.placedCards.get(`${setId}-time`);
        const workCard = this.placedCards.get(`${setId}-work`);
        
        const isCorrectSet = this.isValidCombination(timeCard.cardId, workCard.cardId);
        
        if (isCorrectSet) {
            this.handleCorrectSet(matchSlot);
        } else {
            this.handleIncorrectSet(matchSlot);
        }
    }

    isValidCombination(timeId, workId) {
        const { correctSets } = gameData;
        
        return correctSets.some(set => 
            set.id.toString() === timeId && 
            set.id.toString() === workId
        );
    }

    handleCorrectSet(matchSlot) {
        matchSlot.classList.add('complete');
        this.completedSets++;
        this.score += 100;
        this.updateUI();
        
        // Show success animation
        this.showSuccess(matchSlot);
        
        // Show detail button
        this.showDetailButton(matchSlot);
        
        // Check if game is complete
        if (this.completedSets === this.totalSets) {
            document.body.classList.add('game-completed');
            setTimeout(() => this.showGameComplete(), 1000);
        }
    }

    showDetailButton(matchSlot) {
        const detailButton = matchSlot.querySelector('.detail-button');
        if (detailButton) {
            detailButton.style.display = 'flex';
        }
    }

    showPhilosophicalInfo(matchSlot) {
        const setId = matchSlot.dataset.set;
        const philosophicalContexts = {
            1: "1844 - Luận cương về Feuerbach: Marx đặt nền móng cho chủ nghĩa duy vật lịch sử, phê phán chủ nghĩa duy tâm và đề ra phương pháp cách mạng.",
            2: "1848 - Tuyên ngôn của Đảng Cộng sản: Tài liệu cương lĩnh đầu tiên của phong trào công nhân quốc tế, nêu ra mục tiêu và phương pháp đấu tranh giai cấp.",
            3: "1850s-1860s - Phát triển lý luận kinh tế và triết học: Giai đoạn Marx nghiên cứu sâu về kinh tế chính trị và hoàn thiện học thuyết của mình.",
            4: "1867 - Tư bản tập 1: Tác phẩm kinh điển phân tích sâu sắc về phương thức sản xuất tư bản chủ nghĩa và quy luật vận động của nó.",
            5: "1870s-1880s - Hoàn thiện và phổ biến tư tưởng: Giai đoạn Marx và Engels hoàn thiện học thuyết và phổ biến rộng rãi trong phong trào công nhân.",
            6: "1875 - Phê phán Cương lĩnh Gotha: Marx phê phán những sai lầm trong cương lĩnh của Đảng Xã hội Dân chủ Đức, nêu ra lý luận về giai đoạn chủ nghĩa xã hội.",
            7: "1885 - Tư bản tập 2: Engels biên tập và xuất bản tập 2 của bộ Tư bản, phân tích về quá trình lưu thông của tư bản."
        };
        
        // Create temporary info display
        const infoDiv = document.createElement('div');
        infoDiv.className = 'philosophy-info';
        infoDiv.textContent = philosophicalContexts[setId];
        infoDiv.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-size: 0.9rem;
            max-width: 300px;
            z-index: 1000;
            animation: fadeIn 0.5s ease;
        `;
        
        document.body.appendChild(infoDiv);
        
        // Position the info near the match slot
        const rect = matchSlot.getBoundingClientRect();
        infoDiv.style.left = (rect.left + window.scrollX) + 'px';
        infoDiv.style.top = (rect.bottom + window.scrollY + 10) + 'px';
        
        // Remove after 4 seconds
        setTimeout(() => {
            infoDiv.remove();
        }, 4000);
    }

    handleIncorrectSet(matchSlot) {
        this.score = Math.max(0, this.score - 20);
        this.updateUI();
        
        // Show error animation
        matchSlot.querySelectorAll('.slot').forEach(slot => {
            this.showError(slot);
        });
        
        // Return cards to deck after delay
        setTimeout(() => {
            this.returnCardsToDecks(matchSlot);
        }, 1500);
    }

    returnCardsToDecks(matchSlot) {
        const setId = matchSlot.dataset.set;
        const slots = matchSlot.querySelectorAll('.slot.filled');
        
        slots.forEach(slot => {
            const card = slot.querySelector('.card');
            if (card) {
                // Return card to appropriate deck
                const cardType = card.dataset.type;
                const deckId = cardType + 'Cards';
                const deck = document.getElementById(deckId);
                
                // Make card draggable again
                card.draggable = true;
                deck.appendChild(card);
                
                // Reset slot
                slot.innerHTML = slot.dataset.type === 'time' ? 'Thả thẻ thời gian' :
                                slot.dataset.type === 'author' ? 'Thả thẻ tác giả' : 'Thả thẻ tác phẩm';
                slot.classList.remove('filled', 'error');
                
                // Remove from tracking
                this.placedCards.delete(`${setId}-${slot.dataset.type}`);
            }
        });
        
        matchSlot.classList.remove('complete');
    }

    showSuccess(element) {
        element.style.transform = 'scale(1.05)';
        element.style.backgroundColor = 'rgba(0,184,148,0.2)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 500);
    }

    showError(element) {
        element.classList.add('error');
        setTimeout(() => {
            element.classList.remove('error');
        }, 500);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('progress').textContent = `${this.completedSets}/${this.totalSets}`;
    }

    showGameComplete() {
        const modal = document.getElementById('resultModal');
        const title = document.getElementById('resultTitle');
        const message = document.getElementById('resultMessage');
        const finalScore = document.getElementById('finalScore');
        
        if (this.completedSets === this.totalSets) {
            title.textContent = '🎉 Xuất sắc!';
            message.textContent = 'Bạn đã hoàn thành timeline triết học Mác! Bạn đã nắm được những cột mốc quan trọng trong lịch sử hình thành và phát triển của chủ nghĩa Mác.';
        } else {
            title.textContent = '💪 Cố gắng lên!';
            message.textContent = 'Hãy thử lại để khám phá đầy đủ lịch sử triết học Mác!';
        }
        
        finalScore.textContent = `Điểm cuối cùng: ${this.score}`;
        modal.classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('resultModal').classList.add('hidden');
    }

    resetGame() {
        this.score = 0;
        this.completedSets = 0;
        this.placedCards.clear();
        this.deselectCard();
        
        // Remove game completed class
        document.body.classList.remove('game-completed');
        
        // Reset all slots
        document.querySelectorAll('.slot').forEach(slot => {
            slot.innerHTML = slot.dataset.type === 'time' ? 'Thả thẻ thời gian' : 'Thả thẻ tác phẩm';
            slot.classList.remove('filled', 'error', 'clickable');
        });
        
        // Hide all detail buttons
        document.querySelectorAll('.detail-button').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Reset match slots
        document.querySelectorAll('.match-slot').forEach(slot => {
            slot.classList.remove('complete');
        });
        
        // Recreate cards
        this.createCards();
        this.updateUI();
    }

    returnCardToDeck(card) {
        const slot = card.closest('.slot');
        const matchSlot = slot.closest('.match-slot');
        const setId = matchSlot.dataset.set;
        const cardType = card.dataset.type;
        
        // Remove from tracking
        this.placedCards.delete(`${setId}-${cardType}`);
        
        // Return card to appropriate deck
        const deckId = cardType + 'Cards';
        const deck = document.getElementById(deckId);
        
        // Make card draggable again
        card.draggable = true;
        card.style.cursor = 'grab';
        
        // Reset slot
        slot.innerHTML = cardType === 'time' ? 'Thả thẻ thời gian' :
                        cardType === 'author' ? 'Thả thẻ triết gia' : 'Thả thẻ tác phẩm';
        slot.classList.remove('filled', 'error');
        
        // Reset match slot if it was complete
        matchSlot.classList.remove('complete');
        
        // Add card back to deck
        deck.appendChild(card);
        
        // Update UI
        this.updateUI();
        
        // Show return animation
        this.showReturnAnimation(card);
    }

    showReturnAnimation(card) {
        card.style.transform = 'scale(0.8) rotate(-10deg)';
        card.style.opacity = '0.7';
        
        setTimeout(() => {
            card.style.transform = 'scale(1) rotate(0deg)';
            card.style.opacity = '1';
        }, 300);
    }

    showDetailModal(setId) {
        const detail = gameData.details[setId];
        if (detail) {
            document.getElementById('detailTitle').textContent = detail.title;
            document.getElementById('detailContent').innerHTML = detail.content;
            document.getElementById('detailModal').classList.remove('hidden');
        }
    }

    hideDetailModal() {
        document.getElementById('detailModal').classList.add('hidden');
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Global function for detail buttons
function showDetail(setId) {
    window.philosophyGame.showDetailModal(setId);
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.philosophyGame = new PhilosophyTimelineGame();
});