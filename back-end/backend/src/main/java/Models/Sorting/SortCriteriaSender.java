package Models.Sorting;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class SortCriteriaSender extends SortCriteria {
    public SortCriteriaSender(Integer userFolderID, Integer page,boolean order) {
        super(userFolderID, page,order);
    }



    @Override
    public List<EmailHeader> sort() {
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria sortCriteriaSender = session.createCriteria(EmailHeader.class);
        sortCriteriaSender.createAlias("sender", "currentSender")
                          .createAlias("folder", "currentFolder")
                          .add(Restrictions.eq("currentFolder.folderID", userFolderID));

        if(order)
            sortCriteriaSender.addOrder(Order.asc("currentSender.userName"));
        else
            sortCriteriaSender.addOrder(Order.desc("currentSender.userName"));
        int startIndex = (page * 6) - 6;
        List<EmailHeader> sortedList = sortCriteriaSender.setFirstResult(startIndex).setMaxResults(6).list();
        trans.commit();
        session.close();

        return sortedList;
    }
}
