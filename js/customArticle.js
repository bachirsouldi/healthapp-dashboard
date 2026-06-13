var debrefA = firebase.database().ref().child("articles");
var debrefUsers = firebase.database().ref().child("users");
var debrefComment = firebase.database().ref().child("articles-comments");
var debrefGetId = firebase.database().ref().child("articles-comments").orderByChild("cmId").limitToLast(1);
var arid = $("footer").data("foot");
var lastComId = 0;



var user;
var dateComm;
$("li.nav-item.avatar.dropdown.prof").addClass("d-none");
firebase.auth().onAuthStateChanged(function (user) {

    var dash = $(".dash");
    var comment;

    if (user) {
        // User is signed in.
        user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            $(".sisi").addClass("d-none");
            $("li.nav-item.avatar.dropdown.prof").addClass("d-block");
            dash.removeClass("d-none");

            $("#commentArea1").removeClass("d-none");
            $("#commentArea2").removeClass("d-none").addClass("d-flex");


            debrefComment.orderByChild("invtStamp").on("child_added", function (e) {
                if (e.val().arId == arid) {
                    if (e.val().artOwner == user.uid && ari.search(arid) != -1) {
                        comment = `<div class="media d-block d-md-flex mt-3">
                    <img class="card-img-64 rounded-circle z-depth-1 d-flex mx-auto mb-3" src="${e.val().comImg}" alt="image de profile" id="comImg">
                        <div class="media-body text-center text-md-left ml-md-3 ml-0" style="position:relative;">
                            <h5 class="font-weight-bold mt-0" style="position:relative;">
                                    <a class="text-defau    lt" href="" id="comUser">${e.val().comUser}</a>
                                    <a href="" class="pull-right text-default">
                                        <i class="fas fa-reply"></i>
                                    </a>
                                    ${e.val().uid == user.uid ? `<i class="fas fa-angle-down position-none position-md-absolute text-default" aria-haspopup="true"
                                        aria-expanded="false" data-toggle="dropdown" style="cursor:pointer;right:0;font-size: 1.5rem;top:-5px;"></i>
                                     <div class="dropdown-menu primary-default">
                                        <span href="#" id="modifCom" data-modifcom="${e.val().cmId}" class="dropdown-item">Modifier</span>
                                        <span href="#" id="delCom" data-delcom="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe" class="dropdown-item">Supprimer</span>
                                    </div>` : ``}
                                    </h5>
                                    <p id="commentContent" data-ref="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe">${e.val().comment}</p>
                                    <button id="delComAr" data-delComAr="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe" class="btn-default btn" style="margin:0;position:absolute;right:0;bottom:0;padding:.375rem .75rem;font-size: 10px;"><i class="fa fa-trash text-white" aria-hidden="true"></i></button>
                                    </div></div><hr>`;
                    } else if (e.val().uid == user.uid && ari.search(arid) != -1) {
                        comment = `<div class="media d-block d-md-flex mt-3">
                    <img class="card-img-64 rounded-circle z-depth-1 d-flex mx-auto mb-3" src="${e.val().comImg}" alt="image de profile" id="comImg">
                        <div class="media-body text-center text-md-left ml-md-3 ml-0" style="position:relative;">
                            <h5 class="font-weight-bold mt-0" style="position:relative;">
                                    <a class="text-defau    lt" href="" id="comUser">${e.val().comUser}</a>
                                    <a href="" class="pull-right text-default">
                                        <i class="fas fa-reply"></i>
                                    </a>
                                    <i class="fas fa-angle-down position-none position-md-absolute text-default" aria-haspopup="true"
                                    aria-expanded="false" data-toggle="dropdown" style="cursor:pointer;right:0;font-size: 1.5rem;top:-5px;"></i>
                                <div class="dropdown-menu primary-default">
                                    <span href="#" id="modifCom" data-modifcom="${e.val().cmId}" class="dropdown-item">Modifier</span>
                                    <span href="#" id="delCom" data-delcom="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe" class="dropdown-item">Supprimer</span>
                                    </div>
                                    </h5>
                                    <p id="commentContent" data-ref="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe">${e.val().comment}</p>
                                    </div></div><hr>`;
                    } else {
                        comment = `<div class="media d-block d-md-flex mt-3">
                    <img class="card-img-64 rounded-circle z-depth-1 d-flex mx-auto mb-3" src="${e.val().comImg}" alt="image de profile" id="comImg">
                        <div class="media-body text-center text-md-left ml-md-3 ml-0" style="position:relative;">
                            <h5 class="font-weight-bold mt-0" style="position:relative;">
                                    <a class="text-default" href="" id="comUser">${e.val().comUser}</a>
                                    <a href="" class="pull-right text-default">
                                        <i class="fas fa-reply"></i>
                                    </a>
                            </h5>
                                <p id="commentContent data-ref="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe"">${e.val().comment}</p>
                        </div></div><hr>`;
                    }

                    $(".comments").append(comment);
                }
            }); //end dbcomment


            $("#quickReplyFormComment").on("change", function () {
                if ($(this).val().length > 1) {
                    $("#post-comment").removeClass("disabled");
                } else {
                    $("#post-comment").addClass("disabled");
                }

            });

            $("#post-comment").on("click", function () {

                var comUser;
                var comment_content;
                var invtStamp = -Date.now();
                var artOwner;
                debrefUsers.on("child_added", function (e) {
                    new Promise(function (resolve, reject) {
                        if (user.uid == e.val().UID) {
                            debrefGetId.once("child_added", function (c) {
                                lastComId = c.val().cmId + 1;
                                debrefA.on("child_added", function (e) {
                                    if (e.val().arId == arid) {
                                        artOwner = e.val().authUid;
                                    }
                                })

                            }).then(function () {

                                comment_content = $(
                                    "#quickReplyFormComment").val();

                                dateComm = new Date().toLocaleDateString();

                                comUser = e.val().First_name + " " + e.val()
                                    .Last_name;
                                comImg = e.val().Profile_Image.startsWith(
                                    "https") ? e
                                        .val().Profile_Image :
                                    "https://firebasestorage.googleapis.com/v0/b/fir-82e9c.appspot.com/o/profileImages%2FprofilePic.png?alt=media&token=6940d080-3ccb-4a67-b42e-1a3e602d7796";
                                resolve('');
                            })
                        }

                    }).then(function (resp) {
                        if ($("#quickReplyFormComment").val().length > 0) {
                            debrefComment.push({
                                arId: arid,
                                comment: comment_content,
                                uid: user.uid,
                                artOwner: artOwner,
                                cmId: lastComId,
                                invtStamp: invtStamp,
                                comUser: comUser,
                                comImg: comImg,
                                dateComm: dateComm
                            }).then(function () {
                                $("#quickReplyFormComment").val("");
                                $("#post-comment").addClass("disabled");

                            })

                        }
                    })

                });

            })

            $(document).on("click", "#modifCom", function () {
                var dataIdCom = $(this).data("modifcom")
                debrefComment.on("child_added", function (e) {
                    if (e.val().uid == user.uid && e.val().cmId == dataIdCom) {
                        $("#labelCom").addClass("active")
                        $("#quickReplyFormComment").val(e.val().comment)
                        $("#post-comment").addClass("d-none")
                            .after(
                                "<button id='annuler-comment-modif' class='btn btn-danger btn-rounded btn-sm'>Annuler</button>"
                            )
                            .before(
                                "<button id='enre-comment-modif' class='btn btn-primary btn-rounded btn-sm' data-comodif='" +
                                dataIdCom + "'>Enregistrer</button>"
                            );
                    }
                })
            })
            $(document).on("click", "#delCom", function () {
                var dataIdCom = $(this).data("delcom").slice(22, 23);
                var btnDel = $(this);
                debrefComment.once("value", function (s) {
                    s.forEach(e => {

                        if (e.val().uid == user.uid && e.val().cmId == dataIdCom) {
                            debrefComment.child(e.key).remove().then(function () {
                                btnDel.parents(".media").remove();
                            })

                        }
                    })
                });
            })
            $(document).on("click", "#delComAr", function () {
                var dataIdCom = $(this).data("delcomar").slice(22, 23);
                var btnDel = $(this);

                debrefComment.once("value", function (s) {
                    s.forEach(e => {
                        if (e.val().cmId == dataIdCom) {
                            debrefComment.child(e.key).remove().then(function () {
                                btnDel.parents(".media").remove();
                            })

                        }
                    })
                })
            })



            $(document).on("click", "#annuler-comment-modif", function () {
                $("#enre-comment-modif").remove();
                $("#quickReplyFormComment").val("");
                $(this).remove()
                $("#post-comment").removeClass("d-none")
            })
            $(document).on("click", "#enre-comment-modif", function () {
                var dataIdMod = $(this).data("comodif");
                enrebtn = $(this);
                var new_comment_content = $("#quickReplyFormComment").val();
                $(this).addClass("disabled btn-succcess").text("Enregistrement ..")
                $("#commentContent[data-ref=\"AOusSYbG542HisYdoDbP1s" + dataIdMod + "Psudhe\"]")
                    .text(new_comment_content)

                debrefComment.once("value", function (e) {
                    e.forEach(function (s) {
                        if (s.val().cmId == dataIdMod) {

                            debrefComment.child(s.key).update({
                                comment: new_comment_content
                            })
                        }
                    })
                }).then(function () {
                    $("#annuler-comment-modif").remove();
                    setTimeout(() => {
                        enrebtn.remove()
                        $("#quickReplyFormComment").val("");
                        $("#post-comment").removeClass("d-none")
                    }, 2000);
                })


            })


        } else {

        }

    } else {
        // No user is signed in.
        $("#sisi").removeClass("d-none");
        $("li.nav-item.avatar.dropdown.prof").addClass("d-none");
        dash.addClass("d-none");

        $("#CommentNotLogedIn").removeClass("d-none").addClass("d-flex");
        debrefComment.orderByChild("invtStamp").on("child_added", function (e) {
            if (e.val().arId == arid && ari.search(arid) != -1) {
                var comment = `<div class="media d-block d-md-flex mt-3">
                <img class="card-img-64 rounded-circle z-depth-1 d-flex mx-auto mb-3" src="${e.val().comImg}" alt="image de profile" id="comImg">
                    <div class="media-body text-center text-md-left ml-md-3 ml-0">
                        <h5 class="font-weight-bold mt-0" style="position:relative;">
                                <a class="text-default" href="" id="comUser">${e.val().comUser}</a>
                                <a href="" class="pull-right text-default">
                                    <i class="fas fa-reply"></i>
                                </a>
                        </h5>
                            <p id="commentContent" data-ref="AOusSYbG542HisYdoDbP1s${e.val().cmId}Psudhe">${e.val().comment}</p>
                    </div></div><hr>`;
                $(".comments").append(comment);
            }
        }); //end dbcomment
    }
});


