const openingBalanceEquityCode = "3000";
const openingBalanceEquityName = "Opening Balance Equity";
const openingBalanceEquityType = "Equity";
const systemOpeningBalanceEntryKey = "system-opening-balance-equity";
const appDisplayName = "LedgrAI";
const defaultBrandEyebrow = "AI Accounting";
const currencyCatalog = [
  { code: "USD", symbol: "$", name: "United States Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound Sterling" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ARS", symbol: "$", name: "Argentine Peso" },
  { code: "CLP", symbol: "$", name: "Chilean Peso" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  { code: "RON", symbol: "lei", name: "Romanian Leu" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
  { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham" },
  { code: "TND", symbol: "د.ت", name: "Tunisian Dinar" },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling" },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
  { code: "RWF", symbol: "RF", name: "Rwandan Franc" },
  { code: "ZMW", symbol: "ZK", name: "Zambian Kwacha" },
  { code: "XOF", symbol: "CFA", name: "West African CFA Franc" },
  { code: "XAF", symbol: "FCFA", name: "Central African CFA Franc" },
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr" },
  { code: "BWP", symbol: "P", name: "Botswana Pula" },
  { code: "MUR", symbol: "₨", name: "Mauritian Rupee" },
  { code: "JMD", symbol: "J$", name: "Jamaican Dollar" },
  { code: "BBD", symbol: "Bds$", name: "Barbadian Dollar" },
  { code: "TTD", symbol: "TT$", name: "Trinidad and Tobago Dollar" },
  { code: "DOP", symbol: "RD$", name: "Dominican Peso" },
  { code: "CRC", symbol: "₡", name: "Costa Rican Colon" },
  { code: "GTQ", symbol: "Q", name: "Guatemalan Quetzal" },
  { code: "HNL", symbol: "L", name: "Honduran Lempira" },
  { code: "NIO", symbol: "C$", name: "Nicaraguan Cordoba" },
  { code: "PAB", symbol: "B/.", name: "Panamanian Balboa" },
  { code: "ILS", symbol: "₪", name: "Israeli New Shekel" },
  { code: "QAR", symbol: "﷼", name: "Qatari Riyal" },
  { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar" },
  { code: "BHD", symbol: ".د.ب", name: "Bahraini Dinar" },
  { code: "OMR", symbol: "﷼", name: "Omani Rial" },
  { code: "JOD", symbol: "JD", name: "Jordanian Dinar" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" },
  { code: "NPR", symbol: "₨", name: "Nepalese Rupee" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "TWD", symbol: "NT$", name: "New Taiwan Dollar" },
  { code: "MOP", symbol: "MOP$", name: "Macanese Pataca" },
  { code: "FJD", symbol: "FJ$", name: "Fijian Dollar" },
  { code: "PGK", symbol: "K", name: "Papua New Guinean Kina" },
  { code: "ISK", symbol: "kr", name: "Icelandic Krona" },
];
const countryCurrencySuggestions = {
  nigeria: "NGN",
  "united states": "USD",
  "united states of america": "USD",
  usa: "USD",
  uk: "GBP",
  "united kingdom": "GBP",
  england: "GBP",
  ghana: "GHS",
  kenya: "KES",
  "south africa": "ZAR",
  canada: "CAD",
  australia: "AUD",
  japan: "JPY",
  china: "CNY",
  india: "INR",
  "united arab emirates": "AED",
  "saudi arabia": "SAR",
  france: "EUR",
  germany: "EUR",
  italy: "EUR",
  spain: "EUR",
  ireland: "EUR",
  portugal: "EUR",
  netherlands: "EUR",
  belgium: "EUR",
  austria: "EUR",
  greece: "EUR",
  finland: "EUR",
  estonia: "EUR",
  latvia: "EUR",
  lithuania: "EUR",
  croatia: "EUR",
  slovakia: "EUR",
  slovenia: "EUR",
  cyprus: "EUR",
  malta: "EUR",
  poland: "PLN",
  czechia: "CZK",
  "czech republic": "CZK",
  hungary: "HUF",
  romania: "RON",
  sweden: "SEK",
  norway: "NOK",
  denmark: "DKK",
  switzerland: "CHF",
  iceland: "ISK",
  turkey: "TRY",
  russia: "RUB",
  ukraine: "UAH",
  egypt: "EGP",
  morocco: "MAD",
  tunisia: "TND",
  uganda: "UGX",
  tanzania: "TZS",
  rwanda: "RWF",
  zambia: "ZMW",
  ethiopia: "ETB",
  botswana: "BWP",
  mauritius: "MUR",
  jamaica: "JMD",
  barbados: "BBD",
  "trinidad and tobago": "TTD",
  "dominican republic": "DOP",
  "costa rica": "CRC",
  guatemala: "GTQ",
  honduras: "HNL",
  nicaragua: "NIO",
  panama: "PAB",
  israel: "ILS",
  qatar: "QAR",
  kuwait: "KWD",
  bahrain: "BHD",
  oman: "OMR",
  jordan: "JOD",
  pakistan: "PKR",
  bangladesh: "BDT",
  "sri lanka": "LKR",
  nepal: "NPR",
  thailand: "THB",
  malaysia: "MYR",
  indonesia: "IDR",
  philippines: "PHP",
  vietnam: "VND",
  "south korea": "KRW",
  taiwan: "TWD",
  macau: "MOP",
  fiji: "FJD",
  "papua new guinea": "PGK",
};

let currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
});

const state = {
  currentUser: null,
  accounts: [],
  journalEntries: [],
  companySetup: null,
  editingAccountId: null,
  editingJournalId: null,
  editingJournalDescriptionId: null,
  currentView: "company-setup",
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  assistantMessages: [],
  assistantPending: false,
  authView: "login",
  setupBannerDismissed: false,
  onboardingStepIndex: 0,
  locationOptions: {
    countries: [],
    statesByCountry: new Map(),
    citiesByState: new Map(),
  },
  balanceSheetSections: {
    currentAssets: true,
    nonCurrentAssets: true,
    currentLiabilities: true,
    nonCurrentLiabilities: true,
    equity: true,
  },
};

const elements = {
  authShell: document.querySelector("#auth-shell"),
  authFormError: document.querySelector("#auth-form-error"),
  showLoginTab: document.querySelector("#show-login-tab"),
  showRegisterTab: document.querySelector("#show-register-tab"),
  loginForm: document.querySelector("#login-form"),
  loginEmail: document.querySelector("#login-email"),
  loginPassword: document.querySelector("#login-password"),
  loginSubmitButton: document.querySelector("#login-submit-button"),
  registerForm: document.querySelector("#register-form"),
  registerName: document.querySelector("#register-name"),
  registerEmail: document.querySelector("#register-email"),
  registerPassword: document.querySelector("#register-password"),
  registerSubmitButton: document.querySelector("#register-submit-button"),
  appShell: document.querySelector(".app-shell"),
  sidebar: document.querySelector("#sidebar"),
  sidebarToggle: document.querySelector("#sidebar-toggle"),
  brandNames: [...document.querySelectorAll("[data-brand-name]")],
  brandEyebrows: [...document.querySelectorAll("[data-brand-eyebrow]")],
  pageTitle: document.querySelector("[data-page-title]"),
  currentUserName: document.querySelector("#current-user-name"),
  logoutButton: document.querySelector("#logout-button"),
  navItems: [...document.querySelectorAll("[data-view-target]")],
  viewPanels: [...document.querySelectorAll("[data-view]")],
  setupBanners: [...document.querySelectorAll("[data-setup-banner]")],
  dashboardCashBalance: document.querySelector("#dashboard-cash-balance"),
  dashboardNetIncome: document.querySelector("#dashboard-net-income"),
  dashboardTotalExpenses: document.querySelector("#dashboard-total-expenses"),
  dashboardAccountsPayable: document.querySelector("#dashboard-accounts-payable"),
  dashboardTransactions: document.querySelector("#dashboard-transactions"),
  dashboardEmptyState: document.querySelector("#dashboard-empty-state"),
  companySetupForm: document.querySelector("#company-setup-form"),
  companyName: document.querySelector("#company-name"),
  companyIndustry: document.querySelector("#company-industry"),
  companyBusinessType: document.querySelector("#company-business-type"),
  companyAddress: document.querySelector("#company-address"),
  companyPhone: document.querySelector("#company-phone"),
  companyEmail: document.querySelector("#company-email"),
  currencySelect: document.querySelector("#currency-select"),
  currencySelectionHint: document.querySelector("#currency-selection-hint"),
  companyCountry: document.querySelector("#company-country"),
  companyState: document.querySelector("#company-state"),
  companyCity: document.querySelector("#company-city"),
  financialYearStart: document.querySelector("#financial-year-start"),
  companySetupReset: document.querySelector("#company-setup-reset"),
  companySetupGuide: document.querySelector("#company-setup-guide"),
  onboardingSubtitle: document.querySelector("#onboarding-subtitle"),
  onboardingProgressBadge: document.querySelector("#onboarding-progress-badge"),
  onboardingStepList: document.querySelector("#onboarding-step-list"),
  onboardingPrevButton: document.querySelector("#onboarding-prev-button"),
  onboardingNextButton: document.querySelector("#onboarding-next-button"),
  totalAccounts: document.querySelector("#total-accounts"),
  totalBalance: document.querySelector("#total-balance"),
  totalJournalEntries: document.querySelector("#total-journal-entries"),
  totalJournalLines: document.querySelector("#total-journal-lines"),
  accountsTableBody: document.querySelector("#accounts-table-body"),
  accountsEmptyState: document.querySelector("#accounts-empty-state"),
  journalTableBody: document.querySelector("#journal-table-body"),
  journalEmptyState: document.querySelector("#journal-empty-state"),
  ledgerList: document.querySelector("#ledger-list"),
  ledgerEmptyState: document.querySelector("#ledger-empty-state"),
  trialBalanceTableBody: document.querySelector("#trial-balance-table-body"),
  trialBalanceTableFoot: document.querySelector("#trial-balance-table-foot"),
  trialBalanceEmptyState: document.querySelector("#trial-balance-empty-state"),
  printTrialBalanceButton: document.querySelector("#print-trial-balance-button"),
  trialBalanceSection: document.querySelector("#trial-balance-section"),
  printIncomeStatementButton: document.querySelector("#print-income-statement-button"),
  incomeStatementSection: document.querySelector("#income-statement-section"),
  incomeTotalRevenue: document.querySelector("#income-total-revenue"),
  incomeGrossProfit: document.querySelector("#income-gross-profit"),
  incomeOperatingExpenses: document.querySelector("#income-operating-expenses"),
  incomeNetIncome: document.querySelector("#income-net-income"),
  incomeRevenueList: document.querySelector("#income-revenue-list"),
  incomeExpenseList: document.querySelector("#income-expense-list"),
  incomeSummaryBody: document.querySelector("#income-summary-body"),
  incomeStatementEmptyState: document.querySelector("#income-statement-empty-state"),
  printBalanceSheetButton: document.querySelector("#print-balance-sheet-button"),
  balanceSheetSection: document.querySelector("#balance-sheet-section"),
  balanceSheetTotalAssets: document.querySelector("#balance-sheet-total-assets"),
  balanceSheetTotalLiabilities: document.querySelector("#balance-sheet-total-liabilities"),
  balanceSheetTotalEquity: document.querySelector("#balance-sheet-total-equity"),
  balanceSheetDifference: document.querySelector("#balance-sheet-difference"),
  balanceSheetAssetsList: document.querySelector("#balance-sheet-assets-list"),
  balanceSheetLiabilitiesList: document.querySelector("#balance-sheet-liabilities-list"),
  balanceSheetEquityList: document.querySelector("#balance-sheet-equity-list"),
  balanceSheetAssetsSubtotal: document.querySelector("#balance-sheet-assets-subtotal"),
  balanceSheetLiabilitiesSubtotal: document.querySelector("#balance-sheet-liabilities-subtotal"),
  balanceSheetEquitySubtotal: document.querySelector("#balance-sheet-equity-subtotal"),
  balanceSheetAssetsFigure: document.querySelector("#balance-sheet-assets-figure"),
  balanceSheetLiabilitiesEquityFigure: document.querySelector(
    "#balance-sheet-liabilities-equity-figure",
  ),
  balanceSheetBadge: document.querySelector("#balance-sheet-badge"),
  balanceSheetSummaryBody: document.querySelector("#balance-sheet-summary-body"),
  balanceSheetCheckStatus: document.querySelector("#balance-sheet-check-status"),
  balanceSheetEmptyState: document.querySelector("#balance-sheet-empty-state"),
  cashFlowOpeningCash: document.querySelector("#cash-flow-opening-cash"),
  cashFlowNetMovement: document.querySelector("#cash-flow-net-movement"),
  cashFlowClosingCash: document.querySelector("#cash-flow-closing-cash"),
  cashFlowBalanceCheck: document.querySelector("#cash-flow-balance-check"),
  cashFlowOperatingList: document.querySelector("#cash-flow-operating-list"),
  cashFlowInvestingList: document.querySelector("#cash-flow-investing-list"),
  cashFlowFinancingList: document.querySelector("#cash-flow-financing-list"),
  cashFlowOperatingSubtotal: document.querySelector("#cash-flow-operating-subtotal"),
  cashFlowInvestingSubtotal: document.querySelector("#cash-flow-investing-subtotal"),
  cashFlowFinancingSubtotal: document.querySelector("#cash-flow-financing-subtotal"),
  cashFlowSummaryBody: document.querySelector("#cash-flow-summary-body"),
  cashFlowStatus: document.querySelector("#cash-flow-status"),
  cashFlowEmptyState: document.querySelector("#cash-flow-empty-state"),
  printCashFlowButton: document.querySelector("#print-cash-flow-button"),
  cashFlowSection: document.querySelector("#cash-flow-section"),
  assistantChat: document.querySelector("#assistant-chat"),
  assistantForm: document.querySelector("#assistant-form"),
  assistantInput: document.querySelector("#assistant-input"),
  assistantClearButton: document.querySelector("#assistant-clear-button"),
  assistantSendButton: document.querySelector("#assistant-send-button"),
  assistantStatus: document.querySelector("#assistant-status"),
  accountDialog: document.querySelector("#account-dialog"),
  accountForm: document.querySelector("#account-form"),
  accountFormError: document.querySelector("#form-error"),
  accountDialogEyebrow: document.querySelector("#dialog-eyebrow"),
  accountDialogTitle: document.querySelector("#dialog-title"),
  accountCode: document.querySelector("#account-code"),
  accountName: document.querySelector("#account-name"),
  accountType: document.querySelector("#account-type"),
  openingBalance: document.querySelector("#opening-balance"),
  addAccountButton: document.querySelector("#add-account-button"),
  cancelAccountButton: document.querySelector("#cancel-button"),
  closeAccountDialogButton: document.querySelector("#close-dialog-button"),
  saveAccountButton: document.querySelector("#save-button"),
  addJournalButton: document.querySelector("#add-journal-button"),
  journalDialog: document.querySelector("#journal-dialog"),
  journalForm: document.querySelector("#journal-form"),
  journalFormError: document.querySelector("#journal-form-error"),
  journalDialogEyebrow: document.querySelector("#journal-dialog-eyebrow"),
  journalDialogTitle: document.querySelector("#journal-dialog-title"),
  journalDate: document.querySelector("#journal-date"),
  journalDescription: document.querySelector("#journal-description"),
  lineItemsList: document.querySelector("#line-items-list"),
  addLineItemButton: document.querySelector("#add-line-item-button"),
  journalTotalDebits: document.querySelector("#journal-total-debits"),
  journalTotalCredits: document.querySelector("#journal-total-credits"),
  journalBalanceStatus: document.querySelector("#journal-balance-status"),
  cancelJournalButton: document.querySelector("#cancel-journal-button"),
  closeJournalDialogButton: document.querySelector("#close-journal-dialog-button"),
  saveJournalButton: document.querySelector("#save-journal-button"),
};

elements.sidebarToggle.addEventListener("click", toggleSidebar);
elements.showLoginTab.addEventListener("click", () => setAuthView("login"));
elements.showRegisterTab.addEventListener("click", () => setAuthView("register"));
elements.loginForm.addEventListener("submit", handleLoginSubmit);
elements.registerForm.addEventListener("submit", handleRegisterSubmit);
elements.logoutButton.addEventListener("click", handleLogout);
elements.addAccountButton.addEventListener("click", () => openAccountDialog());
elements.cancelAccountButton.addEventListener("click", closeAccountDialog);
elements.closeAccountDialogButton.addEventListener("click", closeAccountDialog);
elements.accountForm.addEventListener("submit", handleAccountSubmit);
elements.accountDialog.addEventListener("close", resetAccountForm);

elements.addJournalButton.addEventListener("click", () => openJournalDialog());
elements.cancelJournalButton.addEventListener("click", closeJournalDialog);
elements.closeJournalDialogButton.addEventListener("click", closeJournalDialog);
elements.journalForm.addEventListener("submit", handleJournalSubmit);
elements.journalDialog.addEventListener("close", resetJournalForm);
elements.addLineItemButton.addEventListener("click", addLineItemRow);
elements.lineItemsList.addEventListener("input", handleLineItemChange);
elements.lineItemsList.addEventListener("change", handleLineItemChange);
elements.lineItemsList.addEventListener("click", handleLineItemClick);
elements.printTrialBalanceButton.addEventListener("click", () =>
  exportSectionToPdf(elements.trialBalanceSection, "Trial Balance"),
);
elements.printIncomeStatementButton.addEventListener("click", () =>
  exportSectionToPdf(elements.incomeStatementSection, "Income Statement"),
);
elements.printBalanceSheetButton.addEventListener("click", () =>
  exportSectionToPdf(elements.balanceSheetSection, "Balance Sheet"),
);
elements.printCashFlowButton.addEventListener("click", () =>
  exportSectionToPdf(elements.cashFlowSection, "Cash Flow Statement"),
);
elements.companySetupForm.addEventListener("submit", handleCompanySetupSubmit);
elements.companySetupReset.addEventListener("click", resetCompanySetup);
elements.currencySelect.addEventListener("change", handleCurrencySelectionInput);
elements.companyCountry.addEventListener("change", handleCountrySelectionInput);
elements.companyState.addEventListener("change", handleStateSelectionInput);
elements.companyCity.addEventListener("change", handleCitySelectionInput);
elements.setupBanners.forEach((banner) => {
  banner.querySelector("[data-dismiss-setup-banner]")?.addEventListener("click", () => {
    state.setupBannerDismissed = true;
    renderSetupBanners();
  });
});
elements.onboardingPrevButton.addEventListener("click", goToPreviousOnboardingStep);
elements.onboardingNextButton.addEventListener("click", goToNextOnboardingStep);
elements.journalTableBody.addEventListener("click", handleJournalTableAction);
elements.journalTableBody.addEventListener("keydown", handleJournalDescriptionKeydown);
[
  elements.companyName,
  elements.companyIndustry,
  elements.companyBusinessType,
  elements.companyAddress,
  elements.companyPhone,
  elements.companyEmail,
  elements.currencySelect,
  elements.companyCountry,
  elements.companyState,
  elements.companyCity,
  elements.financialYearStart,
].forEach((input, index) => {
  input.addEventListener("focus", () => {
    state.onboardingStepIndex = Math.min(index, getOnboardingSteps().length - 1);
    renderCompanySetup();
  });
});
elements.navItems.forEach((item) =>
  item.addEventListener("click", () => setActiveView(item.dataset.viewTarget)),
);
elements.balanceSheetAssetsList.addEventListener("click", handleBalanceSheetToggle);
elements.balanceSheetLiabilitiesList.addEventListener("click", handleBalanceSheetToggle);
elements.balanceSheetEquityList.addEventListener("click", handleBalanceSheetToggle);
elements.assistantForm.addEventListener("submit", handleAssistantSubmit);
elements.assistantClearButton.addEventListener("click", clearAssistantChat);
window.addEventListener("resize", handleWindowResize);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderCurrencyOptions();
    await loadCountries();
    bootApplication();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
});

async function bootApplication() {
  try {
    const session = await fetchCurrentSession();
    if (!session) {
      state.currentUser = null;
      state.companySetup = getDefaultCompanySetup();
      state.accounts = syncOpeningBalanceEquityAccount([]);
      state.journalEntries = syncSystemJournalEntry([]);
      state.assistantMessages = [];
      state.setupBannerDismissed = false;
      render();
      return;
    }

    state.currentUser = session.user;
    await initializeState();
    render();
  } catch (error) {
    state.currentUser = null;
    state.companySetup = getDefaultCompanySetup();
    state.accounts = syncOpeningBalanceEquityAccount([]);
    state.journalEntries = syncSystemJournalEntry([]);
    state.setupBannerDismissed = false;
    showAuthError(error.message);
    render();
  }
}

async function initializeState() {
  const bootstrap = await apiFetch("/api/bootstrap");
  state.currentUser = bootstrap.user;
  state.companySetup = normalizeCompanySetup(bootstrap.company);
  state.accounts = syncOpeningBalanceEquityAccount(Array.isArray(bootstrap.accounts) ? bootstrap.accounts : []);
  state.journalEntries = syncSystemJournalEntry(
    Array.isArray(bootstrap.journalEntries) ? bootstrap.journalEntries : [],
  );
  state.assistantMessages = [];
  state.currentView = "dashboard";
  state.mobileSidebarOpen = false;
  state.sidebarCollapsed = false;
  state.setupBannerDismissed = false;
  updateCurrencyFormatter();
  syncAssistantOnboardingMessage();
  await ensureLocationSelectionsLoaded();
}

async function fetchCurrentSession() {
  try {
    const payload = await apiFetch("/auth/me");
    return {
      user: payload.user,
      company: payload.company,
    };
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    throw error;
  }
}

async function refreshWorkspaceData() {
  const payload = await apiFetch("/api/bootstrap");
  state.currentUser = payload.user;
  state.companySetup = normalizeCompanySetup(payload.company);
  state.accounts = syncOpeningBalanceEquityAccount(Array.isArray(payload.accounts) ? payload.accounts : []);
  state.journalEntries = syncSystemJournalEntry(
    Array.isArray(payload.journalEntries) ? payload.journalEntries : [],
  );
  updateCurrencyFormatter();
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Request failed.");
    error.status = response.status;
    error.payload = payload;
    if (response.status === 401) {
      state.currentUser = null;
      render();
    }
    throw error;
  }

  return payload;
}

function normalizeCompanySetup(company) {
  const fallback = getDefaultCompanySetup();
  const selectedCurrency = getCurrencyMeta(company?.currency) || getCurrencyMeta(fallback.currency);
  return {
    ...fallback,
    ...(company || {}),
    currency: selectedCurrency?.code || fallback.currency,
  };
}

async function loadCountries() {
  if (state.locationOptions.countries.length) {
    return;
  }

  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const payload = await response.json();
    const countries = Array.isArray(payload?.data)
      ? payload.data
          .map((entry) => String(entry.country || entry.name || "").trim())
          .filter(Boolean)
          .sort((left, right) => left.localeCompare(right))
      : [];
    state.locationOptions.countries = countries;
    renderLocationOptions();
  } catch {}
}

