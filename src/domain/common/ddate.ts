export type Ddate = string;

// helper functions
export function now(): Ddate {
  const current = new Date();
  const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; // 9h faster
  const koCurrent = new Date(utc + KR_TIME_DIFF).toISOString();
  const noTimeZoneAffix = koCurrent.slice(0, -5);
  return noTimeZoneAffix;
}

export function isDdate(d: string): boolean {
  const re = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (re.exec(d)) {
    return true;
  }

  return false;
}
export function isSameToday(ddate1: Ddate, ddate2: Ddate): boolean {
  const date1 = new Date(ddate1);
  const date2 = new Date(ddate2);
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return true;
  }
  return false;
}

export function isSameWeek(ddate1: Ddate, ddate2: Ddate): boolean {
  // copy from the link below
  // https://stackoverflow.com/questions/31422033/check-if-selected-dates-are-from-the-same-week-javascript
  function _getMinAndMax(dates: Ddate[]) {
    let result: any = {
      min: null,
      max: null,
    };

    for (const ddate of dates) {
      const fullDate = new Date(ddate);
      if (!result["max"] || fullDate > result["max"]) {
        result["max"] = fullDate;
      }
      if (!result["min"] || fullDate < result["min"]) {
        result["min"] = fullDate;
      }
    }
    return result;
  }

  function _isSameWeek(dates: Ddate[]) {
    const minAndMax = _getMinAndMax(dates);

    type Result = {
      min: Date;
      max: Date;
    };

    let dayOfWeek: Result = {
      min: minAndMax.min.getDay(),
      max: minAndMax.max.getDay(),
    };

    dayOfWeek["min"] = minAndMax["min"].getDay();
    dayOfWeek["max"] = minAndMax["max"].getDay();
    if (
      minAndMax["max"] - minAndMax["min"] > 518400000 ||
      dayOfWeek["min"] > dayOfWeek["max"]
    ) {
      return false;
    }
    return true;
  }

  return _isSameWeek([ddate1, ddate2]);
}

export function isSameMonth(ddate1: Ddate, ddate2: Ddate): boolean {
  const date1 = new Date(ddate1);
  const date2 = new Date(ddate2);
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  ) {
    return true;
  }
  return false;
}