function tt() {
    return new Promise(function (resolve, reject) {
        debrefA.on("child_added", function (snap) {
            if (arid == snap.val().arId) {
                debrefUsers.on("child_added", function (u) {
                    if (u.val().UID == snap.val().authUid) {
                        $("#authDesc").text(u.val().description);
                        $("#authName").text(u.val().First_name + " " + u.val().Last_name);
                        $("#authProf").attr("src", u.val().Profile_Image.startsWith("https") ? u.val().Profile_Image : "../image/user.png");
                    }
                })
                $("#title-header,.msk").text("").append(snap.val().titre);
                $("#view").prepend("<img class='w-100' src='" + snap.val().image + "' class='img-fluid rounded' />");
                $(".articleContent").html(snap.val().content);
                resolve("cest fait");
            }
        });
    });
}


tt().then(function (resp) {
    $(".spinner").remove();
})


var nbrComment = 0;
let ari = " ";

debrefComment.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val().arId;
        if (childData == arid) {
            nbrComment++;
        }
    });
}).then(function () {
    var ort = nbrComment > 0 ? nbrComment + " Commentaires" : "soyez le premier à commenter";
    $("#nbrComment").text("").text(ort);
});
//if article exists

debrefA.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().arId != 0)
            ari += childSnapshot.val().arId + " ";
    });
}).then(function () {

    if (ari.search(arid) == -1) {
        $(".articleContent").html("<p class='alert alert-danger lead'>article non disponible</p>")
        $(".spinner").remove();
        $("#recentPosts-sec,#com-sec").addClass("d-none")
    }
});

