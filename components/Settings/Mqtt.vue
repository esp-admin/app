<template>
    <n-form>
        <div class="md:flex gap-4">
            <n-form-item label="Host" class="flex-1">
                <n-input></n-input>
            </n-form-item>

            <n-form-item label="Websockets Port">
                <n-input-number :show-button="false" class="w-full"></n-input-number>
            </n-form-item>

            <n-form-item label="MQTT Port">
                <n-input-number :show-button="false" class="w-full"></n-input-number>
            </n-form-item>
        </div>

        <n-form-item label="Username">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Password">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Certificate">
            <n-input type="textarea" autosize></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary">Save</n-button>
            <n-button type="primary" secondary>Reset</n-button>
        </div>
    </n-form>
</template>