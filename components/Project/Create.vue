<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending || !edited" class="flex-1">
                Create
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const model = ref<Partial<Project>>({
    name: "",
});

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

apiErrors.value = {
    nameAlreadyExists: false,
}

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
        {
            validator: (rule, value) => !/^\s|\s$/.test(value),
            message: "Should not start or end with a whitespace",
            trigger: "blur"
        }
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