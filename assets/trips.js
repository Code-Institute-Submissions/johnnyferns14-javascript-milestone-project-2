
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

function getCarrier(carrierName) {
    let carrName = "";
    carrierName.forEach(function (carrier) {
        
        console.log(carrier);
        const id = carrier.CarrierId;
        const name = carrier.Name;
        carrName  += `<p>${id}${name}</p>`;

    });
    $("#flight-results").empty().append(carrName);
};

function displayInfo(quotes) {
    let flights = "";
    quotes.forEach(function (quote) {
        
        console.log(quote);
        console.log(quote.QuoteId);
        const price = quote.MinPrice;
        const originId = quote.OutboundLeg.OriginId;
        const destId = quote.OutboundLeg.DestinationId;
        flights += `<p>${price} ${originId} ${destId}</p>`;

    });
    // $("#flight-results").empty().append(flights);
};

async function getFlightData(fetchId) {
    const res = await fetch(fetchId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "dd9b94074fmshac9241d7bf4be30p1d7aa0jsnea369d8adbc2",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    });
    const data = await res.json();
    console.log(data);
    const quotes = data.Quotes;
    const carrierName = data.Carriers;
    
    getCarrier(carrierName);
    displayInfo(quotes);
    

    




};