//recent posts
var i = 0;
debrefA.orderByChild("arId").limitToLast(4).on("child_added", function (e) {
    var artColor = ["blue", "pink", "deep-orange"];
    if (e.val().arId != arid) {
        try {
            var recentPost = `<div class="col-lg-4 col-md-12 mb-lg-0 mb-4 wow fadeIn">
                                <div class="card pb-2">
                                <!-- Featured image -->
                                <div class="view overlay rounded z-depth-2 mb-4">
                                    <img class="img-fluid" src="${e.val().image}" alt="la miniature" style="height:200px;width: 100%;">
                                    <a>
                                        <div class="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <!-- Category -->
                                <a href="#!" class="${artColor[i]}-text">
                                    <h6 class="font-weight-bold mb-3"><i class="fas fa-stethoscope pr-2"></i>Santé</h6>
                                </a>
                                <!-- Post title -->
                                <h4 class="font-weight-bold mb-3"><strong>${e.val().titre}</strong></h4>
                                <!-- Post data -->
                                <p>by <a class="font-weight-bold">${e.val().author}</a>, ${e.val().pubDate}</p>
                                <!-- Excerpt -->
                                <p class="dark-grey-text">${(e.val().resume).substr(0, 80)}</p>
                                <!-- Read more button -->
                                <a class="btn btn-${artColor[i]} btn-rounded btn-md" href="articles.php?articleid=SdhDGInYjpo${e.val().arId}Hkd" target="_blank">Lire la suite</a>
                            </div></div>`;
            $("#recentPosts").append(recentPost)
        } catch (err) {

        }
        i++;
    }




})