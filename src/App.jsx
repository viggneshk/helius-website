import { useState } from "react";

const sectionTitles = {
  dashboard: [
    "Portfolio Overview",
    "Thursday, April 30, 2026 · All 14 locations · Auto-synced 3 min ago",
  ],
  pipeline: [
    "Lien Pipeline",
    "All delinquent units by stage · Click any card to open detail",
  ],
  todo: ["To-Do List", "7 tasks pending · Sorted by deadline urgency"],
  auctions: ["Auction Manager", "Upcoming & completed auctions · Ad placement tracked"],
  ar: ["AR Aging Report", "Outstanding receivables by age and location"],
  calculator: [
    "Delinquency Cost Model",
    "Quantify the financial impact · Model automation ROI",
  ],
  compliance: [
    "Compliance Audit",
    "State-specific lien law checks · 50-point verification",
  ],
  workflow: [
    "Workflow Configuration",
    "Customize automation rules per state and facility",
  ],
};

const facilityOptions = [
  { name: "All Locations", count: "14 facilities · CA + NV" },
  { name: "Sacramento Only", count: "3 facilities · CA" },
  { name: "Fresno Only", count: "2 facilities · CA" },
  { name: "Stockton Only", count: "2 facilities · CA" },
];

const navGroups = [
  {
    label: "Workflow",
    items: [
      { id: "dashboard", icon: "⬡", label: "Dashboard" },
      { id: "pipeline", icon: "⇄", label: "Lien Pipeline", badge: "23" },
      { id: "todo", icon: "✓", label: "To-Do List", badge: "7" },
      { id: "auctions", icon: "⚑", label: "Auctions" },
    ],
  },
  {
    label: "Reporting",
    items: [
      { id: "ar", icon: "$", label: "AR Aging" },
      { id: "calculator", icon: "◈", label: "Cost Calculator" },
    ],
  },
  {
    label: "Admin",
    items: [
      { id: "compliance", icon: "⊛", label: "Compliance Audit" },
      { id: "workflow", icon: "≡", label: "Workflow Config" },
    ],
  },
];

const defaultModalRecord = {
  unit: "B-204",
  tenant: "Mariana K.",
  location: "Stockton",
  days: "61",
  balance: "$847",
  stage: "Lien Filed",
};

const dashboardMetrics = [
  {
    tone: "red",
    label: "Delinquent Units",
    value: "87",
    sub: (
      <>
        of 1,240 total · <span className="down">7.0%</span> rate
      </>
    ),
  },
  {
    tone: "orange",
    label: "Over 90 Days",
    value: "23",
    sub: (
      <>
        26% of delinquent pool · <span className="down">↑ from 19</span>
      </>
    ),
  },
  {
    tone: "green",
    label: "AR Recovered MTD",
    value: "$41.2k",
    sub: (
      <>
        <span className="up">↑ 18%</span> vs last month
      </>
    ),
  },
  {
    tone: "blue",
    label: "Auctions Scheduled",
    value: "11",
    sub: <>next auction: May 8 · 3 facilities</>,
  },
];

const arMetrics = [
  {
    tone: "red",
    label: "Total AR Outstanding",
    value: "$94.1k",
    sub: <>Across 87 delinquent units</>,
  },
  {
    tone: "orange",
    label: "90+ Day Debt",
    value: "$41.3k",
    sub: <>44% of total AR · high write-off risk</>,
  },
  {
    tone: "blue",
    label: "Avg Days to Collect",
    value: "68d",
    sub: <>Industry target: &lt;45 days</>,
  },
  {
    tone: "green",
    label: "Recovery Rate YTD",
    value: "61%",
    sub: (
      <>
        <span className="up">↑ 8pts</span> vs prior year
      </>
    ),
  },
];

const progressItems = [
  {
    label: "Collections Notice (Day 1–30)",
    value: "34 units",
    width: "60%",
    color: "var(--red)",
  },
  {
    label: "Pre-Lien Notice Sent",
    value: "18 units",
    width: "32%",
    color: "var(--orange)",
  },
  {
    label: "Lien Filed (Day 30–60)",
    value: "14 units",
    width: "25%",
    color: "var(--yellow)",
  },
  {
    label: "Compliance Audit",
    value: "9 units",
    width: "16%",
    color: "var(--blue)",
  },
  {
    label: "Auction Advertised",
    value: "7 units",
    width: "12%",
    color: "#a78bfa",
  },
  {
    label: "Auction Complete",
    value: "5 units",
    width: "9%",
    color: "var(--green)",
  },
];

