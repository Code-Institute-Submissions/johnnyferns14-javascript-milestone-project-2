
getFlightData();
  
  async function getFlightData(){
	  const res = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/INR/en-US/BOM-sky/JFK-sky/2021-01-25?inboundpartialdate=2021-05-01", {
		"method": "GET",
		 	"headers": {
		  		"x-rapidapi-key": "dd9b94074fmshac9241d7bf4be30p1d7aa0jsnea369d8adbc2",
		  		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
		  	}
		  });
	  const data = await res.json();
	  const place = data.Places[0].SkyscannerCode;
	  const price = data.Quotes[0].MinPrice;
	  console.log(place, price);
	  //console.log(price);
	  $("#search").click(function(){
		$(".search-results").append('<p>Your search returned the following results: </p>'
		
		);
    });

  }