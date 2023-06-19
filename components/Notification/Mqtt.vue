<template>
    <div>
    </div>
</template>

<script setup>
const { connected } = useMqtt()
const { useUser } = useAuthSession();
const user = useUser();

const notification = useNotification()

watch(connected, (value) => {
    if (!user.value) {
        return
    }
    else if (value) {
        notification.destroyAll()

        notification.success({
            title: "Mqtt connected",
            duration: 5000,
            closable: false
        })
    }
    else {
        notification.destroyAll()

        notification.error({
            title: "Mqtt disconnected",
            duration: 5000,
            closable: false
        })
    }
}, { immediate: true })
</script>