const preSelectedTopics = [
  "donald trump",
  "fake news",
  "CNN",
  "Hilary Clinton",
  "Democrat",
  "Republican",
  "snow flake",
  "liberal",
  "socialist"
];

$(document).ready(function () {

  preSelectedTopics.forEach(element => {
    addBtn(element);
  });

  $('#disp-btn').on('click', 'button', function (r) {
    console.log(r);
    var gifTopic = r.target.innerHTML;
    console.log(gifTopic);

  });

  $('#submitTpk').on('click', function () {
    console.log($('#userTpk').val());
    addBtn($('#userTpk').val());
    $('#userTpk').val('');
    event.preventDefault();
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
