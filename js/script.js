//VARs FOR ADRESS FIELDS VALIDATION STATUS
let nameIsValid = false;
let addressTypeIsValid = false;
let addressTypeManualIsValid = true;
let addressIsValid = false;
let sityIsValid = false;
let stateIsValid = false;
let zipIsValid = false;
let phoneIsValid = false;
let emailIsValid = false;
//VARs FOR ORDER FIELDS VALIDATION STATUS
let doughtTypeIsValid = false;
let pizzaSizeIsValid = false;
let cheeseOptionIsValid = false;
let sauseOptionIsValid = false;
//VARs FOR BILLING ADDRESS FIELDS VALIDATION STATUS
let billingNameIsValid = false;
let billingAddressIsValid = false;
let billingCityIsValid = false;
let billingStateIsValid = false;
let billingZipIsValid = false;
let firstCardValidation = false;
let secondCardValidation = false;
let monthIsValid = false;
let yearIsValid = false;
let nameOnCardIsValid = false;
let cvvIsValid = false;

//LOAD ADRESS TYPES JSON LIST INTO DROPDOWN
let getAddressTypes = function(){
    $.getJSON('JSON/AddressType.js', (data)=> {
        $.each(data, (index, value)=>{
            $('#input_address_type:last-child').append("<option>" + value + "</option>");
        })
    })
}
//LOAD STALES JSON LIST INTO DROPDOWN (for delivery and billing forms)
let getStatesList = function(){
    $.getJSON('JSON/States.js', (data1)=> {
        $.each(data1, (index, value)=>{
            $('#input_state:last-child').append("<option>" + value + "</option>");
            $('#billing_input_state:last-child').append("<option>" + value + "</option>");
        })
    })
}
//CHECK IF ADDRESS TYPE EQUALS "OTHER" (ADD NEW INPUT FIELD IF IT IS)
let ifOtherAddressType = function(){
    let ifVisible = false;
    $('#input_address_type').change(()=>{
        if (ifVisible) {
            $("#additional_line").remove();
            addressTypeManualIsValid = true;
            ifVisible = false;
        } else {
            if ($('#input_address_type option:selected').text() === "Other") {
                $('#first_line').after("<div id=\"additional_line\" class=\"form-group\"\><label for=\"inputAddress\">Enter Address Type</label\><input class=\"form-control\" id=\"input_address_type_new\"></div>");
                ifVisible = true;
                addressTypeManualIsValid = false;
                userAddressTypeInputValidation();
            }
        }
    })
}
//NAME VALIDATION (for delivery form, billing form and payment information)
let nameValidation = function(){
    let displayNameTooltip = false;
    let namePattern = new RegExp(/^[a-z ,.'-]+$/i);
    $('#input_name, #billing_input_name, #name_on_card').each(function() {
        $(this).on('input', ()=>{
            if ($(this).val().trim() == "") {
                if (!displayNameTooltip) {
                    $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                    .after("<div id=\"name_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Plese provide correct name!</div>");
                    displayNameTooltip = true;
                    if ($(this).attr("id") == "input_name") {
                        nameIsValid = false;
                    }
                    if ($(this).attr("id") == "billing_input_name") {
                        billingNameIsValid = false;
                    }
                    if ($(this).attr("id") == "name_on_card") {
                        nameOnCardIsValid = false;  
                    }
                }
            }
            else if (namePattern.test($(this).val())) {
                if (displayNameTooltip) {
                    $('#name_tooltip').remove();
                    displayNameTooltip = false;
                }
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
                if ($(this).attr("id") == "input_name") {
                    nameIsValid = true;
                }
                if ($(this).attr("id") == "billing_input_name") {
                    billingNameIsValid = true;
                }
                if ($(this).attr("id") == "name_on_card") {
                    nameOnCardIsValid = true;  
                }
            }
            else {
                if (!displayNameTooltip) {
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"name_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Plese provate correct name!</div>");
                displayNameTooltip = true;
                if ($(this).attr("id") == "input_name") {
                    nameIsValid = false;
                    }
                if ($(this).attr("id") == "billing_input_name") {
                    billingNameIsValid = false;
                    }
                if ($(this).attr("id") == "name_on_card") {
                    nameOnCardIsValid = false;  
                    }
                }
            }
        })  
    });
}
//ADDRESS TYPE VALIDATION
let addressTypeValidation = function(){
    let displayAddressTypeTooltip = false;
    $('#input_address_type').change(()=>{
        $('#input_address_type').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
        addressTypeIsValid = true;

    })
}
//USER ADDRESS TYPE INPUT VALIDATION
let userAddressTypeInputValidation = function(){
    let displayUserAddrTypeTooltip = false;
    $('#input_address_type_new').on('input', ()=>{
        if ($('#input_address_type_new').val() == "") {
            $('#input_address_type_new').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            .after("<div id=\"address_type_input_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Enter your address type definition!</div>");
            displayUserAddrTypeTooltip = true;
            addressTypeManualIsValid = false;
        }
        else {
            if (displayUserAddrTypeTooltip) {
                $('#address_type_input_tooltip').remove();
            }
            $('#input_address_type_new').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            addressTypeManualIsValid = true;
        }
    })
}
//ADDRESS VALIDATION (for delivery and billing forms)
let addressValidation = function(){
    let displayAddressTooltip = false;
    $('#input_address, #billing_input_address').each(function(){
        $(this).on('input', ()=>{
            if ($(this).val().trim() == "") {
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"input_address_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Enter correct address!</div>");
                displayAddressTooltip = true;
                if ($(this).attr('id') == 'input_address') {
                    addressIsValid = false;
                }
                if ($(this).attr('id') == 'billing_input_address') {
                    billingAddressIsValid = false;
                }
            }
            else {
                if (displayAddressTooltip) {
                    $('#input_address_tooltip').remove();
                }
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
                if ($(this).attr('id') == 'input_address') {
                    addressIsValid = true;
                }
                if ($(this).attr('id') == 'billing_input_address') {
                    billingAddressIsValid = true;
                }
            }
        })
    })
}
//CITY VALIDATION (for delivery and billing forms)
let cityValidation = function(){
    let displayCityTooltip = false;
    $('#input_city, #billing_input_city').each(function() {
        $(this).on('input', ()=>{
            if ($(this).val().trim() == "") {
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"input_city_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Enter correct city!</div>");
                displayCityTooltip = true;
                if ($(this).attr('id') == 'input_city') {
                    sityIsValid = false;
                }
                if ($(this).attr('id') == 'billing_input_city') {
                    billingCityIsValid = false;
                }
            }
            else {
                if (displayCityTooltip) {
                    $('#input_city_tooltip').remove();
                }
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
                if ($(this).attr('id') == 'input_city') {
                    sityIsValid = true;
                }
                if ($(this).attr('id') == 'billing_input_city') {
                    billingCityIsValid = true;
                }
           }   
        })
    })
}
//STATE VALIDATION (for delivery and billing forms)
let stateValidation = function(){
    let displayStateTooltip = false;
    $('#input_state, #billing_input_state').each(function() {
        $(this).change(()=>{
            $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            if ($(this).attr('id') == 'input_state') {
                stateIsValid = true;
            }
            if ($(this).attr('id') == 'billing_input_state') {
                billingStateIsValid = true;
            }
        })
    })
}
//ZIP VALIDATION (for delivery and billing forms)
let zipValidation = function() {
    let displayZipTooltip = false;
    let zipPattern = new RegExp(/^\d{5}$/);
    $('#input_zip, #billing_input_zip').each(function() {
        $(this).on('input', ()=>{
            if (zipPattern.test($(this).val())) {
                if(displayZipTooltip) {
                    $('#input_zip_tooltip').remove();
                    displayZipTooltip = false;
                }
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
                if ($(this).attr('id') == 'input_zip') {
                    zipIsValid = true;
                }
                if ($(this).attr('id') == 'billing_input_zip') {
                    billingZipIsValid = true;
                }
            }
            else {
                if (!displayZipTooltip) {
                $(this).css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"input_zip_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Enter correct ZIP!</div>");
                displayZipTooltip = true;
                }
                if ($(this).attr('id') == 'input_zip') {
                    zipIsValid = false;
                }
                if ($(this).attr('id') == 'billing_input_zip') {
                    billingZipIsValid = false;
                }
            }    
        })
    })
}
//PHONE NUMBER VALIDATION
let phoneValidation = function() {
    let displayPhoneTooltip = false;
    let phonePattern = new RegExp(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/);
    $('#input_phone_number').on('input', ()=>{
        if (phonePattern.test($('#input_phone_number').val())) {
            if(displayPhoneTooltip) {
                $('#input_phone_number_tooltip').remove();
                displayPhoneTooltip = false;
            }
            $('#input_phone_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            phoneIsValid = true;
        }
        else {
            if (!displayPhoneTooltip) {
            $('#input_phone_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            .after("<div id=\"input_phone_number_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Follow the pattern or enter correct phone number!</div>");
            displayPhoneTooltip = true;
            }
            phoneIsValid = false;
        }    
    })
}
//EMAIL VALIDATION
let emailValidation = function() {
    let displayEmailTooltip = false;
    let emailPattern = new RegExp(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$/);
    $('#input_email').on('input', ()=>{
        if (emailPattern.test($('#input_email').val())) {
            if(displayEmailTooltip) {
                $('#input_email_tooltip').remove();
                displayEmailTooltip = false;
            }
            $('#input_email').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            emailIsValid = true;
        }
        else {
            if (!displayEmailTooltip) {
            $('#input_email').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            .after("<div id=\"input_email_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Follow the pattern or enter correct email address!</div>");
            displayEmailTooltip = true;
            }
            emailIsValid = false;
        }    
    })
}
//CLICKING "CONFIRM ADDRESS" BUTTON
let confirmDeliveryAddress = function() {
    $('#order').hide();
    $('#order_alert').hide();
    $('#billing_info').hide();
    $('#thank_you_alert').hide();
    $('#submit_button').on('click', ()=>{
        event.preventDefault();
        if (nameIsValid&&addressTypeIsValid&&addressTypeManualIsValid&&addressIsValid&&sityIsValid&&stateIsValid&&zipIsValid&&phoneIsValid&&emailIsValid) {
            $("html, body").animate({scrollTop: 0}, 1400);
            $('#delivery_info').hide();
            $('#order').show(); 
            if ($('#order_price').text().length > 0) {
                $('#order_alert').show();
            }
        }
        else {
            window.alert('PLEASE FILL OUT ALL REQUERID FIELDS');
            if(!nameIsValid) {
                $('#input_name').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!addressTypeIsValid) {
                $('#input_address_type').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            } 
            if(!addressTypeManualIsValid) {
                $('#input_address_type_new').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!addressIsValid) {
                $('#input_address').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!sityIsValid) {
                $('#input_city').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!stateIsValid) {
                $('#input_state').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!zipIsValid) {
                $('#input_zip').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!phoneIsValid) {
                $('#input_phone_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
            if(!emailIsValid) {
                $('#input_email').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            }
        }
//  nameIsValid&&addressTypeIsValid&&addressTypeManualIsValid&&addressIsValid&&sityIsValid&&stateIsValid&&zipIsValid&&phoneIsValid&&emailIsValid
    })
}
//CHANGE DROPDONW VALUES BASED ON DOUGH TYPE, PRINT SELECTED VALUE IN THE "ORDER ALERT" AND MAKE PIZZA SIZE DROPDOWN AVAILIBLE
let selectDoughType = function() {
    let doughPrice = [];
    $('#dough_type input').on('change', ()=>{
        $('#hand_tossed').css('box-shadow', 'none');
        $('#thin_crust').css('box-shadow', 'none');
        $('#new_york_style').css('box-shadow', 'none');
        $('#gluten_free').css('box-shadow', 'none');
        doughtTypeIsValid = true;
        $('#order_alert').show();
        $('#order_dough').text('').text("Dough type: " + $('#dough_type input[name=dough_type]:checked').val());
        $('#pizza_size').prop("disabled", false);
        switch ($('#dough_type input[name=dough_type]:checked').val()) {   
            case "Hand Tossed":
                doughPrice = [{name:"Small", price:9.99}, {name:"Medium",price:12.99}, {name:"Large",price:14.99}];
                break;
            case "Thin Crust":
                doughPrice = [{name:"Medium",price:11.99}, {name:"Large",price:13.99}];
                break;
            case "New York Style":
                doughPrice = [{name:"Large",price:16.99}, {name:"Extra Large",price:19.99}];
                break;
            case "Gluten Free":
                doughPrice = [{name:"Small",price:10.99}];
                break;
        }
        $('#pizza_size option:not(:first-child)').remove();
        $.each(doughPrice, (i, element)=>{
            $('#pizza_size').append($('<option value="' + element.name + '" data-price=' + element.price + '></option>').html(element.name + " ($" + element.price + ")")); 
        })
        getPizzaPrice();
        if ($('#pizza_size').val() != null) {
            $('#order_size').text("Pizza size: ").append($('#pizza_size').val());
        }
    })
}
//PRINT PIZZA SIZE SELECTED VALUE IN THE "ORDER ALERT" AND MAKE CHESE OPTION DROPDOWN AVAILIBLE
let selectPizzaSize = function() {
    $('#pizza_size').on('change', ()=> {
        $('#pizza_size').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
        pizzaSizeIsValid = true;
        getPizzaPrice();
        if ($('#pizza_size').val() != "Choose...") {
            $('#order_size').text("Pizza size: ").append($('#pizza_size').val());
            $('#chese_option').prop("disabled", false);
        }
    })
}
//PRINT CHESE SELECTED VALUE IN THE "ORDER ALERT" AND MAKE SAUCE OPTION DROPDOWN AVAILIBLE
let selectCheeseOption = function() {
    $('#chese_option').on('change', ()=> {
        $('#chese_option').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
        cheeseOptionIsValid = true;
        getPizzaPrice();
        if ($('#chese_option').val() != "Choose...") {
            $('#order_chese').text('').text('Chese: ' + $('#chese_option').val());
            $('#sauce_option').prop("disabled", false);
        }
    })
}
//PRINT SAUCE SELECTED VALUE IN THE "ORDER ALERT" AND MAKE TOPPING CHECKBOXES AVAILIBLE
let selectSauceOption = function() {
    $('#sauce_option').on('change', ()=> {
        $('#sauce_option').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
        sauseOptionIsValid = true;
        getPizzaPrice();
        if ($('#sauce_option').val() != "Choose...") {
            $('#order_sauce').text('').text('Sauce: ' + $('#sauce_option').val());
            $('input[type=checkbox]').prop("disabled", false);
            $('#submit_button_2').attr('data-target', '#exampleModal');
        }
    })
}
//PRINT TOPPING SELECTED VALUE IN THE "ORDER ALERT"
let toppings = function() {
    $("input[type='checkbox']").change(function() {
        getPizzaPrice();
        if(this.checked) {
            if ($('#order_topping').text() == '') {
                $('#order_topping').append('Topping: ' + '<span data-x="' + this.value + '">' + this.value + '</span>');
            }
            else {
                $('#order_topping').append('<span data-x="' + this.value + '">' + '/' + this.value + '</span>');
            }
        }
        else {
            $('span[data-x=' + this.value + ']').remove();
            if (!$('[data-x]').length) {
                $('#order_topping').text('');
            }
        }

    })
}
//SHOW "TOTAL PRICE" IN ORDER_ALERT
let getPizzaPrice = function(){
    if (($('#pizza_size').find(':selected').attr("data-price") >= 0)
        &&($('#chese_option').find(':selected').attr("data-price") >= 0)
        &&($('#sauce_option').find(':selected').attr("data-price") >= 0)) {
            $('#order_price').text("TOTAL PRICE: $").append((parseFloat($('#pizza_size').find(':selected').attr("data-price")) + 
                                                    parseFloat($('#chese_option').find(':selected').attr("data-price")) + 
                                                    parseFloat ($('#sauce_option').find(':selected').attr("data-price")) +
                                                    $("input[type='checkbox']:checked").length*0.99).toFixed(2));
    }  
}
//CLICKING "FINISH BUILDING PIZZA" BUTTON: REVIEW INFORMATION OR PROCEED
let confirmOrder = function() {
    $('#submit_button_2').on('click', (event)=> {
        // doughtTypeIsValid&&pizzaSizeIsValid&&cheeseOptionIsValid&&sauseOptionIsValid
        event.preventDefault();
            if (doughtTypeIsValid&&pizzaSizeIsValid&&cheeseOptionIsValid&&sauseOptionIsValid) {
            $('#review_information_button').on('click', (event)=> {
                event.preventDefault();
                $('#order').hide();
                $('#order_alert').hide();
                $('#delivery_info').show();
    
            })
            $('#proceed_button').on('click', ()=> {
                $("html, body").animate({scrollTop: 0}, 1400);
                $('#order').hide();
                $('#order_alert').hide();
                $('#billing_info').show();
            })
        }
        else {
            event.preventDefault();
            $("html, body").animate({scrollTop: 0}, 1400);
            if (!doughtTypeIsValid) {
                $('#hand_tossed').css('box-shadow', '0px 0px 10px red');
                $('#thin_crust').css('box-shadow', '0px 0px 10px red');
                $('#new_york_style').css('box-shadow', '0px 0px 10px red');
                $('#gluten_free').css('box-shadow', '0px 0px 10px red');
            }
            if (!pizzaSizeIsValid) {
                $('#pizza_size').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if (!cheeseOptionIsValid) {
                $('#chese_option').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if (!sauseOptionIsValid) {
                $('#sauce_option').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
        }
    })
}
//"SAME AS DELIVERY ADRESS" CHECKBOX
let copyDeliveryInformation = function() {
    let isCopied = false;
    $('#copy_delivery_info').change(()=>{
        if(!isCopied) {
            $('#billing_input_name').val($('#input_name').val());
            $('#billing_input_name').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            billingNameIsValid = true;
            $('#billing_input_address').val($('#input_address').val());
            $('#billing_input_address').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            billingAddressIsValid = true;
            $('#billing_input_apt').val($('#input_apt').val());
            $('#billing_input_city').val($('#input_city').val());
            $('#billing_input_city').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            billingCityIsValid = true;
            $('#billing_input_state').val($('#input_state').val());
            $('#billing_input_state').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            billingStateIsValid = true;
            $('#billing_input_zip').val($('#input_zip').val());
            $('#billing_input_zip').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            billingZipIsValid = true;
            isCopied = true;
        }
        else {
            $('#billing_input_name').val('');
            $('#billing_input_name').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            billingNameIsValid = false;
            $('#billing_input_address').val('');
            $('#billing_input_address').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            billingAddressIsValid = false;
            $('#billing_input_apt').val('');
            $('#billing_input_city').val('');
            $('#billing_input_city').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            billingCityIsValid = false;
            $('#billing_input_state').val('');
            $('#billing_input_state').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            billingStateIsValid = false;
            $('#billing_input_zip').val('');
            $('#billing_input_zip').css('border', 'solid').css('border-width', '2px').css('border-color', 'red');
            billingZipIsValid = false;
            isCopied = false;
        }
    })
}
//CVV VALIDATION
let cvvValidation = function() {
    let cvvPattern = new RegExp(/^\d{3}$/);
    let displayCvvTooltip = false;
    // let cvvIsValid = false;
    $('#cvv').on('input', ()=>{
        if (cvvPattern.test($('#cvv').val())) {
            if(displayCvvTooltip) {
                $('#cvv_tooltip').remove();
                displayCvvTooltip = false;
            }
            $('#cvv').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
            cvvIsValid = true;
        }
        else {
            if (!displayCvvTooltip) {
            $('#cvv').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            .after("<div id=\"cvv_tooltip\" class=\"invalid-tooltip\">This is required field.<br>Enter correct CVV!</div>");
            displayCvvTooltip = true;
            }
            cvvIsValid = false;
        } 
    })
}
//EXPIRATION MONTH VALIDATION
let monthValidation = function() {
    // let monthIsValid = false;
    $('#expiration_month').change(()=>{
        $('#expiration_month').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
        monthIsValid = true;
    })
}
//EXPIRATION YEAR VALIDATION
let yearValidation = function() {
    // let yearIsValid = false;
    $('#expiration_year').change(()=>{
        $('#expiration_year').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
        yearIsValid = true;
    })
}
//CARD NUMBER VALIDATION_1
let cardNumberValidation_1 = function() {
    // let firstCardValidation = false;
    let displayWrongCardTooltip = false;
    let numberPattern = new RegExp(/^\d+$/);
    $('#card_number').on('input', ()=>{
        if (!secondCardValidation) {
            $('#cadr_tooltip_1').remove();
            // $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-width','thin').css('border-color', '#ced4da');
        }
        if ($('#card_number').val() === '') {
            $('#card_number').css('background-image', 'none');
            firstCardValidation = false;
            if (displayWrongCardTooltip) {
                $('#cadr_tooltip').remove();
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-width','thin').css('border-color', '#ced4da');
                displayWrongCardTooltip = false;
            }
        }
        else if (numberPattern.test($('#card_number').val())) {
            if ($('#card_number').val()[0] === '3' && $('#card_number').val().length <= 15) {
                $('#card_number').css('background-image', 'none');
                if (displayWrongCardTooltip) {
                    $('#cadr_tooltip').remove();
                    $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-width','thin').css('border-color', '#ced4da');
                }
                displayWrongCardTooltip = false;
                if ($('#card_number').val().length > 1) {
                    if ($('#card_number').val()[1] === '7') {
                        $('#card_number').css('background-image', 'url(https://yourmileagemayvary.net/wp-content/uploads/2019/03/American-Express_Pentagram_Boteco-Design_04-1024x768-299289753-1563853021517.jpg)');
                        if ($('#card_number').val().length == 15) {
                            firstCardValidation = true; 
                        }
                    }
                    else {
                        if (!displayWrongCardTooltip) {
                            $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                            .after("<div id=\"cadr_tooltip\" class=\"invalid-tooltip\">Enter correct Card Number!</div>");
                        }
                        displayWrongCardTooltip = true;
                        firstCardValidation = false;
                    }
                }
            }
            else if ($('#card_number').val()[0] === '4' && $('#card_number').val().length <= 16) {
                if (displayWrongCardTooltip) {
                    $('#cadr_tooltip').remove();
                    $('#card_number').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
                }
                displayWrongCardTooltip = false;
                firstCardValidation = false;
                $('#card_number').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png)');
                if ( $('#card_number').val().length == 16 || $('#card_number').val().length == 13) {
                    firstCardValidation = true; 
                }
            }
            else if ($('#card_number').val()[0] === '5' && $('#card_number').val().length <= 16) {
                $('#card_number').css('background-image', 'none'); 

                if (displayWrongCardTooltip) {
                    $('#cadr_tooltip').remove();
                    $('#card_number').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
                }
                displayWrongCardTooltip = false;
                if ($('#card_number').val().length > 1) {
                    if (['1','2','3','4','5'].indexOf($('#card_number').val()[1]) >= 0) {
                        // window.alert('MasterCard');
                        $('#card_number').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png)');
                        $('#cadr_tooltip').remove();
                        $('#card_number').css('border', 'solid').css('border-width','thin').css('border-color', '#ced4da');
                        displayWrongCardTooltip = false;
                        if ($('#card_number').val().length == 16) {
                            firstCardValidation = true;  
                        }
                    }
                    else {
                        if (!displayWrongCardTooltip) {
                            $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                            .after("<div id=\"cadr_tooltip\" class=\"invalid-tooltip\">Enter correct Card Number!</div>");
                        }
                        displayWrongCardTooltip = true;
                        firstCardValidation = false; 
                    }
                }   
            }
            else {
                $('#card_number').css('background-image', 'none');
                firstCardValidation = false;
                if (!displayWrongCardTooltip) {
                    $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                    .after("<div id=\"cadr_tooltip\" class=\"invalid-tooltip\">Enter correct Card Number!</div>");
                    displayWrongCardTooltip = true;
                }
            }
        }
        else {
            $('#card_number').css('background-image', 'none');
            if (!displayWrongCardTooltip) {
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"cadr_tooltip\" class=\"invalid-tooltip\">Enter correct Card Number!</div>");
                displayWrongCardTooltip = true;
            }
            firstCardValidation = false;
        }
    })
}
//CARD NUMBER VALIDATION_2
let cardNumberValidation_2 = function() {
    $('#card_number').change(()=>{
        window.console.log(firstCardValidation);
        let displayWrongCardTooltip_1 = false;
        // let secondCardValidation = false;
        let sum = 0;
        if (firstCardValidation) {
            let cardNubberToArr = $('#card_number').val().split("").reverse();
            for (let i = 0; i < cardNubberToArr.length; i++) { 
                if (i == 0 || i % 2 == 0) {
                    sum += parseInt(cardNubberToArr[i]);
                }
                else {
                    if (cardNubberToArr[i] >= 5) {
                        sum += 1;
                        sum += (parseInt(cardNubberToArr[i]) - 10);
                    }
                    else {
                        sum += parseInt(cardNubberToArr[i])*2;
                    }
                }
            }
            if (sum % 10 != 0) {
                // window.alert('Wrong number');
                if (!displayWrongCardTooltip_1) {
                    $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                    .after("<div id=\"cadr_tooltip_1\" class=\"invalid-tooltip\">Check Your Card Number!</div>");
                }
                secondCardValidation = false;
                displayWrongCardTooltip_1 = true;   
            }
            else {
                $('#cadr_tooltip_1').remove();
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'green');
                secondCardValidation = true;
                displayWrongCardTooltip_1 = false;   
            }
        }
        else {
            if (!displayWrongCardTooltip_1) {
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
                .after("<div id=\"cadr_tooltip_1\" class=\"invalid-tooltip\">Check Your Card Number!</div>");
            }
            secondCardValidation = false;
        }
    })
}
//CLICK SUBMIT MY ORDER BUTTON
let submitMyOrder = function() {
    $('#submit_button_3').on('click', (event)=> {
        event.preventDefault();
        if (billingNameIsValid&&billingAddressIsValid&&billingCityIsValid&&billingStateIsValid&&billingZipIsValid&&firstCardValidation&&secondCardValidation&&monthIsValid&&yearIsValid&&nameOnCardIsValid&&cvvIsValid) {
            $('#billing_info').hide();
            $('#thank_you_alert').show();
        }
        else {
            window.alert('PLEASE FILL OUT ALL REQUERID FIELDS');
            if(!billingNameIsValid) {
                $('#billing_input_name').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!billingAddressIsValid) {
                $('#billing_input_address').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!billingCityIsValid) {
                $('#billing_input_city').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!billingStateIsValid) {
                $('#billing_input_state').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!billingZipIsValid) {
                $('#billing_input_zip').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!firstCardValidation) {
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!secondCardValidation) {
                $('#card_number').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!monthIsValid) {
                $('#expiration_month').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!yearIsValid) {
                $('#expiration_year').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!nameOnCardIsValid) {
                $('#name_on_card').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
            if(!cvvIsValid) {
                $('#cvv').css('border', 'solid').css('border-width', '2px').css('border-color', 'red')
            }
        }
    })
}
$(()=>{
    getAddressTypes();
    getStatesList();
    ifOtherAddressType();
    nameValidation();
    addressTypeValidation();
    addressValidation();
    cityValidation();
    stateValidation();
    zipValidation();
    phoneValidation();
    emailValidation();
    confirmDeliveryAddress();
    selectDoughType();
    selectPizzaSize();
    selectCheeseOption();
    selectSauceOption();
    toppings();
    confirmOrder();
    copyDeliveryInformation();
    cvvValidation();
    monthValidation();
    yearValidation();
    cardNumberValidation_1();
    cardNumberValidation_2();
    submitMyOrder();
})