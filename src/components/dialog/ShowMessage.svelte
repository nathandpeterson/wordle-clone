<script>
    import { fade } from 'svelte/transition';
    import { answer, currentRowIndex, dialog, WIN_MESSAGE } from '../../store';
    let dialogMessage = '';
    let visible = false;

    dialog.subscribe(currentDialog => {
        if (currentDialog === 'ANSWER') {
            dialogMessage = $answer;
            visible = true;
        } else if (currentDialog === 'CLEAR') {
            dialogMessage = '';
            visible = false;
        } else if (currentDialog === 'WIN') {
            dialogMessage = WIN_MESSAGE[$currentRowIndex]
            visible = true;
        } else {
            dialogMessage = currentDialog;
            visible = true;
        }
    });

</script>

<div>
{#if visible}
    <div transition:fade class='notification-error'>
        {dialogMessage}
    </div>
{/if}
</div>

<style>
    .notification-error {
        background-color: var(--black);
        color: var(--white);
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