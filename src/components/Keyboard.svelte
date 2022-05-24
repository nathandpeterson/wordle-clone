<script>
    import { topRow, midRow, bottomRow } from '../utils';
    import Key from './Key.svelte';
</script>


    {#each [topRow, midRow, bottomRow] as row}
        <div class="key-row">
            {#each row as { display, value }}
                <Key display={display} value={value}/>
            {/each}
        </div>
    {/each}

<style>
    .key-row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: 5px;
    }

</style>