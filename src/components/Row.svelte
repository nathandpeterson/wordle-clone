<script>
    import { derived } from 'svelte/store';
    import { gameState, dialog, winState, currentRowIndex } from '../store';
    
    export let rowIndex = 0;
    
    let hints = [];
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
    dialog.subscribe((err) => {
        if (typeof err === 'number') {
            doesCurrentRowHaveError = isCurrentRowActive;
            return;
        }
        doesCurrentRowHaveError = false;
    });

    let didCurrentRowJustWin = false;
    derived([gameState, winState], ([$gameState, $winState]) => {
        if ($winState === true) {
            const allRowsWithGuesses = $gameState.filter(game => !!game.guess);
            console.log({ allRowsWithGuesses });
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
    <div class="row" class:shake={doesCurrentRowHaveError}>
        {#each letters as letter, i}
            <div 
                class="tile {hints[i]}" 
                class:tbd={!hints[i] && !!letter}
                class:empty={!hints[i] && !letter}
                class:win={didCurrentRowJustWin}
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
        height: 1.7em;
        width: 1.7em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 900;
        margin: 1px;
        text-align: center;
        color: var(--black);
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

  .pop {
    animation-name: PopIn;
    animation-duration: 100ms;
  }

  @keyframes PopIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  .flip-in {
    animation-name: FlipIn;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  @keyframes FlipIn {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }
  .flip-out {
    animation-name: FlipOut;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  @keyframes FlipOut {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
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