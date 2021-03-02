// This function gets all contents 
// ready on the page before running 
// the below scripts
$(document).ready(function () {
    // EVENT ON-CLICK
    // this is a jquery function. Button clicked will give the result on the webpage
    $("#confirm").click(function () {
        if(!$("#error-message").hasClass("display-none")) $("#error-message").addClass("display-none")
        let originplace = $("#origin").val().trim();
        let destinationplace = $("#destination").val().trim();
        let outboundpartialdate = $("#date-dep").val().trim();
        let currency = $("#currency").val().trim();

        let fetchId = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}`;

        if(!originplace || !destinationplace || !outboundpartialdate || !currency){
            $("#error-message").removeClass("display-none")
            return;
        }
        getFlightData(fetchId);

    });
});

// this function displays
// info into the HTML page
function displayInfo(carrierName, quotes, places) {
    let carrName = "";
    carrierName.forEach(function (carrier) {
        //DISPLAY THE RESULT OF EACH ITEM IN THE CARRIERID ARRAY
        const CarrierId = carrier.CarrierId;
        const name = carrier.Name;
        const quote = quotes.find(quote => quote.OutboundLeg.CarrierIds.includes(CarrierId))
        const destplace = places.find(item => item.PlaceId === quote.OutboundLeg.DestinationId)
        const origplace = places.find(item1 => item1.PlaceId === quote.OutboundLeg.OriginId)
        const depDate = quote.OutboundLeg.DepartureDate.slice(0, 10)



        carrName += `

         <div class="container cust-cont">
                <div class="row row-border bg-color">
                    <div class="col-md-3 fl-wrap"><h4>Flight Route</h4></div>
                    <div class="col-md-3 fl-wrap"><h4>Flight Name</h4></div>
                    <div class ="col-md-3 fl-wrap"><h4>Date of Travel</h4></h3></div>
                    <div class="col-md-3 fl-wrap"><h4>Price</h4></div>
                </div>
                <div class="row row-border">
                    <div class="col-md-3 fl-wrap">
                        <div><p>${origplace.CityName} (${origplace.IataCode})</p></div>
                        <div class ="icon-margin"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                        <div><p>${destplace.CityName} (${destplace.IataCode})</p></div>
                    </div>
                    <div class="col-md-3 fl-wrap">${name}</div>
                    <div class ="col-md-3 fl-wrap"<p>${depDate}</p></div>
                    <div class="col-md-3 fl-wrap">${quote.MinPrice}</div>                   
                </div>
            </div>`




    });
    $("#flight-results").empty().append(carrName);
};


//  FETCH REST API
// fetches JSON data from the api

async function getFlightData(fetchId) {
    try{
    const res = await fetch(fetchId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "dd9b94074fmshac9241d7bf4be30p1d7aa0jsnea369d8adbc2",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    });
    // GET JSON DATA
    const data = await res.json();
    const quotes = data.Quotes;
    const carrierNames = data.Carriers;
    const places = data.Places;

    displayInfo(carrierNames, quotes, places);
    } catch(error){
        console.log(error);
    }

};