async function loadStatesForCountry(countryName) {
  const normalizedCountry = String(countryName || "").trim();
  if (!normalizedCountry) {
    return [];
  }

  if (state.locationOptions.statesByCountry.has(normalizedCountry)) {
    return state.locationOptions.statesByCountry.get(normalizedCountry);
  }

  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states");
    const payload = await response.json();
    const statesByCountry = new Map();
    if (Array.isArray(payload?.data)) {
      payload.data.forEach((entry) => {
      const name = String(entry.name || entry.country || "").trim();
      const normalizedCountry = normalizeString(name);
      const states = Array.isArray(entry.states)
        ? entry.states
            .map((stateEntry) => String(stateEntry.name || stateEntry.state || "").trim())
            .filter(Boolean)
        : [];
      if (name) {
        statesByCountry.set(normalizedCountry, states);
      }
      });
    }

    state.locationOptions.statesByCountry = statesByCountry;
    renderLocationOptions();
    return statesByCountry.get(normalizedCountry) || [];
  } catch {
    return [];
  }
}

async function loadCitiesForState(countryName, stateName) {
  const normalizedCountry = String(countryName || "").trim();
  const normalizedState = String(stateName || "").trim();
  if (!normalizedCountry || !normalizedState) {
    return [];
  }

  const cacheKey = `${normalizedCountry}::${normalizedState}`;
  if (state.locationOptions.citiesByState.has(cacheKey)) {
    return state.locationOptions.citiesByState.get(cacheKey);
  }

  const requestPayload = {
    country: normalizedCountry,
    state: normalizedState,
  };

  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });
    const payload = await response.json();
    const cities = Array.isArray(payload?.data) ? payload.data.map((city) => String(city).trim()).filter(Boolean) : [];
    state.locationOptions.citiesByState.set(cacheKey, cities);
    renderLocationOptions();
    return cities;
  } catch {
    try {
      const fallbackUrl = new URL("https://countriesnow.space/api/v0.1/countries/state/cities");
      fallbackUrl.searchParams.set("country", normalizedCountry);
      fallbackUrl.searchParams.set("state", normalizedState);
      const response = await fetch(fallbackUrl.toString());
      const payload = await response.json();
      const cities = Array.isArray(payload?.data)
        ? payload.data.map((city) => String(city).trim()).filter(Boolean)
        : [];
      state.locationOptions.citiesByState.set(cacheKey, cities);
      renderLocationOptions();
      return cities;
    } catch {
      return [];
    }
  }
}

