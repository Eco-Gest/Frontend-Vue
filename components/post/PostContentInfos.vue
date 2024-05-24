<template>
    <div class=" mt-4 mb-2 border-t border-outlineVariant">
        <!-- <img :src="post.image ? post.image : 'https://picsum.photos/id/237/200/300'" :alt="post.title" class="h-72 w-full object-cover"> -->
        <div class="flex w-full items-center justify-between py-2 text-onSecondaryFixedVariant">
            <p><span class="font-bold">{{ post.points }}</span> points</p>
            <p class="flex items-center"><span class="material-icons mr-1">interests</span>{{ post.category }}</p>
            <p class="bg-secondaryContainer text-xs text-onSecondaryFixedVariant p-2 px-3 rounded-full">{{ post.type }}</p>
        </div>
        <div class="pt-2 border-t border-outlineVariant text-onSecondaryFixedVariant">
            <h1 class="text-xl font-bold">{{ post.title }}</h1>
            <p class="mt-1">{{ post.description }}</p>
            <p class="text-xs mt-1">{{ post.tags }}</p>
            <p class="mt-4">{{ post.likes || 0 }} likes, {{ post.comments || 0 }} commentaires</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    const props = defineProps({
    post: Object
    });
</script>