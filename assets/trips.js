
$(document).ready(function () {

    $("#confirm").click(function () {
        $(this).html("Search");
        let originplace = $("#origin").val();
        let destinationplace = $("#destination").val();
        let outboundpartialdate = $("#date-dep").val();
        let currency = $("#currency").val();

        let fetchId = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}`;

        console.log(fetchId);



        getFlightData(fetchId);
    });
});

function displayInfo(quotes) {
    let flights = "";
    quotes.forEach(function (quote) {
        // quote.forEach(function(info){
        console.log(quote);
        console.log(quote.QuoteId);
        const price = quote.MinPrice;
        const originId = quote.OutboundLeg.OriginId;
        //console.log(originId, price);
        // });
        flights += `<p>${price}</p>`

    });
    $("#flight-results").empty().append(flights);
}

async function getFlightData(fetchId) {
    const res = await fetch(fetchId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "dd9b94074fmshac9241d7bf4be30p1d7aa0jsnea369d8adbc2",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    });
    const data = await res.json();
    const quotes = data.Quotes;

    displayInfo(quotes);

    




};