import FormData from "form-data";

export function parse(type: string, target: string) {
    switch (type) {
        case "number":
            return parseFloat(target);
        case "boolean":
            return target == "true" ? true : false;
        default:
            return target;
    }
}

export function objectToFormData(object: any) {
    let fd = new FormData();
    for (var key in object) {
        fd.append(key, object[key]);
    }
    return [fd, { headers: fd.getHeaders() }];
}
