jQuery(function($) {  
  // Function available at https://gist.github.com/sixlive/55b9630cc105676f842c  
  $.fn.printDiv = function() {
    var printContents = $(this).html();
    var originalContents = $('body').html();
    $('body').html(printContents);
    $('body').addClass('js-print');
    window.print();
    $('body').html(originalContents);
    $('body').removeClass('js-print');
  };

  // Print
  $('[data-print]').click(function() {
      $('[data-print-content]').printDiv();
  });
});
