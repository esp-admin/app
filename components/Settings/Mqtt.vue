<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    autocomplete="off"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      label="Websockets uri"
      path="uriWS"
    >
      <n-input
        v-model:value="model.uriWS"
        placeholder="wss://example.com:8884/mqtt"
      />
    </n-form-item>

    <n-form-item
      label="Mqtt uri"
      path="uriTCP"
    >
      <n-input
        v-model:value="model.uriTCP"
        placeholder="mqtts://example.com:8883/mqtt"
      />
    </n-form-item>

    <n-form-item
      label="Username"
      path="username"
    >
      <n-input
        v-model:value="model.username"
        :input-props="{ autocomplete: 'off' }"
      />
    </n-form-item>

    <n-form-item
      label="Password"
      path="password"
    >
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :input-props="{ autocomplete: 'off' }"
      />
    </n-form-item>

    <FormButtons
      :loading="pending"
      :disabled="pending || !edited"
      @reset="reset"
    />
  </n-form>
</template>

<script setup lang="ts">
const { find } = useMqtt()

const mqtt = await find()

const model = ref<Partial<Mqtt>>({
  password: mqtt.value?.password,
  username: mqtt.value?.username,
  uriTCP: mqtt.value?.uriTCP,
  uriWS: mqtt.value?.uriWS,
})

const { formRef, onSubmit, pending, rules, edited, reset }
  = useNaiveForm(model)

rules.value = {
  uriWS: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      validator: (_, value) => REGEX_URL_WSS.test(value),
      message: ERROR_INVALID_URL,
      trigger: 'input',
    },
    {
      type: 'url',
      message: ERROR_INVALID_URL,
    },
  ],
  username: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
  ],
  password: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
  ],
  uriTCP: [
    {
      validator: (_, value) => (value ? REGEX_URL_MQTTS.test(value) : true),
      message: ERROR_INVALID_URL,
      trigger: 'input',
    },
    {
      type: 'url',
      message: ERROR_INVALID_URL,
    },
  ],
}

async function handleSubmit() {
  const { add, update } = useMqtt()

  if (mqtt.value) {
    await update(model.value)
  }
  else {
    await add(model.value)
  }

  const { $mqtt } = useNuxtApp()

  $mqtt
    .connect({
      password: model.value.password!,
      uri: model.value.uriWS!,
      username: model.value.username!,
    })
    .catch(() => {})
}
</script>
