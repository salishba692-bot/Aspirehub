import { Scholarship, ScholarshipCategory } from '../types';

export const SCHOLARSHIP_CATEGORIES: ScholarshipCategory[] = [
  'Pakistan Scholarships',
  'International Scholarships',
  'Fully Funded Scholarships',
  'Undergraduate Scholarships',
  "Master's Scholarships",
  'PhD Scholarships',
];

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'sch-chevening-uk',
    slug: 'chevening-uk-government-scholarships',
    title: 'Chevening UK Government Scholarships',
    country: 'United Kingdom',
    organization: 'UK Foreign, Commonwealth & Development Office (FCDO)',
    degreeLevel: "Master's",
    categories: [
      'International Scholarships',
      'Fully Funded Scholarships',
      "Master's Scholarships",
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Typically covers university tuition fees, a monthly living stipend, travel costs, and visa fees (verify exact annual terms on official portal).',
    eligibilitySummary:
      'Citizens of Chevening-eligible countries with an undergraduate degree, work experience requirement, and leadership potential.',
    deadline: 'Annual Cycle (Verify Official Dates)',
    status: 'Check Official Portal',
    officialUrl: 'https://www.chevening.org/scholarships/',
    isSampleData: false,
    dataNotice:
      'Verified program overview & official portal link. Application windows open annually; verify current cycle dates directly on chevening.org.',
    featured: true,
    fullDescription:
      'Chevening is the UK government’s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office and partner organisations, it offers one-year taught master’s degree opportunities at UK universities.',
    eligibilityCriteria: [
      'Be a citizen of a Chevening-eligible country or territory.',
      'Commit to returning to your country of citizenship for a minimum period after the award ends (per official program terms).',
      'Hold an undergraduate degree enabling entry onto a postgraduate programme at a UK university.',
      'Meet the minimum work experience requirement specified in current official guidance.',
      'Apply to three different eligible UK university courses and receive an unconditional offer.',
    ],
    requiredDocuments: [
      'Academic transcripts and degree certificates',
      'Two reference letters',
      'Valid passport or national identity document',
      'Three eligible UK university course choices / offers',
      'Four personal statement essays completed in the application portal',
    ],
    benefits: [
      'University tuition fee coverage (subject to any published cap for specific degrees)',
      'Monthly living stipend',
      'Economy return airfare to the UK',
      'Arrival and departure allowances plus visa application fee coverage',
    ],
    applicationProcess: [
      'Confirm country eligibility and academic prerequisites on chevening.org.',
      'Select three eligible UK master’s programmes and apply to those universities separately.',
      'Draft responses to the leadership, networking, study plan, and career plan essays.',
      'Submit the online application before the official annual deadline and attend interviews if shortlisted.',
    ],
    importantDates: [
      { label: 'Official Portal Check', date: 'Opens annually in late summer / autumn (verify on chevening.org)' },
      { label: 'Selection Interviews', date: 'Published on official country timeline' },
    ],
  },
  {
    id: 'sch-fulbright-pak',
    slug: 'fulbright-graduate-program-pakistan',
    title: 'Fulbright Foreign Student Program',
    country: 'United States',
    organization: 'U.S. Department of State / USEFP (Pakistan)',
    degreeLevel: "Master's",
    categories: [
      'Pakistan Scholarships',
      'International Scholarships',
      'Fully Funded Scholarships',
      "Master's Scholarships",
      'PhD Scholarships',
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Historically covers tuition, required textbooks, airfare, a living stipend, and health insurance (confirm current cycle benefits on official site).',
    eligibilitySummary:
      'Pakistani citizens (and eligible international applicants via country commissions) with strong academic records and GRE scores.',
    deadline: 'Annual Spring Cycle (Verify USEFP)',
    status: 'Check Official Portal',
    officialUrl: 'https://www.usefp.org/scholarships/fulbright-degree-program.cfm',
    isSampleData: false,
    dataNotice:
      'Verified program reference and official USEFP link. Confirm exact eligibility, GRE requirements, and closing date on usefp.org.',
    featured: true,
    fullDescription:
      'The Fulbright Degree Program administered in Pakistan by the United States Educational Foundation in Pakistan (USEFP) supports Pakistani citizens pursuing Master’s or PhD degrees at accredited U.S. universities across most academic disciplines.',
    eligibilityCriteria: [
      'Citizen of Pakistan residing in Pakistan at the time of application (per USEFP guidelines).',
      'For Master’s: 16 years of formal education; for PhD: 18 years of formal education (verify field-specific exceptions on USEFP).',
      'Valid GRE score required by application deadline; TOEFL required for shortlisted candidates.',
      'Strong academic standing and commitment to returning to Pakistan upon degree completion.',
    ],
    requiredDocuments: [
      'Completed online application form via USEFP portal',
      'Attested academic transcripts and degrees',
      'Official GRE score report',
      'Three letters of reference',
      'Statement of Purpose and Study/Research Objective essays',
    ],
    benefits: [
      'Tuition and university fees',
      'Living stipend and textbook allowance',
      'Round-trip international airfare and visa support',
      'Health coverage during the program',
    ],
    applicationProcess: [
      'Review current program eligibility and excluded fields (e.g., clinical medicine) on usefp.org.',
      'Take the GRE early enough to submit scores with your application.',
      'Prepare your Statement of Purpose and Research Objective carefully.',
      'Submit the online package and references prior to the published USEFP closing date.',
    ],
    importantDates: [
      { label: 'Application Cycle', date: 'Typically announced annually on usefp.org' },
      { label: 'Shortlisted Interviews', date: 'Conducted later in the cycle per USEFP schedule' },
    ],
  },
  {
    id: 'sch-erasmus-mundus',
    slug: 'erasmus-mundus-joint-masters',
    title: 'Erasmus Mundus Joint Masters (EMJM)',
    country: 'European Union',
    organization: 'European Education and Culture Executive Agency (EACEA)',
    degreeLevel: "Master's",
    categories: [
      'International Scholarships',
      'Fully Funded Scholarships',
      "Master's Scholarships",
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'EU-funded scholarships contribute toward tuition participation costs, travel, visa, and a monthly subsistence allowance.',
    eligibilitySummary:
      'Bachelor’s degree holders worldwide applying directly to individual Erasmus Mundus catalogue consortia.',
    deadline: 'Varies by Consortium (Oct–Mar)',
    status: 'Check Official Portal',
    officialUrl: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    isSampleData: false,
    dataNotice:
      'Verified official EU programme catalogue link. Each Joint Master programme sets its own deadline and entry criteria.',
    featured: true,
    fullDescription:
      'Erasmus Mundus Joint Masters are high-level integrated study programmes designed and delivered by an international partnership of higher education institutions across Europe and partner countries. Students study in at least two different programme countries.',
    eligibilityCriteria: [
      'Hold a first higher education degree (Bachelor’s or recognized equivalent) or be in the final year of study.',
      'Meet the specific academic background and language proficiency requirements of the chosen consortium.',
      'Observe the maximum number of simultaneous EMJM programme applications allowed under current EU rules.',
    ],
    requiredDocuments: [
      'Bachelor’s degree diploma and transcripts (with official translations if required)',
      'Proof of English (or consortium instruction language) proficiency',
      'Curriculum Vitae (often Europass or standard academic CV)',
      'Motivation letter and two academic/professional reference letters',
      'Passport copy and proof of residence',
    ],
    benefits: [
      'Full contribution to consortium tuition participation fees',
      'Monthly living stipend throughout the programme duration',
      'Contribution toward international travel and installation expenses',
    ],
    applicationProcess: [
      'Browse the official Erasmus Mundus Catalogue to select up to your permitted number of programmes.',
      'Open each selected programme’s own website for exact deadlines and syllabus details.',
      'Prepare tailored motivation letters aligned with each consortium’s mobility tracks.',
      'Apply directly via each consortium’s application portal.',
    ],
    importantDates: [
      { label: 'Consortium Windows', date: 'Individual deadlines vary; verify inside the official EMJM Catalogue' },
    ],
  },
  {
    id: 'sch-hec-indigenous',
    slug: 'hec-pakistan-scholarship-portal',
    title: 'HEC Pakistan Scholarship Initiatives',
    country: 'Pakistan',
    organization: 'Higher Education Commission (HEC), Pakistan',
    degreeLevel: 'PhD',
    categories: [
      'Pakistan Scholarships',
      'Fully Funded Scholarships',
      'Undergraduate Scholarships',
      "Master's Scholarships",
      'PhD Scholarships',
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Coverage depends on the active HEC scheme (e.g., Overseas, Indigenous, or Bilateral programmes) — verify per scheme.',
    eligibilitySummary:
      'Pakistani / AJK nationals meeting HAT/USAT test thresholds and academic criteria for each active HEC call.',
    deadline: 'Rolling Calls (Verify HEC Portal)',
    status: 'Check Official Portal',
    officialUrl: 'https://www.hec.gov.pk/english/scholarshipsgrants/Pages/default.aspx',
    isSampleData: false,
    dataNotice:
      'Verified official HEC scholarships directory link. Individual HEC schemes open at different times of the year.',
    fullDescription:
      'The Higher Education Commission (HEC) of Pakistan manages multiple domestic and international scholarship programmes spanning Undergraduate, MS/MPhil, and PhD levels, including bilateral partner government nominations and indigenous fellowships.',
    eligibilityCriteria: [
      'Pakistani or Azad Jammu & Kashmir (AJK) citizenship.',
      'Minimum CGPA/percentage and valid HEC HAT or USAT test score where mandated by the specific call.',
      'No third division in academic career (standard requirement for many HEC calls; check exact advertisement).',
    ],
    requiredDocuments: [
      'CNIC and domicile certificate',
      'HEC-attested transcripts and degree certificates',
      'Valid HAT / USAT / IELTS score report as specified',
      'Research proposal (for MS/PhD calls) and referee details',
    ],
    benefits: [
      'Tuition fee support or waiver according to the specific scheme',
      'Monthly stipend for living expenses in funded programmes',
      'Travel and research allowances where applicable',
    ],
    applicationProcess: [
      'Monitor the official HEC Scholarships & Grants portal for active announcements.',
      'Register on the HEC e-Portal and complete your academic profile.',
      'Take the required HEC assessment test (USAT or HAT) ahead of closing dates.',
      'Submit the online application form and retain fee deposit receipts if applicable.',
    ],
    importantDates: [
      { label: 'Active Calls', date: 'Published continuously on hec.gov.pk' },
    ],
  },
  {
    id: 'sch-daad-epos',
    slug: 'daad-development-postgraduate-courses',
    title: 'DAAD Development-Related Postgraduate Courses (EPOS)',
    country: 'Germany',
    organization: 'German Academic Exchange Service (DAAD)',
    degreeLevel: "Master's",
    categories: [
      'International Scholarships',
      'Fully Funded Scholarships',
      "Master's Scholarships",
      'PhD Scholarships',
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Covers monthly stipend, health/accident insurance, and travel allowance alongside tuition-free or subsidized German degree study.',
    eligibilitySummary:
      'Graduates from eligible countries with at least two years of relevant professional experience applying to EPOS-listed German programmes.',
    deadline: 'Varies by Degree Course (Aug–Nov)',
    status: 'Check Official Portal',
    officialUrl: 'https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/',
    isSampleData: false,
    dataNotice:
      'Verified official DAAD scholarship portal. Confirm exact participating degree courses and deadlines directly on daad.de.',
    fullDescription:
      'DAAD’s EPOS programme supports professionals from developing and newly industrialised countries pursuing development-related postgraduate Master’s or PhD degrees at state or state-recognised German universities.',
    eligibilityCriteria: [
      'Completed Bachelor’s degree (normally not older than six years per DAAD standard guidelines).',
      'Minimum two years of documented full-time professional experience after graduation.',
      'Language proficiency (English or German depending on the chosen EPOS course).',
    ],
    requiredDocuments: [
      'Signed DAAD application form',
      'Hand-signed CV in reverse chronological order (Europass recommended)',
      'Letter of motivation detailing academic and professional reasons',
      'Employment certificates confirming at least two years of work experience',
      'Academic transcripts, degree certificates, and language certificates',
    ],
    benefits: [
      'Monthly scholarship stipend (rates published by DAAD)',
      'Health, accident, and personal liability insurance',
      'Travel allowance and preparatory German language course where applicable',
    ],
    applicationProcess: [
      'Download the current DAAD EPOS brochure from daad.de to view eligible university programmes.',
      'Apply directly to your chosen German university programmes (up to the permitted limit).',
      'Upload all certified documents and employment verification before the individual university deadline.',
    ],
    importantDates: [
      { label: 'Course Deadlines', date: 'Varies per German university; check the official DAAD EPOS handbook' },
    ],
  },
  {
    id: 'sch-commonwealth-masters',
    slug: 'commonwealth-masters-scholarships-uk',
    title: 'Commonwealth Master’s Scholarships',
    country: 'United Kingdom',
    organization: 'Commonwealth Scholarship Commission (CSC)',
    degreeLevel: "Master's",
    categories: [
      'Pakistan Scholarships',
      'International Scholarships',
      'Fully Funded Scholarships',
      "Master's Scholarships",
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Covers approved airfare, tuition fees, living allowance, and warm clothing/thesis grants where applicable.',
    eligibilitySummary:
      'Citizens of eligible Commonwealth countries (including Pakistan) nominated via national nominating agencies or partner NGOs.',
    deadline: 'Annual Autumn Window (Verify CSC)',
    status: 'Check Official Portal',
    officialUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/',
    isSampleData: false,
    dataNotice:
      'Verified official CSC programme page. Nominating agencies (such as HEC in Pakistan) may have additional local steps.',
    fullDescription:
      'Funded by the UK Foreign, Commonwealth & Development Office, Commonwealth Master’s Scholarships enable talented and motivated individuals from eligible low- and middle-income Commonwealth countries to gain knowledge and skills for sustainable development.',
    eligibilityCriteria: [
      'Citizen of or granted refugee status by an eligible Commonwealth country.',
      'Permanent resident in an eligible Commonwealth country.',
      'Available to start academic studies in the UK by the start of the academic year.',
      'Hold a first degree of at least upper second class (2:1) honours standard (or lower second plus relevant postgraduate qualification).',
      'Unable to afford to study in the UK without the scholarship.',
    ],
    requiredDocuments: [
      'Proof of citizenship / residency',
      'Full transcripts and degree certificates',
      'Two references from academic or professional referees',
      'Development Impact statements and study outline',
    ],
    benefits: [
      'Approved round-trip airfare to the UK',
      'Full approved tuition fees covered by agreement with UK universities',
      'Monthly living stipend and thesis/study travel grants',
    ],
    applicationProcess: [
      'Check the list of eligible nominating agencies for your country on cscuk.fcdo.gov.uk.',
      'Complete both the CSC Central Application System form and any parallel nominating agency portal (e.g., HEC).',
      'Ensure both referees upload recommendations before the referee deadline.',
    ],
    importantDates: [
      { label: 'Official Announcements', date: 'Verify current cycle schedule on cscuk.fcdo.gov.uk' },
    ],
  },
  {
    id: 'sch-sample-merit-undergrad',
    slug: 'sample-stem-undergraduate-excellence-award',
    title: 'Global STEM Undergraduate Excellence Award [Sample Data]',
    country: 'Canada',
    organization: 'Sample University Merit Foundation (Illustrative Entry)',
    degreeLevel: 'Undergraduate',
    categories: [
      'International Scholarships',
      'Undergraduate Scholarships',
    ],
    fundingType: 'Partial Funding',
    fundingCoverage:
      'Sample coverage: CAD 12,000/year tuition reduction renewable for up to 4 years based on academic standing.',
    eligibilitySummary:
      'Sample profile: International high-school graduates entering Computer Science, Engineering, or Mathematics with 85%+ grades.',
    deadline: 'Sample Cycle: Feb 15, 2027',
    status: 'Active (Sample Cycle)',
    officialUrl: 'https://www.educanada.ca/scholarships-bourses/index.aspx?lang=eng',
    isSampleData: true,
    dataNotice:
      'Sample Data: This entry demonstrates how undergraduate partial-tuition scholarships are structured on AspireHub. External link points to the official EduCanada scholarship directory.',
    fullDescription:
      'This clearly labeled sample scholarship illustrates a typical North American undergraduate merit award. Real university awards vary by institution and faculty; always confirm exact criteria on the host university’s financial aid portal or government directories like EduCanada.',
    eligibilityCriteria: [
      'Sample requirement: Completed secondary education equivalent to Canadian Grade 12.',
      'Sample requirement: Minimum 85% overall academic average in core mathematics and science subjects.',
      'Sample requirement: Proof of English proficiency (IELTS 6.5+ or TOEFL iBT 90+).',
    ],
    requiredDocuments: [
      'High school transcripts (grades 10–12)',
      'Personal leadership essay (500 words)',
      'One teacher recommendation letter',
      'Language proficiency test certificate',
    ],
    benefits: [
      'Sample annual tuition credit of CAD 12,000',
      'Mentorship pairing with senior undergraduate researchers',
    ],
    applicationProcess: [
      'Submit an undergraduate admission application to an eligible institution.',
      'Complete the supplemental merit scholarship profile before the sample deadline.',
      'Upload supporting transcripts and referee contact information.',
    ],
    importantDates: [
      { label: 'Sample Admission Deadline', date: 'Jan 15, 2027 (Sample)' },
      { label: 'Sample Award Deadline', date: 'Feb 15, 2027 (Sample)' },
    ],
  },
  {
    id: 'sch-sample-pak-undergrad',
    slug: 'sample-pakistan-need-cum-merit-undergraduate',
    title: 'National Need-Cum-Merit Undergraduate Fellowship [Sample Data]',
    country: 'Pakistan',
    organization: 'Sample Provincial Education Endowment (Illustrative Entry)',
    degreeLevel: 'Undergraduate',
    categories: [
      'Pakistan Scholarships',
      'Fully Funded Scholarships',
      'Undergraduate Scholarships',
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Sample coverage: Full public university semester tuition plus monthly book and hostel allowance.',
    eligibilitySummary:
      'Sample profile: First-year Pakistani undergraduate students admitted on merit who meet household income thresholds.',
    deadline: 'Sample Cycle: Jan 30, 2027',
    status: 'Active (Sample Cycle)',
    officialUrl: 'https://www.hec.gov.pk/english/scholarshipsgrants/Pages/default.aspx',
    isSampleData: true,
    dataNotice:
      'Sample Data: Illustrative local Pakistani need-based scholarship structure. External link directs to the official HEC Scholarships portal for verified active national schemes.',
    fullDescription:
      'This sample entry demonstrates the structure of provincial and federal need-cum-merit undergraduate grants in Pakistan (such as PEEF or HEC need-based awards). Real deadlines and income ceilings are set annually by each endowment.',
    eligibilityCriteria: [
      'Sample requirement: Pakistani national with valid domicile.',
      'Sample requirement: Confirmed admission in an accredited public-sector university undergraduate programme.',
      'Sample requirement: Verified household monthly income below published threshold.',
    ],
    requiredDocuments: [
      'Student CNIC / B-Form and guardian CNIC',
      'HSSC / Intermediate result card',
      'University admission offer and fee challan',
      'Household income affidavit and utility bills',
    ],
    benefits: [
      '100% semester tuition reimbursement',
      'Monthly stipend for books and living costs',
    ],
    applicationProcess: [
      'Obtain admission to an eligible partner university.',
      'Collect the financial aid form from your university Financial Aid Office.',
      'Submit verified income documents for institutional committee review.',
    ],
    importantDates: [
      { label: 'Sample Portal Opens', date: 'Nov 1, 2026 (Sample)' },
      { label: 'Sample Closing Date', date: 'Jan 30, 2027 (Sample)' },
    ],
  },
  {
    id: 'sch-expired-sample-2025',
    slug: 'sample-asia-digital-innovation-fellowship-2025-expired',
    title: 'Asia Digital Innovation PhD Fellowship (2025 Cycle) [Sample Archive]',
    country: 'Japan',
    organization: 'Sample Research Consortium (Archive Example)',
    degreeLevel: 'PhD',
    categories: [
      'International Scholarships',
      'Fully Funded Scholarships',
      'PhD Scholarships',
    ],
    fundingType: 'Fully Funded',
    fundingCoverage:
      'Sample archive: Full doctoral tuition waiver, monthly research stipend, and conference travel grant.',
    eligibilitySummary:
      'Sample archive: Master’s graduates in AI, Clean Energy, or Data Science applying for doctoral research.',
    deadline: 'Closed: Oct 15, 2025',
    status: 'Expired',
    officialUrl: 'https://www.studyinjapan.go.jp/en/planning/by-style/scholarship/',
    isSampleData: true,
    dataNotice:
      'Expired Sample Archive: Shown intentionally to demonstrate AspireHub’s expired-status flagging so applicants never waste effort on closed cycles.',
    fullDescription:
      'This entry is a clearly marked expired sample record from a past cycle. AspireHub retains closed cycles in an archived state with visible Expired status warnings so students can plan ahead for future cycles without applying to closed deadlines.',
    eligibilityCriteria: [
      'Archived cycle — applications are currently closed.',
      'Sample requirement: Master’s degree in a related engineering or computer science discipline.',
      'Sample requirement: Preliminary acceptance from a host laboratory supervisor.',
    ],
    requiredDocuments: [
      'Detailed 3-page doctoral research proposal',
      'Master’s thesis abstract and academic transcripts',
      'Two academic letters of recommendation',
    ],
    benefits: [
      'Full doctoral tuition exemption (archived sample)',
      'Monthly research living allowance (archived sample)',
    ],
    applicationProcess: [
      'Cycle closed on Oct 15, 2025. Check official Study in Japan scholarship directories for active MEXT or university calls.',
    ],
    importantDates: [
      { label: 'Closed Application Deadline', date: 'Oct 15, 2025 (Expired)' },
    ],
  },
  {
    id: 'sch-expired-sample-2026',
    slug: 'sample-nordic-sustainability-tuition-waiver-expired',
    title: 'Nordic Clean Tech Tuition Waiver (2026 Intake) [Sample Archive]',
    country: 'Sweden',
    organization: 'Sample Nordic Institute (Archive Example)',
    degreeLevel: "Master's",
    categories: [
      'International Scholarships',
      "Master's Scholarships",
    ],
    fundingType: 'Tuition Waiver',
    fundingCoverage:
      'Sample archive: 100% tuition fee waiver (living expenses self-funded or paired with external grants).',
    eligibilitySummary:
      'Sample archive: Non-EU/EEA applicants admitted to sustainability engineering Master’s tracks.',
    deadline: 'Closed: Feb 01, 2026',
    status: 'Expired',
    officialUrl: 'https://si.se/en/apply/scholarships/',
    isSampleData: true,
    dataNotice:
      'Expired Sample Archive: Demonstrates expired tuition-waiver filtering. External link leads to the official Swedish Institute scholarships portal.',
    fullDescription:
      'Archived sample record representing European university tuition waivers whose intake window closed in early 2026. Check the official Swedish Institute portal or university admissions pages for upcoming autumn intake dates.',
    eligibilityCriteria: [
      'Archived cycle — intake window closed on Feb 01, 2026.',
      'Non-EU/EEA fee-paying student status.',
    ],
    requiredDocuments: [
      'Bachelor’s degree transcripts',
      'Motivation essay and CV',
    ],
    benefits: [
      '100% tuition fee waiver (archived sample)',
    ],
    applicationProcess: [
      'Applications closed. Monitor official Swedish Institute and UniversityAdmissions.se portals for future cycles.',
    ],
    importantDates: [
      { label: 'Closed Deadline', date: 'Feb 01, 2026 (Expired)' },
    ],
  },
];
