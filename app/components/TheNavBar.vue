<script setup></script>

<template>
    <v-bottom-navigation :elevation="0" grow>
    
    <NuxtLink to="/">
        <v-btn value="home">
            <v-icon>mdi-home</v-icon>
        </v-btn>
    </NuxtLink>

    <NuxtLink to="/challenge">
        <v-btn value="challenges">
            <v-icon>mdi-trophy</v-icon>
        </v-btn>
    </NuxtLink>

    <NuxtLink to="/postcreate">
        <v-btn value="create">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </NuxtLink>

    <NuxtLink to="/search">
        <v-btn value="search">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </NuxtLink>

    <NuxtLink to="/account">
        <v-btn value="profile">
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </NuxtLink>
    </v-bottom-navigation>
</template>

<style></style>