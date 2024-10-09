package com.declspecl.converter;

import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class FormattedDate {
    private final String date;

    FormattedDate(String date) {
        this.date = date;
    }

    public String value() {
        return date;
    }
}
