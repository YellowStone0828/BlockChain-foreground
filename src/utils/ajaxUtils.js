/**
 * Created by hepf3 on 3/12/2017.
 */

var constants = require('../constants');

module.exports = {
    call: function (setting) {
        if (!setting.dataType) setting.dataType = 'json';
        return new Promise((resolve, reject) => {
            $.ajax(setting).then(response => {
                if (response.error && response.error.code === -32000) {
                    localStorage.removeItem(constants.SESSION_KEY);
                }
                resolve(response);
            }, error => {reject(error)});
        });
    }
};