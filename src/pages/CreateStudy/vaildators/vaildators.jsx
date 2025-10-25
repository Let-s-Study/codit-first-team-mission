    // validators.js
    const isEmpty = (v) => !v || String(v).trim() === "";

    export function validateNickName(v) {
    if (isEmpty(v)) return "*닉네임을 입력해 주세요.";
    return "";
    }

    export function validateTitle(v) {
    if (isEmpty(v)) return "*스터디 이름을 입력해 주세요.";
    return "";
    }

    export function validateDescription(v) {
    if (isEmpty(v)) return ""; // 선택 입력이면 허용
    if (v.length > 200) return "*소개는 최대 200자.";
    return "";
    }

    export function validateBackgroundId(v) {
    if (isEmpty(v)) return "*배경을 선택해 주세요.";
    return "";
    }

    export function validatePassword(v) {
    if (isEmpty(v)) return "비밀번호를 입력해 주세요.";
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(v)) return "영문과 숫자를 포함해 주세요.";
    if (/\s/.test(v)) return "공백은 사용할 수 없습니다.";
    return "";
    }

    export function validatePasswordCheck(pw, pwCheck) {
    if (isEmpty(pwCheck)) return "비밀번호를 입력해 주세요.";
    if (pw !== pwCheck) return "*비밀번호가 일치하지 않습니다.";
    return "";
    }

    // 폼 전체 유효성 검증
    export function validateAll(values) {
    const errors = {
        nickName: validateNickName(values.nickName),
        title: validateTitle(values.title),
        description: validateDescription(values.description),
        backgroundId: validateBackgroundId(values.backgroundId),
        password: validatePassword(values.password),
        passwordCheck: validatePasswordCheck(values.password, values.passwordCheck),
    };

    // 에러만 추림
    Object.keys(errors).forEach((k) => {
        if (!errors[k]) delete errors[k];
    });
    return errors; // 빈 객체면 통과
    }
