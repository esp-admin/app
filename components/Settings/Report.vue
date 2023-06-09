<template>
    <n-form>
        <n-form-item label="Webhook URL">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Bugsnag API Key">
            <n-input></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary">Save</n-button>
            <n-button type="primary" secondary>Reset</n-button>
        </div>
    </n-form>
</template>