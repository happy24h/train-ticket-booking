// Đối tượng `Validator`
function Validator(options) {

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        // var errorElement = getParent(inputElement, '.form-group')
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        // var errorMessage = rule.test(inputElement.value);
        var errorMessage;
        //console.log(rule.selector); // onblur#full name,...

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        //console.log(rules) // onblur [f]

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;

        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');

        } else {
            errorElement.innerText = ''; // nhập value undefined
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;

    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form); // form chính
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) { // onsubmit lắng nghe event
            e.preventDefault(); // preventDefault hủy event , ngăn chặn event

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if (!isValid){
                    isFormValid = false;
                }
            });

            console.log(formValues);

            // Đăng ký trả về true false
            if (isFormValid) {
                // Trường hợp submit với javascript => có onSubmit bên index.html
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');// :not([disabled]) input không bấm được
                    var formValues = Array.from(enableInputs).reduce(function (values,input){
                        values[input.name] = input.value;
                        return values;
                    },{});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();


                }
            }

        }

        //  Lặp qua mỗi rule và xử lý ( lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);

            }else {
                selectorRules[rule.selector] = [rule.test];
            }
            // console.log(selectorRules[rule.selector]); // object{}
            // selectorRules[rule.selector] = rule.test; //#fullname: ƒ (value)
            //console.log(selectorRules);// 5*{ rule.selector : rule.test => #fullname : [f,f....],...}

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement,rule);

                }
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {

                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

                    errorElement.innerText = ''; // undefined
                    inputElement.parentElement.classList.remove('invalid');

                }
            }
        });
        //console.log(selectorRules); //rule.selector : rule.test => #fullname : [f,...],...

    }


}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector, message) {

    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
            // value true thì undefined : value false thì 'Vui lòng nhập trường này'
            // trim() loại bỏ dấu cách 2 bên đầu chuỗi

        }
    }

}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';

        }

    }

}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;

        }

    };

}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

