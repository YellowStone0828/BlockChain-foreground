<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mws-panel grid_8">
        <div class="mws-panel-header">
            <span class="mws-i-24 i-list">我要借款</span>
        </div>
        <div class="mws-panel-body">
            <form class="mws-form" method="post"  v-on:submit.prevent>
                <div class="mws-form-inline">
					<div class="mws-form-row">
                        <label>项目名称</label>
                        <div class="mws-form-item small">
                            <input type="text" class="mws-textinput" v-model="loan.name"
                                   required oninvalid="setCustomValidity('请输入项目名称')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <label>借款金额</label>
                        <div class="mws-form-item small">
                            <input type="number" class="mws-textinput" v-model="loan.amount"
                                   required oninvalid="setCustomValidity('请输入借款金额')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
					<div class="mws-form-row">
                        <label>借款利率</label>
                        <div class="mws-form-item small">
                            <input type="number" class="mws-textinput" v-model="loan.rate"
                                   required oninvalid="setCustomValidity('请输入借款利率')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <label>借款天数</label>
                        <div class="mws-form-item small">
                            <input type="number" class="mws-textinput" v-model="loan.days"
                                   required oninvalid="setCustomValidity('请输入借款天数')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <label>借款人</label>
                        <div class="mws-form-item small">
                            <input type="text" class="mws-textinput" v-model="loan.initor"
                                   required oninvalid="setCustomValidity('请输入借款人')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                </div>
                <div class="mws-button-row">
                    <input type="submit" value="确定" class="mws-button green" v-on:click="initLoan" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    var jAlert = require('../thirdParty/jquery.alert'),
            loanService = require('../services/loanService'),
			adminService = require('../services/adminService');
    export default {

        components: {},

        data: function () {
            return {
                loan: {},
            }
        },
        ready: function() {
        },
        methods: {
            initLoan: function() {
                var self = this;
                loanService.initLoan(this.loan, adminService.getCurrentUser())
                        .then(function(response){ jAlert.jAlert("借款成功", "消息提示")});
            },
        }
    }
</script>

<style>
    #changPwdDialog {
        background-color: rgba(0, 0, 0, 0.8);
        color:#FFF;
        width: 300px;
        height: 100%;
        text-align: center;
        border: 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    #changPwdDialog a:visited{
        color:#FFF;
    }
    #changPwdDialog a:link{
        color:#FFF;
    }
    #changPwdDialog::backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }
    #changePwdMsg1{
        color:#fa4500;
    }
</style>
