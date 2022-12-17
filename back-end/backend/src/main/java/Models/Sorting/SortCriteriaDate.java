package Models.Sorting;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class SortCriteriaDate extends SortCriteria{
    public SortCriteriaDate(Integer userFolderID, Integer page,boolean order) {
        super(userFolderID, page,order);
    }

    @Override
    public List<EmailHeader> sort() {
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria sortCriteriaDate= session.createCriteria(EmailHeader.class)
                .createAlias("folder", "currentFolder")
                .add(Restrictions.eq("currentFolder.folderID", userFolderID));
        if(order)
            sortCriteriaDate.addOrder(Order.asc("date"));
        else
            sortCriteriaDate.addOrder(Order.desc("date"));
        int startIndex=(page*6)-6;
        List<EmailHeader> sortedList=sortCriteriaDate.setFirstResult(startIndex).setMaxResults(6).list();
        trans.commit();
        session.close();
        return sortedList;
    }
}
