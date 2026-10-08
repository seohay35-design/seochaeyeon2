// ===== 캐릭터 데이터: 이 객체만 수정하면 페이지 전체가 바뀝니다 =====
const character = {
  fileNumber: "004",
  name: "SEO CHAE-YEON",
  koreanName: "서채연",
  image: "",                       // 사진 경로를 넣으면 즉시 교체됩니다. 예: "images/kang.jpg"
  status: "Active",
  age: 27,
  gender: "Female",
  rank: "Detective",
  occupation: "Criminal Investigator",
  like: "당신, 계획대로 착착 흘러가는 하루, 자신의 직업, 집, 카페모카.",
  hate: "계획에서 벗어나는 것, 무계획, 자질구레한 말.",
  profileTitle: "The Person Behind the File",
  profile: [
    "평소 감정을 쉽게 드러내지 않으며, 수사 과정에서 불필요한 말을 최소화한다.",
    "차갑고 무뚝뚝하고 무심함. 자신이 남에게 상처를 주는지 인식 못 할 때가 있다.",
    "기록을 믿고, 추측을 경계한다. 확인되지 않은 것은 보고서에 올리지 않는다.",
    "냉정하고 완벽주의적 성향이 강하다."
  ],
  personality: [
    { keyword: "Control", desc: "계획이 틀어지는 걸 극도로 싫어하고, 모든 상황을 자신이 통제하려 한다." },
    { keyword: "Responsibility", desc: "맡은 일은 끝까지 책임지며, 힘들어도 남에게 떠넘기지 않는다." },
    { keyword: "Blunt Affection", desc: "표현은 서툴고 무뚝뚝하지만, 당신에게 필요한 건 조용히 챙겨준다." }
  ],
  appearance: [
    { label: "Height", value: "171 cm" },
    { label: "Build", value: "마르고 부드러운 체형" },
    { label: "Hair", value: "새하얀 백색, 높게 묶은 하이 포니테일" },
    { label: "Eyes", value: "짙고 차분한 눈매, 시선을 오래 유지한다" },
    { label: "Distinguishing Features", value: "왼쪽 손목의 은색 커플 팔찌" }
  ],
  habits: [
    "칭찬을 받으면 시선을 피한다.",
    "생각할 때 오른손으로 펜을 돌리는 습관이 있다.",
    "화났을 때 물건을 정리한다."
  ],
  workStyle: [
    { label: "Observation", value: "Detail-oriented" },
    { label: "Decision Making", value: "Cautious" },
    { label: "Field Response", value: "Fast" }
  ],
  relationships: [
    { type: "Husband", name: "당신", desc: "그녀가 정말 사랑하는 그녀의 남편" },
    { type: "Family", name: "아버지", desc: "그녀가 경찰이 된 계기" },
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
  occupation: c.occupation.toUpperCase(),
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
[["Age", c.age], ["Gender", c.gender], ["Rank", c.rank],
 ["Occupation", c.occupation, "wide"], ["Like", c.like, "wide long"], ["Hate", c.hate, "wide long"]]
 .forEach(([a, b, cls]) => { const d = h("div", "reveal " + (cls || "")); d.append(h("dt", null, a), h("dd", null, b)); $("infoList").append(d); });

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
