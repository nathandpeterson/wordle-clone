<script>
    import { gameState, error } from '../store';
    import { getHintsForGuess } from '../utils';
    export let rowIndex = 0;
    
    let hints = [];
    let letters = ['', '', '', '', ''];
    let isCurrentRowActive = true;
    let hasCurrentRowBeenSubmitted = false;


    gameState.subscribe(newState => {
        const firstUnsubmittedIndex = newState.findIndex(guess => guess.submitted === false);
        isCurrentRowActive = firstUnsubmittedIndex === rowIndex;
        if (isCurrentRowActive) {
            const currentGuess = newState[rowIndex].guess;
            letters = letters.map((_, i) => currentGuess[i] || '');
        }
        hasCurrentRowBeenSubmitted = newState[rowIndex].submitted;
        if (hasCurrentRowBeenSubmitted) {
            hints = getHintsForGuess(letters.join('').toUpperCase());
        }
    });
    let doesCurrentRowHaveError = false;
    error.subscribe((err) => {
        if (typeof err === 'number') {
            doesCurrentRowHaveError = isCurrentRowActive;
            return;
        }
        doesCurrentRowHaveError = false;
    });
    
</script>
<div class="game-row">
    <div class="row" class:shake={doesCurrentRowHaveError}>
        {#each letters as letter, i}
            <div 
                class="tile {hints[i]}" 
                class:tbd={!hints[i] && !!letter}
                class:empty={!hints[i] && !letter}
            >
                {letters[i]}
            </div>
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
    .tile {
        text-transform: uppercase;
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-weight: 900;
    }
    .empty {
        border: 2px solid rgb(211, 214, 218);
    }
    .tbd {
        border: 2px solid var(--black);
        animation: bigger 0.3s cubic-bezier(.36,.07,.19,.97);
        transform: scale(1);
    }

    @keyframes bigger {
        0% {
            transform: scale(1);
        }
        70% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }

    }
</style>