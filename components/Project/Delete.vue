<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending" :loading="pending">Delete
                project</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { Project } from "@prisma/client"

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ project: Project }>()

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const model = ref({
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
            message: `Name should be ${props.project.name}`,
            validator: (rule, value) => value === props.project.name
        },
    ],
}

async function handleSubmit() {
    const { remove } = useProject()

    const { data, error } = await remove(props.project.id)

    if (error.value) {

    }
    else {
        emits("done", data.value)
    }
}

</script>