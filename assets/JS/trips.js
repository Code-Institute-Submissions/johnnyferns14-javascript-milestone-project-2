// This function gets all contents 
// ready on the page before running 
// the below scripts
$(document).ready(function () {
    // EVENT ON-CLICK
    // this is a jquery function. Button clicked will give the result on the webpage
	$("#confirm").click(function () {
		$(this).html("Search");
		let originplace = $("#origin").val();
		let destinationplace = $("#destination").val();
		let outboundpartialdate = $("#date-dep").val();
		let currency = $("#currency").val();

		let fetchId = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}`;


		getFlightData(fetchId);
		
	});
});

// this function displays
// info into the HTML page
function displayInfo(carrierName, quotes, places) {
	let carrName = "";
	carrierName.forEach(function (carrier) {
        //DISPLAY THE RESULT OF EACH ITEM IN THE CARRIERID ARRAY
		// console.log(carrier);
		const CarrierId = carrier.CarrierId;
        const name = carrier.Name;
        const quote = quotes.find(quote => quote.OutboundLeg.CarrierIds.includes(CarrierId))
        const destplace = places.find(item => item.PlaceId === quote.OutboundLeg.DestinationId)
        const origplace = places.find(item1 =>item1.PlaceId === quote.OutboundLeg.OriginId)
         
        
        console.log(destplace.CityName);
        console.log(destplace.PlaceId);
        console.log(origplace.CityName);
        console.log(origplace.PlaceId);
       // console.log(quote.OutboundLeg.DestinationId);
        //console.log(quote.OutboundLeg.OriginId);

        
    
		carrName += `
        
         <div class="container">
                <div class="row row-border">
                    <div class="col-lg-6 fl-wrap">
                            <div class="place-info fl-wrap">
                                <div><p>${origplace.CityName} (${origplace.IataCode})</p></div>
                                <div><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                                <div><p>${destplace.CityName} (${destplace.IataCode})</p>
                            </div>

                                <div>
                                <p>${quote.OutboundLeg.DepartureDate}</p>
                                </div>
          
                            <div class="col-lg-3">${name}</div>
                            <div class="col-lg-3">${quote.MinPrice}</div>
                    </div>
                </div>
            </div>`


        

	});
	$("#flight-results").empty().append(carrName);
};


//  FETCH REST API
// fetches JSON data from the api

async function getFlightData(fetchId) {
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
	console.log([quotes, carrierNames, places])


	displayInfo(carrierNames, quotes, places);


};