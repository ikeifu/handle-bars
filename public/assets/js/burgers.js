// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".eaten").on("click", function (event) {
    var id = $(this).data("id");
    var justEaten = $(this).data("justeaten");

    var justEatenState = {
      eaten: justEaten,
    };

    // Send the PUT request.
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: justEatenState,
    }).then(function () {
      console.log("changed eaten state to", justEaten);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#bn").val().trim(),
      eaten: $("[name=eaten]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burger/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
