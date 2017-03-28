/**
 * Created by hepf3 on 3/12/2017.
 */
var constants = require('../constants');
var ajaxUtils = require('../utils/ajaxUtils');
var postDataSchema = require('../config/postDataSchema');
var adminService = require('./adminService');

module.exports = {
    initLoan: function (loan, adminUser) {
        let data = postDataSchema,
            urlConfig = global.urlConfig,
            currentUser = adminService.getCurrentUser();
        Object.assign(data, {
            method: "deploy",
            params: {
                type: 1,
                chaincodeID: {
                    path: urlConfig.chain_code_id_path
                },
                ctorMsg: {
                    function: "init"
                },
                secureContext: currentUser.enrollId
            }
        });
        data.params.ctorMsg.args = [adminUser.enrollId, loan.rate, loan.days, loan.amount ,loan.initor];
        return ajaxUtils.call({
            url: urlConfig.server_url + '-' + urlConfig.block_chain + '/' + urlConfig.chain_code,
            data: JSON.stringify(data),
            type: 'POST'}).then(response => {
            if (response.result.status === 'OK') {
                this.saveLoan(loan.initor, response.result.message, loan.amount, currentUser.enrollId);
                return response;
            }
        });
    },

    saveLoan: function (initor, chainCode, amount, admin){
        let loanInfoJson = localStorage.getItem(constants.LOAN_LIST), loanInfo;
        if (loanInfoJson) {
            loanInfo = JSON.parse(loanInfoJson);
            loanInfo.push({initor, chainCode, admin});
        } else {
            loanInfo = [{initor, chainCode, admin}];
        }
        localStorage.setItem(constants.LOAN_LIST, JSON.stringify(loanInfo));
    },
	
	getLoanListByAdmin: function(adminId) {
		let loanInfoJson = localStorage.getItem(constants.LOAN_LIST);
		if (!loanInfoJson) return [];
		let allLoanList = JSON.parse(loanInfoJson);
		let loanList = allLoanList.filter(loan => loan.admin === adminId);
		return loanList;
	}
};