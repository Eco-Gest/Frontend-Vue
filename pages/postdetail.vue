<template>
        <div class="bg-background flex flex-col items-center justify-center h-screen">
            <div class="border border-outlineVariant p-4 rounded  max-w-lg ">
                <SinglePost/>
            </div>
        </div>
</template>


<script lang="ts" setup>
    definePageMeta({
    name: 'Détail de la publication',
    })

    import SinglePost from '~/components/post/SinglePost.vue';
</script>