

package edu.simpson.cis320.crud_app;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")
public class NameListEdit extends HttpServlet {

    private Pattern nameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit() {

        nameValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
        emailValidationPattern = Pattern.compile("^([A-Za-z0-9]{1,20})@([A-Za-z]{1,20})\\.([A-Za-z]{1,20})$");
        phoneValidationPattern = Pattern.compile("^[0-9]{1,10}$");
        birthdayValidationPattern = Pattern.compile("^(\\d{4})-(\\d{2})-(\\d{2})$");
    }

    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "doPost for FormTestJSONServlet");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "First Name: "+person.first);
        log.log(Level.INFO, "Last Name: "+person.last);
        log.log(Level.INFO, "Email: "+person.email);
        log.log(Level.INFO, "Phone: "+person.phone);
        log.log(Level.INFO, "Birthday: "+person.birthday);


        Matcher first = nameValidationPattern.matcher(person.getFirst());
        if (!first.find()){
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher last = nameValidationPattern.matcher(person.getLast());
        if (!last.find()){
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher email = emailValidationPattern.matcher(person.getEmail());
        if (!email.find()){
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher phone = phoneValidationPattern.matcher(person.getPhone());
        if (!phone.find()){
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher birthday = birthdayValidationPattern.matcher(person.getBirthday());
        if (!birthday.find()){
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }
        if (person.getId() != 0){
            log.log(Level.INFO,"Got an ID");
            PersonDAO.editPerson(person);
            out.println("{\"Success\" : \"Person Edited\"}");

        }else {
            PersonDAO.addPerson(person);
            log.log(Level.INFO, "Did not get an ID");
            out.println("{\"Success\" : \"Person inserted\"}");
        }
    }

}