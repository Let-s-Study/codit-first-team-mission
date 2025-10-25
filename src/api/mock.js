    // mockApi.js
const mockDB = {
    studies: {
        "s1": {
        id: "s1",
        nickName: "연우",
        title: "연우의 개발공장",
        description: "소개 문구",
        background: "c2",
        // 데모용 평문(실서비스는 해시!)
        password: "12345678",
        createdAt: new Date().toISOString(),
        },
    },
    };

    function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    export async function getStudy(id) {
    await delay(300);
    var data = mockDB.studies[id];
    if (!data) {
        var err = new Error("Not Found");
        err.status = 404;
        throw err;
    }
    // 실제 API처럼 최소 필드만 반환
    return {
        id: data.id,
        title: data.title,
        nickName: data.nickName,
        description: data.description,
        background: data.background,
        createdAt: data.createdAt,
    };
    }

    export async function authStudy(id, password) {
    await delay(300);
    var data = mockDB.studies[id];
    if (!data) {
        var err = new Error("Not Found");
        err.status = 404;
        throw err;
    }
    if (password !== data.password) {
        var e = new Error("비밀번호 불일치");
        e.status = 401;
        throw e;
    }
    // 실제 서버에서 쿠키/토큰을 주겠지만, 모의로 ok만 반환
    return { ok: true };
    }
