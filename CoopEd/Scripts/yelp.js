function yelpByPhone(phone, businessName, premiseAddress) {
    $.ajax({
        'url': 'http://api.yelp.com/phone_search?phone=' + phone + '&ywsid=_riSq49PX3fFGhyCDVcjHA',
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function (data, textStats, XMLHttpRequest) {
            console.log(data);
            console.log('http://api.yelp.com/phone_search?phone=' + phone + '&ywsid=_riSq49PX3fFGhyCDVcjHA');
            if (data.businesses[0]) {
                business = data.businesses[0];
                
                (business.isclaimed) ? $("#lblClaimed").html("Yes") : $("#lblClaimed").html("No");
                $("#imgRating").attr("src", business.rating_img_url);
                $("#lblReviewCount").html(business.review_count);

                if (business.reviews) {
                    var i = 0;
                    while (i < business.reviews.length) {
                       
                        var thisReview = business.reviews[i];
                        var str = "<tr><td><img src='" + thisReview.rating_img_url + "'/><span> " + thisReview.date +"</span></td></tr>";
                        str += "<tr><td><a href='" + thisReview.url + "' target='_blank'><p class='yelpReview'>" + thisReview.text_excerpt + "</p></a></td></tr>";
                        $('#reviewBody').append(str);
                        ++i;
                    }

                } else {
                    var str = "<tr><td><p class='yelpReview'>There are no Yelp reviews for this tenant.</p></td></tr>";
                    $('#reviewBody').append(str);
                }

            } else {
                console.log(businessName);
                console.log(premiseAddress);
                yelpSearch(businessName, premiseAddress);
            }

        }
    });
}

function yelpSearch(businessName, premiseAddress) {

    console.log(premiseAddress);

    var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey: "EdejCgTnZgwHbPfn1i-DbQ",
        consumerSecret: "ivXrJZyPKe6A2d443VcdMpzjls0",
        accessToken: "YYlOSxoCP4-fc5Fzji8yLKFW1Msaj4fh",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret: "ycjimvdicBZTe_9ilImEHHUPOfE",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    //for bldgid=680mleasid=000587, i am unable to find this tenant with any permutation of the address. i can, however, find it by using just the zip code.

    var terms = businessName;
    var near = premiseAddress;

    

    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]); 
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function (data, textStats, XMLHttpRequest) {
            if (data.businesses[0]) {
                business = data.businesses[0];
                console.log(business);
                (business.isclaimed) ? $("#lblClaimed").html("Yes") : $("#lblClaimed").html("No");
                $("#imgRating").attr("src", business.rating_img_url);
                $("#lblReviewCount").html(business.review_count);
                getBusiness(business.id);
            } else {
                $('#divYelp').html('This tenant was not found on Yelp.');
            }
        }
    });
}

function getBusiness(yelpID) {
    var auth = {
        //
        // Update with your auth tokens
        //
        consumerKey: "EdejCgTnZgwHbPfn1i-DbQ",
        consumerSecret: "ivXrJZyPKe6A2d443VcdMpzjls0",
        accessToken: "YYlOSxoCP4-fc5Fzji8yLKFW1Msaj4fh",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret: "ycjimvdicBZTe_9ilImEHHUPOfE",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action': 'http://api.yelp.com/v2/business/' + yelpID,
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function (data, textStats, XMLHttpRequest) {        
          
            if (data.reviews) {
                var i = 0;
                while (i < data.reviews.length) {
                    var thisReview = data.reviews[i];
                    var str = "<tr><td><img src='" + thisReview.rating_image_url + "'/></td></tr>";
                    str += "<tr><td><p class='yelpReview'>" + thisReview.excerpt + "</p></td></tr>";
                    $("#reviewBody").append(str);
                    ++i;
                }

                var more = "<tr><td><a href='" + data.url + "' target='_blank'>See more...</a></td></tr>";
                $("#reviewBody").append(more);

            } else {
                var str = "<tr><td><p class='yelpReview'>There are no Yelp reviews for this tenant.</p></td></tr>";
                $("#reviewBody").append(str);
            }
        }
    });
}