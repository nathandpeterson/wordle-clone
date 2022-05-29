<script>
    import { topRow, midRow, bottomRow } from '../utils';
    import Key from './Key.svelte';
</script>

<div class="keyboard">
    {#each [topRow, midRow, bottomRow] as row}
        <div class="key-row">
            {#each row as { display, value }}
                <Key display={display} value={value}/>
            {/each}
        </div>
    {/each}
</div>

<style>
    .keyboard {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        max-width: 50%;
        margin: 0 auto;
    }
    .key-row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: 5px;
    }

</style>