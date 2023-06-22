<template>
    <n-form ref="formRef" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">

        <n-dynamic-input v-model:value="model.variables" #="{ index }" :on-create="() => ({ key: '', value: '' })"
            class="mb-4">
            <div class="flex gap-4 flex-1">
                <n-form-item class="flex-1" ignore-path-change :show-label="false" :path="`variables[${index}].key`"
                    :rule="rules.key">
                    <n-input v-model:value="model.variables[index].key" placeholder="Key" @keydown.enter.prevent />
                </n-form-item>

                <n-form-item class="flex-1" ignore-path-change :show-label="false">
                    <n-input v-model:value="model.variables[index].value" placeholder="Description"
                        @keydown.enter.prevent />
                </n-form-item>
            </div>
        </n-dynamic-input>

        <FormButtons v-if="model.variables?.length" @reset="reset" :loading="pending" :disabled="!edited || pending">
        </FormButtons>
    </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const model = ref({
    variables: props.project.variables as { key: string, value: string }[]
});

const { formRef, onSubmit, pending, rules, reset, edited } = useNaiveForm(model)

rules.value = {
    key: [
        {
            required: true,
            message: "Please set the key"
        },
        {
            trigger: 'input',
            message: "Should not contain spaces",
            validator: (rule, value) => !/\s/.test(value)
        }
    ]
}

async function handleSubmit() {
    const { update } = useProject()

    const { data, error } = await update(props.project.id, model.value)
}
</script>