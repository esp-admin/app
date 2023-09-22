<template>
  <n-form ref="formRef" :rules="rules" :model="model" autocomplete="off" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Websockets uri" path="uriWS">
      <n-input v-model:value="model.uriWS" />
    </n-form-item>

    <n-form-item label="Mqtt uri" path="uriTCP">
      <n-input v-model:value="model.uriTCP" />
    </n-form-item>

    <n-form-item label="Username" path="username">
      <n-input v-model:value="model.username" :input-props="{ autocomplete: 'off' }" />
    </n-form-item>

    <n-form-item label="Password" path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :input-props="{ autocomplete: 'off' }"
      />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="pending" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">
const { find } = useMqtt()

const mqtt = await find()

const model = ref<Partial<Mqtt>>({
  password: mqtt.value?.password,
  username: mqtt.value?.username,
  uriTCP: mqtt.value?.uriTCP,
  uriWS: mqtt.value?.uriWS
})

const { apiErrors, formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

apiErrors.value = {
  unableToConnect: false
}

rules.value = {
  uriWS: [
    {
      required: true,
      message: "Please enter borker's Websockets URI",
      trigger: 'blur'
    },
    {
      message: 'Unable to connect',
      validator: () => !apiErrors.value.unableToConnect
    },
    {
      validator: (rule, value) => /^wss/.test(value),
      message: 'Should start with wss',
      trigger: 'input'
    }
  ],
  username: [
    {
      required: true,
      message: 'Please enter username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please enter password',
      trigger: 'blur'
    }
  ],
  uriTCP: [
    {
      validator: (rule, value) => value && /^mqtts/.test(value),
      message: 'Should start with mqtts',
      trigger: 'input'
    }
  ]
}

async function handleSubmit () {
  try {
    const { add, update } = useMqtt()
    const { $mqtt } = useNuxtApp()

    await $mqtt.connect({
      password: model.value.password!,
      uri: model.value.uriWS!,
      username: model.value.username!
    })

    if (mqtt.value) {
      await update(model.value)
    } else {
      await add(model.value)
    }
  } catch (error) {
    console.error(error)
    apiErrors.value.unableToConnect = true
  }
}
</script>
