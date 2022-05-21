<script>
import { beforeUpdate } from 'svelte';

    import { totalGuesses as totalGuessesStore } from '../store';

    let rows = [null, null, null, null, null, null];
    import Row from './Row.svelte';

    let totalGuesses = 0;

    totalGuessesStore.subscribe((val) => {
        totalGuesses = val;
    });

    beforeUpdate(() => {
        console.log('before update - totalg', totalGuesses)
    })

</script>
<div class="game">
    <div class="board-container">
        <div class="board">
            {#each rows as row, i}
               <Row rowIndex={i}/>
            {/each}
        </div>
    </div>
</div>


<style>
    .game {
        max-width: 500px;
        padding: 10px 0;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .board-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }
    .board {
        width: 290px; 
        height: 348px;
        display: grid;
        padding: 10px;
        column-gap: 3px;
        grid-template-rows: (6, 1fr);
        row-gap: 3px;
    }
</style>