$(document).on("click",".modal-open",function() {
	var data = $(this).data('modal');
	var shade = $("<div/>",{
		html: "",
		class: "modal-shade"
	});
	var close_mdl = $("<a/>",{
		html: "&#215;",
		class: "close-modal",
	});
	var window = $("<div/>",{
		html: data,
		class: "modal-window"
	});
	window.prepend(close_mdl);
	shade = $("<div/>",{
		html: "",
		class: "modal-shade"
	});
	$("body").prepend(shade,window);
	$(".modal-shade").fadeIn(350);
	$(".modal-window").show(350);
});
$(document).on("click",".modal-shade",function() {
	$(".modal-shade").fadeOut(200,function() {
		$(this).remove();
	});
	$(".modal-window").fadeOut(200,function() {
		$(this).remove();
	});
});
$(document).on("click",".close-modal",function() {
	$(".modal-shade").fadeOut(200,function() {
		$(this).remove();
	});
	$(".modal-window").fadeOut(200,function() {
		$(this).remove();
	});
});