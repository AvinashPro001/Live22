var SMSbaseUrl = 'http://cloudsms.trio-mobile.com/index.php/api/bulk_mt?';

var SMSConstsPerameterValue = {
    action: 'send',
    api_key: 'NUC13010100006272b6dac990a5a38519c724051e6d82d30e',
    sender_id: 'CLOUDSMS',
    content_type: '1',
    mode: 'shortcode',
    campaign: 'Test'
};

var SMSConstsPerameter = {
    action: 'action=send',
    api_key: 'api_key=NUC13010100006272b6dac990a5a38519c724051e6d82d30e',
    sender_id: 'sender_id=CLOUDSMS',
    content_type: 'content_type=1',
    mode: 'mode=shortcode',
    campaign: 'campaign=Webet333'
};

var SMSMessage = 'Test';

//function SendSMS(phonenumber, message) {
//    return SMSbaseUrl + SMSConstsPerameter.api_key + '&' + SMSConstsPerameter.action + '&' + SMSConstsPerameter.sender_id + '&' + SMSConstsPerameter.content_type + '&' + SMSConstsPerameter.mode + '&' + 'to=' + phonenumber + '&' + 'msg=' + message;
//}