<template>
  <div>
    <UploadImage
      ref="uploadRef"
      class="mb-2 mx-auto shadow hover:shadow-lg border-blue-300 border-2"
      :src="model.picture"
      :width="160"
      @select="(f)=> model.file=f"
    />

    <n-form ref="formRef" @submit.prevent="onSubmit(updateAccount)">
      <n-form-item label="Name">
        <n-input v-model:value="model.name" />
      </n-form-item>

      <FormButtons :loading="pending" :disabled="pending || !edited" @reset="handleReset" />
    </n-form>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthSession()
const { upload } = useS3Object()
const { fetchUser } = useAuth()

const uploadRef = ref()

const model = ref({
  name: user.value?.name,
  picture: user.value?.picture,
  file: undefined
})

const { edited, formRef, pending, onSubmit, reset } = useNaiveForm(model)

function handleReset () {
  uploadRef.value.reset()
  reset()
}

async function updateAccount () {
  if (model.value.file) {
    const url = await upload(model.value.file, {
      url: model.value.picture,
      prefix: `image/${user.value!.id}/`
    })

    model.value.picture = url
  }

  await useAuthFetch('/api/account/profile', {
    method: 'PATCH',
    body: {
      name: model.value.name,
      picture: model.value.picture
    }
  })

  model.value.file = undefined

  await fetchUser()
}
</script>
