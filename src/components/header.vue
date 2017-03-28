<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="mws-header" class="clearfix">
        <div id="mws-logo-container">
            <div id="mws-logo-wrap">
                <img src="../../resources/images/xiaobaiju-logo.png" alt="Hiperledger Demo"/>Hiperledger Demo
            </div>
        </div>
        <div id="mws-user-tools" class="clearfix">
            <div id="mws-user-info" class="mws-inset">
                <div id="mws-user-photo">
                    <img src="../../resources/images/example/profile.jpg" alt="User Photo"/>
                </div>
                <div id="mws-user-functions">
                    <div id="mws-username" style="color: #F5DEB3">
                        你好：{{username}}
                    </div>
                    <ul>
                        <li><a href="#" v-on:click.prevent="logout">退出登录</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var constants = require('../constants'),
            adminService = require('../services/adminService'),
            $ = require('jquery'),
            jAlert = require('../thirdParty/jquery.alert');

    export default {
        name: 'header',
        data: function () {
            return {
                username: null,
                newPwd: null,
                confirmPwd: null,
                changePwdMsg: '',
            }
        },

        ready: function () {
            this.changePwdMsg = '';
            this.username = adminService.getCurrentUser().realName;
            $('#d').dialog({
                autoOpen: false,
                modal: true
            });
        },

        methods: {
            openPwd: function () {
                $('#d').dialog('open');
            },
            closePwd: function () {
                $('#d').dialog('close');
            },
            logout: function () {
                var self = this;
                jAlert.jConfirm('确定要退出登录么？', '退出登录', function(result) {
                    if (result) {
                        adminService.logout();
                        self.$router.go('/login');
                    }
                });
            },
            changePwd: function () {
                var self = this;
                if (_.isEmpty(this.newPwd) || _.isEmpty(this.confirmPwd)) {
                    this.changePwdMsg = '请输入新密码和确认密码';
                    return;
                }
                if (this.newPwd !== this.confirmPwd) {
                    this.changePwdMsg = '两次密码不一致！请重新输入';
                    return;
                }
                var admin = adminService.getCurrentUser(),
                        adminId = admin._id;
                adminService.changePassword(adminId, this.newPwd).then(
                        function (data) {
                            self.closePwd();
                            jAlert.jAlert('密码已修改，请重新登录', '消息提示', function() {
                                adminService.logout();
                                self.$router.go('/login');
                            });
                        }
                )
            }
        }
    }
</script>

<style>
    #d {
        background-color: rgba(0, 0, 0, 0.8);
        color:#FFF;
        width: 300px;
        height: 100%;
        text-align: center;
        border: 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    #d a:visited{
        color:#FFF;
    }
    #d a:link{
        color:#FFF;
    }
    #d::backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }
    #changePwdMsg{
        color:#fa4500;
    }

</style>