<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item label="Version" path="version">
      <n-input v-model:value="model.version" />
    </n-form-item>

    <n-form-item path="file" label="Firmware">
      <n-upload :custom-request="(e) => {model.file = e.file.file}" accept=".bin">
        <n-upload-dragger>
          <div>
            <naive-icon name="ph:upload" :size="28" />
          </div>

          <n-text class="text-sm" :depth="2">
            Click or drag a firmware.bin to this area to upload
          </n-text>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>

    <div class="flex gap-4">
      <n-button
        secondary
        class="flex-1"
        attr-type="button"
        :disabled="pending"
        @click="$emit('cancel')"
      >
        Cancel
      </n-button>
      <n-button
        type="primary"
        class="flex-1"
        attr-type="submit"
        :loading="pending"
        :disabled="pending"
      >
        Create release
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const emits = defineEmits(['cancel', 'done'])

const model = ref({
  version: '',
  downloadPath: '',
  file: null as File |null
})

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm(model)

apiErrors.value = {
  versionAlreadyExists: false,
  uploadFailed: false
}

rules.value = {
  version: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    },
    {
      message: ERROR_EXISTS,
      validator: () => !apiErrors.value.versionAlreadyExists
    },
    {
      validator: (_, value) => REGEX_VERSION.test(value),
      message: ERROR_INVALID_VERSION,
      trigger: 'input'
    }
  ],
  file: [
    {
      required: true,
      message: ERROR_REQUIRED
    },
    {
      message: ERROR_UPLOAD_FAILED,
      validator: () => !apiErrors.value.uploadFailed
    }
  ]
}

async function handleSubmit () {
  const { upload } = useS3Object()

  try {
    model.value.downloadPath = await upload(model.value.file!, {
      prefix: 'binaries/'
    })
  } catch (e) {
    apiErrors.value.uploadFailed = true
    return
  }

  const { add } = useRelease(props.project.id)

  try {
    const release = await add({
      downloadPath: model.value.downloadPath,
      version: model.value.version
    })

    const { find } = useDevice()

    const devices = await find()

    const linkedDevices = devices.value?.filter(device => device.projectId === props.project.id) || []

    const { $mqtt } = useNuxtApp()

    for (const device of linkedDevices) {
      $mqtt.publish({
        deviceId: device.id,
        action: 'command',
        type: 'update',
        retain: true,
        payload: JSON.stringify({
          releaseId: release.id,
          version: release.version,
          downloadPath: release.downloadPath
        })
      })
    }

    emits('done', release)
  } catch (error:any) {
    apiErrors.value.versionAlreadyExists = error.data.message.includes('Unique constraint failed')
  }
}
</script>