async function ensureLocationSelectionsLoaded() {
  await loadCountries();
  if (state.companySetup.country) {
    await loadStatesForCountry(state.companySetup.country);
  }
  if (state.companySetup.country && state.companySetup.stateProvince) {
    await loadCitiesForState(state.companySetup.country, state.companySetup.stateProvince);
  }
}

function renderLocationOptions() {
  updateSelectOptions(elements.companyCountry, state.locationOptions.countries, "Select a country");

  const countryKey = normalizeString(state.companySetup.country);
  const states = state.locationOptions.statesByCountry.get(countryKey) || [];
  updateSelectOptions(elements.companyState, states, "Select a state / province");

  const cityCacheKey = `${countryKey}::${normalizeString(state.companySetup.stateProvince)}`;
  const cities = state.locationOptions.citiesByState.get(cityCacheKey) || [];
  updateSelectOptions(elements.companyCity, cities, "Select a city");
}

function getSuggestedCurrencyForCountry(countryName) {
  const key = normalizeString(countryName);
  return countryCurrencySuggestions[key] || "";
}
function setAuthView(viewName) {
  state.authView = viewName;
  hideAuthError();
  renderAuthState();
}

function renderAuthState() {
  const authenticated = Boolean(state.currentUser);
  elements.authShell.classList.toggle("hidden", authenticated);
  elements.appShell.classList.toggle("hidden", !authenticated);
  elements.loginForm.classList.toggle("hidden", state.authView !== "login");
  elements.registerForm.classList.toggle("hidden", state.authView !== "register");
  elements.showLoginTab.classList.toggle("is-active", state.authView === "login");
  elements.showRegisterTab.classList.toggle("is-active", state.authView === "register");
  elements.currentUserName.textContent = state.currentUser?.name || "Account";
}

function showAuthError(message) {
  elements.authFormError.textContent = message;
  elements.authFormError.classList.remove("hidden");
}

function hideAuthError() {
  elements.authFormError.textContent = "";
  elements.authFormError.classList.add("hidden");
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  hideAuthError();

  try {
    await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: elements.loginEmail.value.trim(),
        password: elements.loginPassword.value,
      }),
    });
    elements.loginForm.reset();
    await initializeState();
    render();
  } catch (error) {
    showAuthError(error.message);
  }
}

async function handleRegisterSubmit(event) {
  event.preventDefault();
  hideAuthError();

  try {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: elements.registerName.value.trim(),
        email: elements.registerEmail.value.trim(),
        password: elements.registerPassword.value,
      }),
    });
    elements.registerForm.reset();
    await initializeState();
    render();
  } catch (error) {
    showAuthError(error.message);
  }
}

async function handleLogout() {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch {}

  state.currentUser = null;
  state.accounts = [];
  state.journalEntries = [];
  state.companySetup = getDefaultCompanySetup();
  state.assistantMessages = [];
  state.authView = "login";
  state.setupBannerDismissed = false;
  render();
}

function render() {
  renderAuthState();
  if (!state.currentUser) {
    return;
  }

  renderNavigation();
  renderBranding();
  renderSetupBanners();
  renderDashboard();
  renderCompanySetup();
  renderAccountsTable();
  renderJournalTable();
  renderGeneralLedger();
  renderTrialBalance();
  renderIncomeStatement();
  renderBalanceSheet();
  renderCashFlowStatement();
  renderAssistant();
  renderSummary();
}

function renderNavigation() {
  syncSidebarState();
  const viewTitle = getViewTitle(state.currentView);
  if (elements.pageTitle) {
    elements.pageTitle.textContent = `${appDisplayName} ${viewTitle}`;
  }
  elements.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.viewTarget === state.currentView);
  });

  elements.viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.view === state.currentView);
  });
}

function setActiveView(viewName) {
  state.currentView = viewName;
  if (isMobileViewport()) {
    state.mobileSidebarOpen = false;
  }
  render();
}

function toggleSidebar() {
  if (isMobileViewport()) {
    state.mobileSidebarOpen = !state.mobileSidebarOpen;
  } else {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  }
  syncSidebarState();
}

function syncSidebarState() {
  const collapsed = !isMobileViewport() && state.sidebarCollapsed;
  const open = !isMobileViewport() || state.mobileSidebarOpen;
  elements.appShell.classList.toggle("sidebar-collapsed", collapsed);
  elements.sidebar.classList.toggle("is-open", open);
  elements.sidebarToggle.setAttribute("aria-expanded", String(open && !collapsed));
}

function renderBranding() {
  const companyName = state.companySetup.companyName.trim();
  const eyebrow = companyName ? `${companyName} Workspace` : defaultBrandEyebrow;

  document.title = appDisplayName;
  elements.brandNames.forEach((element) => {
    element.textContent = appDisplayName;
  });
  elements.brandEyebrows.forEach((element) => {
    element.textContent = eyebrow;
  });
}

function isSetupGateIncomplete() {
  return !(
    state.companySetup.companyName.trim() &&
    state.companySetup.country.trim() &&
    state.companySetup.currency.trim()
  );
}

function renderSetupBanners() {
  const showBanner = isSetupGateIncomplete() && !state.setupBannerDismissed;
  elements.setupBanners.forEach((banner) => {
    banner.classList.toggle("hidden", !showBanner);
  });
}

function renderDashboard() {
  const cashFlow = buildCashFlowStatementReport();
  const incomeStatement = buildIncomeStatementReport();
  const monthlyNetIncome = buildCurrentMonthNetIncome();
  const accountsPayable = buildAccountsPayableBalance();
  const recentTransactions = state.journalEntries
    .filter((entry) => !entry.systemGenerated)
    .slice()
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 6);

  elements.dashboardCashBalance.textContent = currencyFormatter.format(cashFlow.closingCash);
  elements.dashboardNetIncome.textContent = currencyFormatter.format(monthlyNetIncome);
  elements.dashboardNetIncome.classList.toggle("negative", monthlyNetIncome < 0);
  elements.dashboardTotalExpenses.textContent = currencyFormatter.format(incomeStatement.operatingExpenses);
  elements.dashboardAccountsPayable.textContent = currencyFormatter.format(accountsPayable);
  safeSetInnerHTML(elements.dashboardTransactions, "");

  if (!recentTransactions.length) {
    elements.dashboardEmptyState.classList.remove("hidden");
    return;
  }

  elements.dashboardEmptyState.classList.add("hidden");
  recentTransactions.forEach((entry) => {
    const totals = calculateLineTotals(entry.lineItems);
    const amount = totals.debits;
    const item = document.createElement("article");
    item.className = "dashboard-transaction";
    safeSetInnerHTML(
      item,
      `
      <div class="dashboard-transaction-meta">
        <strong>${escapeHtml(entry.description)}</strong>
        <span class="dashboard-transaction-date">${escapeHtml(formatDate(entry.date))}</span>
      </div>
      <strong class="dashboard-transaction-amount ${amount >= 0 ? "positive" : "negative"}">
        ${escapeHtml(currencyFormatter.format(amount))}
      </strong>
      `,
    );
    elements.dashboardTransactions.appendChild(item);
  });
}

function buildCurrentMonthNetIncome() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return state.journalEntries
    .filter((entry) => !entry.systemGenerated)
    .filter((entry) => {
      const entryDate = new Date(`${entry.date}T00:00:00`);
      return entryDate.getFullYear() === year && entryDate.getMonth() === month;
    })
    .reduce((sum, entry) => {
      const entryImpact = entry.lineItems.reduce((entrySum, line) => {
        const account = findAccount(line.accountId);
        if (!account) {
          return entrySum;
        }

        if (account.type === "Revenue") {
          return entrySum + ((Number(line.credit) || 0) - (Number(line.debit) || 0));
        }

        if (account.type === "Expense") {
          return entrySum - ((Number(line.debit) || 0) - (Number(line.credit) || 0));
        }

        return entrySum;
      }, 0);

      return sum + entryImpact;
    }, 0);
}

function buildAccountsPayableBalance() {
  return state.accounts
    .filter((account) => account.type === "Liability" && /payable/i.test(account.name))
    .reduce((sum, account) => {
      const postingTotals = getPostingTotalsForAccount(account.id);
      const closingBalance = calculateClosingBalance(
        Number(account.openingBalance) || 0,
        postingTotals.debits,
        postingTotals.credits,
        account.type,
      );
      return sum + Math.max(0, closingBalance);
    }, 0);
}

function renderCompanySetup() {
  const onboardingSteps = getOnboardingSteps();
  const currentStep = onboardingSteps[state.onboardingStepIndex] || onboardingSteps[0];
  const selectedCurrency = getCurrencyMeta(state.companySetup.currency);

  elements.companyName.value = state.companySetup.companyName;
  elements.companyIndustry.value = state.companySetup.industry;
  elements.companyBusinessType.value = state.companySetup.businessType;
  elements.companyAddress.value = state.companySetup.address;
  elements.companyPhone.value = state.companySetup.phone;
  elements.companyEmail.value = state.companySetup.email;
  elements.companyCountry.value = state.companySetup.country;
  elements.companyState.value = state.companySetup.stateProvince;
  elements.companyCity.value = state.companySetup.city;
  elements.currencySelect.value = selectedCurrency?.code || "";
  if (elements.currencySelectionHint) {
    elements.currencySelectionHint.textContent = selectedCurrency
      ? `Selected currency: ${selectedCurrency.code} ${selectedCurrency.symbol} · ${selectedCurrency.name}`
      : "Select a currency that matches your reporting preference.";
  }
  elements.financialYearStart.value = state.companySetup.financialYearStart;
  renderLocationOptions();

  elements.onboardingProgressBadge.textContent = `Step ${state.onboardingStepIndex + 1} of ${onboardingSteps.length}`;
  elements.onboardingSubtitle.textContent = currentStep
    ? currentStep.helper
    : "Complete your company setup details.";
  safeSetInnerHTML(elements.companySetupGuide, "");
  safeSetInnerHTML(elements.onboardingStepList, "");

  const introMessage = document.createElement("div");
  introMessage.className = "chat-message assistant";
  introMessage.textContent = currentStep
    ? currentStep.message
    : "Set up your company profile to personalize LedgrAI.";
  elements.companySetupGuide.appendChild(introMessage);

  const detailMessage = document.createElement("div");
  detailMessage.className = "chat-message system";
  detailMessage.textContent = isCompanySetupComplete()
    ? "Setup complete. You can revisit any field here and the rest of the app will stay in sync."
    : "Start with your company profile. LedgrAI uses these details for onboarding and reporting context.";
  elements.companySetupGuide.appendChild(detailMessage);

  onboardingSteps.forEach((step, index) => {
    const item = document.createElement("div");
    const isComplete = step.isComplete;
    item.className = `onboarding-step${index === state.onboardingStepIndex ? " is-active" : ""}${isComplete ? " is-complete" : ""}`;
    safeSetInnerHTML(
      item,
      `
        <span class="onboarding-step-number">${isComplete ? "✓" : index + 1}</span>
        <div class="onboarding-step-copy">
          <strong>${escapeHtml(step.title)}</strong>
          <span>${escapeHtml(step.helper)}</span>
        </div>
      `,
    );
    elements.onboardingStepList.appendChild(item);
  });

  elements.onboardingPrevButton.disabled = state.onboardingStepIndex === 0;
  elements.onboardingNextButton.textContent =
    state.onboardingStepIndex === onboardingSteps.length - 1 ? "Finish Setup" : "Next Step";
}

