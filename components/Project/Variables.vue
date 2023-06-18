<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-dynamic-input v-model:value="model.variables" preset="pair" key-placeholder="Key" value-placeholder="Description"
            class="mb-4" />

        <div class="flex gap-4" v-if="model.variables?.length > 0">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset" :disabled="pending">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ project: Project }>()

const model = ref({
    variables: props.project.variables as { key: string, value: string }[]
});

async function handleSubmit() {
    const { update } = useProject()

    const { data, error } = await update(props.project.id, model.value)
}
</script>