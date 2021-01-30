$('#replaceButton').click(function() {
    var redeem =  $(this);
    redeem.prop('disabled', true);
    setTimeout(function() {
        redeem.prop('disabled', false);
    }, 3000);
});

$(document).ready(function () {

    replaceButton = $('#replaceButton');
    keyInput = $('#replacekey');
    redeemButton = $('#redeem_replace');
    resultText = $('#result_text_replace');
    resultAddress = $('#result_address_replace');
    resultLink = $('#result_link_replace');


    function replaceRequest(key) {
        $(resultText).text('Checking your key, please be patient.');
        $.ajax({
            method: 'GET',
            url: 'https://supgrade.cc/api?method=replace',
            data: {
                'key': key
            },
            success: function (response) { // What to do if we succeed
                data = JSON.parse(response);
                window.setTimeout(function(){
                    if (data['status'] == 0) { //show error
                        resultText.text(data['message']);
                    } else {
                        resultText.html('Country: <code><b>'+data['country']+'</b></code>');
                        resultLink.html('Invite link: <code><a href="'+data['Link']+'" target="_blank">'+data['Link']+'</a></code>');
                        resultAddress.html('Address: <code><b>'+data['Adress']+"</b></code>");
                    }
                }, 1000);
            }
        });
    }

    replaceButton.click(function (e) {
        replaceRequest(keyInput.val());
    });
});