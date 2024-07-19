// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();


// isotope js
const api = "http://localhost:3500/";

$(document).ready(function() {
  //Banner
  fetch(api + "api/banner")
    .then((response) => response.json())
    .then((image) => {
      const carousel = $("#carouselDiv");
       if (window.matchMedia("(max-width: 768px)").matches) {
               image.data.forEach((data) => {
                 carousel.append(
                   `"<div class="carousel-item"  style="height: 100%;">
          <img src="${api}${data.mobileImage}" alt="Image 3" style="width: 100%; height: 100%; object-fit: cover;"/>
          </div>"`
                 );
               });
       } 
       else{
              image.data.forEach((data) => {
                carousel.append(
                  `"<div class="carousel-item"  style="height: 100%;">
          <img src="${api}${data.image}" alt="Image 3" style="width: 100%; height: 100%; object-fit: cover;"/>
          </div>"`
                );
              });
       }
      // Populate the select element with options

    })
    .catch((error) => {
      // Handle errors
      alert("An error occurred while fetching banner images");
      console.log(error);
    });
    //offers
    fetch(api + "api/offer")
      .then((response) => response.json())
      .then((offer) => {
        const offerRow = $("#offerRow");

        offer.data.forEach((data) => {
          console.log(data);
          offerRow.append(
            `<div class="col-md-6 ">
            <div class="box ">
              <div class="img-box">
                <img src="${api}${data.image}" alt="">
              </div>
              <div class="detail-box">
                <h5>
                  ${data.offer_name}
                </h5>
                <h6>
                  <span>${data.offer_percentage}</span> Off
                </h6>
              </div>
            </div>
          </div>`
          );
        });
      })
      .catch((error) => {
        // Handle errors
        alert("An error occurred while fetching offers");
        console.log(error);
      });
 //menu script   
          fetch(api + "api/products")
            .then((response) => response.json())
            .then((menu) => {
              const menuGrid = $("#menuGrid");
              const menuGrid_home = $('#menuGrid_home')
              const items = menu.data 
              if(items.length < 5){
                items.forEach((item)=>{
                  showmenu(menuGrid_home,item)
                })
              }
              else{
                for(i=0;i<=5;i++){
                  showmenu(menuGrid_home,items[i])
                }
              }

              items.forEach((item) => {
                showmenu(menuGrid, item);
              });
               }
            )
            .catch((error) => {
              // Handle errors
              alert("An error occurred while fetching menu");
              console.log(error);
            });
// for showing menu
              function showmenu(id, data) {
                id.append(
                  `<div class="col-sm-6 col-lg-4 all pizza">
            <div class="box">
              <div>
                <div class="img-box">
                  <img src="${api}${data.image}" alt="">
                </div>
                <div class="detail-box">
                  <h5>
                  ${data.product_name}
                  </h5>
                  <p>
                    ${data.description}
                  </p>
                    <h6 class="text-center">
                      ${data.price}
                    </h6>
                </div>
              </div>
            </div>
          </div>`
                );
              }
  //Time slots
  fetch("http://localhost:3500/api/available-time-slots") // Replace with your API endpoint
    .then((response) => response.json())
    .then((data) => {
      var timeSelect = $("#time");

      // Populate the select element with options
      data.forEach((time) => {
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
    //fetch Ratings

   fetch(api + "api/ratings")
    .then((response) => response.json())
    .then((response) => {
      displayRatings(response.data);
      ratingscarousel(response.data);
    })
    .catch((error) => {
      alert("An error occurred while fetching ratings");
      console.log(error);
    });

function displayRatings(data) {
  const ratingsContainer = $('#ratingspage');
  data.forEach(rating => {
    const mainContainer = $("<div>").addClass("rating-container col");
    const cardContainer = $('<div>').addClass('rating-card');
    const ratingCard = $('<div>').addClass('item');
    const nameElement = $('<h4>').text(rating.name);
    const descriptionElement = rating.description ? $('<p>').text(rating.description) : '';
    const starContainer = $("<p>").addClass('starcontainer');
    if(rating.ratings < 5){
      const remain = 5 - rating.ratings;
      for (let i = 1; i <= rating.ratings; i++){
        const stars = '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
        starContainer.append(stars);
      }
      for(let j = 1; j <= remain; j++){
        const stars = '<i class="fa-regular fa-star" style="color:rgb(212, 214, 214);"></i>';
        starContainer.append(stars);
      }
      ratingCard.append(nameElement, starContainer, descriptionElement);
    }
    if (rating.image && rating.image.length > 0) {
      const imagesContainer = $("<div>").addClass('rating_img');
      rating.image.forEach(imageUrl => {
        const imgElement = $('<img>').attr('src', api+imageUrl).attr('alt', 'Rating Image');
        imagesContainer.append(imgElement);
      });
      ratingCard.prepend(imagesContainer);
    }
    cardContainer.append(ratingCard);
    mainContainer.append(cardContainer);
    ratingsContainer.append(mainContainer);
  });
}

function ratingscarousel(data) {
  const ratingsContainer = $("#ratingCarousel");
  if (data.length < 5){
    data.forEach((rating) => {
      const cardContainer = $("<div>").addClass("rating-card .card");
      const ratingCard = $("<div>").addClass("item");
      const nameElement = $("<h4>").text(rating.name);
      const descriptionElement = rating.description ? $("<p>").text(rating.description) : "";
      const starContainer = $("<p>").addClass("starcontainer");
      if (rating.ratings < 5) {
        const remain = 5 - rating.ratings;
        for (let i = 1; i <= rating.ratings; i++) {
          const stars = '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
          starContainer.append(stars);
        }
        for (let j = 1; j <= remain; j++) {
          const stars = '<i class="fa-regular fa-star" style="color:rgb(212, 214, 214);"></i>';
          starContainer.append(stars);
        }
        ratingCard.append(nameElement, starContainer, descriptionElement);
      }
      if (rating.image && rating.image.length > 0) {
        const imagesContainer = $("<div>").addClass("rating_img");
        rating.image.forEach((imageUrl) => {
          const imgElement = $("<img>").attr("src", api + imageUrl).attr("alt", "Rating Image");
          imagesContainer.append(imgElement);
        });
        ratingCard.prepend(imagesContainer);
      }
      cardContainer.append(ratingCard);
      ratingsContainer.append(cardContainer);
    });
  } else {
    for (let l = 0; l < 5; l++) {
      const cardContainer = $("<div>").addClass("rating-card card");
      const ratingCard = $("<div>").addClass("item");
      const nameElement = $("<h4>").text(data[l].name);
      const descriptionElement = data[l].description ? $("<p>").text(data[l].description) : "";
      const starContainer = $("<p>").addClass("starcontainer");
      if (data[l].ratings < 5) {
        const remain = 5 - data[l].ratings;
        for (let i = 1; i <= data[l].ratings; i++) {
          const stars = '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
          starContainer.append(stars);
        }
        for (let j = 1; j <= remain; j++) {
          const stars = '<i class="fa-regular fa-star" style="color:rgb(212, 214, 214);"></i>';
          starContainer.append(stars);
        }
        ratingCard.append(nameElement, starContainer, descriptionElement);
      }
      if (data[l].image && data[l].image.length > 0) {
        const imagesContainer = $("<div>").addClass("rating_img");
        data[l].image.forEach((imageUrl) => {
          const imgElement = $("<img>").attr("src", api + imageUrl).attr("alt", "Rating Image");
          imagesContainer.append(imgElement);
        });
        ratingCard.prepend(imagesContainer);
      }
      cardContainer.append(ratingCard);
      ratingsContainer.append(cardContainer);
    }
  }
}
$(document).ready(function () {
  let slides = $('.card');

  function addActive(slide) {
    slide.addClass('active');
  }

  function removeActive(slide) {
    slide.removeClass('active');
  }

  addActive(slides.eq(0));
  setInterval(function () {
    slides.each(function (index) {
      if (index + 1 === slides.length) {
        addActive(slides.eq(0));
        setTimeout(function () {
          removeActive(slides.eq(index));
        }, 350);
        return false; // Break the .each() loop
      }
      if ($(this).hasClass("active")) {
        setTimeout(function () {
          removeActive(slides.eq(index));
        }, 350);
        addActive(slides.eq(index + 1));
        return false; // Break the .each() loop
      }
    });
  }, 1500);
});

// rating section owl carousel
$(".rating-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

//booking form script
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
    // Send the form data to the API
    $.ajax({
      url: api + "api/bookings", // Replace with your API endpoint
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
//review form script
$(document).ready(function () {
  $("#reviewForm").on("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    let name = $("#ReviewName").val();
    let rating = $("#stars").val();
    let description = $("#ReviewDescription").val();
    let images = $("#images")[0].files;

    formData.append("name", name);
    formData.append("description", description);
    formData.append("ratings",rating);
    

    // Function to handle image compression and form data appending
    const appendCompressedImages = async () => {
      const compressedImages = await Promise.all(
        Array.from(images).map((image) => compressionFunction(image))
      );
      compressedImages.forEach((compressedImage, index) => {
        formData.append("image", compressedImage);
      });
      for (const value of formData.values()) {
        console.log(value);
      }
    };

    await appendCompressedImages();
    
    $.ajax({
      url: "http://localhost:3500/api/create-Ratings",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert("Review submitted successfully!");
        console.log(response, "this is my data");
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

          const maxWidth = 800;
          const maxHeight = 800;
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

}
);
