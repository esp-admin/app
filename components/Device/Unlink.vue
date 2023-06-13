<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending" :loading="pending">Unlink
                device</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { Device } from "@prisma/client"

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ device: Device }>()

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const model = ref({
    name: "",
});

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
    const { unlink } = useDevice()

    const { data: device, error } = await unlink(props.device.id)

    if (error.value) {

    }
    else {
        emits("done", device.value)
    }
}

</script>