// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  //Devour button on-click handler
  $(".change-eaten").on("click", function(event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("neweaten");

    var newEatenState = {
      devoured: newEaten
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newEatenState
    }).then(
      function() {
        console.log("Changed burger status to", newEaten);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  //Order button on-click handler
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    //Save the new burger into a variable
    var newBurger = {
      burger_name: $("#ca").val().trim(),
      devoured: false
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("Created the new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
