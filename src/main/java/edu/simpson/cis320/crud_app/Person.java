package edu.simpson.cis320.crud_app;

public class Person {

    public int id;
    public String first;
    public String last;
    public String email;
    public String phone;
    public String birthday;

    public int getId() {return id; }
    public void setId(int id) { this.id = id; }

    public String getFirst() { return first; }
    public void setFirst(String first) { this.first = first; }

    public String getLast() { return last; }
    public void setLast(String last) { this.last = last; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBirthday() { return birthday; }
    public void setBirthday(String birthday) { this.birthday = birthday; }

    /* Add additional getters and setters for each field.
       Just follow the same pattern. */
}