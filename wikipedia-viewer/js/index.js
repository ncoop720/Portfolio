
$(document).ready(function(){
  //pressing enter = clicking search
  $('#searchTerm').keypress(function(e){
      if(e.which==13){
        $('#searchButton').click();
      }
    });
});

//click function for "#searchTerm"
$('#searchButton').click(function(){
    var searchTerm = $('#searchTerm').val();
    //creates url using the search term
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    //jQuery.ajax() Wikipedia api call
    $.ajax({
      url: url,
      async: false,
      dataType: "json",
      success: function(data){
        //used to clear entries
        $('#output').html("");
        //updates "#outputStuff" with data retrieved
        for (var i=data[1].length-1; i>-1; i--){
          $('#output').prepend("<li><a href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");
        }
        //clears text in the "#searchTerm" field
        $('#searchTerm').val('');
      },
      //error message
      error: function(errorMessage){
        alert("An error has occured.");
      }
    });
  });