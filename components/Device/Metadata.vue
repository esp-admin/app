<template>
    <n-form>
        <n-form-item label="Mac address">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Name">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="API key">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Description">
            <n-input type="textarea" autosize></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary">Save</n-button>
            <n-button secondary>Reset</n-button>
        </div>
    </n-form>
</template>