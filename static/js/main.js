//AJAX to delete article (DELETE)
$(".delete").on('click', function(e){
  e.preventDefault();
  console.log("Delete just got clicked...");
  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    // get data returned from the DELETE route
    console.log(data);

    // go back to the homepage after deleting anything.
    window.location = '/show';
  });
});

//AJAX to edit article (PUT)
$(".edit-form").on('submit', function(e){
  e.preventDefault();
  console.log("Edit submit just got clicked...");
  var element = $(this);
  var url = element.attr('action');
  var formData = element.serialize();

  $.ajax({
    method: 'PUT',
    url: url,
    data: formData
  }).done(function(data){
    console.log(data);
    window.location = '/show';
  })
});
