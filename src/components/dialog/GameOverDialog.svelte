<script>
    import { fade } from 'svelte/transition';
    import { dialog, isGameOver, restartGame } from '../../store';
    let visible = false;

    dialog.subscribe(currentDialog => {
        if (currentDialog === 'CLEAR' && $isGameOver) {
            visible = true;
        }
    });
    isGameOver.subscribe(gameOver => {
        if (gameOver === false) {
            visible = false;
        }
    })


</script>

<div>
{#if visible}
    <div transition:fade class='notification-error'>
        PLAY AGAIN?
        <button on:click={restartGame}>YES</button>
    </div>
{/if}

</div>

<style>
    .notification-error {
        background-color: var(--white);
        color: var(--black);
        border-radius: 5px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
        flex-direction: column;
    }
    button {
        margin-top: 15px;
        padding: 10px;
        background-color: var(--green);
        border: transparent;
        color: var(--white);
        cursor: pointer;
        transform: scale(1);
        transition: .5s;
        border-radius: 5px;
    }
    button:hover {
        background-color: var(--green-dark);
        transform: scale(1.1);
    }
</style>