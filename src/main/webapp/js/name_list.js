// Main Javascript File
function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
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