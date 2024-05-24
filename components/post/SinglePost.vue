<template>
    <PostContentAuthor :post="post"/>
    <PostContentInfos :post="post"/>
    <PostContentButtons/>
</template>

<script lang="ts" setup>
        import { computed } from 'vue';
        import { usePostStore } from '~/store/post';
        import { defineProps } from 'vue';

        const props = defineProps({
            id: Number
        });

        const postStore = usePostStore();
        let post = computed(async() => {
            let post = postStore.getPostById(1);
            if (!post) {
                console.log('in if statement');
                await postStore.fetchPost(1);
                post = postStore.currentPost;
            }
            console.log(post);
            console.log('user'+post.user);
            return post;
            });

        // onMounted(() => {
        //     if (!post.value) {
        //         postStore.fetchPost(1);
        //         return post = postStore.currentPost;
        //     }
        //     });
        
  </script>