<template>
  <div>
    <n-form
      ref="formRef"
      :rules="rules"
      :model="model"
      @submit.prevent="onSubmit(updateAccount)"
    >
      <n-form-item path="file">
        <upload-image
          ref="uploadRef"
          class="mb-2 mx-auto shadow hover:shadow-lg border-blue-300 border-2"
          :src="model.picture"
          :width="160"
          @select="(f) => model.file=f"
        />
      </n-form-item>

      <n-form-item
        label="Name"
        path="name"
      >
        <n-input v-model:value="model.name" />
      </n-form-item>

      <form-buttons
        :loading="pending"
        :disabled="pending || !edited"
        @reset="handleReset"
      />
    </n-form>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthSession()

const uploadRef = ref()

const model = ref({
  name: user.value?.name,
  picture: user.value?.picture,
  file: null,
})

const { edited, formRef, pending, onSubmit, reset, rules, apiErrors } = useNaiveForm(model)

apiErrors.value = {
  invalidSize: false,
  uploadFailed: false,
}

rules.value = {
  name: [
    {
      required: true,
      message: ERROR_REQUIRED,
    },
  ],
  file: [
    {
      message: ERROR_UPLOAD_SIZE,
      validator: () => !apiErrors.value.invalidSize,
    },
    {
      message: ERROR_UPLOAD_FAILED,
      validator: () => !apiErrors.value.uploadFailed,
    },
  ],
}

function handleReset() {
  uploadRef.value.reset()
  reset()
}

async function updateAccount() {
  const formData = new FormData()

  formData.append('data', JSON.stringify({
    name: model.value.name,
    picture: model.value.picture,
  }))

  model.value.file && formData.append('file', model.value.file)

  await useNuxtApp().$auth.fetch('/api/account/profile', {
    method: 'PATCH',
    body: formData,
  })
    .then(async () => {
      await useAuth().fetchUser()
      model.value.picture = user.value?.picture
      model.value.file = null
    })
    .catch((err) => {
      apiErrors.value.invalidSize = err.data.message === 'invalid-size'
      apiErrors.value.uploadFailed = err.data.message === 'upload-failed'
    })
}
</script>
