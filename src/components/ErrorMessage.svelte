<script>
    import { fade } from 'svelte/transition';
    import { error, ERROR_TYPE } from '../store';
    let errorMessage = '';
    let visible = false;

    error.subscribe(currentError => {
        if (typeof currentError === 'number') {
            errorMessage = ERROR_TYPE[currentError];
            visible = true;
        } else {
            errorMessage = '';
            visible = false;
        }
    });

</script>

<div>
{#if visible}
    <div transition:fade class='notification-error'>
        {errorMessage}
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