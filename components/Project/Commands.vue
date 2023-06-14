<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-dynamic-input v-model:value="model.commands" preset="pair" key-placeholder="Name" value-placeholder="Payload"
            class="mb-4" />

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ project: Project }>()

const model = ref({
    commands: props.project.commands as { key: string, value: string }[]
});

async function handleSubmit() {
    const { update } = useProject()

    const { data, error } = await update(props.project.id, model.value)
}
</script>