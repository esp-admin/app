<template>
    <n-form>
        <form-item v-for="variable of  variables" :label="variable.key" :description="variable.description">
            <n-input v-model:value="variable.value"></n-input>
        </form-item>

        <div class="flex gap-4">
            <n-button type="primary">Save</n-button>
            <n-button type="primary" secondary>Reset</n-button>
        </div>
    </n-form>
</template>

<script setup>

const variables = ref([
    {
        key: "var_1",
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
        value: ""
    },
    {
        key: "var_2",
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
        value: ""
    },
    {
        key: "var_3",
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
        value: ""
    }
])
</script>