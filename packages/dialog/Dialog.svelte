<script>
  import Icon from '../icon/Icon.svelte';
  
  import Button  from '../button/Button.svelte';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()
  export let title,
    visible = false
  function handleClose() {
    visible = false
  }
  function handleShade() {
    visible = false
  }
  function handleCancel() {
    visible = false
  }
  function handleSubmit() {
    dispatch('submit')
  }
</script>

<style>
  .dialog-wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 100000;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .dialog {
    width: 400px;
    height: max-content;
    background-color: white;
    box-shadow: 0 0 10px #ececec;
    position: absolute;
    z-index: 100001;
    border-radius: 2px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    padding: 10px;
  }

  .dialog-header .dialog-title {
    font-size: 16px;
  }

  .dialog-body {
    padding: 10px;
  }

  .dialog-footer {
    display: flex;
    justify-content: right;
    padding: 10px;
  }
</style>


{#if visible}
  <div class="dialog-wrapper" on:click={handleShade} />
  <div class="dialog">
    <div class="dialog-header">
      <slot name="title">
        <span class="dialog-title">{title}</span>
      </slot>
      <Button type="text" on:click={handleClose}>
        <Icon name="iconclose" />
      </Button>

    </div>
    <div class="dialog-body">
      <slot />
    </div>
    <div class="dialog-footer">
      <div class="dialog-button-group">
        <Button on:click={handleCancel}>取消</Button>
        <Button type="primary" on:click={handleSubmit}>确定</Button>
      </div>
    </div>
  </div>
{/if}
