<script>
  import Icon from '../icon/Icon.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let icon,
    type = 'default'
  function handleClick() {
    dispatch('click')
  }
  function computedButtonClass(type) {
    switch (type) {
      case 'primary':
        return 'button button-primary'
      case 'default':
        return 'button button-default'
      case 'text':
        return 'button button-text'
      default:
        return 'button button-default'
    }
  }
</script>

<style>
  .button {
    border: 0;
    border-radius: 2px;
  }

  .button:hover {
    cursor: pointer;
  }

  .button-primary {
    background-color: rgb(77, 187, 41, 1);
    color: white;
    border: 1px solid rgb(77, 187, 41, 1);
  }

  .button-primary:hover {
    background-color: rgba(77, 187, 41, 0.8);
  }

  .button-default {
    background-color: white;
    color: #999;
    border: 1px solid #e0e0e0;
  }

  .button-default:hover {
    background-color: rgba(77, 187, 41, 0.1);
    color: rgba(77, 187, 41, 0.6);
    border: 1px solid #e0e0e0;
  }

  .button-text {
    background-color: transparent;
    border: none;
  }
</style>

<button class={computedButtonClass(type)} on:click={handleClick}>
  {#if icon}
    <Icon name={icon} />
  {/if}
  <span>
    <slot />
  </span>
</button>
