let nbrArticle; let aEnd;
let articles = [];
var dbref2 = firebase.database().ref().child("articles").orderByChild("arId").limitToLast(50);
dbref2.once("value", function (e) {
    e.forEach(function (s) {
        if (s.val().arId != 0) {
            articles.push(s.val());
        }
    })
}).then(function () {

    if (articles.length < 1) {
        $(".articles .container .art-container").append("<p class='text-center lead'>aucun article n'a été publié</p>")
        $(".spinner").remove();
    } else {

        articles.reverse();

        if (articles.length <= 3) {
            for (let i = 0; i < articles.length; i++) {
                $(".articles .container .art-container").
                    append(`<div class="row wow slideInLeft">
                <div class="col-lg-5">
                  <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                    <img class="img-fluid" src="${articles[i]["image"]}" alt="miniature">
                    <a><div class="mask rgba-white-slight waves-effect waves-light"></div></a>
                  </div>
                </div>
                <div class="col-lg-7">
                        <a href="#!" class="indigo-text">
                          <h6 class="font-weight-bold mb-3"><i class="fas fa-stethoscope pr-2"></i>Santé</h6>
                        </a>
                        <h3 class="font-weight-bold mb-3">${articles[i]["titre"]}</h3>
                        <p>${articles[i]["resume"]}</p>
                        <p>by ${articles[i]["author"]}, ${articles[i]["pubDate"]}</p>
                        <a class="btn btn-indigo btn-md" href="articles/articles.php?articleid=SdhDGInYjpo${ articles[i]["arId"]}Hkd">Read more</a>
                       </div>
                 </div><hr class="my-5">`);

            } $("#pagination").removeClass("d-none");
            $(".spinner").remove();
        } else {

            for (let i = 0; i < 3; i++) {
                $(".articles .container .art-container").append(`<div class="row wow slideInLeft">
                                                                    <div class="col-lg-5">
                                                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                                                      <img class="img-fluid" src="${articles[i]["image"]}" alt="miniature">
                                                                      <a>
                                                                        <div class="mask rgba-white-slight waves-effect waves-light"></div>
                                                                      </a>
                                                                    </div>
                                                                  </div>
                                                                  <div class="col-lg-7">
                                                                    <!-- Category -->
                                                                    <a href="#!" class="indigo-text">
                                                                      <h6 class="font-weight-bold mb-3"><i class="fas fa-stethoscope pr-2"></i>Santé</h6>
                                                                    </a>
                                                                    <!-- Post title -->
                                                                    <h3 class="font-weight-bold mb-3">${articles[i]["titre"]}</h3>
                                                                    <!-- Excerpt -->
                                                                    <p>${articles[i]["resume"]}</p>
                                                                    <!-- Post data -->
                                                                    <p>by ${articles[i]["author"]}, ${articles[i]["pubDate"]}</p>
                                                                    <!-- Read more button -->
                                                                    <a class="btn btn-indigo btn-md" href="articles/articles.php?articleid=SdhDGInYjpo${ articles[i]["arId"]}Hkd">Read more</a>
                                                                  </div>
                                                                  </div><hr class="my-5">`);
            }


            $("#pagination").removeClass("d-none");
            $(".spinner").remove();

            if (articles.length >= 4)
                $("#pagination li:nth-child(3)").removeClass("disabled");
            if (articles.length >= 7 && articles.length < 10)
                $("#pagination li:nth-child(4)").removeClass("disabled");
            if (articles.length >= 4)
                $("#pagination li:nth-child(5)").removeClass("disabled");

        }
    }
});


// test page cliquee
var page;
var debut = 0, fin = 2;

// start click pages
$(".pagination li a").on("click", function (e) {
    e.preventDefault();
    page = $(this).text();
    $(".articles .container .art-container").html("");


    switch (page) {
        case "Previous": { debut -= 3, fin -= 3 } break;
        case "1": { debut = 0, fin = 2 } break;
        case "2": { debut = 3, fin = 5 } break;
        case "3": { debut = 6, fin = 8 } break;
        case "Next": { debut += 3, fin += 3 } break;
        default: ;
    }

    for (let i = debut; i <= fin; i++) {
        try {
            $(".articles .container .art-container").append(`<div class="row wow slideInLeft">
                                                                    <div class="col-lg-5">
                                                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                                                      <img class="img-fluid" src="${articles[i]["image"]}" alt="miniature">
                                                                      <a>
                                                                        <div class="mask rgba-white-slight waves-effect waves-light"></div>
                                                                      </a>
                                                                    </div>
                                                                  </div>
                                                                  <div class="col-lg-7">
                                                                    <!-- Category -->
                                                                    <a href="#!" class="indigo-text">
                                                                      <h6 class="font-weight-bold mb-3"><i class="fas fa-stethoscope pr-2"></i>Santé</h6>
                                                                    </a>
                                                                    <!-- Post title -->
                                                                    <h3 class="font-weight-bold mb-3">${articles[i]["titre"]}</h3>
                                                                    <!-- Excerpt -->
                                                                    <p>${articles[i]["resume"]}</p>
                                                                    <!-- Post data -->
                                                                    <p>by ${articles[i]["author"]}, ${articles[i]["pubDate"]}</p>
                                                                    <!-- Read more button -->
                                                                    <a class="btn btn-indigo btn-md" href="articles/articles.php?articleid=SdhDGInYjpo${ articles[i]["arId"]}Hkd">Read more</a>
                                                                  </div>
                                                                  </div><hr class="my-5">`);
        } catch (e) {
        }
    }

    if (debut == 0 && fin == 2) {
        $("#pagination li:nth-child(1),li:nth-child(2)").addClass("disabled");
    } else {
        $("#pagination li:nth-child(1),li:nth-child(2)").removeClass("disabled");
    }
    if (debut < articles.length - 3) {
        $("#pagination li:nth-child(5)").removeClass("disabled");
    } else {
        $("#pagination li:nth-child(5)").addClass("disabled");
    }


});