const recentActivity = [
  {
    tone: "done",
    icon: "✓",
    action: "Lien notice mailed — Unit B-204, Stockton",
    detail: "Certified + email · $847 past due · Mariana K.",
    date: "Today 9:14 AM",
  },
  {
    tone: "alert",
    icon: "!",
    action: "Auction window missed — Unit C-17, Fresno",
    detail: "Process exceeded 90 days · Manual review required",
    date: "Today 8:30 AM",
  },
  {
    tone: "done",
    icon: "✓",
    action: "Auction completed — Unit A-115, Sacramento",
    detail: "Sold $2,100 · Net after fees $1,840 · Unit re-listed",
    date: "Yesterday 3:50 PM",
  },
  {
    tone: "done",
    icon: "✓",
    action: "Payment received — Unit D-32, Modesto",
    detail: "$1,240 paid · Account cleared · Lien process cancelled",
    date: "Yesterday 11:02 AM",
  },
  {
    tone: "pending",
    icon: "⏱",
    action: "Military verification pending — Unit G-09, Bakersfield",
    detail: "SCRA check required before auction scheduling",
    date: "Apr 28, 2:15 PM",
  },
];

const topDelinquencies = [
  {
    unit: "C-17",
    tenant: "Carlos M.",
    location: "Fresno · CA",
    days: "93d",
    daysColor: "var(--red)",
    balance: "$2,340",
    balanceColor: "var(--red)",
    stageTone: "red",
    stageLabel: "Critical",
    nextAction: "Manual override required",
    buttonTone: "btn-danger",
    buttonLabel: "Review",
    modal: {
      unit: "C-17",
      tenant: "Carlos M.",
      location: "Fresno",
      days: "93",
      balance: "$2,340",
      stage: "Auction Window Missed",
    },
  },
  {
    unit: "B-204",
    tenant: "Mariana K.",
    location: "Stockton · CA",
    days: "61d",
    daysColor: "var(--orange)",
    balance: "$847",
    balanceColor: "var(--orange)",
    stageTone: "blue",
    stageLabel: "Lien Filed",
    nextAction: "Ad placement by May 2",
    buttonTone: "btn-outline",
    buttonLabel: "Open",
    modal: defaultModalRecord,
  },
  {
    unit: "G-09",
    tenant: "[Deceased – hold]",
    location: "Bakersfield · CA",
    days: "77d",
    daysColor: "var(--orange)",
    balance: "$1,620",
    balanceColor: "var(--text)",
    stageTone: "yellow",
    stageLabel: "On Hold",
    nextAction: "Legal review · probate",
    buttonTone: "btn-outline",
    buttonLabel: "Open",
    modal: {
      unit: "G-09",
      tenant: "[Deceased]",
      location: "Bakersfield",
      days: "77",
      balance: "$1,620",
      stage: "Hold — Verification",
    },
  },
  {
    unit: "A-88",
    tenant: "Trevor L.",
    location: "Sacramento · CA",
    days: "34d",
    daysColor: "var(--yellow)",
    balance: "$512",
    balanceColor: "var(--text)",
    stageTone: "orange",
    stageLabel: "Pre-Lien",
    nextAction: "Certified mail due May 1",
    buttonTone: "btn-outline",
    buttonLabel: "Open",
    modal: {
      unit: "A-88",
      tenant: "Trevor L.",
      location: "Sacramento",
      days: "34",
      balance: "$512",
      stage: "Pre-Lien Notice",
    },
  },
  {
    unit: "F-12",
    tenant: "Kim T.",
    location: "Modesto · CA",
    days: "28d",
    daysColor: "var(--text-dim)",
    balance: "$388",
    balanceColor: "var(--text)",
    stageTone: "gray",
    stageLabel: "Collections",
    nextAction: "Auto-reminder sent",
    buttonTone: "btn-outline",
    buttonLabel: "Open",
    modal: {
      unit: "F-12",
      tenant: "Kim T.",
      location: "Modesto",
      days: "28",
      balance: "$388",
      stage: "Collections Notice",
    },
  },
];

