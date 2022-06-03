<script>
    export let letter = '';
    export let hint = '';
    export let index = 0;;
    let hasFlipped = false;
    let isFlipping = false;

    function flipout(node, {
              delay = index * 150,
              duration = 500
        }) {
            return {
                delay,
                duration,
                css: (timer) => {
                  return `transform: rotateX(${timer * 180}deg);`
                }
            };
        }
      $: if (hint) {
        let revealTime = (index * 150) + 500;
        setTimeout(() => {
          isFlipping = true;
        }, index * 150);
        setTimeout(()=> {
          hasFlipped = true;
          isFlipping = false;
        }, revealTime);
      }
</script>

{#key hint}
    <div class="tile {(hasFlipped || isFlipping) && hint} {(!letter && !hint ) && "empty"} {((letter && !hint)) && "tbd"}" in:flipout>
        {isFlipping ? '' : letter}
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
        text-align: center;
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

  .pop {
    animation-name: PopIn;
    animation-duration: 100ms;
  }

  @keyframes PopIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  .flip-in {
    animation-name: FlipIn;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  @keyframes FlipIn {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }
  .flip-out {
    animation-name: FlipOut;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  @keyframes FlipOut {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }

</style>