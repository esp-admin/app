<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Websockets uri" path="uriWS">
            <n-input v-model:value="model.uriWS"></n-input>
        </n-form-item>

        <n-form-item label="Mqtt uri" path="uriTCP">
            <n-input v-model:value="model.uriTCP"></n-input>
        </n-form-item>

        <n-form-item label="Username" path="username">
            <n-input v-model:value="model.username"></n-input>
        </n-form-item>

        <n-form-item label="Password" path="password">
            <n-input v-model:value="model.password"></n-input>
        </n-form-item>

        <FormButtons @reset="reset" :loading="pending" :disabled="!edited || pending"></FormButtons>
    </n-form>
</template>

<script setup lang="ts">
const { find } = useMqtt()

const { data: mqtt } = await find()

const model = ref<Partial<Mqtt>>({
    password: mqtt.value?.password,
    username: mqtt.value?.username,
    uriTCP: mqtt.value?.uriTCP,
    uriWS: mqtt.value?.uriWS,
});

const { apiErrors, formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

apiErrors.value = {
    unableToConnect: false
}

rules.value = {
    uriWS: [
        {
            required: true,
            message: "Please enter borker's Websockets URI",
            trigger: "blur",
        },
        {
            message: "Unable to connect",
            validator: () => !apiErrors.value.unableToConnect
        },
        {
            validator: (rule, value) => /^wss/.test(value),
            message: "Should start with wss",
            trigger: "input"
        }
    ],
    username: [
        {
            required: true,
            message: "Please enter username",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "Please enter password",
            trigger: "blur",
        },
    ],
    uriTCP: [
        {
            validator: (rule, value) => value && /^mqtts/.test(value),
            message: "Should start with mqtts",
            trigger: "input"
        }
    ]
}


async function handleSubmit() {
    try {

        const { add, update, connect } = useMqtt()

        await connect({
            password: model.value.password!,
            uri: model.value.uriWS!,
            username: model.value.username!
        })

        if (mqtt.value) {
            const { data, error } = await update(model.value)

        }
        else {
            const { data, error } = await add(model.value)

        }

    } catch (error) {
        apiErrors.value.unableToConnect = true

    }
}
</script>