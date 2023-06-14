<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending" class="flex-1">Create
                project</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

apiErrors.value = {
    nameAlreadyExists: false,
}

const model = ref<Partial<Project>>({
    name: "",
});

rules.value = {
    name: [
        {
            required: true,
            message: "Please input project name",
            trigger: "blur",
        },
        {
            message: "Name already used",
            validator: () => !apiErrors.value.nameAlreadyExists
        },
    ],
}


async function handleSubmit() {
    const { add } = useProject()

    const { data: project, error } = await add(model.value)

    if (error.value) {
        apiErrors.value.nameAlreadyExists = error.value.data?.message.includes("Unique constraint failed on the constraint: `Project_name_key`")
    }
    else {
        emits("done", project.value)
    }
}
</script>