<template>
    <div class="menu-item">
        <div class="category">
            {{ item.title }}
        </div>
        <div v-for="child in item.children"
             v-bind:key="child.id"
             class="menu-link"
             v-bind:class="{ 'active': currentId === child.id }">
            <router-link v-on:click.native="onMenuItemClick"
                         v-bind:to="'/?ids=' + child.id + '&lang=' + lang">
                {{ child.title }}
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['item', 'lang', 'onMenuItemClick', 'currentId']
    };
</script>
