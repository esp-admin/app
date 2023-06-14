<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <FormItem v-for="projectVariable of projectVariables" :label="projectVariable.key"
            :description="projectVariable.value">
            <n-input v-model:value="model[projectVariable.key]"></n-input>
        </FormItem>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ device: Device }>()

const model = ref<Record<string, string>>({});

const projectVariables = ref<{ key: string, value: string }[]>([])

if (props.device.projectId) {
    const { findOne } = useProject()
    const { data: project } = await findOne(props.device.projectId)

    if (project.value?.variables) {
        projectVariables.value = project.value.variables as { key: string, value: string }[]
    }
}

async function handleSubmit() {
    const { update } = useDevice()

    const { data, error } = await update(props.device.id, { variables: model.value })
}
</script>