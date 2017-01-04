var jqxhr = $.ajax({
    url: url,
    type: "GET",
    cache: true,
    data: {},
    dataType: "json",
    statusCode: {
        404: handler404,
        500: handler500
    }
});
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);