async function handleCompanySetupSubmit(event) {
  event.preventDefault();
  const selectedCurrency = resolveCurrencySelection(elements.currencySelect.value);
  if (!selectedCurrency) {
    window.alert("Select a valid currency from the global currency list.");
    elements.currencySelect.focus();
    return;
  }

  const payload = {
    ...state.companySetup,
    companyName: elements.companyName.value.trim(),
    industry: elements.companyIndustry.value.trim(),
    businessType: elements.companyBusinessType.value.trim(),
    address: elements.companyAddress.value.trim(),
    phone: elements.companyPhone.value.trim(),
    email: elements.companyEmail.value.trim(),
    currency: selectedCurrency.code,
    country: elements.companyCountry.value.trim(),
    stateProvince: elements.companyState.value.trim(),
    city: elements.companyCity.value.trim(),
    financialYearStart: elements.financialYearStart.value,
  };

  try {
    const response = await apiFetch("/api/company", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    state.companySetup = normalizeCompanySetup(response.company);
    updateCurrencyFormatter();
    syncAssistantOnboardingMessage();
    render();
  } catch (error) {
    window.alert(error.message);
  }
}

async function resetCompanySetup() {
  state.companySetup = getDefaultCompanySetup();
  state.onboardingStepIndex = 0;
  try {
    const response = await apiFetch("/api/company", {
      method: "PUT",
      body: JSON.stringify(state.companySetup),
    });
    state.companySetup = normalizeCompanySetup(response.company);
    updateCurrencyFormatter();
    render();
  } catch (error) {
    window.alert(error.message);
  }
}

function handleCurrencySelectionInput() {
  const selectedCurrency = resolveCurrencySelection(elements.currencySelect.value);
  const hintText = selectedCurrency
    ? `Selected currency: ${selectedCurrency.code} ${selectedCurrency.symbol} · ${selectedCurrency.name}`
    : "Select a currency that matches your reporting preference.";
  if (elements.currencySelectionHint) {
    elements.currencySelectionHint.textContent = hintText;
  }
}

async function handleCountrySelectionInput() {
  const countryName = elements.companyCountry.value.trim();
  state.companySetup.country = countryName;
  state.companySetup.stateProvince = "";
  state.companySetup.city = "";
  elements.companyState.value = "";
  elements.companyCity.value = "";
  await loadStatesForCountry(countryName);
  renderLocationOptions();

  const suggestedCurrencyCode = getSuggestedCurrencyForCountry(countryName);
  if (suggestedCurrencyCode) {
    const suggestedCurrency = getCurrencyMeta(suggestedCurrencyCode);
    if (suggestedCurrency) {
      state.companySetup.currency = suggestedCurrency.code;
      elements.currencySelect.value = suggestedCurrency.code;
      handleCurrencySelectionInput();
    }
  }
}

async function handleStateSelectionInput() {
  const stateName = elements.companyState.value.trim();
  state.companySetup.stateProvince = stateName;
  state.companySetup.city = "";
  elements.companyCity.value = "";
  await loadCitiesForState(elements.companyCountry.value.trim(), stateName);
  renderLocationOptions();
}

function handleCitySelectionInput() {
  state.companySetup.city = elements.companyCity.value.trim();
}

function goToPreviousOnboardingStep() {
  state.onboardingStepIndex = Math.max(0, state.onboardingStepIndex - 1);
  renderCompanySetup();
}

function goToNextOnboardingStep() {
  const steps = getOnboardingSteps();
  if (state.onboardingStepIndex < steps.length - 1) {
    state.onboardingStepIndex += 1;
  } else {
    setActiveView("dashboard");
  }
  renderCompanySetup();
}

function getOnboardingSteps() {
  return [
    {
      title: "Company identity",
      helper: "Add the company name and industry to personalize the workspace.",
      message:
        "Step 1: Start with the company name and industry. This gives LedgrAI the base identity for your books.",
      isComplete: Boolean(state.companySetup.companyName && state.companySetup.industry),
    },
    {
      title: "Business profile",
      helper: "Capture the business type, address, and location so setup is operationally complete.",
      message:
        "Step 2: Tell me the legal or operating business type, address, country, state or province, and city for the company profile.",
      isComplete: Boolean(
        state.companySetup.businessType &&
          state.companySetup.address &&
          state.companySetup.country &&
          state.companySetup.stateProvince &&
          state.companySetup.city,
      ),
    },
    {
      title: "Primary contacts",
      helper: "Add phone and email so your finance workspace has current business contacts.",
      message:
        "Step 3: Add the best phone number and email address for finance communications and records.",
      isComplete: Boolean(state.companySetup.phone && state.companySetup.email),
    },
    {
      title: "Base currency",
      helper: "Choose the reporting currency from the global searchable list. All balances and reports will use it.",
      message:
        "Step 4: Search for the reporting currency you want to use. LedgrAI will apply that symbol and format across the workspace.",
      isComplete: Boolean(state.companySetup.currency),
    },
    {
      title: "Financial calendar",
      helper: "Set the first day of your financial year to complete onboarding.",
      message:
        "Step 5: Finish by choosing the first day of the financial year. After that you can move straight into accounts and journals.",
      isComplete: Boolean(state.companySetup.financialYearStart),
    },
  ];
}

function getDefaultCompanySetup() {
  return {
    companyName: "",
    industry: "",
    businessType: "",
    address: "",
    phone: "",
    email: "",
    currency: "NGN",
    country: "",
    stateProvince: "",
    city: "",
    financialYearStart: "",
  };
}

function renderCurrencyOptions() {
  updateSelectOptions(elements.currencySelect, currencyCatalog, "Select a currency", {
    getValue: (currency) => normalizeCurrencyCode(currency.code),
    getLabel: (currency) => formatCurrencyOptionLabel(currency),
  });
  handleCurrencySelectionInput();
}

function formatCurrencyOptionLabel(currency) {
  if (!currency) {
    return "";
  }

  return `${currency.code} - ${currency.name} (${currency.symbol})`;
}

function normalizeCurrencyCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase();
}

function getCurrencyMeta(currencyCode) {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  return currencyCatalog.find((currency) => currency.code === normalizedCode) || null;
}

function resolveCurrencySelection(rawValue) {
  const normalizedValue = String(rawValue || "").trim();
  if (!normalizedValue) {
    return null;
  }

  const normalizedCode = normalizeCurrencyCode(normalizedValue.split("-")[0].trim());
  const byCode = getCurrencyMeta(normalizedCode);
  if (byCode) {
    return byCode;
  }

  const lowerValue = normalizedValue.toLowerCase();
  return (
    currencyCatalog.find(
      (currency) =>
        currency.name.toLowerCase() === lowerValue ||
        formatCurrencyOptionLabel(currency).toLowerCase() === lowerValue ||
        `${currency.code} ${currency.symbol}`.toLowerCase() === lowerValue,
    ) || null
  );
}

function updateCurrencyFormatter() {
  const currencyCode = normalizeCurrencyCode(state.companySetup?.currency || "NGN");
  try {
    currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    });
  } catch {
    currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    });
  }
}

function isCompanySetupComplete() {
  return getOnboardingSteps().every((step) => step.isComplete);
}

function getViewTitle(viewName) {
  const titles = {
    dashboard: "Dashboard",
    "company-setup": "Company Setup",
    chart: "Workspace",
    journal: "Journal Entries",
    ledger: "General Ledger",
    "trial-balance": "Trial Balance",
    "income-statement": "Income Statement",
    "balance-sheet": "Balance Sheet",
    "cash-flow": "Cash Flow",
    "ai-assistant": "AI Assistant",
  };

  return titles[viewName] || "Workspace";
}

function isMobileViewport() {
  return window.innerWidth <= 900;
}

function handleWindowResize() {
  if (!isMobileViewport()) {
    state.mobileSidebarOpen = false;
  }
  syncSidebarState();
}

function exportSectionToPdf(sectionElement, title) {
  if (!sectionElement) {
    return;
  }

  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1200,height=900");
  if (!printWindow) {
    window.alert("Allow pop-ups to export this statement as PDF.");
    return;
  }

  const stylesheetUrl = new URL("styles.css", window.location.href).toString();
  const documentTitle = `${appDisplayName} - ${title}`;
  const companyName = state.companySetup?.companyName?.trim();
  const heading = companyName ? `${companyName} · ${title}` : `${appDisplayName} · ${title}`;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(documentTitle)}</title>
        <link rel="stylesheet" href="${stylesheetUrl}" />
        <style>
          body { padding: 24px; background: #ffffff; }
          .print-shell { display: grid; gap: 18px; }
          .print-heading h1 { margin-bottom: 4px; }
          .print-heading p { margin: 0; color: #667085; }
        </style>
      </head>
      <body>
        <div class="print-shell">
          <div class="print-heading">
            <h1>${escapeHtml(heading)}</h1>
            <p>${escapeHtml(new Date().toLocaleString())}</p>
          </div>
          ${sectionElement.outerHTML}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
  };
}

function syncAssistantOnboardingMessage() {
  if (!state.assistantMessages.length && !isCompanySetupComplete()) {
    state.assistantMessages.push({
      role: "assistant",
      content:
        "Start in Company Setup. Add your business profile, currency, and financial year so I can answer with better context.",
    });
  }
}

function renderAccountsTable() {
  safeSetInnerHTML(elements.accountsTableBody, "");

  if (state.accounts.length === 0) {
    elements.accountsEmptyState.classList.remove("hidden");
    return;
  }

  elements.accountsEmptyState.classList.add("hidden");

  const sortedAccounts = [...state.accounts].sort((left, right) => {
    if (left.code === right.code) {
      return left.name.localeCompare(right.name);
    }

    return left.code.localeCompare(right.code, undefined, { numeric: true });
  });

  sortedAccounts.forEach((account) => {
    const row = document.createElement("tr");
    safeSetInnerHTML(
      row,
      `
      <td>${escapeHtml(account.code)}</td>
      <td>${escapeHtml(account.name)}</td>
      <td><span class="account-type-badge">${escapeHtml(account.type)}</span></td>
      <td class="numeric">${currencyFormatter.format(Number(account.openingBalance) || 0)}</td>
      <td>
        <div class="table-actions">
          <button class="ghost-button" type="button" data-action="edit-account" data-id="${account.id}">Edit</button>
          <button class="ghost-button danger" type="button" data-action="delete-account" data-id="${account.id}">Delete</button>
        </div>
      </td>
    `,
    );
    elements.accountsTableBody.appendChild(row);
  });

  elements.accountsTableBody.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleAccountTableAction);
  });
}

function renderJournalTable() {
  safeSetInnerHTML(elements.journalTableBody, "");

  if (state.journalEntries.length === 0) {
    elements.journalEmptyState.classList.remove("hidden");
    return;
  }

  elements.journalEmptyState.classList.add("hidden");

  const sortedEntries = [...state.journalEntries].sort((left, right) => {
    return new Date(right.date) - new Date(left.date);
  });

  sortedEntries.forEach((entry) => {
    const totals = calculateLineTotals(entry.lineItems);
    const descriptionMarkup =
      state.editingJournalDescriptionId === entry.id
        ? `
          <div class="journal-description-edit">
            <input
              class="journal-description-input"
              type="text"
              value="${escapeHtml(entry.description)}"
              data-journal-description-input="${entry.id}"
              aria-label="Edit journal entry description"
            />
            <button class="inline-edit-button" type="button" data-action="save-journal-description" data-id="${entry.id}">Save</button>
            <button class="inline-edit-button" type="button" data-action="cancel-journal-description" data-id="${entry.id}">Cancel</button>
          </div>
        `
        : `
          <div class="journal-entry-heading">
            <strong>${escapeHtml(entry.description)}</strong>
            ${
              entry.systemGenerated
                ? ""
                : `<button class="inline-edit-button" type="button" data-action="start-edit-journal-description" data-id="${entry.id}" aria-label="Edit journal entry description">Edit</button>`
            }
          </div>
        `;
    const row = document.createElement("tr");
    safeSetInnerHTML(
      row,
      `
      <td>${escapeHtml(formatDate(entry.date))}</td>
      <td>
        ${descriptionMarkup}
        <ul class="journal-lines">
          ${entry.lineItems
            .map((line) => {
              const account = findAccount(line.accountId);
              const accountLabel = account
                ? `${account.code} - ${account.name}`
                : "Archived account";
              const amount = line.debit > 0 ? line.debit : line.credit;
              const side = line.debit > 0 ? "Debit" : "Credit";
              return `<li>${escapeHtml(accountLabel)}: ${escapeHtml(side)} ${escapeHtml(
                currencyFormatter.format(amount),
              )}</li>`;
            })
            .join("")}
        </ul>
      </td>
      <td class="numeric">${entry.lineItems.length}</td>
      <td class="numeric">${currencyFormatter.format(totals.debits)}</td>
      <td>
        <span class="status-badge ${entry.systemGenerated ? "balanced" : totals.balanced ? "balanced" : "unbalanced"}">
          ${entry.systemGenerated ? "System" : totals.balanced ? "Balanced" : "Unbalanced"}
        </span>
      </td>
      <td>
        <div class="table-actions">
          ${
            entry.systemGenerated
              ? '<span class="ledger-note">Managed automatically</span>'
              : `<button class="ghost-button" type="button" data-action="edit-journal" data-id="${entry.id}">Edit</button>
                 <button class="ghost-button danger" type="button" data-action="delete-journal" data-id="${entry.id}">Delete</button>`
          }
        </div>
      </td>
    `,
    );
    elements.journalTableBody.appendChild(row);
  });
}

