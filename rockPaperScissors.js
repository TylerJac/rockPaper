function getHand() {
    const hands = ['rock', 'paper', 'scissors'];
    const index = parseInt(Math.random() * 10) % 3;
    return hands[index];
}

function playRound(p1, p2) {
    const x = p1.getHand();
    const y = p2.getHand();
    if ((x === 'scissors' && y === 'paper') || (x === 'rock' && y === 'scissors') || (x === 'paper' && y === 'rock')) {
        document.getElementById('round-result').textContent = `Player 1 (${p1.name}) won: ${x} vs ${y}`;
        return 'p1';
    } else if ((x === 'paper' && y === 'scissors') || (x === 'scissors' && y === 'rock') || (x === 'rock' && y === 'paper')) {
        document.getElementById('round-result').textContent = `Player 2 (${p2.name}) won: ${x} vs ${y}`;
        return 'p2';
    } else {
        document.getElementById('round-result').textContent = `It's a tie: Player 1 (${p1.name}): ${x} vs Player 2 (${p2.name}): ${y}`;
        return 'tie';
    }
}

function playGame(player1, player2, score1Id, score2Id, playUntil) {
    let p1Wins = 0;
    let p2Wins = 0;

    while (p1Wins < playUntil && p2Wins < playUntil) {
        const result = playRound(player1, player2);
        if (result === 'p1') {
            p1Wins++;
        } else if (result === 'p2') {
            p2Wins++;
        }
        document.getElementById(score1Id).textContent = p1Wins;
        document.getElementById(score2Id).textContent = p2Wins;
    }

    if (p1Wins === playUntil) {
        document.getElementById('game-result').textContent = `${player1.name} wins the game!`;
        return player1;
    } else {
        document.getElementById('game-result').textContent = `${player2.name} wins the game!`;
        return player2;
    }
}

function playTournament(player1, player2, player3, player4, playUntil) {
    // First round
    const winner1 = playGame(player1, player2, 'score1', 'score2', playUntil);
    const winner2 = playGame(player3, player4, 'score3', 'score4', playUntil);

    // Reset scores for final round
    document.getElementById('score1').textContent = 0;
    document.getElementById('score2').textContent = 0;
    document.getElementById('score3').textContent = 0;
    document.getElementById('score4').textContent = 0;

    // Determine score IDs for the final round
    let winnerScore1, winnerScore2;

    if (winner1 === player1) {
        winnerScore1 = 'score1';
    } else {
        winnerScore1 = 'score2';
    }

    if (winner2 === player3) {
        winnerScore2 = 'score3';
    } else {
        winnerScore2 = 'score4';
    }

    // Final round
    const tournamentWinner = playGame(winner1, winner2, winnerScore1, winnerScore2, playUntil);

    // Announce the winner
    document.getElementById('tournament-result').textContent = `${tournamentWinner.name} is the world champion!`;
}

document.getElementById('start-tournament').addEventListener('click', () => {
    const p1 = {
        name: 'John',
        getHand: getHand
    };
    const p2 = {
        name: 'Jill',
        getHand: getHand
    };
    const p3 = {
        name: 'Alice',
        getHand: getHand
    };
    const p4 = {
        name: 'Bob',
        getHand: getHand
    };

    const playUntil = 3;
    playTournament(p1, p2, p3, p4, playUntil);
});
