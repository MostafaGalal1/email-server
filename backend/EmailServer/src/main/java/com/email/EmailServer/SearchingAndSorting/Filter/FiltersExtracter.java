package com.email.EmailServer.SearchingAndSorting.Filter;

import org.aspectj.weaver.ast.And;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class FiltersExtracter
{
    public static AndCriteria ExtractAllFilters(JSONObject jsonObject)
    {
        List<EmailCriteria> list = new ArrayList<>();

        list.add(new CriteriaContent(jsonObject));
        list.add(new CriteriaDate(jsonObject));
        list.add(new CriteriaPriority(jsonObject));
        list.add(new CriteriaReceiver(jsonObject));
        list.add(new CriteriaSender(jsonObject));
        list.add(new CriteriaSubject(jsonObject));

        AndCriteria andCriteria = new AndCriteria(list);

        return andCriteria;
    }
}
