package Models.Sorting;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class SortCriteriaSubject extends SortCriteria {
    public SortCriteriaSubject(Integer userFolderID, Integer page,boolean order) {
        super(userFolderID, page,order);
    }

    @Override
    public List<EmailHeader> sort() {
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria sortCriteriaSubject = session.createCriteria(EmailHeader.class)
                .createAlias("folder", "currentFolder")
                .add(Restrictions.eq("currentFolder.folderID", userFolderID));

        if(order)
            sortCriteriaSubject.addOrder(Order.asc("title"));
        else
            sortCriteriaSubject.addOrder(Order.desc("title"));
        int startIndex = (page * 6) - 6;
        List<EmailHeader> sortedList = sortCriteriaSubject.setFirstResult(startIndex).setMaxResults(6).list();
        trans.commit();
        session.close();
        return sortedList;

    }
}
