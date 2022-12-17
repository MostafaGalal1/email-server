package Models.Immutables;

import Models.Contact;

public class ContactImmutable {

    private int contactID;
    private String contactName;
    private String addresses;

    public ContactImmutable(Contact contact){
        this.contactID=contact.getContactID();
        this.contactName=contact.getContactName();
        this.addresses=contact.getAddresses();
    }
    public String getContactName() {
        return contactName;
    }

    public int getContactID() {
        return contactID;
    }

    public String getAddresses() {
        return addresses;
    }
}
