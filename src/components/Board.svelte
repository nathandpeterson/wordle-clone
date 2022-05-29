<script>

let rows = [null, null, null, null, null, null];
import Row from './Row.svelte';
import Keyboard from './Keyboard.svelte';
import ShowMessage from './ShowMessage.svelte';
import WinMessage from './WinMessage.svelte';

</script>
<div class="game">
    <div class="board-container">
        <div class="board">
            {#each rows as row, i}
               <Row rowIndex={i}/>
            {/each}
        </div>
    </div>
    <Keyboard />
    <ShowMessage />
    <WinMessage />
</div>


<style>
    .game {
        padding: 10px 0;
        height: 100vh;
        position: relative;
    }
    .board-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        flex-direction: column;
    }
    .board {
        display: grid;
        padding: 10px;
        column-gap: 3px;
        grid-template-rows: (6, 1fr);
        row-gap: 2px;
    }
</style>