<template>
    <!-- main view -->
    <div>
        <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in">
        </router-view>
    </div>
</template>

<script>
    var constants = require('../constants.js'),
            router = require('vue-router'),
            adminService = require('../services/adminService');
    export default {
        data: function () {
            return {}
        },

        beforeCreate: function () {
            $.ajax({
                url: 'urlConfig.json',
                dataType: 'json',
                type: 'GET',
                success: function (response) {
                    global.urlConfig = response
                },
                error: function (error) {
                    console.error(error);
                }
            });
            
        }
    }
</script>

<style>

</style>
