<script>
    import '../style/global.css';
    import Nav from '../components/Nav.svelte';
    import Board from '../components/Board.svelte';
    import { onKeyDown } from '../handlers/onKeyDown';
    import { setAnswerCode } from '../utils';
    import { page } from '$app/stores';

    const source = $page.url.searchParams.get('source');
    setAnswerCode(source);

</script>

<svelte:body on:keydown={(event) => onKeyDown(event)}/>
<Nav />
<Board />
