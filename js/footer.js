$(document).ready(function () {
  $(".owl-articles .owl-carousel").owlCarousel({
    items: 1,
    margin: 15,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: { items: 1 }
    }
  });
  $(".prev").click(function () {
    $(".owl-carousel").trigger('prev.owl.carousel');
  });
  $(".next").click(function () {
    $(".owl-carousel").trigger('next.owl.carousel');

  });



  var pathUrl = window.location.href;
  var path = "";
  if (pathUrl.search("articles") != -1) {
    path = ""
  } else if (pathUrl.search("index") != -1 || pathUrl.search("terms") != -1 || pathUrl.search("aboutus") != -1) {
    path = "articles/"
  } else if (pathUrl.search("product") != -1 || pathUrl.search("shop") != -1 || pathUrl.search("signin") != -1 || pathUrl.search("services") != -1 || pathUrl.search("contactus") != -1 || pathUrl.search("") != -1) {
    path = "../articles/"
  }


  var dbref = firebase.database().ref().child("articles");
  var random = 1;
  dbref.once("value").then(function (s) {
    c = s.numChildren() - 2;
    random = Math.floor(Math.random() * c) + 1
  }).then(function () {
    dbref.orderByChild("arId").startAt(random).limitToFirst(3).once("value", function (x) {
      x.forEach(e => {
        ar = ` <div class="owl-item">
                          <div class="card text-center">
                              <div class="view overlay">
                                  <img class="card-img-top" src="${e.val().image}" alt="miniature">
                                  <a href="#!">
                                      <div class="mask rgba-white-slight"></div>
                                      </a>
                              </div>
                              <div class="card-body">
                                  <h4 class="card-title">${e.val().titre}</h4>
                                  <p class="card-text">${e.val().resume}</p>
                                      <a href="${path}articles.php?articleid=SdhDGInYjpo${e.val().arId}Hkd" class="btn btn-primary">Lire la suite</a>
                              </div>
                              </div>
                      </div> `;
        $('.owl-articles .owl-carousel').trigger('add.owl.carousel', ar).trigger('refresh.owl.carousel');
      })
    });
  })

});