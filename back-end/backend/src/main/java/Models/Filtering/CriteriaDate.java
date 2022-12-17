package Models.Filtering;

import Models.EmailHeader;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class CriteriaDate extends Criteria{
    public CriteriaDate(Integer userFolderID,Integer page) {
        super(userFolderID,page);
    }

    @Override
    public List<EmailHeader> meetCriteria(String target) {
        SimpleDateFormat date = null;
        date =new SimpleDateFormat("dd/MM/yyyy");
        Calendar c = Calendar.getInstance();
        try {
            c.setTime(date.parse(target));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Date dateMin = c.getTime();
        c.add(Calendar.DATE, 1);  // number of days to add
        Date dateMax = c.getTime();
        Session session = factory.openSession();
        Transaction trans = session.beginTransaction();
        org.hibernate.Criteria dateCriteria = session.createCriteria(EmailHeader.class);
        dateCriteria.createAlias("folder", "currentFolder")
                .add(Restrictions.eq("currentFolder.folderID", userFolderID))
                .add(Restrictions.gt("date",dateMin))
                .add(Restrictions.lt("date",dateMax));
        int startIndex=(page*6)-6;
        List<EmailHeader> filteredMailHeaders = dateCriteria.setFirstResult(startIndex).setMaxResults(6).list();
        trans.commit();
        session.close();
        return filteredMailHeaders;

    }
}
