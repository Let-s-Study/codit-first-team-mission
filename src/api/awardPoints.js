import apiClient from "@/api/client";

export async function awardStudyPoints(studyId, delta) {
  const id = encodeURIComponent(studyId);
  const tries = [
    { m: "patch", url: `/studies/${id}/points`, body: { delta } },
    { m: "post", url: `/studies/${id}/points`, body: { delta } },
    { m: "patch", url: `/studies/${id}/increment-points`, body: { delta } },
    { m: "post", url: `/points`, body: { studyId, delta } },
  ];
  for (const t of tries) {
    try {
      const res = await apiClient[t.m](t.url, t.body);
      const data = res?.data?.data ?? res?.data ?? {};
      const total =
        typeof data.totalPoint === "number"
          ? data.totalPoint
          : typeof data.points === "number"
            ? data.points
            : typeof data.total === "number"
              ? data.total
              : undefined;
      return { ok: true, total };
    } catch {}
  }
  return { ok: false };
}
