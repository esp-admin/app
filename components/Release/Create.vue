<template>
    <n-form>
        <n-form-item>
            <n-upload>
                <n-upload-dragger>
                    <div>
                        <naive-icon name="ph:upload" :size="28"></naive-icon>
                    </div>

                    <n-text class="text-sm" :depth="2">
                        Click or drag a firmware.bin to this area to upload
                    </n-text>
                </n-upload-dragger>
            </n-upload>
        </n-form-item>

        <n-form-item label="Version">
            <n-input></n-input>
        </n-form-item>

        <n-button type="primary" block>Create release</n-button>
    </n-form>
</template>