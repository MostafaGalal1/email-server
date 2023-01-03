package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.apache.logging.log4j.CloseableThreadContext;
import org.json.JSONObject;

import javax.swing.text.DateFormatter;
import java.text.SimpleDateFormat;
import java.util.*;
import java.time.Instant;

public class CriteriaDate implements EmailCriteria
{
    private Date StartDate;
    private long RangeDate;
    private final String StartJson = "startDate";
    private final String RangeJson = "rangeDate";

    public CriteriaDate(JSONObject jsonObject)
    {
        this.SetStartDate(jsonObject);
        this.SetRangeDate(jsonObject);
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (this.CheckDate(email.getDateOfEmail()))
                newList.add(email);
        }
        return newList;
    }

    private boolean CheckDate(Date date)
    {
        if (this.StartDate.compareTo(date) == 1)
            return false;
        long DifferenceInDays = this.GetDifferenceBetweenDatesInDays(this.StartDate, date);
        if (DifferenceInDays > this.RangeDate)
            return false;

        return true;
    }

    private long GetDifferenceBetweenDatesInDays(Date date1, Date date2)
    {
        long time_difference = date2.getTime() - date1.getTime();
        long days_difference = time_difference / (1000*60*60*24);

        return days_difference;
    }

    private void SetStartDate(JSONObject jsonObject)
    {
        String DateString = jsonObject.getString(this.StartJson);
        if (DateString.equals(""))
            this.StartDate = new GregorianCalendar(1953, Calendar.FEBRUARY, 11).getTime();
        else
            this.StartDate = this.ConvertStringToDate(DateString);
    }

    private void SetRangeDate(JSONObject jsonObject)
    {
        String RangeString = jsonObject.getString(this.RangeJson);
        if (RangeString == "")
            this.RangeDate = 100000000;
        else
            this.RangeDate = Integer.parseInt(RangeString);
    }

    private Date ConvertStringToDate(String DateString)
    {
        String format = "yyyy-MM-dd";

        SimpleDateFormat dateFormatter = new SimpleDateFormat(format);
        Date date = null;

        try
        {
            date = dateFormatter.parse(DateString);
        }
        catch (Exception e)
        {
        }

        return date;
    }
}
