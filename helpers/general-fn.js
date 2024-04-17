export default (inject) => {
  ////////// DATA FORMATTING SECTION //////////

  // initials
  inject("getInitials", (name) => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    return initials;
  });
  // full name
  inject("getFullName", (fname, lname) => {
    if (!fname && !lname) return "User";
    return fname + " " + lname;
  });
  // search params for all request on the search routes
  inject("setSearchParams", (searchParam) => {
    let params = "";
    Object.entries(searchParam).forEach(([key, value]) => {
      if (value || value === 0) {
        params += `${key}=${value}&`;
      }
    });
    return params;
  });
  // removeUnderCase
  inject("removeUnderCase", (str) => {
    if (!str) return null;
    return str.toLowerCase().split("_").join(" ");
  });
  // getkebab case for objects with no slug
  inject("getKebabCase", (str) => {
    return str.toLowerCase().split(" ").join("-");
  });
  // getCamel case for objects with no slug
  inject("getCamelCase", (str) => {
    return str.toLowerCase().split("-").join(" ");
  });
  // getUnderCase
  inject("getUnderCase", (str) => {
    return str.toLowerCase().split("-").join("_");
  });
  // mask values of email or phone numbers
  inject("maskValue", (input) => {
    // Check if the input is a valid phone number (contains at least 7 digits)
    if (/^\d{7,}$/.test(input)) {
      // Determine the length of the visible part
      const visibleLength = Math.min(4, input.length - 4);

      // Extract the visible parts
      const prefix = input.slice(0, visibleLength);
      const suffix = input.slice(-4);

      // Create the masked number
      const maskedNumber =
        prefix + "*".repeat(input.length - visibleLength - 4) + suffix;

      return maskedNumber;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      // Check if the input is a valid email
      // const [username, domain] = input.split("@");
      // const visibleLength = Math.min(4, username.length);

      // // Mask the username part until the domain
      // const maskedUsername =
      //   username.slice(0, visibleLength) +
      //   "*".repeat(username.length - visibleLength);

      // // Combine the masked username and the original domain
      // const maskedEmail = maskedUsername + "@" + domain;

      // return maskedEmail;

      return (
        input?.slice(0, 2) +
        "******" +
        input?.slice(input?.length - 6, input?.length)
      );
    } else {
      // Return the original input if it's not a valid phone number or email
      return input;
    }
  });
  // sort an object
  inject("sortObj", (obj) => {
    // sort object
    const sortedKeys = Object.keys(obj);
    if (!sortedKeys.length) return {};
    const sortedObject = {};
    for (const key of sortedKeys.sort()) {
      sortedObject[key] = obj[key];
    }

    return sortedObject;
  });
  // format phoneNumber to have 234
  inject("formatPhoneNumber", (number) => {
    if (!number) return null;
    var num = number.replace(/[^0-9]/g, "");
    if (num.substring(0, 3) !== "234") {
      if (num.length == 11) {
        num = num.slice(1);
      }
      num = "234" + num;
    }
    return num;
  });
  // format token for electricity payment or numbers
  inject("formatToken", (inputString, mod = 4) => {
    if (!inputString) return inputString;
    // Split the string into an array of characters
    const characters = inputString.trim().split("");

    // Iterate through the characters and add a space at the end of every fourth element
    for (let i = 0; i < characters.length; i++) {
      if ((i + 1) % mod === 0) {
        characters[i] += " ";
      }
    }

    // Join the characters back into a string and return the result
    return characters.join("");
  });

  ////////// TIME & DATE FORMATTING SECTION //////////

  // get past date
  inject("getPastDate", (dateString, num = null) => {
    // Create a Date object from the input string
    let date = new Date(dateString);
    const val = num !== null && num !== undefined && num !== "" ? num : 30;

    // Subtract requested amount in days
    date.setDate(date.getDate() - val);

    // Format the date as "yyyy-mm-dd"
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + "-" + month + "-" + day;
  });
  // format date string with -
  inject("formatDateLongMinus", () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + "-" + month + "-" + day;
  });
  // format date string with /
  inject("formatDateLongSlash", (inputDate) => {
    if (
      inputDate === null ||
      inputDate === "00-00-00" ||
      inputDate === undefined ||
      inputDate === ""
    )
      return "Not available";
    const dates = new Date(inputDate);
    const year = dates.getFullYear();
    const month = String(dates.getMonth() + 1).padStart(2, "0");
    const day = String(dates.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  });
  // format date string with time stamp
  inject("formatDateTimeStamp", (inputDate) => {
    if (
      inputDate === null ||
      inputDate === "00-00-00" ||
      inputDate === undefined ||
      inputDate === ""
    )
      return "Not available";
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDateTime = new Intl.DateTimeFormat("en-NG", options).format(
      new Date(inputDate)
    );

    return formattedDateTime;
  });
  // format date string with superior feel
  inject("formatDateLongWord", (inputDate) => {
    if (
      inputDate === null ||
      inputDate === "00-00-00" ||
      inputDate === undefined ||
      inputDate === ""
    )
      return "Not available";
    const addOrdinalSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };
    const newDate = new Date(inputDate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      newDate
    );

    // Extract day, month, and year
    const day = newDate.getDate();
    const month = formattedDate.split(" ")[0];
    const year = formattedDate.split(" ")[2];

    // Add ordinal suffix to the day
    const dayWithOrdinal = addOrdinalSuffix(day);

    // Concatenate the formatted date
    const result = `${dayWithOrdinal} ${month}, ${year}`;

    return result;
  });
  // format date string with . after the month
  inject("formatDateStringShort", (date) => {
    if (
      date === null ||
      date === "00-00-00" ||
      date === undefined ||
      date === ""
    )
      return "Not available";
    const formatDate = new Date(date)
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/(\w{3}) /g, "$1. ");
    return formatDate;
  });
  // format date string with ordinals and long
  inject("formatDateStringLong", (date) => {
    if (
      date === null ||
      date === "00-00-00" ||
      date === undefined ||
      date === ""
    )
      return "Not available";

    const options = { month: "long", year: "numeric" };
    const fixedDate = new Date(date);
    let day = fixedDate.getDate();
    const formatDate = fixedDate.toLocaleString("en-GB", options);
    let suffix = "";
    if (day % 10 == 1 && day != 11) {
      suffix = "st";
    } else if (day % 10 == 2 && day != 12) {
      suffix = "nd";
    } else if (day % 10 == 3 && day != 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    return `${day}${suffix} ${formatDate}`;
  });
  // basically a time countdown
  inject("formatTimeDialation", (num) => {
    // Check if the number is a valid positive number
    if (typeof num !== "number" || num < 0) {
      // Return an error message
      return "Invalid input";
    }
    // Initialize an empty string to store the output
    var output = "";
    // Define an array of time units and their corresponding values in seconds
    var units = [
      ["d", 86400], // 1 day = 86400 seconds
      ["hr", 3600], // 1 hour = 3600 seconds
      ["m", 60], // 1 minute = 60 seconds
      ["s", 1], // 1 second = 1 second
    ];
    // Loop through the array of units
    for (var i = 0; i < units.length; i++) {
      // Get the current unit and its value
      var unit = units[i][0];
      var value = units[i][1];
      // Calculate how many times the value fits into the number
      var count = Math.floor(num / value);
      // If the count is greater than zero, add it to the output with the unit
      if (count > 0) {
        output += count + unit + " ";
      }
      // Update the number by subtracting the count times the value
      num -= count * value;
    }
    // Trim any extra space at the end of the output
    output = output.trim();
    // Return the output
    return output;
  });

  ////////// TEXT / WORD FORMATTING SECTION //////////

  // capitalize First Letter of a string
  inject("capitalizeFirstLetter", (str) => {
    // Check if the string is not empty
    if (str.length === 0) {
      return str; // Return the string as it is if it's empty
    }

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  ////////// CURRENCY FORMATTING SECTION //////////

  // format currency with type
  inject("formatCurrency", (num, formatType = "NGN") => {
    if (num === null) return "Not available";
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: formatType,
      currencyDisplay: "symbol",
    });
    return formatter.format(num);
  });

  ////////// NUMBER FORMATTING SECTION //////////

  // format number
  inject("formatNumber", (num) => {
    if (num === null || num === undefined || num === "") return "Not available";
    const formatter = num.toLocaleString("en-US", {
      style: "decimal",
    });
    return formatter;
  });

  ////////// LOCAL STORAGE SECTION //////////

  // commitToLocalStorage
  inject("commitToLocalStorage", (res, name = null) => {
    window.localStorage.setItem(
      name ? name : "defaultStorageName",
      name ? res : JSON.stringify(res)
    );
  });
  // removeLocalStorage
  inject("removeLocalStorage", (name = null) => {
    window.localStorage.removeItem(name ? name : "defaultStorageName");
  });

  ////////// CHECKERS SECTION //////////

  // input and select checker
  inject("inputCheck", (val) => {
    var res = "form-control ";
    res += val.type;
    if (val.hasOwnProperty("hasValue")) {
      val.hasValue !== undefined && val.hasValue !== null && val.hasValue !== ""
        ? (res += " hasValue")
        : "";
    }

    return res;
  });
  // check if value is not null
  inject("stringCheck", (val) => {
    if (val !== "" && val !== null && val !== undefined) {
      if (typeof val == "string") {
        return val;
      } else if (typeof val != "string" && val.length) {
        let returnVal = "Not available";
        for (const element of val) {
          if (element) {
            returnVal = element;
            break;
          }
        }
        return returnVal;
      }
    } else return "Not available";
  });
  // check if small sized arrays have similar content, this would break with large data sets
  inject("arraysHaveSameElements", (arr1, arr2) => {
    // Check if arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Sort both arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    // Check if elements are the same
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  });

  ////////// RETURN DATA SECTION //////////

  // set tools for rich text editor
  inject("getCustomToolbar", () => {
    return [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ];
  });
};
