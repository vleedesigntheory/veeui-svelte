<script>
    export let value;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleChange() {
        dispatch('input')
    }
</script>

<style>
    .input {
        border: 1px solid rgb(77, 187, 41, 1);
        width: 100px;
    }

    .input:focus {
        border: 1px solid rgb(77, 187, 41, .5);
        outline: none;
    }
</style>

<input class="input" bind:value={value} on:change={handleChange} />