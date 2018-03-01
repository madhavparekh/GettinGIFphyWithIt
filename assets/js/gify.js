var tpks = {
  //topic : offset multipler
  'donald trump': 0,
  'fake news': 0,
  CNN: 0,
  'Hilary Clinton': 0,
  Democrat: 0,
  Republican: 0,
  'snow flake': 0,
  liberal: 0,
  socialist: 0,
  'small hands': 0,
  'orange cheeto': 0,
};

const apiURL = 'https://api.giphy.com/v1/gifs/search?';
const apiTerms = {
  q: '', //search term
  api_key: 'HluJQFkkFXG927mPtPgQhmWgNyxLR5I4',
  offset: 0,
  limit: 10, //limit of 10 set per query
};

$(document).ready(function() {
  //create btn for each key in tpks obj
  Object.keys(tpks).forEach(element => {
    addBtn(element);
  });

  //when button clicked, create queryURL and call deployGIFs()
  $('#disp-btn').on('click', 'button', function(r) {
    apiTerms.q = r.target.innerHTML.trim();
    apiTerms.offset = parseInt(tpks[apiTerms.q] * 10);
    var queryURL = apiURL + $.param(apiTerms);
    tpks[apiTerms.q]++;
    deployGIFs(queryURL);
  });

  //ajax query and on success deploy GIFs in #dispGIFs
  function deployGIFs(queryURL, usrTpk) {
    //if user submited topic
    usrTpk = usrTpk || '';

    console.log(`usrTpk - ${usrTpk}`);
    console.log(tpks);
    console.log(queryURL);
    //empty all divs for next set of display
    $('#dispGIFs').empty();
    $('.prevBtn').empty();
    $('.nextBtn').empty();

    $.ajax({
      type: 'GET',
      url: queryURL,
      data: 'data',
      success: function(r) {
        console.log(r);
        console.log(`length - ${r.data.length}`);

        //if r.data has images
        if (r.data.length > 0) {
          //create button for user input only if there are images returned
          if (usrTpk !== '') {
            addBtn(usrTpk);
            //set offset multipler
            tpks[usrTpk] = 1;
          }

          r.data.forEach(e => {
            var titleRating = `<h6>${e.title} - Rating - ${e.rating}</h6>`;
            var div = $('<div>')
              .html(titleRating)
              .addClass('m-2');
            var gif = $('<img>')
              .attr('src', e.images.original_still.url)
              .attr('data-still', e.images.original_still.url)
              .attr('data-animate', e.images.original.url)
              .attr('data-state', 'still')
              .addClass('gif');

            div.append(gif);

            $('#dispGIFs').append(div);
          });
          //if there are more GIFs avail
          if (r.pagination.total_count > tpks[apiTerms.q] * 10) {
            $('.nextBtn').html(
              `<u>${apiTerms.limit * tpks[apiTerms.q]} of ${
                r.pagination.total_count
              } - Next ${apiTerms.limit}</u>`
            );
          }
          //if on next page, display priv page
          if (tpks[apiTerms.q] > 1) {
            $('.prevBtn').html(`<u>Previous ${apiTerms.limit}</u>`);
          } else
            //or keep it empty or not show priv button
            $('.prevBtn').empty();
        } else {
          $('#dispGIFs').html(
            `<strong class="text-center">Search on "${usrTpk}" returned no GIFs.\nTry different topic</strong>`
          );
        }
      },
    });
  }

  //listen on #nextBtn to display next set of GIFs
  $('.nextBtn').on('click', function() {
    apiTerms.offset = parseInt(tpks[apiTerms.q] * 10);
    var queryURL = apiURL + $.param(apiTerms);
    tpks[apiTerms.q]++;
    deployGIFs(queryURL);
  });

  //listen on #prevBtn to display previous set of GIFs
  $('.prevBtn').on('click', function() {
    tpks[apiTerms.q]--;
    apiTerms.offset = parseInt((tpks[apiTerms.q] - 1) * 10);
    var queryURL = apiURL + $.param(apiTerms);
    deployGIFs(queryURL);
  });

  //pause/animate images on clicks
  $('body').on('click', '.gif', function(r) {
    var state = $(r.target).attr('data-state');

    if (state === 'still') {
      $(r.target).attr('src', $(r.target).attr('data-animate'));
      $(r.target).attr('data-state', 'animate');
    } else if (state === 'animate') {
      $(r.target).attr('src', $(r.target).attr('data-still'));
      $(r.target).attr('data-state', 'still');
    }
  });

  //get user's topic and deploy GIFs and create button for future use
  $('#submitTpk').on('click', function(event) {
    var usrTpk = $('#userTpk')
      .val()
      .trim();

    if (usrTpk !== '') {
      //put place holder back
      $('#userTpk').val('');

      //setup new apiTerm obj
      apiTerms.offset = 0;
      apiTerms.q = usrTpk;
      var queryURL = apiURL + $.param(apiTerms);
      deployGIFs(queryURL, usrTpk);

      //prevent event
      eventStopper(event);
    } else {
      alert('Field is empty. Type in topic first');

      //prevent event
      eventStopper(event);
    }
  });

  function eventStopper(event) {
    //e.cancelBubble is supported by IE - this will kill the bubbling process.
    event.cancelBubble = true;
    event.returnValue = false;
    //e.stopPropagation works only in Firefox.
    if (event.stopPropagation) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  //add buttons in to #disp-btn for each topics
  function addBtn(element) {
    var tpkBtn = $('<button>');
    tpkBtn.addClass('btn btn-secondary btn-sm m-2').attr('type', 'button');
    tpkBtn.html(element);
    $('#disp-btn').append(tpkBtn);
  }
});
