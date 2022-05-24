<script>
    import { fade } from 'svelte/transition';
    import { winState } from '../store';
    let visible = false;

    winState.subscribe(hasWon => {
       if (hasWon) {
           visible = true;
       }
    });

</script>

<div>
{#if visible}
    <div transition:fade class='notification-error'>
        HOORAY!  
    </div>
{/if}

</div>

<style>
    .notification-error {
        background-color: var(--white);
        color: var(--black);
        border: 1px solid black;
        border-radius: 5px;
        min-height: 30px;
        position: absolute;
        padding: 20px;
        margin: 0 auto;
        font-size: 20px;
        white-space: nowrap;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
    }
</style>