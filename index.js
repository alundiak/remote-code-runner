function postCode() {
    var button = document.querySelector('.submitCode');

    button.addEventListener('click', function(e) {
        var code = document.querySelector('.codeField');
        var language = document.querySelector('.language');
        var message = document.querySelector('.messages > .ui');

		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var payload = JSON.stringify({
        	preCode: '',
        	language: language.value,
        	code: code.value,
        	afterCode: ''
        });

        var options = {
            method: 'POST',
            // headers: myHeaders,
            // if no headers => text/plain, then using bodyParser doesn't give req.body
            // if 'Content-Type': 'application/json' or 'application/x-www-form-urlencoded' then req.body exists.
            headers: {
            	'Content-Type': 'application/json'
            	// 'Content-Type': 'application/x-www-form-urlencoded' // need for bodyParser correct work - to be able to receive 'request.body'
            },
            // mode: 'cors',
            body: payload
        };

        // console.log(options);

        fetch('/interpret', options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return 'ERROR';
                }
            })
            .then(data => {
                $(message).addClass('message');
                if (data.error){
                	$(message).removeClass('success').text('');
                	$(message).addClass('negative').text(data.error);
                } else {
                	$(message).removeClass('negative').text('');
                	$(message).addClass('success').text(data.result);
                }
                return data;
            });

        // $.post('/api/interpret', payload);
        // by default "Content-Type:application/x-www-form-urlencoded"
        // that is why bodyParser receive body 
    });
}

postCode();
