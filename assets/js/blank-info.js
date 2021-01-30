$(document).ready(function () {

    keyInputLookup = $('#lookup_key');
    redeemButtonInfo = $('#lookup');
    resultTextInfo = $('#result_text_info');
    resultAddressInfo = $('#result_address_info');
    resultLinkInfo = $('#result_link_info');

    function infoRequest(keyInput) {
        $.ajax({
            method: 'GET',
            url: 'https://supgrade.cc/api?method=lookup',
            data: {
                'key': keyInput
            },
            success: function (response) { // What to do if we succeed
                data = JSON.parse(response);
                dataMessage = data['message'][0];
                if (data['status'] == 0) { //show error
                    resultTextInfo.text(data['message']);
                } else {
                    resultTextInfo.html('Country: <code><b>'+dataMessage['country']+'</b></code>');
                    resultLinkInfo.html('Invite link: <code><a href="'+dataMessage['link']+'" target="_blank">'+dataMessage['link']+'</a></code>');
                    resultAddressInfo.html('Address: <code><b>'+dataMessage['address']+"</b></code>");
                }
            }
        });
    }

    redeemButtonInfo.click(function (e) {
        infoRequest(keyInputLookup.val());
    });
});