<template>
    <n-h1 class="text-xl">Delete Device</n-h1>

    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending || !edited" :loading="pending">
                Delete
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ device: Device }>()

const model = ref({
    name: "",
});

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
    name: [
        {
            required: true,
            message: "Please input device name",
            trigger: "blur",
        },
        {
            message: `Name should be ${props.device.name}`,
            validator: (rule, value) => value === props.device.name
        },
    ],
}

async function handleSubmit() {
    const { remove } = useDevice()

    await remove(props.device.id)
        .then(device => emits("done", device))
}

</script>