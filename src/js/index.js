// Third Party Modules
import $ from 'jquery/dist/jquery.min.js';
// JQuery Custom Code 
$(document).ready(function(){
  var hostName = 'http://localhost/php/crud_restapi/';

// Show Success or Error Messages
function msg(message,status){
  if (status == true) {
    $('#success-message').html(message).slideDown();
    $('#error-message').slideUp();
    setTimeout(function(){
      $('#success-message').slideUp()
    } , 4000);
  }else if(status == false){
    $('#error-message').html(message).slideDown();
    $('#success-message').slideUp();
    setTimeout(function(){
      $('#error-message').slideUp()
    } , 4000);
  }
}

// Convert Form Data to Json Object
function jsonData(target){
  var arr = $(target).serializeArray();
    // console.log(arr);
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value == '') {
        return false;
      }
      obj[arr[i].name] = arr[i].value;
    }
    var data = JSON.stringify(obj);
    return data;
  }

// Fetch All Records
function loadTable(){
  $('#load-table').html('');
  $.ajax({
    url: hostName +'api-fetch-all.php',
    type: "GET",
    success: function(data){
      if (data.status ==false) {
        $("#load-table").append("<tr><td colspan='6'><h2>"+data.message+"</h2></td></tr>")
      } else {
        $.each(data, function(key,value){
          $("#load-table").append(
            "<tr><td class='center'>"
            + value.id +"</td><td>"
            + value.student_name +"</td><td>"
            + value.age +"</td><td>"
            + value.city +"</td>"+
            '<td class="center"><button class="edit-btn" data-eid="'+value.id+'">Edit</button></td>'+
            '<td class="center"><button class="delete-btn" data-did="'+value.id+'">Delete</button></td>'
            +"</tr>")
        })
      }
    }
  })
}
loadTable();

  //Insert New Record
  $('#save-button').on('click' , function(e){
    e.preventDefault();
    var data = jsonData('#addForm');
    if (data == false) {
      msg('All Fields are Required.',false);
    } else {
      $.ajax({
        url: hostName +'api-insert.php',
        type: "POST",
        data: data,
        success: function(data){
          msg(data.message, data.status);
          if(data.status == true) {
            loadTable();
            $('#addForm').trigger('reset');
          }
        }
      })
    }
  })

  //Delete Record
  $(document).on('click', '.delete-btn', function(){
    if (confirm("Do you really want to delete this record ?")) {
      var id = $(this).data('did');
      var obj = {did : id};
      var data = JSON.stringify(obj);
      var row = this;
      $.ajax({
        url: hostName +'api-delete.php',
        type: "POST",
        data: data,
        success: function(data){
          msg(data.message , data.status);
          if (data.status == true) { $(row).closest('tr').fadeOut();
        }
      }
    })
    }
  })

  //Fetch Single Record : Show in Modal Box
  $(document).on('click', '.edit-btn', function(){
    $('#modal').show();
    var id = $(this).data('eid');
    var obj = {sid : id};
    var data = JSON.stringify(obj);
    $.ajax({
      url: hostName +'api-fetch-single.php',
      type: "POST",
      data: data,
      success: function(data){
        $('#edit-id').val(data[0].id);
        $('#edit-name').val(data[0].student_name);
        $('#edit-age').val(data[0].age);
        $('#edit-city').val(data[0].city);
      }
    })
  })

  //Hide Modal Box
  $('#close-btn').on('click',function(){
    $('#modal').hide();
  })

  //Update Record
  $('#edit-submit').on('click' , function(e){
    e.preventDefault();
    var data = jsonData('#edit-form');
    if (data == false) {
      msg('All Fields are Required.',false);
    } else {
      $.ajax({
        url: hostName +'api-update.php',
        type: "POST",
        data: data,
        success: function(data){
          msg(data.message, data.status);
          if(data.status == true) {
            $('#modal').hide();
            loadTable();
          }
        }
      })
    }
  })

  //Live Search Record
  $('#search').on('keyup', function(){
    var term = $(this).val();
    $('#load-table').html('');
    $.ajax({
      url: hostName +'api-search.php?term='+term,
      type: "GET",
      success: function(data){
       if (data.status == false) {
        $('#load-table').html('');
        $("#load-table").append("<tr><td colspan='6'><h2>"+data.message+"</h2></td></tr>")
      } else {
        $.each(data, function(key,value){
          $("#load-table").append(
            "<tr><td class='center'>"
            + value.id +"</td><td>"
            + value.student_name +"</td><td>"
            + value.age +"</td><td>"
            + value.city +"</td>"+
            '<td class="center"><button class="edit-btn" data-eid="'+value.id+'">Edit</button></td>'+
            '<td class="center"><button class="delete-btn" data-did="'+value.id+'">Delete</button></td>'
            +"</tr>")
        })
      }
    }
  })
  })

// Close Jquery Document Braces
})