function renderSummary() {
  const totalBalance = state.accounts.reduce(
    (sum, account) => sum + (Number(account.openingBalance) || 0),
    0,
  );
  const totalJournalLines = state.journalEntries.reduce(
    (sum, entry) => sum + entry.lineItems.length,
    0,
  );

  elements.totalAccounts.textContent = String(state.accounts.length);
  elements.totalBalance.textContent = currencyFormatter.format(totalBalance);
  elements.totalJournalEntries.textContent = String(state.journalEntries.length);
  elements.totalJournalLines.textContent = String(totalJournalLines);
}

function renderGeneralLedger() {
  safeSetInnerHTML(elements.ledgerList, "");

  if (state.accounts.length === 0) {
    elements.ledgerEmptyState.classList.remove("hidden");
    return;
  }

  elements.ledgerEmptyState.classList.add("hidden");

  const ledgers = buildGeneralLedger();

  ledgers.forEach((ledger) => {
    const card = document.createElement("article");
    card.className = "ledger-card";
    safeSetInnerHTML(
      card,
      `
      <div class="ledger-card-header">
        <div>
          <h3>${escapeHtml(ledger.account.code)} - ${escapeHtml(ledger.account.name)}</h3>
          <p>${escapeHtml(ledger.account.type)} account</p>
        </div>
        <div class="numeric">
          <p>Opening Balance</p>
          <strong>${escapeHtml(formatLedgerBalance(ledger.openingBalance, ledger.account.type))}</strong>
        </div>
      </div>
      <div class="ledger-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th class="numeric">Debit</th>
              <th class="numeric">Credit</th>
              <th class="numeric">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            ${ledger.lines
              .map(
                (line) => `
                  <tr>
                    <td>${escapeHtml(line.date)}</td>
                    <td>${escapeHtml(line.description)}</td>
                    <td class="numeric">${escapeHtml(
                      line.debit > 0 ? currencyFormatter.format(line.debit) : "-",
                    )}</td>
                    <td class="numeric">${escapeHtml(
                      line.credit > 0 ? currencyFormatter.format(line.credit) : "-",
                    )}</td>
                    <td class="numeric">${escapeHtml(
                      formatLedgerBalance(line.runningBalance, ledger.account.type),
                    )}</td>
                  </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="ledger-card-footer">
        <div class="ledger-note">
          ${ledger.lines.length > 1 ? `${ledger.lines.length - 1} posted transactions` : "No posted transactions"}
        </div>
        <div class="numeric">
          <p>Closing Balance</p>
          <strong>${escapeHtml(formatLedgerBalance(ledger.closingBalance, ledger.account.type))}</strong>
        </div>
      </div>
    `,
    );
    elements.ledgerList.appendChild(card);
  });
}

function renderTrialBalance() {
  safeSetInnerHTML(elements.trialBalanceTableBody, "");
  safeSetInnerHTML(elements.trialBalanceTableFoot, "");

  if (state.accounts.length === 0) {
    elements.trialBalanceEmptyState.classList.remove("hidden");
    return;
  }

  elements.trialBalanceEmptyState.classList.add("hidden");

  const report = buildTrialBalanceReport();

  report.rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    safeSetInnerHTML(
      tableRow,
      `
      <td>${escapeHtml(row.account.code)}</td>
      <td>${escapeHtml(row.account.name)}</td>
      <td>${escapeHtml(row.account.type)}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalDebits))}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalCredits))}</td>
      <td class="numeric">${escapeHtml(row.closingDebit > 0 ? currencyFormatter.format(row.closingDebit) : "-")}</td>
      <td class="numeric">${escapeHtml(row.closingCredit > 0 ? currencyFormatter.format(row.closingCredit) : "-")}</td>
    `,
    );
    elements.trialBalanceTableBody.appendChild(tableRow);
  });

  const totalsRow = document.createElement("tr");
  safeSetInnerHTML(
    totalsRow,
    `
    <td colspan="3">Grand Total</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalDebits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalCredits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingDebits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingCredits))}</td>
  `,
  );
  elements.trialBalanceTableFoot.appendChild(totalsRow);

  const statusRow = document.createElement("tr");
  safeSetInnerHTML(
    statusRow,
    `
    <td colspan="7">
      <div class="report-status">
        Trial balance totals are ${report.totalsBalanced ? "balanced" : "not balanced"}.
        Closing balances are ${report.closingBalanced ? "balanced" : "not balanced"}.
      </div>
    </td>
  `,
  );
  elements.trialBalanceTableFoot.appendChild(statusRow);
}

function renderIncomeStatement() {
  safeSetInnerHTML(elements.incomeRevenueList, "");
  safeSetInnerHTML(elements.incomeExpenseList, "");
  safeSetInnerHTML(elements.incomeSummaryBody, "");

  const report = buildIncomeStatementReport();

  if (report.revenueAccounts.length === 0 && report.expenseAccounts.length === 0) {
    elements.incomeStatementEmptyState.classList.remove("hidden");
  } else {
    elements.incomeStatementEmptyState.classList.add("hidden");
  }

  report.revenueAccounts.forEach((row) => {
    elements.incomeRevenueList.appendChild(createStatementRow(row.account.name, row.amount));
  });

  report.expenseAccounts.forEach((row) => {
    elements.incomeExpenseList.appendChild(createStatementRow(row.account.name, row.amount));
  });

  elements.incomeTotalRevenue.textContent = currencyFormatter.format(report.totalRevenue);
  elements.incomeGrossProfit.textContent = currencyFormatter.format(report.grossProfit);
  elements.incomeOperatingExpenses.textContent = currencyFormatter.format(report.operatingExpenses);
  elements.incomeNetIncome.textContent = currencyFormatter.format(report.netIncome);
  elements.incomeNetIncome.classList.toggle("negative", report.netIncome < 0);

  const summaryRows = [
    ["Total Revenue", report.totalRevenue],
    ["Gross Profit", report.grossProfit],
    ["Operating Expenses", report.operatingExpenses],
    [report.netIncome >= 0 ? "Net Income" : "Net Loss", report.netIncome],
  ];

  summaryRows.forEach(([label, value]) => {
    const row = document.createElement("tr");
    safeSetInnerHTML(
      row,
      `
        <td>${escapeHtml(label)}</td>
        <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
      `,
    );
    elements.incomeSummaryBody.appendChild(row);
  });
}

function renderBalanceSheet() {
  safeSetInnerHTML(elements.balanceSheetAssetsList, "");
  safeSetInnerHTML(elements.balanceSheetLiabilitiesList, "");
  safeSetInnerHTML(elements.balanceSheetEquityList, "");
  safeSetInnerHTML(elements.balanceSheetSummaryBody, "");

  const report = buildBalanceSheetReport();

  if (
    report.assetAccounts.length === 0 &&
    report.liabilityAccounts.length === 0 &&
    report.equityAccounts.length === 0 &&
    Math.abs(report.retainedEarnings) < 0.005
  ) {
    elements.balanceSheetEmptyState.classList.remove("hidden");
  } else {
    elements.balanceSheetEmptyState.classList.add("hidden");
  }

  renderBalanceSheetSectionGroup(
    elements.balanceSheetAssetsList,
    "Current Assets",
    "currentAssets",
    report.currentAssetAccounts,
  );
  renderBalanceSheetSectionGroup(
    elements.balanceSheetAssetsList,
    "Non-Current Assets",
    "nonCurrentAssets",
    report.nonCurrentAssetAccounts,
  );
  renderBalanceSheetSectionGroup(
    elements.balanceSheetLiabilitiesList,
    "Current Liabilities",
    "currentLiabilities",
    report.currentLiabilityAccounts,
  );
  renderBalanceSheetSectionGroup(
    elements.balanceSheetLiabilitiesList,
    "Non-Current Liabilities",
    "nonCurrentLiabilities",
    report.nonCurrentLiabilityAccounts,
  );
  renderBalanceSheetSectionGroup(
    elements.balanceSheetEquityList,
    "Equity",
    "equity",
    [
      ...report.equityAccounts,
      {
        account: { name: "Retained Earnings (Net Income)" },
        amount: report.retainedEarnings,
      },
    ],
  );
  renderSectionSubtotal(
    elements.balanceSheetAssetsSubtotal,
    "Total Assets",
    report.totalAssets,
  );
  renderSectionSubtotal(
    elements.balanceSheetLiabilitiesSubtotal,
    "Total Liabilities",
    report.totalLiabilities,
  );
  renderSectionSubtotal(
    elements.balanceSheetEquitySubtotal,
    "Total Equity",
    report.totalEquity,
  );

  elements.balanceSheetTotalAssets.textContent = currencyFormatter.format(report.totalAssets);
  elements.balanceSheetTotalLiabilities.textContent = currencyFormatter.format(
    report.totalLiabilities,
  );
  elements.balanceSheetTotalEquity.textContent = currencyFormatter.format(report.totalEquity);
  elements.balanceSheetDifference.textContent = currencyFormatter.format(report.difference);
  elements.balanceSheetDifference.classList.toggle("negative", report.difference > 0.005);
  elements.balanceSheetAssetsFigure.textContent = currencyFormatter.format(report.totalAssets);
  elements.balanceSheetLiabilitiesEquityFigure.textContent = currencyFormatter.format(
    report.totalLiabilities + report.totalEquity,
  );
  elements.balanceSheetBadge.textContent = report.isBalanced ? "BALANCED" : "NOT BALANCED";
  elements.balanceSheetBadge.classList.toggle("is-balanced", report.isBalanced);
  elements.balanceSheetBadge.classList.toggle("is-unbalanced", !report.isBalanced);

  const summaryRows = [
    ["Total Assets", report.totalAssets],
    ["Total Liabilities", report.totalLiabilities],
    ["Total Equity", report.totalEquity],
    ["Total Liabilities + Equity", report.totalLiabilities + report.totalEquity],
    ["Balance Difference", report.difference],
  ];

  summaryRows.forEach(([label, value]) => {
    const row = document.createElement("tr");
    safeSetInnerHTML(
      row,
      `
        <td>${escapeHtml(label)}</td>
        <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
      `,
    );
    elements.balanceSheetSummaryBody.appendChild(row);
  });

  elements.balanceSheetCheckStatus.textContent = report.isBalanced
    ? "Balance check confirmed: Total Assets equals Total Liabilities plus Equity."
    : "Balance check failed: Total Assets does not equal Total Liabilities plus Equity.";
  elements.balanceSheetCheckStatus.classList.toggle("is-balanced", report.isBalanced);
  elements.balanceSheetCheckStatus.classList.toggle("is-unbalanced", !report.isBalanced);
}

function renderCashFlowStatement() {
  safeSetInnerHTML(elements.cashFlowOperatingList, "");
  safeSetInnerHTML(elements.cashFlowInvestingList, "");
  safeSetInnerHTML(elements.cashFlowFinancingList, "");
  safeSetInnerHTML(elements.cashFlowSummaryBody, "");

  const report = buildCashFlowStatementReport();

  if (!report.hasCashAccounts) {
    elements.cashFlowEmptyState.classList.remove("hidden");
  } else {
    elements.cashFlowEmptyState.classList.add("hidden");
  }

  report.operatingItems.forEach((item) => {
    elements.cashFlowOperatingList.appendChild(createStatementRow(item.label, item.amount));
  });
  report.investingItems.forEach((item) => {
    elements.cashFlowInvestingList.appendChild(createStatementRow(item.label, item.amount));
  });
  report.financingItems.forEach((item) => {
    elements.cashFlowFinancingList.appendChild(createStatementRow(item.label, item.amount));
  });

  renderSectionSubtotal(
    elements.cashFlowOperatingSubtotal,
    "Net Cash From Operating Activities",
    report.operatingTotal,
  );
  renderSectionSubtotal(
    elements.cashFlowInvestingSubtotal,
    "Net Cash From Investing Activities",
    report.investingTotal,
  );
  renderSectionSubtotal(
    elements.cashFlowFinancingSubtotal,
    "Net Cash From Financing Activities",
    report.financingTotal,
  );

  elements.cashFlowOpeningCash.textContent = currencyFormatter.format(report.openingCash);
  elements.cashFlowNetMovement.textContent = currencyFormatter.format(report.netCashMovement);
  elements.cashFlowClosingCash.textContent = currencyFormatter.format(report.closingCash);
  elements.cashFlowBalanceCheck.textContent = currencyFormatter.format(report.balanceCheck);
  elements.cashFlowNetMovement.classList.toggle("negative", report.netCashMovement < 0);
  elements.cashFlowBalanceCheck.classList.toggle("negative", report.balanceCheck > 0.005);

  const summaryRows = [
    ["Opening Cash Balance", report.openingCash],
    ["Net Cash From Operating Activities", report.operatingTotal],
    ["Net Cash From Investing Activities", report.investingTotal],
    ["Net Cash From Financing Activities", report.financingTotal],
    ["Net Cash Movement", report.netCashMovement],
    ["Closing Cash Balance", report.closingCash],
  ];

  summaryRows.forEach(([label, value]) => {
    const row = document.createElement("tr");
    safeSetInnerHTML(
      row,
      `
        <td>${escapeHtml(label)}</td>
        <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
      `,
    );
    elements.cashFlowSummaryBody.appendChild(row);
  });

  elements.cashFlowStatus.textContent =
    report.balanceCheck < 0.005
      ? "Cash flow check confirmed: Opening cash plus net movement equals closing cash."
      : "Cash flow check warning: Opening cash plus net movement does not match closing cash.";
  elements.cashFlowStatus.classList.toggle("is-balanced", report.balanceCheck < 0.005);
  elements.cashFlowStatus.classList.toggle("is-unbalanced", report.balanceCheck >= 0.005);
}

function renderAssistant() {
  safeSetInnerHTML(elements.assistantChat, "");

  const introMessage = document.createElement("div");
  introMessage.className = "chat-message system";
  introMessage.textContent =
    isCompanySetupComplete()
      ? `Ask about profitability, cash, balances, trends, or specific accounts. ${appDisplayName} uses the live accounting and company setup data in this workspace.`
      : `Complete Company Setup first for better answers. ${appDisplayName} uses your business profile, books, and reports together when responding.`;
  elements.assistantChat.appendChild(introMessage);

  state.assistantMessages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${message.role}`;
    bubble.textContent = message.content;
    elements.assistantChat.appendChild(bubble);
  });

  if (state.assistantPending) {
    const pending = document.createElement("div");
    pending.className = "chat-message assistant";
    pending.textContent = "Analyzing your financial data...";
    elements.assistantChat.appendChild(pending);
  }

  elements.assistantSendButton.disabled = state.assistantPending;
  elements.assistantClearButton.disabled = state.assistantPending;
  elements.assistantChat.scrollTop = elements.assistantChat.scrollHeight;
}

