<template>
    <n-h1 class="text-xl">Unlink device</n-h1>

    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Confirm" path="confirm">
            <n-input v-model:value="model.confirm" placeholder="Write <unlink> to confirm"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :disabled="pending || !edited"
                :loading="pending">Unlink</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ device: Device }>()

const model = ref({
    confirm: "",
});

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
    confirm: [
        {
            message: "Please write <unlink>",
            validator: (rule, value) => value === "unlink",
            trigger: "blur"
        },
    ],
}

async function handleSubmit() {
    const { unlink } = useDevice()

    await unlink(props.device.id)
        .then((device) => emits("done", device))
}

</script>