package Models;

import Models.Filtering.*;
import Models.Immutables.ContactImmutable;
import Models.Immutables.EmailHeaderImmutable;
import Models.Sorting.*;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class UserSession {

    private int userID;
    private User currentUser;
    private SessionFactory factory = SecurityFilter.getInstance().getSessionFactory();

    public UserSession(int id){
        this.userID=id;
        currentUser=getUserFromDataBase();

    }


    public User getUserFromDataBase() {
        Session session = factory.openSession();
        Transaction trans  = session.beginTransaction();
        currentUser = session.find(User.class, userID);
        trans.commit();
        session.close();
        return currentUser;
    }
    public Email getMail(int emailId){
        Session session = factory.openSession();
        Transaction trans  = session.beginTransaction();
        Email email = session.find(Email.class, emailId);
        trans.commit();
        session.close();
        return email;
    }

    public EmailHeader createEmailHeader(Email email){
        EmailHeader emailHeader = new EmailHeader();
        emailHeader.setTitle(email.getTitle());
        emailHeader.setEmail(email);
        emailHeader.setSender(email.getSender());
        emailHeader.setDate(email.getDate());
        emailHeader.setPriority(email.getPriority());
        return emailHeader;
    }
    public Email setEmailContent(Email email,Map<String, Object> emailMap,String [] attachmentPaths){
        Session session = factory.openSession();
        email.setTitle(emailMap.get("title").toString());
        email.setPriority((int)emailMap.get("priority"));
        email.setContent(emailMap.get("content").toString());
        email.setSender(currentUser);
        Date date = new Date();
        email.setDate(date);
        session.save(email);
          if(attachmentPaths!=null) {
              for (int i = 0; i < attachmentPaths.length; i++) {
                  Attachment attachment = new Attachment();
                  attachment.setEmail(email);
                  attachment.setPath(attachmentPaths[i]);
                  email.getAttachments().add(attachment);
                  session.save(attachment);
              }

          }
        return email;
    }


    public void sendEmail(Map<String, Object> emailMap, String[] receiver_address, String [] attachmentPaths){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Email email = new Email();
        email = setEmailContent(email,emailMap,attachmentPaths);
        String idList="(";
        for (int i=0;i<receiver_address.length-1;i++){
            idList+="'"+receiver_address[i]+"'";
            idList+=",";
        }
        idList+="'"+receiver_address[receiver_address.length-1]+"'";
        idList+=")";

        String sql = "SELECT * FROM USERS WHERE user_address IN ";
        sql+=idList;
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(User.class);
        List<User> receivers=query.list();

        for (int i=0;i<receivers.size();i++){
            EmailHeader emailHeader = createEmailHeader(email);
            emailHeader.setFolder(receivers.get(i).getFolders().get(0));
            receivers.get(i).getFolders().get(0).getHeaders().add(emailHeader);
            session.save(receivers.get(i));
            session.save(emailHeader);
        }
        EmailHeader emailHeader = createEmailHeader(email);
        emailHeader.setFolder(currentUser.getFolders().get(1));
        currentUser.getFolders().get(1).getHeaders().add(emailHeader);
        session.save(emailHeader);
        trans.commit();
        session.close();
    }

    public void draft(Map<String, Object> emailMap){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Email email = new Email();
        setEmailContent(email,emailMap,null);
        EmailHeader emailHeader = createEmailHeader(email);
        emailHeader.setEmail(email);
        System.err.println(emailHeader.getTitle());
        emailHeader.setFolder(currentUser.getFolders().get(2));
        currentUser.getFolders().get(2).getHeaders().add(emailHeader);
        session.save(emailHeader);
        trans.commit();
        session.close();
    }

    public void moveEmail(List<Integer> headersId,int currentFolder,int destinationFolder){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();

        List<EmailHeader> emailHeaders=getEmailHeader(headersId, currentUser.getFolders().get(currentFolder).getFolderID());
        for (int i=0;i<emailHeaders.size();i++){
            currentUser.getFolders().get(destinationFolder).getHeaders().add(emailHeaders.get(i));
            currentUser.getFolders().get(currentFolder).getHeaders().remove(emailHeaders.get(i));
            emailHeaders.get(i).setFolder(currentUser.getFolders().get(destinationFolder));
            session.saveOrUpdate(emailHeaders.get(i));
        }
        trans.commit();
        session.close();
    }

    public void copyEmail(List<Integer> headersId,int currentFolder,int destinationFolder){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();

        List<EmailHeader> emailHeaders=getEmailHeader(headersId, currentUser.getFolders().get(currentFolder).getFolderID());
        for (EmailHeader emailHeader: emailHeaders){
            EmailHeader copiedEmailHeader = createEmailHeader(emailHeader.getEmail());
            currentUser.getFolders().get(destinationFolder).getHeaders().add(copiedEmailHeader);
            copiedEmailHeader.setFolder(currentUser.getFolders().get(destinationFolder));
            session.save(copiedEmailHeader);
        }

        trans.commit();
        session.close();
    }

    public void deleteEmail(List<Integer> headersId,int currentFolder){
        moveEmail(headersId,currentFolder,3);
    }

    public List<EmailHeader> getEmailHeader(List<Integer> headersId, int currentFolder){
        Session session = factory.openSession();
        String idList="(";
        for (int i=0;i<headersId.size()-1;i++){
            idList+="'"+headersId.get(i)+"'";
            idList+=",";
        }
        idList+="'"+headersId.get(headersId.size()-1)+"'";
        idList+=")";
        String sql = "SELECT * FROM EMAIL_HEADERS WHERE email_header_id IN ";
        sql+=idList;
        sql += " AND folder_id = " + currentFolder;
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(EmailHeader.class);
        List<EmailHeader> emailHeaders=query.list();
        session.close();
        return emailHeaders;
    }

    public void addFolder(Map<String,Object> folderMap){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Folder folder = new Folder();
        folder.setOwner(currentUser);
        folder.setFolderName(folderMap.get("name").toString());
        currentUser.getFolders().add(folder);
        session.save(folder);
        trans.commit();
        session.close();
    }

    public void editFolder(Map<String, Object> folderMap){
        System.out.println((int)folderMap.get("id"));
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Folder folder = session.find(Folder.class, currentUser.getFolders().get((int)folderMap.get("id")).getFolderID());
        folder.setFolderName(folderMap.get("name").toString());
        session.save(folder);
        trans.commit();
        session.close();

    }

    public void removeFolder(int folderID){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Folder folder = session.find(Folder.class,currentUser.getFolders().get(folderID).getFolderID());
        session.remove(folder);
        //folder.setOwner(currentUser);
        currentUser.getFolders().remove(folder);
        //session.save(currentUser);
        trans.commit();
        session.close();
    }

    public void addContact(Map<String,Object> contactMap){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Contact contact=new Contact();
        contact.setOwner(currentUser);
        contact.setContactName(contactMap.get("name").toString());
        contact.setAddresses(contactMap.get("addresses").toString());
        currentUser.getContacts().add(contact);
        session.save(contact);
        trans.commit();
        session.close();
    }

    public void editContact(Map<String,Object> contactMap){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Contact contact=session.find(Contact.class,contactMap.get("id"));
        contact.setOwner(currentUser);
        contact.setContactName(contactMap.get("name").toString());
        contact.setAddresses(contactMap.get("addresses").toString());
        session.save(contact);
        trans.commit();
        session.close();
    }
    public void removeContact(int contactID){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        Contact contact = session.find(Contact.class, contactID);
        //contact.setOwner(currentUser);
        currentUser.getContacts().remove(contact);
        session.remove(contact);
        trans.commit();
        session.close();
    }


    public List<String> getFolderNames() {
        List folders = this.currentUser.getFolders();
        List<String> folderNames = new ArrayList<>();
        for (int i = 0; i < folders.size(); i++) {
            Folder f= (Folder) folders.get(i);
            folderNames.add(f.getFolderName());
        }
        return folderNames;
    }

    public List<EmailHeaderImmutable> loadEmailHeaders(int folderIndex, int page, String sortingCriteria, Boolean order){
        SortCriteria criteria=null;
        int folderId= currentUser.getFolders().get(folderIndex).getFolderID();
        if (sortingCriteria.equals("date"))
            criteria=new SortCriteriaDate(folderId,page,order);
        else if(sortingCriteria.equals("priority"))
            criteria=new SortCriteriaPriority(folderId,page,order);
        else if (sortingCriteria.equals("subject"))
            criteria=new SortCriteriaSubject(folderId,page,order);
        else if (sortingCriteria.equals("sender"))
            criteria=new SortCriteriaSender(folderId,page,order);
        List<EmailHeader>headers=criteria.sort();
        List<EmailHeaderImmutable> immutableList=toImmutable(headers);
        return immutableList;
    }

    public List<EmailHeaderImmutable> filterEmailHeaders(int folderIndex, int page, String filteringCriteria, String filterKey){
        Criteria criteria=null;
        int folderId= currentUser.getFolders().get(folderIndex).getFolderID();
        if (filteringCriteria.equals("search"))
            criteria = new TextSearchEngine(folderId,page);
        else if(filteringCriteria.equals("Date"))
            criteria = new CriteriaDate(folderId,page);
        else if (filteringCriteria.equals("Title"))
            criteria = new CriteriaSubject(folderId, page);
        else if (filteringCriteria.equals("Sender"))
            criteria = new CriteriaSender(folderId, page);
        List<EmailHeader>headers=criteria.meetCriteria(filterKey);
        List<EmailHeaderImmutable> immutableList=toImmutable(headers);
        return immutableList;

    }

    public List<ContactImmutable> loadContacts(){
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        User s=session.find(User.class,currentUser.getUserID());
        List<ContactImmutable> immutableList = new ArrayList<ContactImmutable>();
        List<Contact> list=s.getContacts();
        currentUser.setContacts(list);
        for (Contact c :list)
            System.err.println(c.getContactName());
        for (Contact contact: list) {
            immutableList.add(new ContactImmutable(contact));
        }
        trans.commit();
        session.close();
        return immutableList;
    }

    public List<EmailHeaderImmutable> toImmutable(List<EmailHeader> list){
        List<EmailHeaderImmutable> immutableList = new ArrayList<EmailHeaderImmutable>();
        for (EmailHeader eh: list) {
            immutableList.add(new EmailHeaderImmutable(eh));
        }
        return immutableList;
    }

    public User getCurrentUser() {
        return currentUser;
    }

}
