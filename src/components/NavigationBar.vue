<template>
    <b-navbar toggleable="md" type="dark" class="navbar_design" style="position: fixed;">
        <h5 class="text-white">Customer CI Reports</h5>
    </b-navbar>
</template>

<script>
import { NavbarPlugin } from 'bootstrap-vue';
import Vue from 'vue';
Vue.use(NavbarPlugin);

export default {
    name: "NavigationBar"
}
</script>

<style>
.navbar_design{
    background-color: rgb(47, 43, 43);
    border-bottom: 1px solid #000;
    position: fixed;
    z-index: 0100;
    box-shadow: 0px 0px 8px 0px #000000;
}
</style>