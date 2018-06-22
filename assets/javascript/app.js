$(document).ready(function() {
    var nArray = [];


    function showGif() {
        var searchTerm = $(this).attr("data-name");
        
        console.log(searchTerm);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=wl7SDVtJnbwfTz4XxlyNQXuu1rqMZTu2&limit=10";
       
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        //    event.preventDefault();
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

            
            var imageURL = results[i].images.fixed_height_still.url;
            var defImage = results[i].images.fixed_height.url;
            var vidImage = $("<img>");
            vidImage.addClass("newGif");    
            vidImage.attr("src", imageURL);
            vidImage.attr("alt", "videogame image");
            vidImage.attr("data-state", "still");
            vidImage.attr("data-still", imageURL);
            vidImage.attr("data-animate", defImage);

            $("#gifArea").prepend(vidImage);
            }
        });
    };
    
   function renderButtons() {
       $("#buttons").empty();

       for (var i = 0; i < nArray.length; i++) {
           var a = $("<button>");
           

           a.addClass("gif-btn");

           a.attr("data-name", nArray[i]);

           a.text(nArray[i]);

           $("#buttons").append(a);
       }
   }
   
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();

        var gifSearch = $("#Search").val().trim();

        nArray.push(gifSearch);
        renderButtons();
    });

    $(".gif-btn").on("click", function() {
        $("#gifArea").empty();
    });

    $(document).on("click", ".gif-btn", showGif);
    $(document).on("click", ".newGif", playPause);

    function playPause () {
        var state = $(this).attr("data-state");
     if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
     }
     else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
     }
    }
    function clear() {
        $("gifArea").empty();
    }
    $(".gif-btn").on("click", clear);


    renderButtons();



































































});