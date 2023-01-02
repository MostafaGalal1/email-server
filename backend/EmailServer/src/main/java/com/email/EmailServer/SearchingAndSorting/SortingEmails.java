package com.email.EmailServer.SearchingAndSorting;

import com.email.EmailServer.DatabaseModels.Email.Email;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class SortingEmails
{
    private List<Email> Emails;
    private Comparator<Email> comparator;

    public static List<Email> SortEmails(List<Email> emails, String sortOption)
    {
        SortingEmails sortingEmails = new SortingEmails(emails, sortOption);
        sortingEmails.Execute();
        return sortingEmails.Emails;
    }

    private SortingEmails(List<Email> emails, String sortOption)
    {
        this.Emails = emails;
        this.setComparator(sortOption);
    }

    private void Execute()
    {
        PriorityQueue<Email> queue = new PriorityQueue<>(this.comparator);
        for (Email emails : this.Emails)
            queue.add(emails);

        List<Email> newList = new ArrayList<>();

        while (!queue.isEmpty())
        {
            Email email = queue.poll();
            newList.add(email);
        }

        this.Emails = newList;
    }

    private void setComparator(String SortOption)
    {
        if (SortOption == "date")
            this.comparator = this.GetDateComparator();
        else
            this.comparator = this.GetPriorityComparator();
    }

    private Comparator<Email> GetDateComparator()
    {
        Comparator<Email> DateComparator = Comparator.comparing(email->email.getDateOfEmail());
        return DateComparator;
    }

    private Comparator<Email> GetPriorityComparator()
    {
        Comparator<Email> PriorityComparator = Comparator.comparing(email->email.getPriority());
        return PriorityComparator;
    }
}
