const preSelectedTopics = [
  "donald trump",
  "fake news",
  "CNN",
  "Hilary Clinton",
  "Democrat",
  "Republican",
  "snow flake",
  "liberal",
  "socialist",
  'small hands',
  'orange cheeto'
];

const apiURL = 'https://api.giphy.com/v1/gifs/search?';
const apiTerms = {
  'q': '',
  'api_key': 'HluJQFkkFXG927mPtPgQhmWgNyxLR5I4',
  'limit': 20
}

$(document).ready(function () {

  preSelectedTopics.forEach(element => {
    addBtn(element);
  });

  $('#disp-btn').on('click', 'button', function (r) {
    // console.log(r);
    apiTerms.q = r.target.innerHTML.trim();
    // console.log(apiTerms.q);
    var queryURL = apiURL + $.param(apiTerms);

    deployGIFs(queryURL);

  });

  function deployGIFs(queryURL) {
    $('#dispGIFs').empty();

    $.ajax({
      type: "GET",
      url: queryURL,
      data: "data",
      success: function (r) {
        r.data.forEach(e => {
          var titleRating = `<h6>${e.title} - Rating - ${e.rating}</h6>`;
          var div = $('<div>').html(titleRating).addClass('m-2');
          var gif = $('<img>').attr('src', e.images.original_still.url)
            .attr('data-still', e.images.original_still.url)
            .attr('data-animate', e.images.original.url)
            .attr('data-state', 'still').addClass('gif');

          div.append(gif);
          $('#dispGIFs').append(div);
        });
      }
    });
  }

  $('body').on('click', '.gif', function (r) {

    var state = $(r.target).attr('data-state');

    if (state === 'still') {
      $(r.target).attr('src', $(r.target).attr('data-animate'));
      $(r.target).attr('data-state', 'animate');
    }

    if (state === 'animate') {
      $(r.target).attr('src', $(r.target).attr('data-still'));
      $(r.target).attr('data-state', 'still');
    }

  });

  $('#submitTpk').on('click', function () {
    // console.log($('#userTpk').val());
    var usrTpk = $('#userTpk').val().trim();
    addBtn(usrTpk);
    $('#userTpk').val('');
    event.preventDefault();
    apiTerms.q = usrTpk;
    var queryURL = apiURL + $.param(apiTerms);
    deployGIFs(queryURL);
  });

  function addBtn(element) {
    var tpkBtn = $('<button>');
    tpkBtn.addClass("btn btn-secondary btn-sm m-2")
      .attr("type", 'button');
    tpkBtn.html(element);
    console.log(tpkBtn);
    $("#disp-btn").append(tpkBtn);
  }
});
