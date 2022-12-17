package Models.Filtering;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class CriteriaSubject extends Criteria {


    public CriteriaSubject(Integer userFolderID,Integer page) {
        super(userFolderID,page);
    }


    @Override
    public List<EmailHeader> meetCriteria(String subject) {
        System.out.println(userFolderID);
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria subjectCriteria = session.createCriteria(EmailHeader.class);
        subjectCriteria.add(Restrictions.eq("title", subject));
        subjectCriteria.createAlias("folder", "currentFolder")
                .add(Restrictions.eq("currentFolder.folderID", userFolderID));
        int startIndex=(page*6)-6;
        List<EmailHeader> filteredMailHeaders = subjectCriteria.setFirstResult(startIndex).setMaxResults(6).list();

        trans.commit();
        session.close();
        return filteredMailHeaders;

    }
}
