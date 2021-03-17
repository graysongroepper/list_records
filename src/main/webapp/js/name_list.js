// Main Javascript File
function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString){
    let cleaned = phoneNumberString.replace(/\D/g, '');

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumberString
}

function getDate(sqlDate){
    let cleaned = sqlDate.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    let date = new Date(match[1], match[2], match[3]);
    return date;
}

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");
    let url = "api/name_list_get";

    $.getJSON(url, null, function (json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.

            $(`#datatable tbody tr`).remove();
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first);

                bday = getDate((json_result[i].birthday));
                bdayString = bday.toLocaleDateString();
                console.log(bday);

                $(`#datatable tbody`).append(`<tr><td>`
                    +json_result[i].id
                    +'</td><td>'
                    +json_result[i].first
                    +'</td><td>'
                    +json_result[i].last
                    +'</td><td>'
                    +json_result[i].email
                    +'</td><td>'
                    +json_result[i].phone
                    +'</td><td>'
                    +json_result[i].birthday
                    +`</td></tr>`);
            }
        console.log("Done");
        }
    );
}
// Call your code.
updateTable();


// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').removeClass("is-invalid");
    $('#id').removeClass("is-valid");

    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");


    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");


    // Show the hidden dialog
    $('#myModal').modal('show');
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function saveChanges() {
    console.log("Save Changes");

    let isValid = true;

    let firstName = $('#firstName').val();
    console.log("First name: " + firstName);

    let lastName = $('#lastName').val();
    console.log("Last name: " + lastName);

    let email = $('#email').val();
    console.log("Email address: " + email);

    let phone = $('#phone').val();
    console.log("Phone number: " + phone);

    let birthday = $('#birthday').val();
    console.log("Birthday: " + birthday);

    let reg = /^[A-Za-z]{1,10}$/;
    let emailReg = /^([A-Za-z0-9]{1,20})@([A-Za-z]{1,20})\.([A-Za-z]{1,20})$/
    let phoneReg = /^[0-9]{1,10}$/;
    let birthdayReg = /^(\d{4})-(\d{2})-(\d{2})$/

    if (reg.test(firstName)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        // This is an INVALID field
        isValid = false;
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");

    }

    if (reg.test(lastName)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        isValid = false;
        // This is an INVALID field
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }

    if (emailReg.test(email)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        // This is an INVALID field
        isValid = false;
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }

    if (phoneReg.test(phone)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        // This is an INVALID field
        isValid = false;
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
    }

    if (birthdayReg.test(birthday)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        // This is an INVALID field
        isValid = false;
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }
    if (isValid) {
        console.log("Valid form");
        // Code to submit your form will go here.
        let my_data = {first: firstName, last: lastName,
        email: email, phone: phone, birthday: birthday};

        console.log(my_data);

        let url = "api/name_list_edit";
        let myFieldValue = $("#jqueryPostJSONField").val();
        let dataToServer = {first: firstName, last: lastName,
            email: email, phone: phone, birthday: birthday};

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                //update table, window reload, close window
                updateTable();
                window.location.reload();
                console.log(dataFromServer);
                close.window();
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }

}
