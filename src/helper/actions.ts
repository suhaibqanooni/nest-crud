import * as  moment from "moment";

export function toLowerCase(value: string): string {
    return value.toLowerCase();
  }
  
  export function trim(value: string): string {
    return value ? value.trim() : value;
  }
  
  export function toDate(value: string): Date {
    return value && moment(value).isValid() ? new Date(value) : null;
  }
  
  export function toBoolean(value: any): boolean {
    const bl = value && (value == 'true' || value === true) ? true : false;
    return bl;
  }