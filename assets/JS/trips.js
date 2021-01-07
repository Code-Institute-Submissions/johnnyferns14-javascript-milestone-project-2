
$(document).ready(function () {
	// EVENT ON-CLICK
	$("#confirm").click(function () {
		$(this).html("Search");
		let originplace = $("#origin").val();
		let destinationplace = $("#destination").val();
		let outboundpartialdate = $("#date-dep").val();
		let currency = $("#currency").val();

		let fetchId = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}`;

		let fetchId1 = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${originplace}`;

		getFlightData(fetchId);
		
	});
});


function displayInfo(carrierName, quotes, places) {
	let carrName = "";
	carrierName.forEach(function (carrier) {
        //DISPLAY THE RESULT OF EACH ITEM IN THE CARRIERID ARRAY
		// console.log(carrier);
		const CarrierId = carrier.CarrierId;
        const name = carrier.Name;
        const quote = quotes.find(quote => quote.OutboundLeg.CarrierIds.includes(CarrierId))
        const place = places.find(item => item.PlaceId === quote.OutboundLeg.DestinationId)
        
        console.log(place.CityName);
        console.log(place.PlaceId)
        console.log(quote.OutboundLeg.DestinationId);
        console.log(quote.OutboundLeg.OriginId);

        
    
		carrName += `
        
         <div class="card col-md-8 col-sm-12";">
                <div class="card-body">
                    <div class="result-wrapper">
                            <div class="place-info">
                                <p>LHR</p><i class="fa fa-arrow-right" aria-hidden="true"></i><p>${place.CityName}${place.IataCode}</p>
                                <p>${quote.OutboundLeg.DepartureDate}</p>
                            </div>
          
                            <div class="flight-info">${name}</div>
                            <div class="flight-price">${quote.MinPrice}</div>
                    </div>
                </div>
            </div>`


        

	});
	$("#flight-results").empty().append(carrName);
};


//  FETCH REST API

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