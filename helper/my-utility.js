
import moment from "moment";

const myUtil = {};

myUtil.checkMissingFields = (checkObj, requiredFields) => {
    if (typeof requiredFields == 'string') requiredFields = requiredFields.split(',');
    let missingField;
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in checkObj)) {
            missingField = field;
            return { success: true, missingField }
        }
    }
    return { success: false }
}

myUtil.checkFunctionOverriding = (importedObjects, all_keys) => {
    if (importedObjects.length <= 1) return;
    const total_keys = importedObjects.reduce(
        (previousValue, currentValue) => {
            // console.log({previousValue, currentValue: Object.keys(currentValue).length});
            return previousValue + Object.keys(currentValue).length;
        }, 0)
    // console.log(total_keys, all_keys.length)
    let isOverriden = false;
    if (total_keys !== all_keys.length) {
        if ((total_keys - all_keys.length) > 0) {
            console.error(`Fuction Overridden for ${total_keys - all_keys.length} controller functions`);
            isOverriden = true;
        } else {
            throw new Error(`Failure to import some functions as allKeys was wrongfully implemented`);
        }
        let over_ridden_cnt = 1
        for (let index = 0; index < all_keys.length; index++) {
            const func = all_keys[index];
            let func_count = 0;
            for (let index_1 = 0; index_1 < importedObjects.length; index_1++) {
                const controller = importedObjects[index_1];
                if (controller.hasOwnProperty(func)) func_count += 1;

            }
            if (func_count > 1) {
                console.log(`${over_ridden_cnt} : ${func} is overriden ${func_count} times`);
                over_ridden_cnt += 1;
            }
        }
        if (isOverriden) {
            throw new Error(`Fuction Overridden for ${total_keys - all_keys.length} controller functions`)
        }
    }
    // console.log({total_keys});

}

myUtil.stallProgramFor = async (N) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, N);
    })
}

myUtil.getLocalTime = (time, timeZoneOffset) => {
    try {
        if (typeof time != 'string') time = time.toISOString();
        console.log("THIS DOES NOT WORK YET");
    } catch (err) {
        console.error(err);
        return time;
    }
}

myUtil.rountNumberTo2Digs = num => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}
/* 
myUtil.appendShTagForUser = (shopifyUserId) => {
  if (!shopifyUserId.includes("gid")) shopifyUserId = 'gid://shopify/Customer/' + shopifyUserId;
    return shopifyUserId;
} */

myUtil.strObj = (obj) => {
    return JSON.stringify(obj, null, 4)
}

myUtil.getChangeFromPrev = (arr1, arr2) => {
    let prevTermCount = arr1.length;
    let ogPrevCount = 1;
    if (prevTermCount == 0) {
        prevTermCount = 1;
        ogPrevCount = 0;
    }
    let thisTermCount = arr2.length;
    let change = ((thisTermCount * 100) / prevTermCount) - ogPrevCount * 100;
    return [change, thisTermCount]
}

myUtil.getPercentageChange = (prevTermCount, thisTermCount) => {
    let ogPrevCount = 1;
    if (prevTermCount == 0) {
        prevTermCount = 1;
        ogPrevCount = 0;
    }
    let change = ((thisTermCount * 100) / prevTermCount) - ogPrevCount * 100;
    return change
}

myUtil.getDateNYearsFromNow = N => {
    let nYears = new Date(new Date().setFullYear(new Date().getFullYear() + N))
    return nYears;
}

myUtil.getDateNDaysFromThisDate = (date, N) => {
    let newDate = new Date(new Date().setDate(date.getDate() + N));
    return newDate;
}

myUtil.getDateNDaysFromNow = (N) => {
    let newDate = new Date(new Date().setDate(new Date().getDate() + N));
    return newDate;
}

myUtil.clog = function () {
    let printString = ''
    if (Object.keys(arguments).length > 0 && arguments['0'] == "-------") {
        return;
    }
    Object.keys(arguments).map(arg => {
        printString = printString + (printString ? ', ' : '') + myUtil.strObj(arguments[arg])
    })
    console.log('LOGGING: ', printString)
}

myUtil.getClone = obj => {
    return JSON.parse(JSON.stringify(obj))
}

myUtil.handleError = (err) => {
    myUtil.erlog(err, true);
    return { success: false, message: err.message || "Operation could not be completed" }
}


myUtil.erlog = (err, showError) => {
    if (!showError) showError = false;
    const errObj = {}
    console.log('Running erlog!');
    if (err) {
        if (err.response) {
            errObj['error status'] = err.response.status;
            errObj['error response data'] = err.response.data;
        }
        errObj['error message'] = err.message;
    }
    console.log(errObj);
    if (showError) {
        console.error(err);
    }
}

myUtil.isObjectEmpty = (obj) => {
    return (obj &&
        Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype);
}

myUtil.getNumberOfDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