const pipelineColumns = [
  {
    stageClass: "stage-1",
    title: (
      <>
        Collections
        <br />
        Day 1–14
      </>
    ),
    count: "34",
    countColor: "var(--red)",
    cards: [
      {
        unit: "F-12",
        amount: "$388",
        name: "Kim T. · Modesto",
        dayLabel: "Day 28",
        dayClass: "d-low",
        modal: topDelinquencies[4].modal,
      },
      {
        unit: "H-44",
        amount: "$210",
        name: "Ravi P. · Fresno",
        dayLabel: "Day 12",
        dayClass: "d-low",
      },
      {
        unit: "D-01",
        amount: "$470",
        name: "Amy R. · Stockton",
        dayLabel: "Day 7",
        dayClass: "d-low",
      },
      { more: "+31 more" },
    ],
  },
  {
    stageClass: "stage-2",
    title: (
      <>
        Pre-Lien
        <br />
        Day 14–30
      </>
    ),
    count: "18",
    countColor: "var(--orange)",
    cards: [
      {
        unit: "A-88",
        amount: "$512",
        name: "Trevor L. · Sacramento",
        dayLabel: "Day 34",
        dayClass: "d-mid",
        modal: topDelinquencies[3].modal,
      },
      {
        unit: "J-22",
        amount: "$730",
        name: "Susan H. · Bakersfield",
        dayLabel: "Day 31",
        dayClass: "d-mid",
      },
      { more: "+16 more" },
    ],
  },
  {
    stageClass: "stage-3",
    title: (
      <>
        Lien Filed
        <br />
        Day 30–60
      </>
    ),
    count: "14",
    countColor: "var(--yellow)",
    cards: [
      {
        unit: "B-204",
        amount: "$847",
        name: "Mariana K. · Stockton",
        dayLabel: "Day 61",
        dayClass: "d-mid",
        modal: defaultModalRecord,
      },
      {
        unit: "K-09",
        amount: "$1,100",
        name: "Dan W. · Modesto",
        dayLabel: "Day 58",
        dayClass: "d-mid",
      },
      { more: "+12 more" },
    ],
  },
  {
    stageClass: "stage-4",
    title: (
      <>
        Audit &amp;
        <br />
        Verification
      </>
    ),
    count: "9",
    countColor: "var(--blue)",
    cards: [
      {
        unit: "G-09",
        amount: "$1,620",
        name: "[Hold] · Bakersfield",
        dayLabel: "Day 77",
        dayClass: "d-high",
        modal: topDelinquencies[2].modal,
      },
      {
        unit: "E-55",
        amount: "$960",
        name: "Lena M. · Fresno",
        dayLabel: "Day 72",
        dayClass: "d-high",
      },
      { more: "+7 more" },
    ],
  },
  {
    stageClass: "stage-5",
    title: (
      <>
        Auction
        <br />
        Advertised
      </>
    ),
    count: "7",
    countColor: "#a78bfa",
    cards: [
      {
        unit: "M-03",
        amount: "$1,890",
        name: "Bob T. · Sacramento",
        dayLabel: "Day 84",
        dayClass: "d-high",
      },
      {
        unit: "N-18",
        amount: "$2,100",
        name: "Joe F. · Stockton",
        dayLabel: "Day 82",
        dayClass: "d-high",
      },
      { more: "+5 more" },
    ],
  },
  {
    stageClass: "stage-6",
    title: (
      <>
        Auction
        <br />
        Complete
      </>
    ),
    count: "5",
    countColor: "var(--green)",
    cards: [
      {
        unit: "A-115",
        amount: "$2,100",
        amountColor: "var(--green)",
        name: "Sacramento · sold",
        dayLabel: "Completed Apr 29",
        dayClass: "d-done",
      },
      { more: "+4 more" },
    ],
  },
];

const todoItems = [
  {
    boxTone: "warn",
    boxLabel: "!",
    text: (
      <>
        <strong style={{ color: "var(--red)" }}>OVERDUE</strong> — Unit C-17 (Fresno): Auction
        window exceeded 90 days. Manual override + legal review required before
        rescheduling.
      </>
    ),
    status: "DUE NOW",
  },
  {
    boxTone: "warn",
    boxLabel: "!",
    text: "Unit B-204 (Stockton): Place online auction advertisement on StorageTreasures by May 2 to meet CA minimum notice window.",
    status: "DUE MAY 2",
  },
  {
    boxTone: "warn",
    boxLabel: "!",
    text: "Unit G-09 (Bakersfield): Upload military status verification result (SCRA search). Account on hold until confirmed.",
    status: "DUE MAY 3",
  },
  {
    boxTone: "warn",
    boxLabel: "!",
    text: "Unit A-88 (Sacramento): Certified mail pre-lien notice must be sent today. Tenant email also on file — include digital delivery.",
    status: "DUE TODAY",
  },
  {
    boxLabel: "○",
    text: "Units M-03 + N-18 (Sacramento/Stockton): Confirm auction photos uploaded and listings verified on StorageTreasures prior to May 8 auction date.",
    status: "DUE MAY 6",
  },
  {
    boxLabel: "○",
    text: "Fresno location: 4 new delinquencies entered since Monday. Confirm collections notices have been queued for auto-send.",
    status: "DUE MAY 5",
  },
  {
    boxTone: "done",
    boxLabel: "✓",
    text: "Unit A-115 (Sacramento): Auction complete. Proceeds of $2,100 logged. Unit relisted at $189/mo. Tenant file closed.",
    status: "DONE",
    textClassName: "done-text",
    statusStyle: { color: "var(--green)" },
  },
];

const auctionRows = [
  {
    date: "May 8, 2026",
    location: "Sacramento · CA",
    units: "4 units",
    platform: "StorageTreasures",
    adPosted: { tone: "green", label: "Live" },
    photos: { tone: "green", label: "Uploaded" },
    compliance: { tone: "green", label: "Clear" },
    recovery: "~$7,200",
  },
  {
    date: "May 8, 2026",
    location: "Stockton · CA",
    units: "3 units",
    platform: "StorageTreasures",
    adPosted: { tone: "green", label: "Live" },
    photos: { tone: "yellow", label: "Pending 1" },
    compliance: { tone: "yellow", label: "Review" },
    recovery: "~$4,800",
  },
  {
    date: "May 15, 2026",
    location: "Fresno · CA",
    units: "4 units",
    platform: "StorageTreasures",
    adPosted: { tone: "orange", label: "Not yet" },
    photos: { tone: "orange", label: "Not yet" },
    compliance: { tone: "blue", label: "Audit in progress" },
    recovery: "~$5,600",
  },
];

