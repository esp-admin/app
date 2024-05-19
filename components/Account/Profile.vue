<template>
  <div>
    <UploadImage
      ref="uploadRef"
      class="mb-2 mx-auto shadow hover:shadow-lg border-blue-300 border-2"
      :src="model.picture"
      :width="160"
      @select="(f) => model.file=f"
    />

    <n-form
      ref="formRef"
      :rules="rules"
      :model="model"
      @submit.prevent="onSubmit(updateAccount)"
    >
      <n-form-item
        label="Name"
        path="name"
      >
        <n-input v-model:value="model.name" />
      </n-form-item>

      <FormButtons
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
  uploadFailed: false,
}

rules.value = {
  name: [
    {
      required: true,
      message: ERROR_REQUIRED,
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
  try {
    const { upload } = useUpload()

    if (model.value.file) {
      model.value.picture = await upload(model.value.file, model.value.picture)
    }
  }
  catch (e) {
    apiErrors.value.uploadFailed = true
    return
  }

  const { $auth } = useNuxtApp()

  await $auth.fetch('/api/account/profile', {
    method: 'PATCH',
    body: {
      name: model.value.name,
      picture: model.value.picture,
    },
  })

  const { fetchUser } = useAuth()

  await fetchUser()

  model.value.file = null
}
</script>
