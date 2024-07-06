// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});
//Time slots
$(document).ready(function() {
    fetch("http://localhost:3500/api/available-time-slots") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        var timeSelect = $("#time");

        // Populate the select element with options
        data.forEach((time) => {
          console.log(time.startTime, time.endTime);
          timeSelect.append(
            '<option value="' +
              time.startTime +
              "-" +
              time.endTime +
              '">' +
              time.startTime +
              "</option>"
          );
        });
      })
      .catch((error) => {
        // Handle errors
        alert("An error occurred while fetching time slots: " + error);
      });
   })
  // Fetch time slots from the API
  
//booking script
$(document).ready(function () {
  $("#bookingForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather the form data
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      contact: $("#phone").val(),
      event_Type: $("#event").val(), // This field is optional
      person: $("#persons").val(),
      date: $("#date").val(),
      startTime: $("#time").val(),
    };
      console.log(formData);
    // Send the form data to the API
    $.ajax({
      url: "http://localhost:3500/api/bookings", // Replace with your API endpoint
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        // Handle the response from the API
        alert("Booking successful!");
      },
      error: function (xhr, status, error) {
        // Handle errors
        alert("An error occurred: " + error);
      },
    });
  });
});
$(document).ready(function () {
  $("#reviewForm").on("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    let name = $("#name").val();
    let rating = $("#stars").val();
    let description = $("#description").val();
    let image = $("#images")[0].files[0]; // Get the first image file

    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("description",description);

    if (image) {
      let compressedImage = await compressionFunction(image);
      formData.append("image", compressedImage);
    }
 console.log(formData);
    $.ajax({
      url: "http://localhost:3500/api/create-Ratings",
      type: "POST",
      data: formData,
      success: function (response) {
        alert("Review submitted successfully!");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
        alert("Error submitting review.");
      },
    });
  });

  async function compressionFunction(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 800; // Set maximum width
          const maxHeight = 800; // Set maximum height
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/webp",
            0.1
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  }
});



/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});