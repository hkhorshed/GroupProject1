$(function(){
    $('#clearBtn').on('click', function(e){
        e.preventDefault();
        $( "#sidebar" ).empty();
    });
    $('#subBtn').on('click', function(e){
        e.preventDefault();

    // getting the API data from zillow
    var city = $("#cityselect").val();
    var state = $("#stateselect").val();
    $.get('http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz18fvjq3ltsb_6ttia&state=' + state + '&city=' + city + '&childtype=neighborhood')
    .done(function(response){
        myFunction(response);
            

})
.fail(function(error){
    console.log(error);
})


})
// function to find elements in the response and for loop to add the data to the HTML

    function myFunction(response) {
        var $sidebar = $("#sidebar");
        var myLatLng = [];
        var $xmlResponse = $(response);
        var counter = 0;
        var $map = $("#map");
        $xmlResponse.find('region').each(function(){
            // console.log($(this));
            var $region = $(this);
            
            var name = $region.find('name').text();
            var medianValue = $region.find('zindex').text();
            var url = $region.find('url').text();
            var latitude = $region.find('latitude').text();
            var longitude = $region.find('longitude').text();

            var position = {};
            
            position["lat"] = $region.find('latitude').text();
            position["lng"] = $region.find('longitude').text();
            // position["name"] = $region.find('name').text();
            myLatLng.push(position);

            if (counter > 0 && counter < 50) {
            $sidebar.append(name + "<br>" + "Median price: $" + medianValue + "<br><br>");
            // $sidebar.append("<br> Median home value for this area: $" + medianValue + "<br>" );
            // console.log(name);
            }
            counter++;

    //outside of loop
        
})
        function initMap() {
            
            var patharray = [];
            var map;
            for (var i = 1; i<myLatLng.length; i++){
                patharray.push(new google.maps.LatLng(myLatLng[i][0], myLatLng[i][1]));
            }
            var tourplan = new google.maps.Polyline({
                path: patharray,
                strokeColor: "#000FF",
                strokeOpacity: 0.6,
                strokeWeight : 2,
            });
            tourplan.setMap(map)
            }
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //       zoom: 4,
        //       center: (myLatLng[0][0], myLatLng[0][1]
        //     });
        // for (var i = 1; i<myLatLng.length; i++){
        //     var marker = new google.maps.Marker({
        //       position: (myLatLng[i][0], myLatLng[i][1]),
        //       map: map,
        //       title: myLatLng[i][2],
        // }
        //     });
        //   }
      }
    
});
