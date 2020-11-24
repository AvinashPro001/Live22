
function ShowError(message) {
    //SetToastr(message, 'error');
    document.getElementById("ErrorMessage").innerHTML = message;
    var x = document.getElementById("error_snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1800);
}

function ShowWarning(message) {
    SetToastr(message, 'warning');
}

function ShowInfo(message) {
    SetToastr(message, 'info');
}

function ShowSuccess(message) {
    //SetToastr(message, 'success');
    document.getElementById("SuccessMessage").innerHTML = message;
    var x = document.getElementById("success_snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1800);
}

function SetToastr(message, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-center-center ",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    if (type === 'warning')
        toastr.warning(message, 'Warning!');
    if (type === 'error')
        toastr.error(message, 'Error!');
    if (type === 'info')
        toastr.info(message, 'Information!');
    if (type === 'success')
        toastr.success(message, 'Success!');
}