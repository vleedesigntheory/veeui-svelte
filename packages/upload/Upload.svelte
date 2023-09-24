<script>
    export let action, onSuccess, beforeUpload, id;
    function ajax(options) {
        const xhr = new XMLHttpRequest();
        const action = options.action;
        let fd = new FormData();
        
        fd.append(options.filename, options.file);

        xhr.onerror = function (err) {
            console.error(err)
        }

        xhr.onload = function() {
            const text = xhr.responseText || xhr.response;
            console.log('text', text)
            text && options.success(JSON.parse(text))
        }

        xhr.open('post', action, true);
        xhr.send(fd);

        return xhr;
    }
    function post(rawFile) {
        const options = {
            id: id,
            file: rawFile,
            filename: 'img',
            action: action,
            success: res => onSuccess(res, rawFile, id)
        }
        const req = ajax(options);
        if(req && req.then) {
            req.then(options.onSuccess)
        }
    }
    async function handleChange(e) {
        const rawFile = e.target.files[0];
        if(!beforeUpload) {
            return post(rawFile)
        }
        let flag = await beforeUpload(rawFile, id);
        if(flag) post(rawFile)
    }
    function handleClick() {
        const plus = document.getElementById(id);
        plus.value = '';
        plus.click()
    }
</script>

<style>
    .upload {
        width: 250px;
        height: 250px;
        border: 1px dashed #ececec;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upload:hover {
        cursor: pointer;
    }

    .native-input {
        display: none;
    }
</style>

<div class="upload" on:click={handleClick}>
    <div class="upload-slot" >
        <slot></slot>
    </div>
    <input {id} class="native-input" type="file" multiple="false" accept="image/png" on:change={handleChange} />
</div>