// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devourBtn").on("click", function(event) {
    var id = $(this).data("id");
    var eaten = $(this).data("eaten");

    var eatenState = {
      devoured: eaten
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: eatenState
    }).then(
      function() {
        console.log("changed eaten to", eaten);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".addBtn").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#addBurger").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
