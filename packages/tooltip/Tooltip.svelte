<script>
    export let content, tooltip;

</script>

<style>
.tooltip {
    position: relative;
}

.tooltip .tip-container {
    position: absolute;
    background: #666;
    padding: 0 10px;
    border-radius: 4px;
    right: -180px;
    top: 50%;
    margin-top: -24px;
}

.tip-container .tip-triple {
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: #666;
	position: absolute;
	left: -16px;
	top: 16px;
}

.tip-container .tip-content {
    line-height: 24px;
    font-size: 12px;
    color: white;
}
</style>

<div class="tooltip">
    <slot class="tip-component"></slot>
    {#if tooltip}
    <div class="tip-container">
        <div class="tip-triple"></div>
        <p class="tip-content">{content}</p>
    </div>
    {/if}
</div>