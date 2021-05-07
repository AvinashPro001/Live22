async function DoLogin() {
 let model = {
        userName: $('#txt_login_username').val(),
        password: $("#txt_login_password").val(),
        grantType: 'User'
    };
    let res = await PostMethod(accountEndPoints.login, model);

    if (res.status !== 200) {
        if (err.status === 400) {
            if (err.responseJSON.message == "Your account is not active." || err.responseJSON.message == "Akaun anda belum aktif." || err.responseJSON.message == "您的帐户无效。") {
                DoLogout();
            }

            if (err.responseJSON.message == "Your access token is expired, please login again." || err.responseJSON.message == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || err.responseJSON.message == "您的访问令牌已过期，请重新登录。") {
                DoLogout();
            }
        }
        if (err.responseJSON !== null && err.responseJSON !== undefined) {
            ShowError(err.responseJSON.message);
            LoaderHide();
        }
    }
}

function DoLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}