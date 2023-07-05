<template>
    <n-form ref="formRef" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <FormItem v-for="projectVariable of projectVariables" :label="projectVariable.key"
            :description="projectVariable.value">
            <n-input v-model:value="model[projectVariable.key]"></n-input>
        </FormItem>

        <FormButtons v-if="projectVariables?.length" @reset="reset" :loading="pending" :disabled="!edited || pending">
        </FormButtons>

        <n-result v-else class="col-span-full my-5" title="No variables defined">
            <template #icon>
                <img src="~/assets/images/no-results.png" alt="no-results" width="200">
            </template>
        </n-result>
    </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device }>()

const model = ref(props.device.variables as Record<string, string>);

const { formRef, onSubmit, pending, edited, reset } = useNaiveForm(model)

const projectVariables = ref<{ key: string, value: string }[]>([])

if (props.device.projectId) {
    const { findOne } = useProject()
    const project = await findOne(props.device.projectId)

    if (project.value?.variables) {
        projectVariables.value = project.value.variables as { key: string, value: string }[]
    }
}

async function handleSubmit() {
    const { update } = useDevice()

    await update(props.device.id, { variables: model.value })
        .then(() => {
            const { publish } = useMqtt()

            publish({
                deviceId: props.device.id,
                action: "command",
                type: "config",
                payload: JSON.stringify(model.value),
                retained: true
            })
        })
}
</script>