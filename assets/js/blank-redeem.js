$('#redeem').click(function() {
    var redeem =  $(this);
    redeem.prop('disabled', true);
    setTimeout(function() {
        redeem.prop('disabled', false);
    }, 3000);
});

$(document).ready(function () {

    countries = [["US", "United States"], ["GB", "Great Britain"], ["DE", "Germany"], ["CA", "Canada"], ['AU', 'Australia'],
        ["NZ", "New Zealand"], ['IT', "Italy"], ["MX", "Mexico"], ["BE", "Belgium"], ["FR", "France"], ["ID", "Indonesia"],
        ['SG', "Singapore"], ['BR', 'Brazil'], ['MY', 'Malaysia'], ['PT', 'Portugal'], ['DK', 'Denmark'], ['NL', 'Netherlands'],
        ['ES', 'Spain'], ['SE', 'Sweden'], ['NO', 'Norway'], ['TR', 'Turkey'], ['CR', 'Costa Rica'], ['PA', 'Panama'], ['IS', 'Iceland'],
        ['AR', 'Argentina'], ['AT', 'Austria'], ['CZ', 'Czech Republic'], ['CH', 'Switzerland'], ['FI', 'Finland'], ['IE', 'Ireland'],
        ['TH', 'Thailand'], ['PH', 'Philippines'], ['CL', 'Chile'], ['HK', 'Hong Kong'], ['JP', 'Japan'], ['UY', 'Uruguay'], ['TW', 'Taiwan'], ['PL', 'Poland'],
        ['HU','Hungary'], ['BG', 'Bulgaria'], ['DO', 'Dominican Republic'], ['LU', 'Luxembourg'], ['CO', 'Colombia'], ['EC', 'Ecuador'], ['GR', 'Greece'],
        ['GT', 'Guatemala'], ['LT', 'Lithuania'], ['LV', 'Latvia'], ['MT', 'Malta'], ['PY', 'Paraguay'], ['SK', 'Slovakia'], ['PE', 'Peru'],
        ['SV', 'El Salvador'], ['EE', 'Estonia'], ['AD', 'Andorra'], ['BO', 'Bolivia'], ['IN', 'India'], ['EG', 'Egypt'], ['RO', 'Romania'],
		['AE', 'United Arab Emirates'], ['ZA', 'South Africa'], ['LI', 'Liechtenstein'], ['NI', 'Nicaragua'], ['CY', 'Cyprus'], ['HN', 'Honduras']];

    countryInput = $('#country');
    redeemKeyInput = $('#key');
    redeemButton = $('#redeem');
    redeemResultText = $('#result_text');
    redeemResultAddress = $('#result_address');
    redeemResultLink = $('#result_link');

    stockRequest();

    function redeemRequest(country, key) {
        $(redeemResultText).text('Checking your key, please be patient.');
        $.ajax({
            method: 'GET',
            url: 'https://supgrade.cc/api?method=redeem',
            data: {
                'country': country,
                'key': key
            },
            success: function (response) { // What to do if we succeed
                data = JSON.parse(response);
                window.setTimeout(function(){
                    if (data['status'] == 0) { //show error
                        redeemResultText.text(data['Error']);
                    } else {
                        redeemResultText.html('Country: <code><b>'+country+'</b></code>');
                        redeemResultLink.html('Invite link: <code><a href="'+data['Link']+'" target="_blank">'+data['Link']+'</a></code>');
                        redeemResultAddress.html('Address: <code><b>'+data['Adress']+"</b></code>");
                    }
                }, 1000);
            }
        });
    }

    function stockRequest() {
        $.ajax({
            method: 'GET',
            url: 'https://supgrade.cc/api?method=stock',
            success: function (response) { // What to do if we succeed
                data = JSON.parse(response);

                countries.forEach(function(e) {
                    if (data[e[0]] > 0) {
                        countryInput.append('<option value="' + e[0] + '"> ' + e[1] + ' [stock: ' + data[e[0]] + ']</option>');
                    } else {
                        countryInput.append('<option disabled value="' + e[0] + '"> ' + e[1] + ' [stock: ' + data[e[0]] + ']</option>');
                    }
                });
            }
        });
    }

    redeemButton.click(function (e) {
        redeemRequest(countryInput.val(), redeemKeyInput.val());
    });
});