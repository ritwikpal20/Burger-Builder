export const updateObject = (oldObject, updatedValue) => {
    return {
        ...oldObject,
        ...updatedValue,
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    let errorMessage = [];

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
        if (value.trim() === "")
            errorMessage.push("Enter value in compulsory field.");
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if (value.length < rules.minLength)
            errorMessage.push("Min Length is " + rules.minLength + ".");
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if (value.length > rules.maxLength)
            errorMessage.push("Max Length is " + rules.maxLength + ".");
    }

    if (rules.number) {
        isValid = !isNaN(value) && isValid;
        if (isNaN(value)) errorMessage.push("Must be a number.");
    }

    return [isValid, errorMessage];
};
