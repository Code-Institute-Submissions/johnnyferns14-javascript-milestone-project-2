
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

function getPlace(places) {
	
	places.forEach(function (place) {
		//DISPLAY THE RESULT OF EACH ITEM IN THE PLACE ARRAY
		console.log(place);
		
		

	});
	// $("#flight-results").empty().append(carrName);
};

function getCarrier(carrierName) {
	let carrName = "";
	carrierName.forEach(function (carrier) {
		//DISPLAY THE RESULT OF EACH ITEM IN THE CARRIERID ARRAY
		console.log(carrier);
		const id = carrier.CarrierId;
		const name = carrier.Name;
		carrName += `<p>${id}${name}</p>`;

	});
	$("#flight-results").empty().append(carrName);
};

function displayInfo(quotes) {
	let flights = "";
	quotes.forEach(function (quote) {
		//DISPLAY THE RESULT OF EACH ITEM IN THE QUOTEID ARRAY
		console.log(quote);
		console.log(quote.QuoteId);
		const price = quote.MinPrice;
		const originId = quote.OutboundLeg.OriginId;
		const destId = quote.OutboundLeg.DestinationId;
		flights += `<p>${price}${originId}</p>`;

	});
	// $("#flight-results").empty().append(flights);
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
	console.log(places)


	getPlace(places);
	getCarrier(carrierNames);
	displayInfo(quotes);


};