async function handleAssistantSubmit(event) {
  event.preventDefault();
  const prompt = elements.assistantInput.value.trim();
  if (!prompt || state.assistantPending) {
    return;
  }

  state.assistantMessages.push({ role: "user", content: prompt });
  state.assistantPending = true;
  elements.assistantStatus.textContent = "Sending financial context to the AI assistant...";
  elements.assistantStatus.classList.remove("is-unbalanced");
  elements.assistantStatus.classList.remove("is-balanced");
  elements.assistantInput.value = "";
  renderAssistant();

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: state.assistantMessages.map(({ role, content }) => ({ role, content })),
        financialData: buildAssistantFinancialContext(),
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to get a response from the assistant.");
    }

    state.assistantMessages.push({
      role: "assistant",
      content: payload.message || "No response received.",
    });
    elements.assistantStatus.textContent = "Assistant response generated from current financial data.";
    elements.assistantStatus.classList.add("is-balanced");
    elements.assistantStatus.classList.remove("is-unbalanced");
  } catch (error) {
    state.assistantMessages.push({
      role: "assistant",
      content: `I could not complete that request. ${error.message}`,
    });
    elements.assistantStatus.textContent = error.message;
    elements.assistantStatus.classList.add("is-unbalanced");
    elements.assistantStatus.classList.remove("is-balanced");
  } finally {
    state.assistantPending = false;
    renderAssistant();
  }
}

function clearAssistantChat() {
  if (state.assistantPending) {
    return;
  }

  state.assistantMessages = [];
  syncAssistantOnboardingMessage();
  elements.assistantStatus.textContent = "Chat cleared.";
  elements.assistantStatus.classList.remove("is-unbalanced");
  elements.assistantStatus.classList.remove("is-balanced");
  renderAssistant();
}

function handleBalanceSheetToggle(event) {
  const button = event.target.closest("[data-balance-toggle]");
  if (!button) {
    return;
  }

  const sectionKey = button.dataset.balanceToggle;
  state.balanceSheetSections[sectionKey] = !state.balanceSheetSections[sectionKey];
  renderBalanceSheet();
}

async function handleAccountTableAction(event) {
  const { action, id } = event.currentTarget.dataset;
  const account = state.accounts.find((entry) => entry.id === id);

  if (account && isOpeningBalanceEquityAccount(account)) {
    window.alert("Opening Balance Equity is system-managed and cannot be edited or deleted.");
    return;
  }

  if (action === "edit-account") {
    if (account) {
      openAccountDialog(account);
    }
    return;
  }

  if (action === "delete-account") {
    if (!account) {
      return;
    }

    const accountIsReferenced = state.journalEntries.some((entry) =>
      entry.lineItems.some((line) => line.accountId === id),
    );

    if (accountIsReferenced) {
      window.alert(
        "This account is used in journal entries and cannot be deleted until those entries are updated.",
      );
      return;
    }

    const confirmed = window.confirm(`Delete account "${account.name}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/api/accounts/${id}`, { method: "DELETE" });
      await refreshWorkspaceData();
      render();
    } catch (error) {
      window.alert(error.message);
    }
  }
}

async function handleJournalTableAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  const entry = state.journalEntries.find((item) => item.id === id);

  if (entry?.systemGenerated && action !== "cancel-journal-description") {
    window.alert("This opening balance entry is system-generated and cannot be edited or deleted.");
    return;
  }

  if (action === "start-edit-journal-description") {
    state.editingJournalDescriptionId = id;
    renderJournalTable();
    elements.journalTableBody
      .querySelector(`[data-journal-description-input="${id}"]`)
      ?.focus();
    return;
  }

  if (action === "cancel-journal-description") {
    state.editingJournalDescriptionId = null;
    renderJournalTable();
    return;
  }

  if (action === "save-journal-description") {
    if (!entry) {
      return;
    }

    const input = elements.journalTableBody.querySelector(`[data-journal-description-input="${id}"]`);
    const nextDescription = input?.value.trim() || "";
    if (!nextDescription) {
      window.alert("Journal entry description cannot be empty.");
      return;
    }

    try {
      await apiFetch(`/api/journal-entries/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          date: entry.date,
          description: nextDescription,
          lineItems: entry.lineItems,
        }),
      });
      state.editingJournalDescriptionId = null;
      await refreshWorkspaceData();
      render();
    } catch (error) {
      window.alert(error.message);
    }
    return;
  }

  if (action === "edit-journal") {
    if (entry) {
      openJournalDialog(entry);
    }
    return;
  }

  if (action === "delete-journal") {
    if (!entry) {
      return;
    }

    const confirmed = window.confirm(`Delete journal entry "${entry.description}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/api/journal-entries/${id}`, { method: "DELETE" });
      await refreshWorkspaceData();
      render();
    } catch (error) {
      window.alert(error.message);
    }
  }
}

function handleJournalDescriptionKeydown(event) {
  const input = event.target.closest("[data-journal-description-input]");
  if (!input) {
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    handleJournalTableAction({
      target: elements.journalTableBody.querySelector(
        `[data-action="save-journal-description"][data-id="${input.dataset.journalDescriptionInput}"]`,
      ),
    });
  }

  if (event.key === "Escape") {
    event.preventDefault();
    state.editingJournalDescriptionId = null;
    renderJournalTable();
  }
}

function openAccountDialog(account) {
  state.editingAccountId = account?.id || null;
  hideAccountError();
  elements.accountDialogEyebrow.textContent = account ? "Update Account" : "New Account";
  elements.accountDialogTitle.textContent = account ? "Edit Account" : "Add Account";
  elements.saveAccountButton.textContent = account ? "Update Account" : "Save Account";

  elements.accountCode.value = account?.code || "";
  elements.accountName.value = account?.name || "";
  elements.accountType.value = account?.type || "Asset";
  elements.openingBalance.value = account?.openingBalance ?? "";

  elements.accountDialog.showModal();
}

function closeAccountDialog() {
  elements.accountDialog.close();
}

function resetAccountForm() {
  state.editingAccountId = null;
  elements.accountForm.reset();
  elements.accountType.value = "Asset";
  hideAccountError();
}

