//#region Onload
$(document).ready(function () {
        if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
});
//#endregion