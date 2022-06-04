<script lang="ts">
    import { derived } from 'svelte/store';
    import Tile from './Tile.svelte';
    import { gameState, dialog, ERRORS, winState, currentRowIndex } from '../store';
    
    export let rowIndex = 0;
    
    let hints: string[] = [];
    let letters = ['', '', '', '', ''];
    let isCurrentRowActive = $currentRowIndex === rowIndex;
    let hasCurrentRowBeenSubmitted = false;

    currentRowIndex.subscribe(currentRowIndex => {
        isCurrentRowActive = currentRowIndex === rowIndex
    });

    gameState.subscribe(newState => {
        if (isCurrentRowActive) {
            const currentGuess = newState[rowIndex].guess;
            letters = letters.map((_, i) => currentGuess[i] || '');
        }
        hasCurrentRowBeenSubmitted = newState[rowIndex].submitted;
        if (hasCurrentRowBeenSubmitted) {
            hints = newState[rowIndex].hints;
        }
        if (newState.every(guess => guess.guess === '')) {
            letters = ['', '', '', '', ''];
            hints = [];
        }
    });
    let doesCurrentRowHaveError = false;
    dialog.subscribe((dialogMessage) => {
        if (ERRORS.includes(dialogMessage)) {
            doesCurrentRowHaveError = isCurrentRowActive;
            return;
        }
        doesCurrentRowHaveError = false;
    });

    let didCurrentRowJustWin = false;
    derived([gameState, winState], ([$gameState, $winState]) => {
        if ($winState === true) {
            const allRowsWithGuesses = $gameState.filter(game => !!game.guess);
            return rowIndex === allRowsWithGuesses.length - 1;
        }
        return false;
    }, false).subscribe(val => {
        if (val) {
            didCurrentRowJustWin = val
        }
    });
   
    
</script>
<div class="game-row">
    <div class="row" class:shake={doesCurrentRowHaveError} class:win={didCurrentRowJustWin}>
        {#each letters as letter, i}
            <Tile letter={letters[i]} hint={hints[i]} index={i}/>
        {/each}
    </div>
</div>

<style>
    .game-row {
        display: block;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }

    .win {
      animation-name: Bounce;
      animation-duration: 1000ms;
    }

    @keyframes Bounce {
        0%, 20% {
        transform: translateY(0);
        }
        40% {
        transform: translateY(-30px);
        }
        50% {
        transform: translateY(5px);
        }
        60% {
        transform: translateY(-15px);
        }
        80% {
        transform: translateY(2px);
        }
        100% {
        transform: translateY(0);
        }
    }
</style>