// ===== 캐릭터 데이터: 이 객체만 수정하면 페이지 전체가 바뀝니다 =====
const character = {
  fileNumber: "004",
  name: "KANG CHAE-YEON",
  koreanName: "강채연",
  image: "",                       // 사진 경로를 넣으면 즉시 교체됩니다. 예: "images/kang.jpg"
  status: "Active",
  age: 29,
  gender: "Female",
  rank: "Detective",
  occupation: "Criminal Investigator",
  department: "Criminal Investigation",
  yearsOfService: 7,
  profileTitle: "The Person Behind the File",
  profile: [
    "평소 감정을 쉽게 드러내지 않으며, 수사 과정에서 불필요한 말을 최소화한다.",
    "현장에서는 가장 늦게 입을 열지만, 한 번 꺼낸 말은 대부분 사건의 방향을 바꾼다. 동료들은 그녀의 침묵을 판단의 시간으로 읽는다.",
    "기록을 믿고, 추측을 경계한다. 확인되지 않은 것은 보고서에 올리지 않는다.",
    "퇴근 후의 모습은 거의 알려져 있지 않다."
  ],
  personality: [
    { keyword: "Reserved", desc: "감정을 앞세우지 않고, 필요한 순간에만 말한다." },
    { keyword: "Observant", desc: "사소한 불일치를 놓치지 않는다." },
    { keyword: "Persistent", desc: "결론이 나기 전에는 사건에서 손을 떼지 않는다." }
  ],
  appearance: [
    { label: "Height", value: "166 cm" },
    { label: "Build", value: "마르고 단단한 체형" },
    { label: "Hair", value: "짙은 갈색, 목선에 닿는 길이의 단발" },
    { label: "Eyes", value: "짙고 차분한 눈매, 시선을 오래 유지한다" },
    { label: "Distinguishing Features", value: "왼쪽 손목의 낡은 가죽 시계" }
  ],
  habits: [
    "사건 기록을 직접 손으로 정리한다.",
    "생각할 때 오른손으로 펜을 돌리는 습관이 있다.",
    "늦은 밤 혼자 커피를 마시는 시간이 많다."
  ],
  workStyle: [
    { label: "Observation", value: "Detail-oriented" },
    { label: "Decision Making", value: "Cautious" },
    { label: "Field Response", value: "Fast" }
  ],
  relationships: [
    { type: "Superior", name: "강력계 팀장", desc: "그녀의 신중함을 신뢰하되, 늘 한 걸음 더 빠르길 요구한다." },
    { type: "Partner", name: "수사 파트너", desc: "말수 적은 그녀의 곁에서 현장의 소음을 맡는다." },
    { type: "Family", name: "어머니", desc: "가장 오래 연락이 닿아 있는 사람." }
  ],
  access: "Authorized Personnel Only",
  lastUpdated: "2026.10.07"
};
// ======================================================================

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const c = character;

// 텍스트 바인딩
const bind = {
  fileLabel: "FILE " + c.fileNumber,
  imageLabel: "IMAGE " + c.fileNumber,
  status: "STATUS / " + c.status.toUpperCase(),
  koreanName: c.koreanName,
  rank: c.rank.toUpperCase(),
  department: c.department.toUpperCase(),
  profileTitle: c.profileTitle
};
document.querySelectorAll("[data-bind]").forEach(el => {
  const k = el.dataset.bind;
  if (k === "nameLines") {
    c.name.split(" ").forEach(w => {
      const l = document.createElement("span");
      l.className = "l";
      l.innerHTML = "<span></span>";
      l.firstChild.textContent = w;
      el.appendChild(l);
    });
    el.replaceWith(...el.childNodes);
  } else el.textContent = bind[k] ?? "";
});

document.title = "Personnel Files — " + c.name;

// 이미지
if (c.image) {
  const img = $("portraitImg");
  img.onload = () => { img.hidden = false; $("placeholder").hidden = true; };
  img.onerror = () => { img.hidden = true; $("placeholder").hidden = false; };
  img.alt = c.name;
  img.src = c.image;
}

const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.textContent = html; return e; };
const row = (wrap, dt, dd) => { const d = h("div"); d.append(h("dt", "label", dt), h("dd", null, dd)); wrap.append(d); };

// 인적 정보
[["Age", c.age], ["Gender", c.gender], ["Rank", c.rank], ["Occupation", c.occupation],
 ["Department", c.department], ["Years of Service", pad(c.yearsOfService) + " Years"]]
 .forEach(([a, b]) => { const d = h("div", "reveal"); d.append(h("dt", null, a), h("dd", null, b)); $("infoList").append(d); });

// 프로필
c.profile.forEach(t => $("profileText").append(h("p", null, t)));

// 성격
c.personality.forEach(p => {
  const d = h("div", "kw reveal", p.keyword);
  d.append(h("small", null, p.desc));
  $("personality").append(d);
});

// 외형
c.appearance.forEach(a => { const d = h("div", "reveal"); d.append(h("dt", "label", a.label), h("dd", null, a.value)); $("appearance").append(d); });

// 습관
c.habits.forEach((t, i) => { const li = h("li", "reveal"); li.append(h("b", null, pad(i + 1)), h("span", null, t)); $("habits").append(li); });

// 업무 스타일
c.workStyle.forEach(w => { const d = h("div", "reveal"); d.append(h("dt", null, w.label.toUpperCase()), h("dd", null, w.value)); $("workStyle").append(d); });

// 관계
c.relationships.forEach(r => {
  const li = h("li", "reveal");
  const right = h("div");
  right.append(h("div", "who", r.name), h("p", null, r.desc));
  li.append(h("span", "label", r.type), right);
  $("relList").append(li);
});

// 마지막 영역
[["Status", c.status], ["File Access", c.access], ["Last Updated", c.lastUpdated]]
 .forEach(([a, b]) => { const d = h("div"); d.append(h("dt", null, a.toUpperCase()), h("dd", null, b.toUpperCase())); $("closeList").append(d); });

// 스크롤 등장
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
