<template>
    <n-form ref="formRef" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">

        <n-dynamic-input v-model:value="model.variables" #="{ index, value }" :on-create="() => ({ key: '', value: '' })"
            class="mb-4">
            <div class="flex gap-4">
                <n-form-item ignore-path-change :show-label="false" :path="`variables[${index}].key`" :rule="rules.key">
                    <n-input v-model:value="model.variables[index].key" placeholder="Key" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item class="flex-1" ignore-path-change :show-label="false" :path="`variables[${index}].value`"
                    :rule="rules.value">
                    <n-input v-model:value="model.variables[index].value" placeholder="Value" @keydown.enter.prevent />
                </n-form-item>
            </div>
        </n-dynamic-input>

        <div class="flex gap-4" v-if="model.variables?.length > 0">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ project: Project }>()

const model = ref({
    variables: props.project.variables as { key: string, value: string }[]
});

rules.value = {
    key: [
        {
            required: true,
            message: "Please set the key"
        },
        {
            trigger: 'input',
            message: "Should not contain spaces",
            validator(rule, value) {
                return !value.includes(" ")
            }
        }
    ],
    value:
        [
            {
                required: true,
                message: "Please set the value"
            }
        ]
}

async function handleSubmit() {
    const { update } = useProject()

    const { data, error } = await update(props.project.id, model.value)
}
</script>