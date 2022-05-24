<script>
    import { onPointerUp } from '../handlers/onPointerUp';
    import { bestHintForLetter } from '../store';
    export let display = '';
    export let value = '';

    let bestHint = '';

    bestHintForLetter.subscribe(bestHints => {
        if (bestHints[display]) {
            bestHint = bestHints[display]
        }
    });

</script>

<button class={bestHint} class:empty={!bestHint} on:pointerup={() => onPointerUp(value)}>
    {display}
</button>

<style>

button {
    width: fit-content;
    height: 3.5rem;
    padding: 15px;
    border: none;
    margin: 1px;
    cursor: pointer;
    font-weight: 900;
    text-transform:uppercase;
    border-radius: 5px;
}
.empty {
    background-color: var(--gray-light);
}
</style>