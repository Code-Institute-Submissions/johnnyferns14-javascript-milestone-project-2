
$(document).ready(function(){

    $("#confirm").click(function()
        {
            $(this).html("Search");
            let originplace = $("#origin").val();
            let destinationplace = $("#destination").val();
            let outboundpartialdate = $("#date-dep").val();
            let currency = $("#currency").val();
        
            let fetchId = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originplace}-sky/${destinationplace}-sky/${outboundpartialdate}?inboundpartialdate=${inboundpartialdate}`;

            console.log(fetchId);

            async function getFlightData(){
                const res = await fetch(fetchId, {
                "method": "GET",
                    "headers": {
                            "x-rapidapi-key": "dd9b94074fmshac9241d7bf4be30p1d7aa0jsnea369d8adbc2",
                            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                        }
                    });
                const data = await res.json();
                console.log(data);
                const price = data.Quotes[0].MinPrice;
                const carrierName = data.Carriers[0].Name;
                const payCurrency = data.Currencies[0].Symbol;
                const depPlace = data.Places[1].Name;
                const arrPlace = data.Places[0].Name;
                const dateDep = data.Quotes[0].OutboundLeg.DepartureDate.slice(0,10);
                const timeDep = data.Quotes[0].OutboundLeg.DepartureDate.slice(11,16);
                console.log(price, carrierName, depPlace, arrPlace, payCurrency, dateDep, timeDep);
                $("#confirm").click(function(){
                $(".search-results").append(`<div class="result"<p>Your search returned the following results: </p><p>${depPlace} - ${arrPlace} on ${dateDep} at ${timeDep}hrs will cost you ${payCurrency}${price}.<button>Click for Hotels</button></div>`);
            });
        
            };

            getFlightData();
    });
});