const arRows = [
  {
    unit: "C-17",
    tenant: "Carlos M.",
    location: "Fresno",
    zeroToThirty: "—",
    thirtyOneToSixty: "—",
    sixtyOneToNinety: "—",
    ninetyPlus: "$2,340",
    ninetyPlusStyle: { color: "var(--red)" },
    total: "$2,340",
    totalStyle: { color: "var(--red)" },
    stage: { tone: "red", label: "Critical" },
  },
  {
    unit: "G-09",
    tenant: "[Hold]",
    location: "Bakersfield",
    zeroToThirty: "—",
    thirtyOneToSixty: "—",
    sixtyOneToNinety: "$1,620",
    ninetyPlus: "—",
    total: "$1,620",
    stage: { tone: "yellow", label: "Hold" },
  },
  {
    unit: "B-204",
    tenant: "Mariana K.",
    location: "Stockton",
    zeroToThirty: "—",
    thirtyOneToSixty: "—",
    sixtyOneToNinety: "$847",
    ninetyPlus: "—",
    total: "$847",
    stage: { tone: "blue", label: "Lien Filed" },
  },
  {
    unit: "A-88",
    tenant: "Trevor L.",
    location: "Sacramento",
    zeroToThirty: "—",
    thirtyOneToSixty: "$512",
    sixtyOneToNinety: "—",
    ninetyPlus: "—",
    total: "$512",
    stage: { tone: "orange", label: "Pre-Lien" },
  },
  {
    unit: "F-12",
    tenant: "Kim T.",
    location: "Modesto",
    zeroToThirty: "$388",
    thirtyOneToSixty: "—",
    sixtyOneToNinety: "—",
    ninetyPlus: "—",
    total: "$388",
    stage: { tone: "gray", label: "Collections" },
  },
];

const complianceChecklist = [
  { tone: "done", label: "✓", text: "Primary tenant name matches FMS record" },
  { tone: "done", label: "✓", text: "Lease signed and dated correctly" },
  { tone: "done", label: "✓", text: "Alternate contact info on file" },
  { tone: "done", label: "✓", text: "Email address captured in 2+ lease locations" },
  { tone: "done", label: "✓", text: "Lien-on-goods clause present and signed" },
  { tone: "done", label: "✓", text: "Military status affidavit included" },
  { tone: "done", label: "✓", text: "SCRA check returned negative" },
  {
    tone: "warn",
    label: "!",
    text: "Certified mail delivery confirmation pending (USPS tracking in progress)",
    textStyle: { color: "var(--yellow)" },
  },
  {
    label: "○",
    text: "Pre-auction notice published (pending ad placement)",
    textClassName: "done-text",
    textStyle: { textDecoration: "none", color: "var(--text-dim)" },
  },
];

const complianceRules = [
  { text: "✓  CA requires certified mail AND email (if lease permits)" },
  { text: "✓  14-day waiting period after lien notice enforced" },
  { text: "✓  Online auction advertising permitted in CA" },
  { text: "✓  UCC search not required in CA (no lender claim check needed)" },
  { text: "✓  Newspaper ad not required for CA auctions post-2022 law" },
  {
    text: "⏱  Minimum 10 days ad run required before auction date",
    style: { color: "var(--yellow)" },
  },
];

const workflowSettings = [
  {
    title: "Day 1 auto-reminder (SMS + Email)",
    detail: "Sent at 9:00 AM tenant local time on day of first delinquency",
  },
  {
    title: "Day 14 pre-lien notice (Certified Mail + Email)",
    detail: "Triggered automatically from FMS · dual delivery per CA law",
  },
  {
    title: "Day 30 lien filing trigger",
    detail: "Lease audit auto-initiated · 50-point verification checklist",
  },
  {
    title: "Day 60 auction ad placement",
    detail: "Auto-uploaded to StorageTreasures · minimum 10-day run",
  },
  {
    title: "Day 90 escalation alert (VP Ops)",
    detail: "Email + in-app alert if unit has not cleared auction by day 90",
  },
];

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function calculateResults(inputs) {
  const locs = Number.parseFloat(inputs.locs) || 0;
  const units = Number.parseFloat(inputs.units) || 0;
  const rent = Number.parseFloat(inputs.rent) || 0;
  const delRate = Number.parseFloat(inputs.delRate) || 0;
  const over90 = Number.parseFloat(inputs.over90) || 0;
  const writeoff = Number.parseFloat(inputs.writeoff) || 0;
  const hours = Number.parseFloat(inputs.hours) || 0;
  const rate = Number.parseFloat(inputs.rate) || 0;

  const totalUnits = locs * units;
  const delUnits = totalUnits * (delRate / 100);
  const revLoss = delUnits * rent * 12;
  const over90Units = delUnits * (over90 / 100);
  const badDebt = over90Units * rent * (writeoff / 100) * 3;
  const labor = locs * hours * 52 * rate;
  const vacancy = over90Units * rent * 2;
  const total = revLoss + badDebt + labor + vacancy;
  const savings = total * 0.5;

  return {
    revLoss: formatCurrency(revLoss),
    badDebt: formatCurrency(badDebt),
    labor: formatCurrency(labor),
    vacancy: formatCurrency(vacancy),
    total: formatCurrency(total),
    savings: formatCurrency(savings),
  };
}

