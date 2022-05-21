<script>
    import Nav from '../components/Nav.svelte';
    import Board from '../components/Board.svelte';
    import { onKeyDown } from '../handlers/onKeyDown';

    import { guess, totalGuesses } from '../store';

    let guessValue = '';
    let totalGuessesValue = 0;

    guess.subscribe((newGuess) => guessValue = newGuess);
    totalGuesses.subscribe((newTotalGuesses) => totalGuessesValue = newTotalGuesses);

</script>

<svelte:body on:keydown={(event) => onKeyDown(event, guessValue, totalGuessesValue)}/>
<Nav />
<Board />


