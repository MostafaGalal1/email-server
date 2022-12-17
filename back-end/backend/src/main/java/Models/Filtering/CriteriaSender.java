package Models.Filtering;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class CriteriaSender extends Criteria {

    public CriteriaSender(Integer userFolderID,Integer page) {
        super(userFolderID,page);
    }

    @Override
    public List<EmailHeader> meetCriteria(String sender) {

        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria senderCriteria = session.createCriteria(EmailHeader.class);
        senderCriteria.createAlias("sender", "currentSender")
                .add(Restrictions.eq("currentSender.userName", sender));
        senderCriteria.createAlias("folder", "currentFolder")
                .add(Restrictions.eq("currentFolder.folderID", userFolderID));
        int startIndex=(page*6)-6;
        List<EmailHeader> filteredMailHeaders = senderCriteria.setFirstResult(startIndex).setMaxResults(6).list();

        trans.commit();
        session.close();
        return filteredMailHeaders;
    }


}