function buildModalTimeline(days) {
  return [
    {
      tone: "done",
      icon: "✓",
      action: "Collections notice sent (Day 1)",
      detail: "SMS + email reminder triggered automatically",
      date: `${days - 1} days ago`,
    },
    days >= 14
      ? {
          tone: "done",
          icon: "✓",
          action: "Pre-lien notice sent (Day 14)",
          detail: "Certified mail dispatched · email delivered",
          date: `${days - 14} days ago`,
        }
      : {
          tone: "future",
          icon: "○",
          action: "Pre-lien notice (Day 14)",
          detail: "Pending",
        },
    days >= 30
      ? {
          tone: "done",
          icon: "✓",
          action: "Lien filed (Day 30)",
          detail: "50-point lease audit initiated · state law applied",
          date: `${days - 30} days ago`,
        }
      : {
          tone: "future",
          icon: "○",
          action: "Lien filing (Day 30)",
          detail: "Pending",
        },
    days >= 60
      ? {
          tone: "pending",
          icon: "⏱",
          action: "Auction ad placed (Day 60)",
          detail: "StorageTreasures · minimum 10-day run",
          date: `${days - 60} days ago`,
        }
      : {
          tone: "future",
          icon: "○",
          action: "Auction ad placement (Day 60)",
          detail: "Pending",
        },
    days >= 90
      ? {
          tone: "alert",
          icon: "!",
          action: "Auction window exceeded",
          detail: "Manual review required · escalated to VP Ops",
        }
      : {
          tone: "future",
          icon: "○",
          action: "Auction completion (Day 70–90)",
          detail: "Pending",
        },
  ];
}

function Badge({ tone, children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function MetricCard({ tone, label, value, sub }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-sub">{sub}</div>
    </div>
  );
}

function ProgressItem({ label, value, width, color }) {
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span className="progress-label">{label}</span>
        <span className="progress-val">{value}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width, background: color }} />
      </div>
    </div>
  );
}

function TimelineItem({ tone, icon, action, detail, date }) {
  return (
    <div className="tl-item">
      <div className={`tl-dot ${tone}`}>{icon}</div>
      <div className="tl-body">
        <div className="tl-action">{action}</div>
        <div className="tl-detail">{detail}</div>
        {date ? <div className="tl-date">{date}</div> : null}
      </div>
    </div>
  );
}

