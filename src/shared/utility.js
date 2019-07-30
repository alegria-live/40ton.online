import _ from 'lodash';

export function preloadImage(url) {
	const img = document.createElement('img')
	img.src = url
	return new Promise(function (resolve, reject) {
		img.onload = () => resolve(true)
		img.onerror = () => reject(false)
	});
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
        isValid = value.trim() !=='' && isValid;
    }
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid
};

export const checkIdentity = (...fields) => {
    const firstElement = fields[0];
    return fields.every((el)=> el === firstElement);
}

export const inputChangedHandler = ( event, payload, controlName, cb ) => {
    const updatedControls = updateObject( payload, {
        [controlName]: updateObject( payload[controlName], {
            value: event.target.value,
            valid: checkValidity( event.target.value, payload[controlName].validation ),
            touched: true
        })
    });
    cb(updatedControls);
};

export const validFormHandler = (payload, cb) => {
    let x = true;
        for(let mainKey in payload) {
            for(let key in payload[mainKey]) {
                if(key === 'valid'&& payload[mainKey][key] === false) {
                    x = false
                };          
            };
        };
    x ? cb(true): cb(false);
}

export const changeInputsFormText = (payload, formElementsKeyArray, textData, cb) => {
    const updatedControls = _.cloneDeep(payload);        
        formElementsKeyArray.forEach( elem => {
            updatedControls[elem].elementConfig.placeholder = textData[elem]
        });
    cb(updatedControls);
}

export const changeInputsLabelText = (payload, formElementsKeyArray, textData, cb) => {
    const updatedControls = _.cloneDeep(payload);
        formElementsKeyArray.forEach( elem => {
            updatedControls[elem].label = textData[elem]
        });
    cb(updatedControls);
}

export const cancelForm = (payload, formElementsKeyArray, cb ) => {
    const updatedControls = _.cloneDeep(payload);
        formElementsKeyArray.forEach(elem => {          
            updatedControls[elem].value = '';  
            updatedControls[elem].touched = false;
            updatedControls[elem].valid = false;
            if(elem === 'norm') {
                updatedControls[elem].value = 0.4
                updatedControls[elem].valid = true;
            }
            if(elem === 'consum') {
                updatedControls[elem].value = 24
                updatedControls[elem].valid = true;
            }
        });
    cb(updatedControls);
}

export const updateObject = (oldObject, updatedProperties) => {
    const toUpdateObject = _.cloneDeep(oldObject);
    return {
        ...toUpdateObject,
        ...updatedProperties
    };
};