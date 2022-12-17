package Testing;

import Models.*;
import Models.Filtering.Criteria;
import Models.Filtering.CriteriaSender;
import Models.Filtering.CriteriaSubject;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.junit.Test;
import org.junit.Assert;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

public class FilterTest {
    //test it using a user in your db

    @Test
    public void testSubjectFilter() throws ParseException {
        //addToDB();
        //check their folder id in db otherwise the test fails
        Criteria subjectFilter=new CriteriaSubject(141,1);
        List<EmailHeader> result=subjectFilter.meetCriteria("hello");
        Assert.assertEquals(1,result.size());
        Assert.assertEquals("hello",result.get(0).getTitle());

    }
     @Test
    public void testSenderFilter()
    {   //check their folder id in db otherwise the test fails
        Criteria senderFilter=new CriteriaSender(139,1);
        List<EmailHeader> result=senderFilter.meetCriteria("meen");
        Assert.assertEquals(1,result.size());
        String id=result.get(0).getSender().getUserName();
        Assert.assertEquals("meen",id);

    }
    @Test
    public void addToDB() throws ParseException {
        StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                .configure().build();
        SessionFactory factory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        Session session = factory.openSession();
        Transaction trans  = session.beginTransaction();

        User user2 = new User();
        user2.setAddress("testfinal1@g.com");
        try {
            user2.setDOB(new SimpleDateFormat("dd/MM/yyyy").parse("14/11/1999"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        user2.setPassword("test");
        user2.setUserName("marioum");
        session.save(user2);


        User user3 = new User();
        user3.setAddress("testfinal2@g.com");
        try {
            user3.setDOB(new SimpleDateFormat("dd/MM/yyyy").parse("14/11/1999"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        user3.setPassword("test");
        user3.setUserName("semsem");
        session.save(user3);

        User user = new User();
        user.setAddress("testfinal3@g.com");
        try {
            user.setDOB(new SimpleDateFormat("dd/MM/yyyy").parse("14/11/1999"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        user.setPassword("test");
        user.setUserName("no one");
        session.save(user);
        Folder f = new Folder();
        f.setOwner(user);
        user.getFolders().add(f);
        session.save(f);
        Email m=new Email();
        m.setSender(user);
        session.save(m);
        EmailHeader emh = new EmailHeader();
        emh.setSender(user2);
        emh.setEmail(m);
        emh.setPriority(5);
        emh.setTitle("test");
        emh.setDate(new SimpleDateFormat("dd/MM/yyyy").parse("24/12/2020"));
        emh.setFolder(f);
        f.getHeaders().add(emh);
        session.save(emh);

        EmailHeader emh2 = new EmailHeader();
        emh2.setSender(user3);
        emh2.setEmail(m);
        emh2.setPriority(5);
        emh2.setDate(new SimpleDateFormat("dd/MM/yyyy").parse("24/12/2020"));
        emh2.setTitle("aaa");

        emh2.setFolder(f);
        f.getHeaders().add(emh2);
        session.save(emh2);


        trans.commit();
        session.close();
        factory.close();
    }

}
