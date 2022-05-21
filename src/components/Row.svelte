<script>
    import { guess, totalGuesses } from '../store';
    export let rowIndex = 0;

    let letters = ['', '', '', '', ''];
    let isCurrentRowActive = false;

    totalGuesses.subscribe(value => {
        isCurrentRowActive = value === rowIndex;
    });
    
    guess.subscribe(value => {
        if (isCurrentRowActive) {
                value.split('').forEach((letter, i) => {
                letters[i] = letter
            })
        }
    });


    
</script>
<div class="game-row">
    <div class="row">
        {#each letters as letter, i}
            <div class="tile" class:has-input={!!letters[i]}>
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
        border: 2px solid rgb(211, 214, 218);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-weight: 900;
    }
    .has-input {
        border: 2px solid black;
    }
</style>