package Models.Sorting;

import Models.EmailHeader;
import Models.SecurityFilter;
import org.hibernate.SessionFactory;

import java.util.List;

public abstract class SortCriteria {
    protected SessionFactory factory= SecurityFilter.getInstance().getSessionFactory();
    protected Integer userFolderID;
    protected Integer page;
    protected boolean order;

    public SortCriteria(Integer userFolderID, Integer page,boolean order) {
        this.userFolderID=userFolderID;
        this.page=page;
        this.order=order;
    }

    public abstract List<EmailHeader> sort();
}
