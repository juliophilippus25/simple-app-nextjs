import { Decimal } from "@prisma/client/runtime/library";

export const formatDate = (dateStr:string) => {
    const date = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long",
    });
    return formatter.format(date);
}

export const formatIDR = (value: Decimal) => {
    const numericValue = value instanceof Decimal ? parseFloat(value.toString()) : value;

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        currencyDisplay: "code",
    }).format(numericValue);
}