<template>
    <div>
        <n-h2>Projects</n-h2>

        <div class="grid md:grid-cols-3 gap-6">
            <div class="col-span-full flex gap-4">
                <n-input>
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary">
                    Create project
                </n-button>
            </div>

            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
        </div>
    </div>
</template>