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
    private AscendingOrDescending ascendingOrDescending;


    public SortingEmails(List<Email> emails)
    {
        this.Emails = emails;


    }

    public void Execute()
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

    public Comparator<Email> GetDateComparator()
    {
        Comparator<Email> DateComparator = Comparator.comparing(email->email.getDateOfEmail());
        return DateComparator;
    }

    public Comparator<Email> GetPriorityComparator()
    {
        Comparator<Email> PriorityComparator = Comparator.comparing(email->email.getPriority());
        return PriorityComparator;
    }

    enum SortBasedOn
    {
        Priority,
        Date
    }

    enum AscendingOrDescending
    {
        Ascending,
        DESCENDING
    }
}
