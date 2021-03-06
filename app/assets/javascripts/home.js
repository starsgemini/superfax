$(function() {
  $(".number input").on("focus", function() {
    $(".bubble_" + $(this).attr("id")).fadeIn();
  });

  $(".number input").on("focusout", function() {
    $(".bubble").fadeOut();
  });

  $(".bubble_country_code label").on("click", function() {
    $("#country_code").val($(this).attr("id"));
  });

  $(".number #button_send").on("click", function(e) {
    e.preventDefault();
    $(".alert-danger").hide();
    $(".main_panel").css("height", "350px");
    $(".bubble").css("top", "100px");
    verify_fields(function() {
      $(".number #upload").get(0).click();
    });
  });

  $("body").delegate(".number #upload", "change", function() {
    $(".instructions").hide();
    $(".status").show("slow");
    $(".form_fax").submit();
    $(".input_form").attr("disabled", "disabled");
  });

  $("#send_fax").on("click", function(e) {
    $(".send_fax").hide();
    $(".status").show("slow");
    $(".status label").show("slow");

    e.preventDefault();
    var fax_id = $(this).attr("fax_id");
    $.ajax({
      type: "POST",
      url: "/send_fax",
      data: {fax_id: fax_id}
    });
  });

  $("#payment").on("click", function() {
    $("#form_payment").submit();
  });
});

function verify_fields(callback) {
  var message = "";
  if($("#country_code").val() == "") {
    message = "Selecione o código do país para o qual deseja enviar.<br>";
  }
  if($("#ddd").val() == "") {
    message += "Digite o ddd do número para o qual deseja enviar o fax.<br>";
  }
  if($("#number").val() == "") {
    message += "O campo número não pode ficar em branco.";
  }

  if(message != "") {
    $(".alert-danger").html(message);
    $(".alert-danger").show();
    $(".main_panel").css("height", "420px");
    $(".bubble").css("top", "180px");
  }
  else {
    callback();
  }
}

function fax_sended(data) {
  alert(JSON.stringify(data));
}

function fax_sended_error(data) {
  alert("erro\n " + JSON.stringify(data));
}

function set_pagseguro_id(pagseguro_id) {
  PagSeguroDirectPayment.setSessionId(pagseguro_id);
}

function get_sender_hash() {
  var hash = PagSeguroDirectPayment.getSenderHash();
  alert(hash);
}
