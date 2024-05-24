<template>
    <!-- <div class="post-author flex justify-between items-center">
        <div class="ml-4 flex">
            <div class="picture bg-primary w-12 h-12 object-cover rounded-full flex items-center justify-center" >
                <img :src="post.user.image ? post.user.image : 'https://picsum.photos/id/237/200/300'" :alt="post.title" class="h-12 w-full object-cover"> 
            </div>
            <div class="px-4">
                <p class="mb12">{{ post.user.username || 'Unknown' }}</p>
                <p class="bg-secondaryContainer text-xs text-onSecondaryFixedVariant py-2 px-3 rounded-full">{{ post.user.badge || 'No Badge' }}</p> 
            </div> 
        </div>
        <p class="text-outline">{{ post.created_at || 'Unknown Date' }} | {{ post.location || 'Unknown Location' }}</p>
        <span class="material-icons text-outline">more_vert</span>
    </div> -->
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        post: Object
    });
</script>