function DashboardSection({ onOpenModal, onShowSection }) {
  return (
    <div className="active" id="view-dashboard">
      <div className="metrics-row animate-in">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Lien Cycle Progress</div>
              <div className="card-subtitle">Units by stage across all locations</div>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: 11, padding: "5px 10px" }}
              onClick={() => onShowSection("pipeline")}
            >
              Full view →
            </button>
          </div>
          <div className="card-body">
            {progressItems.map((item) => (
              <ProgressItem key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Activity</div>
              <div className="card-subtitle">Automated workflow events</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: "0 20px" }}>
            <div className="timeline">
              {recentActivity.map((item) => (
                <TimelineItem key={`${item.action}-${item.date}`} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Top Delinquencies — Immediate Attention</div>
            <div className="card-subtitle">Units requiring action within 72 hours</div>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: 11, padding: "5px 10px" }}
            onClick={() => onShowSection("ar")}
          >
            Full AR report →
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>Tenant</th>
                <th>Location</th>
                <th>Days Delinquent</th>
                <th>Balance</th>
                <th>Stage</th>
                <th>Next Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {topDelinquencies.map((row) => (
                <tr key={row.unit} onClick={() => onOpenModal(row.modal)}>
                  <td className="mono">{row.unit}</td>
                  <td>{row.tenant}</td>
                  <td className="dim">{row.location}</td>
                  <td className="mono" style={{ color: row.daysColor }}>
                    {row.days}
                  </td>
                  <td className="mono" style={{ color: row.balanceColor }}>
                    {row.balance}
                  </td>
                  <td>
                    <Badge tone={row.stageTone}>{row.stageLabel}</Badge>
                  </td>
                  <td>{row.nextAction}</td>
                  <td>
                    <button
                      type="button"
                      className={`btn ${row.buttonTone}`}
                      style={{ padding: "4px 9px", fontSize: 10 }}
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenModal(row.modal);
                      }}
                    >
                      {row.buttonLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PipelineSection({ onOpenModal }) {
  return (
    <div id="view-pipeline" className="active">
      <div className="alert-banner info animate-in">
        ◈ This view shows every delinquent unit progressing through your 90-day lien-to-auction
        cycle. Click any card for the full detail view.
      </div>
      <div className="pipeline animate-in">
        {pipelineColumns.map((column) => (
          <div key={column.count + column.stageClass} className={`pipeline-col ${column.stageClass}`}>
            <div className="pipeline-col-header">
              <div className="pipeline-col-name">{column.title}</div>
              <div className="pipeline-count" style={{ color: column.countColor }}>
                {column.count}
              </div>
            </div>
            <div className="pipeline-cards">
              {column.cards.map((card) =>
                card.more ? (
                  <div
                    key={card.more}
                    className="p-card"
                    style={{
                      textAlign: "center",
                      color: "var(--text-faint)",
                      fontSize: 11,
                      borderStyle: "dashed",
                    }}
                  >
                    {card.more}
                  </div>
                ) : (
                  <div
                    key={`${column.stageClass}-${card.unit}`}
                    className="p-card"
                    onClick={card.modal ? () => onOpenModal(card.modal) : undefined}
                    role={card.modal ? "button" : undefined}
                    tabIndex={card.modal ? 0 : undefined}
                    onKeyDown={
                      card.modal
                        ? (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onOpenModal(card.modal);
                            }
                          }
                        : undefined
                    }
                  >
                    <div className="p-card-unit">
                      {card.unit}{" "}
                      <span
                        className="p-card-amount"
                        style={card.amountColor ? { color: card.amountColor } : undefined}
                      >
                        {card.amount}
                      </span>
                    </div>
                    <div className="p-card-name">{card.name}</div>
                    <div className={`p-card-days ${card.dayClass}`}>{card.dayLabel}</div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoSection() {
  return (
    <div id="view-todo" className="active">
      <div className="alert-banner warn animate-in">
        7 tasks require attention today. Completing these keeps all 14 facilities on track with
        state lien law deadlines.
      </div>
      <div className="card animate-in">
        <div className="card-header">
          <div>
            <div className="card-title">Prioritized Task List</div>
            <div className="card-subtitle">
              Auto-generated from lien workflow · sorted by deadline urgency
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="checklist">
            {todoItems.map((item, index) => (
              <div key={`${item.status}-${index}`} className="check-item">
                <div className={classNames("check-box", item.boxTone)}>{item.boxLabel}</div>
                <div className={classNames("check-text", item.textClassName)}>{item.text}</div>
                <div className="check-status" style={item.statusStyle}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuctionsSection() {
  return (
    <div id="view-auctions" className="active">
      <div className="card animate-in">
        <div className="card-header">
          <div>
            <div className="card-title">Upcoming Auctions</div>
            <div className="card-subtitle">
              Auto-scheduled from lien workflow · all ad placements managed
            </div>
          </div>
          <button type="button" className="btn btn-primary">
            + Schedule Auction
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Auction Date</th>
                <th>Location</th>
                <th>Units</th>
                <th>Platform</th>
                <th>Ad Posted</th>
                <th>Photos</th>
                <th>Compliance</th>
                <th>Est. Recovery</th>
              </tr>
            </thead>
            <tbody>
              {auctionRows.map((row) => (
                <tr key={`${row.date}-${row.location}`}>
                  <td className="mono">{row.date}</td>
                  <td>{row.location}</td>
                  <td className="mono">{row.units}</td>
                  <td>{row.platform}</td>
                  <td>
                    <Badge tone={row.adPosted.tone}>{row.adPosted.label}</Badge>
                  </td>
                  <td>
                    <Badge tone={row.photos.tone}>{row.photos.label}</Badge>
                  </td>
                  <td>
                    <Badge tone={row.compliance.tone}>{row.compliance.label}</Badge>
                  </td>
                  <td className="mono">{row.recovery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ARSection() {
  return (
    <div id="view-ar" className="active">
      <div className="metrics-row animate-in">
        {arMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="card animate-in">
        <div className="card-header">
          <div className="card-title">AR Aging — All Locations</div>
          <div className="card-subtitle" style={{ marginTop: 2 }}>
            All delinquent accounts sorted by age
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>Tenant</th>
                <th>Location</th>
                <th>0–30d</th>
                <th>31–60d</th>
                <th>61–90d</th>
                <th>90d+</th>
                <th>Total</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {arRows.map((row) => (
                <tr key={row.unit}>
                  <td className="mono">{row.unit}</td>
                  <td>{row.tenant}</td>
                  <td className="dim">{row.location}</td>
                  <td className={classNames("mono", row.zeroToThirty === "—" && "dim")}>
                    {row.zeroToThirty}
                  </td>
                  <td className={classNames("mono", row.thirtyOneToSixty === "—" && "dim")}>
                    {row.thirtyOneToSixty}
                  </td>
                  <td className={classNames("mono", row.sixtyOneToNinety === "—" && "dim")}>
                    {row.sixtyOneToNinety}
                  </td>
                  <td
                    className={classNames("mono", row.ninetyPlus === "—" && "dim")}
                    style={row.ninetyPlusStyle}
                  >
                    {row.ninetyPlus}
                  </td>
                  <td className="mono" style={row.totalStyle}>
                    {row.total}
                  </td>
                  <td>
                    <Badge tone={row.stage.tone}>{row.stage.label}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CalculatorSection({ calculator, onCalculatorChange, results }) {
  const fields = [
    { key: "locs", label: "Number of Locations" },
    { key: "units", label: "Avg Units per Location" },
    { key: "rent", label: "Avg Monthly Rent / Unit ($)" },
    { key: "delRate", label: "Current Delinquency Rate (%)" },
    { key: "over90", label: "% of Delinquent Units 90d+" },
    { key: "writeoff", label: "Bad Debt Write-off Rate (%)" },
    { key: "hours", label: "Staff Hours/Week on Delinquency" },
    { key: "rate", label: "Staff Hourly Rate ($)" },
  ];

  return (
    <div id="view-calculator" className="active">
      <div className="card animate-in" style={{ maxWidth: 860 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Delinquency Cost Model</div>
            <div className="card-subtitle">
              Understand what delinquency is costing StorePro annually — and what automation can
              recover
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="calc-inputs">
            {fields.map((field) => (
              <div key={field.key} className="form-group">
                <label className="form-label">{field.label}</label>
                <input
                  className="form-input"
                  type="number"
                  value={calculator[field.key]}
                  onChange={(event) => onCalculatorChange(field.key, event.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="calc-results">
            <div className="calc-result-row">
              <div className="calc-result-label">Annual Revenue Lost (Delinquent Units)</div>
              <div className="calc-result-val">{results.revLoss}</div>
            </div>
            <div className="calc-result-row">
              <div className="calc-result-label">Annual Bad Debt Write-offs (90d+)</div>
              <div className="calc-result-val">{results.badDebt}</div>
            </div>
            <div className="calc-result-row">
              <div className="calc-result-label">
                Annual Labor Cost (Delinquency Management)
              </div>
              <div className="calc-result-val">{results.labor}</div>
            </div>
            <div className="calc-result-row">
              <div className="calc-result-label">Extended Vacancy Revenue Loss</div>
              <div className="calc-result-val">{results.vacancy}</div>
            </div>

            <div className="calc-total">
              <div className="calc-total-label">Total Annual Cost of Delinquency</div>
              <div className="calc-total-val">{results.total}</div>
              <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-dim)" }}>
                With automation, you could recover{" "}
                <span style={{ color: "var(--green)", fontWeight: 600 }}>{results.savings}</span>{" "}
                per year (50% reduction estimate)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceSection() {
  return (
    <div id="view-compliance" className="active">
      <div className="alert-banner info animate-in">
        50+ lease checks are run per tenant before any auction is authorized. The checklist below
        shows the audit status for Unit B-204.
      </div>
      <div className="grid-2">
        <div className="card animate-in">
          <div className="card-header">
            <div>
              <div className="card-title">Lease Audit — Unit B-204, Stockton</div>
              <div className="card-subtitle">Mariana K. · Day 61 delinquent · Lien Filed</div>
            </div>
            <Badge tone="yellow">In Progress</Badge>
          </div>
          <div className="card-body">
            <div className="checklist">
              {complianceChecklist.map((item) => (
                <div key={item.text} className="check-item">
                  <div className={classNames("check-box", item.tone)}>{item.label}</div>
                  <div
                    className={classNames("check-text", item.textClassName)}
                    style={item.textStyle}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card animate-in">
          <div className="card-header">
            <div className="card-title">Compliance Coverage</div>
            <div className="card-subtitle">State-level rules applied to this account</div>
          </div>
          <div className="card-body">
            <div className="progress-wrap">
              <div className="progress-meta">
                <span className="progress-label">California Lien Law Compliance</span>
                <span className="progress-val" style={{ color: "var(--green)" }}>
                  Active
                </span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.8 }}>
              {complianceRules.map((rule) => (
                <div key={rule.text} style={rule.style}>
                  {rule.text}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                padding: 12,
                background: "var(--surface2)",
                borderRadius: 6,
                border: "1px solid var(--border)",
                fontSize: 11,
                color: "var(--text-dim)",
              }}
            >
              Workflow last synced with CA lien law database:{" "}
              <span style={{ color: "var(--text)", fontFamily: "'DM Mono', monospace" }}>
                Apr 30, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowSection() {
  return (
    <div id="view-workflow" className="active">
      <div className="card animate-in" style={{ maxWidth: 700 }}>
        <div className="card-header">
          <div className="card-title">Workflow Configuration</div>
          <div className="card-subtitle">
            Customize timing, templates, and escalation rules per state
          </div>
        </div>
        <div className="card-body">
          <div className="alert-banner info" style={{ marginBottom: 20 }}>
            These settings apply to all California locations. Override per-facility is available.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {workflowSettings.map((setting) => (
              <div
                key={setting.title}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 7,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                    {setting.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
                    {setting.detail}
                  </div>
                </div>
                <div style={{ fontSize: 20, cursor: "pointer" }}>🔵</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ record, onClose }) {
  const resolvedRecord = record ?? defaultModalRecord;
  const timeline = buildModalTimeline(Number.parseInt(resolvedRecord.days, 10));

  return (
    <div
      className={classNames("modal-overlay", record && "open")}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">
              Unit {resolvedRecord.unit} · {resolvedRecord.location}
            </div>
            <div className="modal-subtitle">{resolvedRecord.tenant} · Delinquency file</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">Account Summary</div>
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-item-label">Unit</div>
                <div className="detail-item-val mono">{resolvedRecord.unit}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Tenant</div>
                <div className="detail-item-val">{resolvedRecord.tenant}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Location</div>
                <div className="detail-item-val">{resolvedRecord.location} · CA</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Days Delinquent</div>
                <div className="detail-item-val mono">{resolvedRecord.days} days</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Balance Due</div>
                <div className="detail-item-val mono red">{resolvedRecord.balance}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Current Stage</div>
                <div className="detail-item-val">
                  <Badge tone="orange">{resolvedRecord.stage}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">Compliance Timeline</div>
            <div className="timeline">
              {timeline.map((item) => (
                <TimelineItem key={`${item.action}-${item.date ?? "pending"}`} {...item} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button type="button" className="btn btn-primary" style={{ flex: 1 }}>
              Send Notice
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }}>
              View Full File
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [facilityIndex, setFacilityIndex] = useState(0);
  const [modalRecord, setModalRecord] = useState(null);
  const [calculator, setCalculator] = useState({
    locs: "14",
    units: "89",
    rent: "165",
    delRate: "7",
    over90: "26",
    writeoff: "40",
    hours: "12",
    rate: "22",
  });

  const [pageTitle, pageSub] = sectionTitles[activeSection];
  const facility = facilityOptions[facilityIndex];
  const calculatorResults = calculateResults(calculator);

  const handleShowSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection onOpenModal={setModalRecord} onShowSection={handleShowSection} />;
      case "pipeline":
        return <PipelineSection onOpenModal={setModalRecord} />;
      case "todo":
        return <TodoSection />;
      case "auctions":
        return <AuctionsSection />;
      case "ar":
        return <ARSection />;
      case "calculator":
        return (
          <CalculatorSection
            calculator={calculator}
            onCalculatorChange={(key, value) =>
              setCalculator((current) => ({ ...current, [key]: value }))
            }
            results={calculatorResults}
          />
        );
      case "compliance":
        return <ComplianceSection />;
      case "workflow":
        return <WorkflowSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-name">StorePro Ops</div>
            <div className="logo-sub">Delinquency Command Center</div>
          </div>
          <div className="nav-section">
            <button
              type="button"
              className="facility-switcher"
              onClick={() =>
                setFacilityIndex((current) => (current + 1) % facilityOptions.length)
              }
            >
              <div>
                <div className="facility-name">{facility.name}</div>
                <div className="facility-count">{facility.count}</div>
              </div>
              <span style={{ color: "var(--text-faint)", fontSize: 11 }}>⌄</span>
            </button>
          </div>

          {navGroups.map((group) => (
            <div key={group.label} className="nav-section">
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={classNames("nav-item", activeSection === item.id && "active")}
                  onClick={() => handleShowSection(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span> {item.label}
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </button>
              ))}
            </div>
          ))}

          <div className="sidebar-footer">
            <div style={{ marginBottom: 4, color: "var(--text-dim)" }}>Logged in as</div>
            <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 12 }}>
              VP of Operations
            </div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 1 }}>
              StorePro Management
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="topbar-title">
              <h1>{pageTitle}</h1>
              <p>{pageSub}</p>
            </div>
            <div className="topbar-right">
              <button type="button" className="btn btn-outline" onClick={() => setModalRecord(defaultModalRecord)}>
                ⊕ New Delinquency
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleShowSection("calculator")}
              >
                ◈ Run Cost Model
              </button>
            </div>
          </div>

          <div className="content">
            <div className="alert-banner danger animate-in">
              ⚠ 3 units have missed the 90-day auction window — immediate action required.
              <button
                type="button"
                className="inline-link-button"
                onClick={() => handleShowSection("todo")}
              >
                View tasks →
              </button>
            </div>

            <div className="section-views">{renderSection()}</div>
          </div>
        </main>
      </div>

      <Modal record={modalRecord} onClose={() => setModalRecord(null)} />

      <div className="prototype-notice">PROTOTYPE · StorePro Ops v0.1</div>
    </>
  );
}

export default App;
