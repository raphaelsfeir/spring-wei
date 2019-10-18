$(document).ready(function() {
  $('input.inputAuth').each(function(){
    $(this).on('blur', function(){
      if($(this).val().trim() !== "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    });
  });

  let showPass = 0;
  $('.btn-show-pass').on('click', function(){
    if(showPass === 0) {
      $(this).next('input').attr('type','text');
      $(this).find('i').removeClass('fa-eye');
      $(this).find('i').addClass('fa-eye-slash');
      showPass = 1;
    }
    else {
      $(this).next('input').attr('type','password');
      $(this).find('i').addClass('fa-eye');
      $(this).find('i').removeClass('fa-eye-slash');
      showPass = 0;
    }
  });

});