async function handleAccountSubmit(event) {
  event.preventDefault();

  const payload = {
    code: elements.accountCode.value.trim(),
    name: elements.accountName.value.trim(),
    type: elements.accountType.value,
    openingBalance: Number(elements.openingBalance.value),
  };

  if (!payload.code || !payload.name || Number.isNaN(payload.openingBalance)) {
    showAccountError("Complete all fields before saving the account.");
    return;
  }

  const duplicateCode = state.accounts.find(
    (account) => account.code === payload.code && account.id !== state.editingAccountId,
  );

  if (duplicateCode) {
    showAccountError("Account code must be unique.");
    return;
  }

  try {
    if (state.editingAccountId) {
      await apiFetch(`/api/accounts/${state.editingAccountId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await refreshWorkspaceData();
    render();
    closeAccountDialog();
  } catch (error) {
    showAccountError(error.message);
  }
}

function openJournalDialog(entry) {
  if (state.accounts.length === 0) {
    window.alert("Add at least one account before recording a journal entry.");
    return;
  }

  state.editingJournalId = entry?.id || null;
  hideJournalError();
  elements.journalDialogEyebrow.textContent = entry ? "Update Entry" : "New Entry";
  elements.journalDialogTitle.textContent = entry ? "Edit Journal Entry" : "Add Journal Entry";
  elements.saveJournalButton.textContent = entry ? "Update Entry" : "Save Entry";
  elements.journalDate.value = entry?.date || getTodayDate();
  elements.journalDescription.value = entry?.description || "";
  safeSetInnerHTML(elements.lineItemsList, "");

  const lineItems = entry?.lineItems?.length
    ? entry.lineItems
    : [createEmptyLineItem(), createEmptyLineItem()];
  lineItems.forEach((line) => addLineItemRow(line));

  refreshJournalSummary();
  elements.saveJournalButton.disabled = !canSaveJournalEntries();
  elements.journalDialog.showModal();
}

function closeJournalDialog() {
  elements.journalDialog.close();
}

function resetJournalForm() {
  state.editingJournalId = null;
  elements.journalForm.reset();
  safeSetInnerHTML(elements.lineItemsList, "");
  hideJournalError();
  refreshJournalSummary();
}

function addLineItemRow(line = createEmptyLineItem()) {
  const row = document.createElement("div");
  row.className = "line-item-row";
  safeSetInnerHTML(
    row,
    `
    <label>
      <span>Account</span>
      <select class="line-account" required>
        ${buildAccountOptions(line.accountId)}
      </select>
    </label>
    <label>
      <span>Debit</span>
      <input class="line-debit" type="number" min="0" step="0.01" value="${line.debit || ""}" />
    </label>
    <label>
      <span>Credit</span>
      <input class="line-credit" type="number" min="0" step="0.01" value="${line.credit || ""}" />
    </label>
    <button class="line-remove-button" type="button">Remove</button>
  `,
  );
  `);`
  elements.lineItemsList.appendChild(row);
  refreshJournalSummary();
}

function handleLineItemChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) {
    return;
  }

  const row = target.closest(".line-item-row");
  if (!row) {
    return;
  }

  if (target.classList.contains("line-debit") && Number(target.value) > 0) {
    row.querySelector(".line-credit").value = "";
  }

  if (target.classList.contains("line-credit") && Number(target.value) > 0) {
    row.querySelector(".line-debit").value = "";
  }

  refreshJournalSummary();
}

function handleLineItemClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.classList.contains("line-remove-button")) {
    return;
  }

  target.closest(".line-item-row")?.remove();
  refreshJournalSummary();
}

function refreshJournalSummary() {
  const lineItems = collectLineItemsFromForm({ skipValidation: true });
  const totals = calculateLineTotals(lineItems);

  elements.journalTotalDebits.textContent = currencyFormatter.format(totals.debits);
  elements.journalTotalCredits.textContent = currencyFormatter.format(totals.credits);
  elements.journalBalanceStatus.textContent = totals.balanced ? "Balanced" : "Not Balanced";
}

async function handleJournalSubmit(event) {
  event.preventDefault();

  if (!canSaveJournalEntries()) {
    showJournalError("Set your company name and currency in Company Setup before saving journal entries.");
    return;
  }

  const date = elements.journalDate.value;
  const description = elements.journalDescription.value.trim();
  const rawLineItems = collectLineItemsFromForm();
  const lineItems = rawLineItems.filter((line) => line.accountId || line.debit > 0 || line.credit > 0);

  if (!date || !description) {
    showJournalError("Provide a date and description for the journal entry.");
    return;
  }

  if (lineItems.length < 2) {
    showJournalError("Add at least two valid line items.");
    return;
  }

  if (lineItems.some((line) => !line.accountId)) {
    showJournalError("Select an account for each line item.");
    return;
  }

  if (lineItems.some((line) => line.debit <= 0 && line.credit <= 0)) {
    showJournalError("Each line item must include a debit or a credit amount.");
    return;
  }

  if (lineItems.some((line) => line.debit > 0 && line.credit > 0)) {
    showJournalError("Each line item must be either debit or credit, not both.");
    return;
  }

  const totals = calculateLineTotals(lineItems);
  if (!totals.balanced) {
    showJournalError("Total debits must equal total credits.");
    return;
  }

  const payload = {
    date,
    description,
    lineItems,
  };

  try {
    if (state.editingJournalId) {
      await apiFetch(`/api/journal-entries/${state.editingJournalId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/api/journal-entries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await refreshWorkspaceData();
    render();
    closeJournalDialog();
  } catch (error) {
    showJournalError(error.message);
  }
}

function canSaveJournalEntries() {
  return Boolean(state.companySetup.companyName.trim() && state.companySetup.currency.trim());
}

function collectLineItemsFromForm({ skipValidation = false } = {}) {
  const rows = [...elements.lineItemsList.querySelectorAll(".line-item-row")];

  const lineItems = rows.map((row) => {
    const accountId = row.querySelector(".line-account").value;
    const debit = Number(row.querySelector(".line-debit").value) || 0;
    const credit = Number(row.querySelector(".line-credit").value) || 0;

    return {
      accountId,
      debit,
      credit,
    };
  });

  if (skipValidation) {
    return lineItems;
  }

  return lineItems;
}

function calculateLineTotals(lineItems) {
  const debits = lineItems.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const credits = lineItems.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);

  return {
    debits,
    credits,
    balanced: debits > 0 && credits > 0 && Math.abs(debits - credits) < 0.005,
  };
}

function buildGeneralLedger() {
  const sortedAccounts = [...state.accounts].sort((left, right) =>
    left.code.localeCompare(right.code, undefined, { numeric: true }),
  );

  return sortedAccounts.map((account) => {
    const openingBalance = Number(account.openingBalance) || 0;
    let runningBalance = openingBalance;

    const transactions = state.journalEntries
      .flatMap((entry) =>
        entry.lineItems
          .filter((line) => line.accountId === account.id)
          .map((line) => ({
            date: entry.date,
            description: entry.description,
            debit: Number(line.debit) || 0,
            credit: Number(line.credit) || 0,
          })),
      )
      .sort((left, right) => {
        const dateCompare = new Date(left.date) - new Date(right.date);
        if (dateCompare !== 0) {
          return dateCompare;
        }

        return left.description.localeCompare(right.description);
      });

    const lines = [
      {
        date: "-",
        description: "Opening balance",
        debit: 0,
        credit: 0,
        runningBalance,
      },
    ];

    transactions.forEach((transaction) => {
      runningBalance = applyLedgerMovement(runningBalance, transaction, account.type);
      lines.push({
        date: formatDate(transaction.date),
        description: transaction.description,
        debit: transaction.debit,
        credit: transaction.credit,
        runningBalance,
      });
    });

    return {
      account,
      openingBalance,
      closingBalance: runningBalance,
      lines,
    };
  });
}

function buildTrialBalanceReport() {
  const rows = [...state.accounts]
    .sort((left, right) => left.code.localeCompare(right.code, undefined, { numeric: true }))
    .map((account) => {
      const postingTotals = state.journalEntries
        .flatMap((entry) => entry.lineItems)
        .filter((line) => line.accountId === account.id)
        .reduce(
          (sum, line) => ({
            debits: sum.debits + (Number(line.debit) || 0),
            credits: sum.credits + (Number(line.credit) || 0),
          }),
          { debits: 0, credits: 0 },
        );
      const openingColumns = splitClosingBalance(Number(account.openingBalance) || 0, account.type);
      const totalDebits = openingColumns.debit + postingTotals.debits;
      const totalCredits = openingColumns.credit + postingTotals.credits;

      const signedClosingBalance = calculateClosingBalance(
        Number(account.openingBalance) || 0,
        postingTotals.debits,
        postingTotals.credits,
        account.type,
      );
      const closingColumns = splitClosingBalance(signedClosingBalance, account.type);

      return {
        account,
        totalDebits,
        totalCredits,
        closingDebit: closingColumns.debit,
        closingCredit: closingColumns.credit,
      };
    });

  const totalDebits = rows.reduce((sum, row) => sum + row.totalDebits, 0);
  const totalCredits = rows.reduce((sum, row) => sum + row.totalCredits, 0);
  const totalClosingDebits = rows.reduce((sum, row) => sum + row.closingDebit, 0);
  const totalClosingCredits = rows.reduce((sum, row) => sum + row.closingCredit, 0);

  return {
    rows,
    totalDebits,
    totalCredits,
    totalClosingDebits,
    totalClosingCredits,
    totalsBalanced: Math.abs(totalDebits - totalCredits) < 0.005,
    closingBalanced: Math.abs(totalClosingDebits - totalClosingCredits) < 0.005,
  };
}

function buildIncomeStatementReport() {
  const accountSummaries = state.accounts.map((account) => {
    const postingTotals = getPostingTotalsForAccount(account.id);
    const closingBalance = calculateClosingBalance(
      Number(account.openingBalance) || 0,
      postingTotals.debits,
      postingTotals.credits,
      account.type,
    );

    return {
      account,
      postingTotals,
      closingBalance,
    };
  });

  const revenueAccounts = accountSummaries
    .filter((summary) => summary.account.type === "Revenue")
    .map((summary) => ({
      account: summary.account,
      amount: Math.max(0, summary.closingBalance),
    }));

  const expenseAccounts = accountSummaries
    .filter((summary) => summary.account.type === "Expense")
    .map((summary) => ({
      account: summary.account,
      amount: Math.max(0, summary.closingBalance),
    }));

  const totalRevenue = revenueAccounts.reduce((sum, row) => sum + row.amount, 0);
  const operatingExpenses = expenseAccounts.reduce((sum, row) => sum + row.amount, 0);
  const grossProfit = totalRevenue;
  const netIncome = grossProfit - operatingExpenses;

  return {
    revenueAccounts,
    expenseAccounts,
    totalRevenue,
    grossProfit,
    operatingExpenses,
    netIncome,
  };
}

function buildBalanceSheetReport() {
  const incomeStatement = buildIncomeStatementReport();
  const accountSummaries = state.accounts
    .map((account) => {
      const postingTotals = getPostingTotalsForAccount(account.id);
      const closingBalance = calculateClosingBalance(
        Number(account.openingBalance) || 0,
        postingTotals.debits,
        postingTotals.credits,
        account.type,
      );

      return {
        account,
        closingBalance,
      };
    })
    .filter((summary) => summary.account.type !== "Revenue" && summary.account.type !== "Expense");

  const assetAccounts = accountSummaries
    .filter((summary) => summary.account.type === "Asset")
    .map((summary) => ({
      account: summary.account,
      amount: Math.max(0, summary.closingBalance),
    }));

  const liabilityAccounts = accountSummaries
    .filter((summary) => summary.account.type === "Liability")
    .map((summary) => ({
      account: summary.account,
      amount: Math.max(0, summary.closingBalance),
    }));

  const equityAccounts = accountSummaries
    .filter((summary) => summary.account.type === "Equity")
    .map((summary) => ({
      account: summary.account,
      amount: Math.max(0, summary.closingBalance),
    }));

  const totalAssets = assetAccounts.reduce((sum, row) => sum + row.amount, 0);
  const totalLiabilities = liabilityAccounts.reduce((sum, row) => sum + row.amount, 0);
  const retainedEarnings = incomeStatement.netIncome;
  const totalEquity =
    equityAccounts.reduce((sum, row) => sum + row.amount, 0) + retainedEarnings;
  const difference = Math.abs(totalAssets - (totalLiabilities + totalEquity));

  const currentAssetAccounts = assetAccounts.filter((row) =>
    classifyBalanceSheetSection(row.account) === "current-asset",
  );
  const nonCurrentAssetAccounts = assetAccounts.filter((row) =>
    classifyBalanceSheetSection(row.account) === "non-current-asset",
  );
  const currentLiabilityAccounts = liabilityAccounts.filter((row) =>
    classifyBalanceSheetSection(row.account) === "current-liability",
  );
  const nonCurrentLiabilityAccounts = liabilityAccounts.filter((row) =>
    classifyBalanceSheetSection(row.account) === "non-current-liability",
  );

  return {
    assetAccounts,
    liabilityAccounts,
    equityAccounts,
    currentAssetAccounts,
    nonCurrentAssetAccounts,
    currentLiabilityAccounts,
    nonCurrentLiabilityAccounts,
    retainedEarnings,
    totalAssets,
    totalLiabilities,
    totalEquity,
    difference,
    isBalanced: difference < 0.005,
  };
}

function buildCashFlowStatementReport() {
  const incomeStatement = buildIncomeStatementReport();
  const cashAccounts = state.accounts.filter((account) => isCashAccount(account));
  const hasCashAccounts = cashAccounts.length > 0;
  const openingCash = cashAccounts.reduce(
    (sum, account) => sum + (Number(account.openingBalance) || 0),
    0,
  );
  const cashNetChange = cashAccounts.reduce((sum, account) => {
    const postingTotals = getPostingTotalsForAccount(account.id);
    return sum + postingTotals.debits - postingTotals.credits;
  }, 0);
  const closingCash = openingCash + cashNetChange;

  const accountMovements = buildAccountMovementMap();
  const workingCapitalAdjustments = buildWorkingCapitalAdjustments(accountMovements);
  const operatingItems = [
    {
      label: incomeStatement.netIncome >= 0 ? "Net Income" : "Net Loss",
      amount: incomeStatement.netIncome,
    },
    ...workingCapitalAdjustments,
  ];
  const operatingTotal = operatingItems.reduce((sum, item) => sum + item.amount, 0);

  const investingItems = buildCashFlowItemsFromMovements(accountMovements, "investing");
  const financingItems = buildCashFlowItemsFromMovements(accountMovements, "financing");
  const investingTotal = investingItems.reduce((sum, item) => sum + item.amount, 0);
  const financingTotal = financingItems.reduce((sum, item) => sum + item.amount, 0);
  const netCashMovement = operatingTotal + investingTotal + financingTotal;
  const balanceCheck = Math.abs(closingCash - (openingCash + netCashMovement));

  return {
    hasCashAccounts,
    openingCash,
    closingCash,
    operatingItems,
    operatingTotal,
    investingItems,
    investingTotal,
    financingItems,
    financingTotal,
    netCashMovement,
    balanceCheck,
  };
}

function syncOpeningBalanceEquityAccount(accounts) {
  const existingAccount = accounts.find((account) => account.code === openingBalanceEquityCode);

  if (existingAccount) {
    return accounts.map((account) =>
      account.id === existingAccount.id
        ? {
            ...account,
            code: openingBalanceEquityCode,
            name: openingBalanceEquityName,
            type: openingBalanceEquityType,
            openingBalance: 0,
          }
        : account,
    );
  }

  return [
    ...accounts,
    {
      id: crypto.randomUUID(),
      code: openingBalanceEquityCode,
      name: openingBalanceEquityName,
      type: openingBalanceEquityType,
      openingBalance: 0,
    },
  ];
}

function syncSystemJournalEntry(entries) {
  const userEntries = entries.filter((entry) => !entry.systemGenerated);
  const openingBalanceEquityAccount = state.accounts.find(
    (account) => account.code === openingBalanceEquityCode,
  );

  if (!openingBalanceEquityAccount) {
    return userEntries;
  }

  const openingTotals = state.accounts
    .filter((account) => account.id !== openingBalanceEquityAccount.id)
    .reduce(
      (sum, account) => {
        const openingColumns = splitClosingBalance(Number(account.openingBalance) || 0, account.type);
        return {
          debit: sum.debit + openingColumns.debit,
          credit: sum.credit + openingColumns.credit,
        };
      },
      { debit: 0, credit: 0 },
    );

  const difference = openingTotals.debit - openingTotals.credit;
  if (Math.abs(difference) < 0.005) {
    return userEntries;
  }

  const existingSystemEntry = entries.find(
    (entry) => entry.systemKey === systemOpeningBalanceEntryKey,
  );

  const systemEntry = {
    id: existingSystemEntry?.id || crypto.randomUUID(),
    systemGenerated: true,
    systemKey: systemOpeningBalanceEntryKey,
    date: getTodayDate(),
    description: "Opening balance equity adjustment",
    lineItems: [
      {
        accountId: openingBalanceEquityAccount.id,
        debit: difference < 0 ? Math.abs(difference) : 0,
        credit: difference > 0 ? Math.abs(difference) : 0,
      },
    ],
  };

  return [...userEntries, systemEntry];
}

function getPostingTotalsForAccount(accountId) {
  return state.journalEntries
    .flatMap((entry) => entry.lineItems)
    .filter((line) => line.accountId === accountId)
    .reduce(
      (sum, line) => ({
        debits: sum.debits + (Number(line.debit) || 0),
        credits: sum.credits + (Number(line.credit) || 0),
      }),
      { debits: 0, credits: 0 },
    );
}

function buildAccountMovementMap() {
  return state.accounts.reduce((map, account) => {
    const postingTotals = getPostingTotalsForAccount(account.id);
    let movement = 0;

    if (account.type === "Asset" || account.type === "Expense") {
      movement = postingTotals.debits - postingTotals.credits;
    } else {
      movement = postingTotals.credits - postingTotals.debits;
    }

    map.set(account.id, {
      account,
      movement,
      postingTotals,
    });
    return map;
  }, new Map());
}

function buildWorkingCapitalAdjustments(accountMovements) {
  const items = [];

  accountMovements.forEach(({ account, movement }) => {
    if (isCashAccount(account)) {
      return;
    }

    if (account.type === "Asset" && isWorkingCapitalAsset(account)) {
      items.push({
        label: `Change in ${account.name}`,
        amount: -movement,
      });
    }

    if (account.type === "Liability" && isWorkingCapitalLiability(account)) {
      items.push({
        label: `Change in ${account.name}`,
        amount: movement,
      });
    }
  });

  return items;
}

function buildCashFlowItemsFromMovements(accountMovements, category) {
  const items = [];

  accountMovements.forEach(({ account, movement }) => {
    if (isCashAccount(account)) {
      return;
    }

    if (category === "investing" && account.type === "Asset" && isInvestingAsset(account)) {
      items.push({
        label: movement >= 0 ? `Purchase of ${account.name}` : `Sale of ${account.name}`,
        amount: -movement,
      });
    }

    if (category === "financing") {
      if (account.type === "Equity" && !isOpeningBalanceEquityAccount(account)) {
        items.push({
          label: `Movement in ${account.name}`,
          amount: movement,
        });
      }

      if (account.type === "Liability" && isFinancingLiability(account)) {
        items.push({
          label: `Movement in ${account.name}`,
          amount: movement,
        });
      }
    }
  });

  return items;
}

function applyLedgerMovement(balance, transaction, accountType) {
  if (hasDebitNormalBalance(accountType)) {
    return balance + transaction.debit - transaction.credit;
  }

  return balance - transaction.debit + transaction.credit;
}

function hasDebitNormalBalance(accountType) {
  return accountType === "Asset" || accountType === "Expense";
}

function formatLedgerBalance(balance, accountType) {
  const absoluteBalance = Math.abs(balance);

  if (absoluteBalance < 0.005) {
    return `${currencyFormatter.format(0)} ${hasDebitNormalBalance(accountType) ? "Dr" : "Cr"}`;
  }

  const label = hasDebitNormalBalance(accountType)
    ? balance >= 0
      ? "Dr"
      : "Cr"
    : balance >= 0
      ? "Cr"
      : "Dr";

  return `${currencyFormatter.format(absoluteBalance)} ${label}`;
}

function calculateClosingBalance(openingBalance, debits, credits, accountType) {
  if (hasDebitNormalBalance(accountType)) {
    return openingBalance + debits - credits;
  }

  return openingBalance + credits - debits;
}

function splitClosingBalance(balance, accountType) {
  if (Math.abs(balance) < 0.005) {
    return { debit: 0, credit: 0 };
  }

  if (hasDebitNormalBalance(accountType)) {
    return balance >= 0
      ? { debit: balance, credit: 0 }
      : { debit: 0, credit: Math.abs(balance) };
  }

  return balance >= 0
    ? { debit: 0, credit: balance }
    : { debit: Math.abs(balance), credit: 0 };
}

function isOpeningBalanceEquityAccount(account) {
  return account.code === openingBalanceEquityCode;
}

function isCashAccount(account) {
  return account.type === "Asset" && /(cash|bank|petty cash)/i.test(account.name);
}

function isWorkingCapitalAsset(account) {
  return /(receivable|inventory|stock|prepaid|deposit|supplies|debtor)/i.test(account.name);
}

function isInvestingAsset(account) {
  return /(equipment|vehicle|property|plant|machinery|building|land|investment|computer|furniture|fixture)/i.test(
    account.name,
  );
}

function isWorkingCapitalLiability(account) {
  return /(payable|accrued|tax|vat|wages|salary|creditor)/i.test(account.name);
}

function isFinancingLiability(account) {
  return /(loan|note|mortgage|debt|bond)/i.test(account.name);
}

function classifyBalanceSheetSection(account) {
  const name = account.name.toLowerCase();

  if (account.type === "Asset") {
    if (
      /(cash|bank|petty cash|receivable|inventory|stock|prepaid|deposit|supplies|debtor)/i.test(
        name,
      )
    ) {
      return "current-asset";
    }

    return "non-current-asset";
  }

  if (account.type === "Liability") {
    if (/(payable|accrued|tax|vat|wages|salary|creditor)/i.test(name)) {
      return "current-liability";
    }

    return "non-current-liability";
  }

  return "equity";
}

function renderBalanceSheetSectionGroup(container, label, sectionKey, rows) {
  const section = document.createElement("section");
  section.className = "balance-subsection";

  const subtotal = rows.reduce((sum, row) => sum + row.amount, 0);
  const expanded = state.balanceSheetSections[sectionKey];
  safeSetInnerHTML(
    section,
    `
    <button class="section-toggle" type="button" data-balance-toggle="${sectionKey}" aria-expanded="${expanded}">
      <span>${escapeHtml(label)}</span>
      <span>${escapeHtml(currencyFormatter.format(subtotal))} ${expanded ? "−" : "+"}</span>
    </button>
  `,
  );

  const body = document.createElement("div");
  body.className = "balance-subsection-body";
  body.classList.toggle("collapsed", !expanded);

  if (rows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "statement-row muted-row";
    safeSetInnerHTML(empty, "<span class=\"statement-label\">No accounts</span><strong>-</strong>");
    body.appendChild(empty);
  } else {
    rows.forEach((row) => {
      body.appendChild(createStatementRow(row.account.name, row.amount));
    });
  }

  container.appendChild(section);
  container.appendChild(body);
}

function buildAssistantFinancialContext() {
  const trialBalance = buildTrialBalanceReport();
  const incomeStatement = buildIncomeStatementReport();
  const balanceSheet = buildBalanceSheetReport();
  const cashFlow = buildCashFlowStatementReport();

  return {
    generatedAt: new Date().toISOString(),
    appName: appDisplayName,
    companySetup: {
      companyName: state.companySetup.companyName,
      industry: state.companySetup.industry,
      businessType: state.companySetup.businessType,
      address: state.companySetup.address,
      phone: state.companySetup.phone,
      email: state.companySetup.email,
      currency: state.companySetup.currency,
      country: state.companySetup.country,
      stateProvince: state.companySetup.stateProvince,
      city: state.companySetup.city,
      financialYearStart: state.companySetup.financialYearStart,
      setupComplete: isCompanySetupComplete(),
    },
    accounts: state.accounts.map((account) => {
      const postingTotals = getPostingTotalsForAccount(account.id);
      const closingBalance = calculateClosingBalance(
        Number(account.openingBalance) || 0,
        postingTotals.debits,
        postingTotals.credits,
        account.type,
      );

      return {
        code: account.code,
        name: account.name,
        type: account.type,
        openingBalance: Number(account.openingBalance) || 0,
        totalDebits: postingTotals.debits,
        totalCredits: postingTotals.credits,
        closingBalance,
      };
    }),
    journalEntries: state.journalEntries.map((entry) => ({
      date: entry.date,
      description: entry.description,
      systemGenerated: Boolean(entry.systemGenerated),
      lineItems: entry.lineItems.map((line) => {
        const account = findAccount(line.accountId);
        return {
          accountCode: account?.code || null,
          accountName: account?.name || "Archived account",
          accountType: account?.type || null,
          debit: Number(line.debit) || 0,
          credit: Number(line.credit) || 0,
        };
      }),
    })),
    trialBalance: {
      totalDebits: trialBalance.totalDebits,
      totalCredits: trialBalance.totalCredits,
      totalClosingDebits: trialBalance.totalClosingDebits,
      totalClosingCredits: trialBalance.totalClosingCredits,
      totalsBalanced: trialBalance.totalsBalanced,
      closingBalanced: trialBalance.closingBalanced,
    },
    incomeStatement: {
      totalRevenue: incomeStatement.totalRevenue,
      grossProfit: incomeStatement.grossProfit,
      operatingExpenses: incomeStatement.operatingExpenses,
      netIncome: incomeStatement.netIncome,
    },
    balanceSheet: {
      totalAssets: balanceSheet.totalAssets,
      totalLiabilities: balanceSheet.totalLiabilities,
      totalEquity: balanceSheet.totalEquity,
      retainedEarnings: balanceSheet.retainedEarnings,
      isBalanced: balanceSheet.isBalanced,
    },
    cashFlow: {
      openingCash: cashFlow.openingCash,
      operatingTotal: cashFlow.operatingTotal,
      investingTotal: cashFlow.investingTotal,
      financingTotal: cashFlow.financingTotal,
      netCashMovement: cashFlow.netCashMovement,
      closingCash: cashFlow.closingCash,
      balanceCheck: cashFlow.balanceCheck,
    },
  };
}

function createStatementRow(label, amount) {
  const row = document.createElement("div");
  row.className = "statement-row";
  safeSetInnerHTML(
    row,
    `
      <span class="statement-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(currencyFormatter.format(amount))}</strong>
    `,
  );
  return row;
}

function renderSectionSubtotal(element, label, amount) {
  safeSetInnerHTML(
    element,
    `
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(currencyFormatter.format(amount))}</strong>
    `,
  );
}

function buildAccountOptions(selectedId = "") {
  const baseOption = '<option value="">Select account</option>';
  const options = [...state.accounts]
    .sort((left, right) => left.code.localeCompare(right.code, undefined, { numeric: true }))
    .map((account) => {
      const selected = account.id === selectedId ? " selected" : "";
      return `<option value="${account.id}"${selected}>${escapeHtml(account.code)} - ${escapeHtml(account.name)}</option>`;
    })
    .join("");

  return `${baseOption}${options}`;
}

function createEmptyLineItem() {
  return {
    accountId: "",
    debit: 0,
    credit: 0,
  };
}

function showAccountError(message) {
  elements.accountFormError.textContent = message;
  elements.accountFormError.classList.remove("hidden");
}

function hideAccountError() {
  elements.accountFormError.textContent = "";
  elements.accountFormError.classList.add("hidden");
}

function showJournalError(message) {
  elements.journalFormError.textContent = message;
  elements.journalFormError.classList.remove("hidden");
}

function hideJournalError() {
  elements.journalFormError.textContent = "";
  elements.journalFormError.classList.add("hidden");
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function findAccount(accountId) {
  return state.accounts.find((account) => account.id === accountId) || null;
}

function updateSelectOptions(select, options, placeholder, { getValue, getLabel } = {}) {
  if (!select) {
    return;
  }

  const normalizedOptions = Array.isArray(options) ? options : [];
  const previousValue = select.value;
  const formattedOptions = normalizedOptions
    .map((entry) => {
      const value = String(getValue ? getValue(entry) : entry || "").trim();
      if (!value) {
        return null;
      }

      const label = String(getLabel ? getLabel(entry) : entry || value).trim();
      return {
        value,
        label: label || value,
      };
    })
    .filter(Boolean);

  const rows = [`<option value="">${escapeHtml(placeholder)}</option>`];
  formattedOptions.forEach((option) => {
    rows.push(
      `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`,
    );
  });

  safeSetInnerHTML(select, rows.join(""));
  if (formattedOptions.some((option) => option.value === previousValue)) {
    select.value = previousValue;
  } else {
    select.value = "";
  }
}

function normalizeString(value) {
  return String(value || "").trim().toLowerCase();
}

function safeSetInnerHTML(target, html) {
  if (!target) {
    return;
  }

  target.innerHTML = html;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
