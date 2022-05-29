<script>
    import { fade } from 'svelte/transition';
    import { dialog, DIALOG_TYPE } from '../store';
    let dialogMessage = '';
    let visible = false;

    dialog.subscribe(currentDialog => {
        if (typeof currentDialog === 'number') {
            dialogMessage = DIALOG_TYPE[currentDialog];
            visible = true;
        } else {
            dialogMessage = '';
            visible = false;
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