myUtil.stripMyShopify = (str) => {
    let shopUrl = myUtil.removeHttp(str).replace(/\//g, '');
    return shopUrl.replace(/.myshopify.com/g, '');
}

myUtil.getUtcTime = () => {
    return moment.utc().toDate();
}

myUtil.getDateNumberThisYear = (date1) => {
    /*
        console.log(myUtil.getNumberOfDays(new Date('2023-01-01T18:30:00.000Z'), 
        moment().startOf('year').toDate()));
      */
    let dateNumber = myUtil.getNumberOfDays(date1, moment().startOf('year').toDate());
    return dateNumber;
}

myUtil.fullDaysSinceEpoch = () => {
    var now = new Date();
    return Math.floor(now / 8.64e7);
}

myUtil.encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64');
}
myUtil.decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

myUtil.generateString = (length, stringType) => {
    if (!stringType) stringType = 'any';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (stringType == 'uppercase') characters = characters.slice(0, 26);
    if (stringType == 'lowercase') characters = characters.slice(26, 52);
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

myUtil.getCurrencySymbol = (currencyCode) => {
    let currencySymbol;
    try {
        currencySymbol = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).formatToParts(12)[0].value
    } catch (e) {
        return currencyCode + " ";
    }
    return currencySymbol;
}

myUtil.removeHttp = (url) => {
    return url?.replace(/^https?:\/\//, '') ?? '';
}

myUtil.putSameKeysAsIn = (mainObj, keysArray) => {
    if (typeof keysArray == "string") keysArray = keysArray.split(',')
    try {
        let resData = {}
        keysArray.map(key => {
            if (key in mainObj) {
                resData[key] = mainObj[key] ?? null;
            } else {
                resData[key] = null;
            }
        });
        if (mainObj.username == 'badtameez@mirtosx.com') {
            console.log({ mainObj, resData, keysArray });
            console.log('firstName' in mainObj);
        }
        // console.log({resData, keysArray, mainObj});
        return resData;
    } catch (err) {
        throw err;
    }
}

myUtil.getUsersName = (userObj, orByUsername = true) => {
    let referrerName = '';
    if (orByUsername) referrerName = userObj.username;
    if (userObj.firstName) {
        if (userObj.lastName) {
            referrerName = userObj.firstName + " " + userObj.lastName;
        } else {
            referrerName = userObj.firstName;
        }
    }
    return referrerName;
}

myUtil.getUsersNameFromEmail = (userObj, orByEmail = true) => {
    let userName = '';
    if (orByEmail) userName = userObj.email;
    if (userObj.name) {
        userName = userObj.name;
    }
    return userName;
}

myUtil.arraysEqual = (a, b) => {
    // console.log(a, b);
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

myUtil.getDateNDaysAgo = N => {
    let date = new Date(new Date(new Date().setDate(new Date().getDate() - N)).setHours(0, 0, 0, 0));
    return date;
}

myUtil.getDayStartFromISO = date => {
    return new Date(new Date(date).setHours(0, 0, 0, 0))
}

myUtil.deleteTheseKeysIfExist = (mainObj, keysArray) => {
    if (typeof keysArray == 'string') keysArray = keysArray.split(',');
    // console.log(Object.keys(mainObj._doc));
    if (myUtil.arraysEqual(Object.keys(mainObj), ['$__', '$isNew', '_doc'])) {
        mainObj = mainObj._doc;
    }
    keysArray.forEach(key => {
        if (mainObj.hasOwnProperty(key)) {
            // console.log(`key found ${key}`);
            delete mainObj[key];
        }
        // console.log(key, Object.keys(mainObj).length);
    });
    // console.log({gg: mainObj.createdAt, keysArray});
    return mainObj;
}

myUtil.calculateMilliSecondsFromString = (expiry) => {
    /* 
    2 Weeks
    1 Month
    3 Months
    6 Months
    1 Year
    2 Years 
    inapplicable
    */
    if (expiry == 'inapplicable') return null;
    var [scalar, timeScale] = expiry.split(' ');

    scalar = parseInt(scalar)
    // let multiplier;
    var timeAtExpiry = new Date();
    if (timeScale == 'Month' || timeScale == 'month' || timeScale == 'Months' || timeScale == 'months') {
        timeAtExpiry.setMonth(timeAtExpiry.getMonth() + scalar);
    } else if (timeScale == 'Week' || timeScale == 'week' || timeScale == 'Weeks' || timeScale == 'weeks') {
        timeAtExpiry.setDate(timeAtExpiry.getDate() + scalar * 7);
    } else if (timeScale == 'Year' || timeScale == 'year' || timeScale == 'Years' || timeScale == 'years') {
        timeAtExpiry = new Date(new Date().setFullYear(new Date().getFullYear() + scalar));
    } else {
        console.error('expiry string is unprocessable');
    }
    return timeAtExpiry;
}

myUtil.isEmailValid = email => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email)
}

export { myUtil };