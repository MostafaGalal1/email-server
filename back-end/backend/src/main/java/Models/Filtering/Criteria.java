package Models.Filtering;

import Models.EmailHeader;
import Models.SecurityFilter;
import org.hibernate.SessionFactory;

import java.util.List;

public abstract class Criteria {
    protected SessionFactory factory= SecurityFilter.getInstance().getSessionFactory();
    protected Integer userFolderID;
    protected Integer page;
    public abstract List<EmailHeader> meetCriteria(String target);
    public Criteria(Integer userFolderID,Integer page)
    {
        this.userFolderID=userFolderID;
        this.page=page;
    }
}
