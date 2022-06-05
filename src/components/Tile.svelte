<script lang="ts">
    export let letter = '';
    export let hint = '';
    export let index = 0;;
    let shouldRevealHint = false;

    const ANIMATION_DELAY = index * 150;
    const ANIMATION_DURATION = 500;

    function flipout(_: HTMLElement, {
              delay = ANIMATION_DELAY,
              duration = ANIMATION_DURATION
        }) {
            return {
                delay,
                duration,
                css: (timer: number) => {
                    if (!hint) {
                        return;
                    }
                    if (timer < 0.5) {
                        // rotates tile vertically until it hits 90 deg
                        return `transform: rotateX(${timer * 180}deg);`
                    }
                    // to avoid having letter be upside down,
                    // reverse direction and rotate tile back the way it came from
                    const difference = 1 - timer;
                    return `transform: rotateX(${difference * 180}deg);`
                }
            };
        }
      $: if (hint) {
        // once the hint prop is passed, we want to wait for the animation to be at
        // the halfway point before changing the color of the tile
        setTimeout(() => {
          shouldRevealHint = true;
        }, (ANIMATION_DELAY) + ANIMATION_DURATION / 2);
      }

      $: if (!letter) {
        // to allow replay, reset reveal hint when letter absent
        shouldRevealHint = false;
      }
</script>

{#key hint}
    <div class="tile {!letter && 'empty'} {letter && !shouldRevealHint && 'tbd'} {shouldRevealHint && hint ? hint : ''}"
        in:flipout
    >
        {letter}
    </div>
{/key}

<style>
    .tile {
        text-transform: uppercase;
        height: 1.7em;
        width: 1.7em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 900;
        margin: 1px;
        color: var(--black);
    }
    .empty {
        border: 2px solid rgb(211, 214, 218);
    }
    .tbd {
        border: 2px solid var(--black);
        animation: bigger 0.3s cubic-bezier(.36,.07,.19,.97);
        transform: scale(1);
    }

    @keyframes bigger {
        0% {
            transform: scale(1);
        }
        70% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

</style>