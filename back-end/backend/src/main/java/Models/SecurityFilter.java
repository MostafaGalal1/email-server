package Models;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class SecurityFilter {
    private static SecurityFilter instance;
    private static SessionFactory factory;
    private HashMap<String,UserSession> userSessions= new HashMap<>();

    private SecurityFilter() {
    }

    public static synchronized SecurityFilter getInstance() {
        if (instance == null && factory == null) {
            instance = new SecurityFilter();
            final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                    .configure().build();
            factory = new MetadataSources(registry).buildMetadata().buildSessionFactory();


        }
        return instance;
    }

    public static synchronized SessionFactory getSessionFactory() {
        return factory;
    }

    public String authenticateLogin(String encodedUserInfo) {
        String[] decodedUserInfo = getDecodedUserInfo(encodedUserInfo);
        String email = decodedUserInfo[0];
        String password = decodedUserInfo[1];
        int loggedInUserID=matchesDB(email,password);
        if(loggedInUserID!=-1){
            String userSessionID=generateUniqueUUID();
            userSessions.put(userSessionID,new UserSession(loggedInUserID));
            return userSessionID;
        }

        return "null";
    }

    public boolean createNewUser(Map<String,Object> userSignUpInfo) throws ParseException {
         Session session=factory.openSession();
         Transaction trans = session.beginTransaction();
         boolean status=matchesDB((String)userSignUpInfo.get("email"));
         if(status)
         {
             User user=new User();
             user.setUserName((String)userSignUpInfo.get("name"));
             user.setAddress((String)userSignUpInfo.get("email"));
             user.setPassword((String)userSignUpInfo.get("password"));
             user.setDOB(new SimpleDateFormat("dd/MM/yyyy").parse((String)userSignUpInfo.get("DOB")));
             session.save(user);
             user.setFolders(createUserFolders(user,session));

             trans.commit();
             session.close();
             return true;


         }
        return false;


    }

    private List<Folder> createUserFolders(User user,Session session)
    {

        List<Folder> folders=new ArrayList<>();
        Folder inbox=new Folder();
        inbox.setOwner(user);
        inbox.setFolderName("inbox");
        session.save(inbox);
        Folder sent=new Folder();
        sent.setOwner(user);
        sent.setFolderName("sent");
        session.save(sent);
        Folder draft=new Folder();
        draft.setOwner(user);
        draft.setFolderName("draft");
        session.save(draft);
        Folder trash=new Folder();
        trash.setOwner(user);
        trash.setFolderName("trash");
        session.save(trash);
        Folder archive=new Folder();
        archive.setOwner(user);
        archive.setFolderName("archive");
        session.save(archive);

        return folders;
    }

    public Map<String,Object> generateBasicInfo(String userSessionID)
    {
        String authenticatedUserName=userSessions.get(userSessionID).getCurrentUser().getUserName();
        Map<String,Object> basicInfo=new HashMap<>();
        basicInfo.put("key",userSessionID);
        basicInfo.put("name",authenticatedUserName);
        basicInfo.put("folder names",userSessions.get(userSessionID).getFolderNames());
        basicInfo.put("authenticated","true");
        return basicInfo;

    }

    public UserSession getUserSession(String userSessionID)
    {
        return userSessions.get(userSessionID);

    }

    public boolean matchesDB(String email)
    {
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        String sql = "SELECT * FROM USERS WHERE  user_address = :user_address";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(User.class);
        query.setParameter("user_address", email);
        List<User> results = query.list();
        System.out.println(results.size());
        trans.commit();
        session.close();
        return results.size() == 1 ? false : true;

    }

    public int matchesDB(String email, String password) {
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        String sql = "SELECT * FROM USERS WHERE  user_address = :user_address AND user_password= :user_password";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(User.class);
        query.setParameter("user_address", email);
        query.setParameter("user_password", password);
        List<User> results = query.list();
        System.out.println(results.size());
        trans.commit();
        session.close();
        return results.size() == 1 ? results.get(0).getUserID() : -1;

    }
    private UserSession createUserSession(Integer userID)
    {
        UserSession userSession=new UserSession(userID);
        return userSession;
    }

    private String generateUniqueUUID() {
        return UUID.randomUUID().toString();
    }

    private String[] getDecodedUserInfo(String encodedUserInfo) {
        String encodedUsernamePassword = encodedUserInfo.substring("Basic ".length()).trim();
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] bytes = decoder.decode(encodedUsernamePassword);
        String decodedLine = new String(bytes);
        int separator = decodedLine.indexOf(':');
        String[] decodedUserInfo = new String[2];
        decodedUserInfo[0] = decodedLine.substring(0, separator);
        decodedUserInfo[1] = decodedLine.substring(separator + 1);
        return decodedUserInfo;
    }


}