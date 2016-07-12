import $ as jquery from ../ node_modules / jquery;

var $loginPage;
var $chatPage;
var userName;
var $li = $('<li></li>').attr('class', listItem._id);
var $deleteButton = $('<button>Delete</button>').on('click', function(evt) {
    console.log(evt);
    $('.' + listItem._id).remove();
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/gabe/' + listItem._id,
        type: 'DELETE',
        dataType: 'json',
        success: function(response) {
            console.log('delete', response);
        }
    });
});

$(document).ready(function() {
    $('#wrapper').empty();
    $('#wrapper').append($loginPage);
    $('#submitButton').on('click', function(evt) {
        $('userName').text = userName;
        $('wrapper').empty();
        $('wrapper').append($chatPage);
        $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                response.forEach(function(message) {
                  $li.text(listItem.input);
                  if(userName === message.userName) {
                    $li.prepend($deleteButton);
                  }
                  $('#chatDisp').append($li);
                });
            }
        });
        $('chatButton').on('click', function(evt) {
          var input = $('#chatBox').val();
          $li.text(input);
          $li.prepend($deleteButton);
          $('#chatDisp').append($li);
          $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
            type: 'POST',
            success: function(message) {
                $li.attr('class', message._id);
                if(userName === message.userName) {
                  $li.prepend($deleteButton);
                }
            },
            contentType: 'application/json',
            data: JSON.stringify({
                input: input,
                userName : userName
            })
        });
        });
    });


});
