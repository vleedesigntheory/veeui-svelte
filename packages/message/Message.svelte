<script>
  import Icon from '../icon/Icon.svelte'
  export let type = 'info',
    show = false

  const computedMessageClass = (type) => {
    switch (type) {
      case 'success':
        return 'message message-success'
      case 'warning':
        return 'message message-warning'
      case 'info':
        return 'message message-info'
      case 'error':
        return 'message message-error'
      default:
        return 'message message-info'
    }
  }

  const computedIconName = (type) => {
    switch (type) {
      case 'success':
        return 'iconsuccess'
      case 'warning':
        return 'iconwarning'
      case 'info':
        return 'iconinfo'
      case 'error':
        return 'iconerror'
      default:
        return 'iconinfo'
    }
  }
</script>

<style>
  .message {
    position: absolute;
    z-index: 100000;
    width: 200px;
    height: max-content;
    left: 0;
    right: 0;
    margin: auto;
    padding: 4px 10px;
    animation: show 2s ease-in-out forwards;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 4px;
  }

  .message-content {
    margin-left: 10px;
  }

  @keyframes show {
    from {
      opacity: 1;
      top: 0;
    }

    to {
      opacity: 0;
      top: 100px;
    }
  }

  .message-success {
    background-color: rgba(77, 187, 41, 0.2);
    color: rgba(77, 187, 41, 1);
  }

  .message-info {
    background-color: rgb(144, 147, 153, 0.2);
    color: rgb(144, 147, 153, 1);
  }

  .message-warning {
    background-color: rgb(230, 162, 60, 0.2);
    color: rgb(230, 162, 60, 1);
  }

  .message-error {
    background-color: rgb(245, 108, 108, 0.2);
    color: rgb(245, 108, 108, 1);
  }
</style>


{#if show}
  <div class={computedMessageClass(type)}>
    <Icon name={computedIconName(type)} />
    <p class="message-content">
      <slot />
    </p>
  </div>
{/if}
