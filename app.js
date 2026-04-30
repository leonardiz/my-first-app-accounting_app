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

const reportDateRangePresetLabels = {
  "this-month": "This Month",
  "last-month": "Last Month",
  "this-quarter": "This Quarter",
  "last-quarter": "Last Quarter",
  "this-year": "This Year",
  "all-time": "All Time",
  custom: "Custom Range",
};

let pendingConfirmationResolver = null;

const state = {
  currentUser: null,
  companies: [],
  activeCompanyId: "",
  accounts: [],
  journalEntries: [],
  invoices: [],
  companySetup: getDefaultCompanySetup(),
  companySetupMode: "edit",
  editingAccountId: null,
  editingJournalId: null,
  editingJournalDescriptionId: null,
  editingInvoiceId: null,
  currentView: "company-setup",
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  companySwitcherOpen: false,
  assistantMessages: [],
  assistantPending: false,
  authView: "login",
  setupBannerDismissed: false,
  onboardingStepIndex: 0,
  reportDateRange: getDefaultReportDateRange(),
  locationOptions: {
    countries: [],
    statesByCountry: new Map(),
  },
  balanceSheetSections: {
    currentAssets: true,
    nonCurrentAssets: true,
    currentLiabilities: true,
    nonCurrentLiabilities: true,
    equity: true,
  },
  requestStatus: {
    dashboard: { loading: false, error: "" },
    company: { loading: false, error: "" },
    accounts: { loading: false, error: "" },
    journal: { loading: false, error: "" },
    ledger: { loading: false, error: "" },
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
  companySwitcherButton: document.querySelector("#company-switcher-button"),
  companySwitcherMenu: document.querySelector("#company-switcher-menu"),
  sidebarCompanyName: document.querySelector("#sidebar-company-name"),
  pageTitle: document.querySelector("[data-page-title]"),
  headerCompanyIndicator: document.querySelector("#header-company-indicator"),
  currentUserName: document.querySelector("#current-user-name"),
  logoutButton: document.querySelector("#logout-button"),
  navItems: [...document.querySelectorAll("[data-view-target]")],
  viewPanels: [...document.querySelectorAll("[data-view]")],
  setupBanners: [...document.querySelectorAll("[data-setup-banner]")],
  reportFilterPanels: [...document.querySelectorAll("[data-report-filter]")],
  dashboardCashBalance: document.querySelector("#dashboard-cash-balance"),
  dashboardNetIncome: document.querySelector("#dashboard-net-income"),
  dashboardTotalExpenses: document.querySelector("#dashboard-total-expenses"),
  dashboardAccountsPayable: document.querySelector("#dashboard-accounts-payable"),
  dashboardOutstandingInvoices: document.querySelector("#dashboard-outstanding-invoices"),
  dashboardOverdueInvoices: document.querySelector("#dashboard-overdue-invoices"),
  dashboardTransactions: document.querySelector("#dashboard-transactions"),
  dashboardEmptyState: document.querySelector("#dashboard-empty-state"),
  dashboardStatus: document.querySelector("#dashboard-status"),
  companySetupForm: document.querySelector("#company-setup-form"),
  companySetupStatus: document.querySelector("#company-setup-status"),
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
  accountsTableWrapper: document.querySelector("#accounts-table-wrapper"),
  accountsTableBody: document.querySelector("#accounts-table-body"),
  accountsEmptyState: document.querySelector("#accounts-empty-state"),
  accountsStatus: document.querySelector("#accounts-status"),
  journalTableWrapper: document.querySelector("#journal-table-wrapper"),
  journalTableBody: document.querySelector("#journal-table-body"),
  journalEmptyState: document.querySelector("#journal-empty-state"),
  journalStatus: document.querySelector("#journal-status"),
  ledgerList: document.querySelector("#ledger-list"),
  ledgerEmptyState: document.querySelector("#ledger-empty-state"),
  ledgerStatus: document.querySelector("#ledger-status"),
  printLedgerButton: document.querySelector("#print-ledger-button"),
  ledgerSection: document.querySelector("#ledger-section"),
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
  invoiceForm: document.querySelector("#invoice-form"),
  invoiceNumber: document.querySelector("#invoice-number"),
  invoiceStatus: document.querySelector("#invoice-status"),
  invoiceClientName: document.querySelector("#invoice-client-name"),
  invoiceClientEmail: document.querySelector("#invoice-client-email"),
  invoiceDate: document.querySelector("#invoice-date"),
  invoiceDueDate: document.querySelector("#invoice-due-date"),
  invoiceLineItems: document.querySelector("#invoice-line-items"),
  addInvoiceLineButton: document.querySelector("#add-invoice-line-button"),
  invoiceSubtotal: document.querySelector("#invoice-subtotal"),
  invoiceTaxPercentage: document.querySelector("#invoice-tax-percentage"),
  invoiceTotalAmount: document.querySelector("#invoice-total-amount"),
  invoiceFormError: document.querySelector("#invoice-form-error"),
  invoiceResetButton: document.querySelector("#invoice-reset-button"),
  invoiceTableWrapper: document.querySelector("#invoice-table-wrapper"),
  invoiceTableBody: document.querySelector("#invoice-table-body"),
  invoiceEmptyState: document.querySelector("#invoice-empty-state"),
  confirmationDialog: document.querySelector("#confirmation-dialog"),
  confirmationDialogEyebrow: document.querySelector("#confirmation-dialog-eyebrow"),
  confirmationDialogTitle: document.querySelector("#confirmation-dialog-title"),
  confirmationDialogMessage: document.querySelector("#confirmation-dialog-message"),
  confirmationCancelButton: document.querySelector("#confirmation-cancel-button"),
  confirmationConfirmButton: document.querySelector("#confirmation-confirm-button"),
  closeConfirmationDialogButton: document.querySelector("#close-confirmation-dialog-button"),
};

elements.sidebarToggle.addEventListener("click", toggleSidebar);
elements.companySwitcherButton.addEventListener("click", toggleCompanySwitcher);
elements.companySwitcherMenu.addEventListener("click", handleCompanySwitcherAction);
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
  exportSectionToPdf("trial-balance"),
);
elements.printLedgerButton.addEventListener("click", () =>
  exportSectionToPdf("ledger"),
);
elements.printIncomeStatementButton.addEventListener("click", () =>
  exportSectionToPdf("income-statement"),
);
elements.printBalanceSheetButton.addEventListener("click", () =>
  exportSectionToPdf("balance-sheet"),
);
elements.printCashFlowButton.addEventListener("click", () =>
  exportSectionToPdf("cash-flow"),
);
elements.companySetupForm.addEventListener("submit", handleCompanySetupSubmit);
elements.companySetupReset.addEventListener("click", resetCompanySetup);
elements.currencySelect.addEventListener("change", handleCurrencySelectionInput);
elements.companyCountry.addEventListener("change", handleCountrySelectionInput);
elements.companyState.addEventListener("change", handleStateSelectionInput);
elements.companyCity.addEventListener("input", handleCityInput);
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
elements.invoiceForm.addEventListener("submit", handleInvoiceSubmit);
elements.invoiceResetButton.addEventListener("click", resetInvoiceForm);
elements.addInvoiceLineButton.addEventListener("click", () => addInvoiceLineItemRow());
elements.invoiceLineItems.addEventListener("input", handleInvoiceLineItemInput);
elements.invoiceLineItems.addEventListener("click", handleInvoiceLineItemClick);
elements.invoiceStatus.addEventListener("change", renderInvoiceNumberPreview);
elements.invoiceTaxPercentage.addEventListener("input", renderInvoiceTotals);
elements.invoiceTableBody.addEventListener("click", handleInvoiceTableAction);
elements.reportFilterPanels.forEach((panel) => {
  panel.addEventListener("click", handleReportFilterAction);
  panel.addEventListener("change", handleReportFilterAction);
});
elements.navItems.forEach((item) =>
  item.addEventListener("click", () => setActiveView(item.dataset.viewTarget)),
);
elements.balanceSheetAssetsList.addEventListener("click", handleBalanceSheetToggle);
elements.balanceSheetLiabilitiesList.addEventListener("click", handleBalanceSheetToggle);
elements.balanceSheetEquityList.addEventListener("click", handleBalanceSheetToggle);
elements.assistantForm.addEventListener("submit", handleAssistantSubmit);
elements.assistantClearButton.addEventListener("click", clearAssistantChat);
elements.closeConfirmationDialogButton.addEventListener("click", cancelConfirmationDialog);
elements.confirmationDialog.addEventListener("cancel", handleConfirmationDialogCancel);
elements.confirmationDialog.addEventListener("close", handleConfirmationDialogClose);
elements.confirmationDialog.addEventListener("click", handleConfirmationDialogBackdropClick);
window.addEventListener("resize", handleWindowResize);
document.addEventListener("click", handleDocumentClick);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderCurrencyOptions();
    await loadCountries();
    bootApplication();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
});

const workspaceStatusKeys = ["dashboard", "company", "accounts", "journal", "ledger"];

function getDefaultReportDateRange() {
  return getReportDateRangeFromPreset("this-month");
}

function getReportDateRangeFromPreset(presetKey, referenceDate = new Date()) {
  const presets = buildReportDateRangePresets(referenceDate);
  const normalizedPresetKey = Object.prototype.hasOwnProperty.call(presets, presetKey)
    ? presetKey
    : "this-month";
  const preset = presets[normalizedPresetKey];

  return {
    preset: normalizedPresetKey,
    startDate: preset.startDate,
    endDate: preset.endDate,
  };
}

function buildReportDateRangePresets(referenceDate = new Date()) {
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  const currentQuarterStartMonth = Math.floor(today.getMonth() / 3) * 3;

  return {
    "this-month": {
      startDate: formatDateInputValue(new Date(today.getFullYear(), today.getMonth(), 1)),
      endDate: formatDateInputValue(today),
    },
    "last-month": {
      startDate: formatDateInputValue(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
      endDate: formatDateInputValue(new Date(today.getFullYear(), today.getMonth(), 0)),
    },
    "this-quarter": {
      startDate: formatDateInputValue(new Date(today.getFullYear(), currentQuarterStartMonth, 1)),
      endDate: formatDateInputValue(today),
    },
    "last-quarter": {
      startDate: formatDateInputValue(new Date(today.getFullYear(), currentQuarterStartMonth - 3, 1)),
      endDate: formatDateInputValue(new Date(today.getFullYear(), currentQuarterStartMonth, 0)),
    },
    "this-year": {
      startDate: formatDateInputValue(new Date(today.getFullYear(), 0, 1)),
      endDate: formatDateInputValue(today),
    },
    "all-time": {
      startDate: "",
      endDate: "",
    },
  };
}

function formatDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeReportDateRange(range = state.reportDateRange) {
  let startDate = String(range?.startDate || "").trim();
  let endDate = String(range?.endDate || "").trim();

  if (startDate && endDate && startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  return {
    preset: detectReportDateRangePreset(startDate, endDate),
    startDate,
    endDate,
  };
}

function detectReportDateRangePreset(startDate, endDate) {
  if (!startDate && !endDate) {
    return "all-time";
  }

  const presets = buildReportDateRangePresets();
  const matchedPresetKey = Object.entries(presets).find(([, preset]) => {
    return preset.startDate === startDate && preset.endDate === endDate;
  })?.[0];

  return matchedPresetKey || "custom";
}

function getReportDateRangeDescriptor() {
  const range = normalizeReportDateRange();
  const presetLabel = reportDateRangePresetLabels[range.preset] || reportDateRangePresetLabels.custom;

  if (!range.startDate && !range.endDate) {
    return {
      ...range,
      presetLabel,
      label: presetLabel,
      summary: "Showing all available transactions",
      filenameDate: getTodayDate(),
    };
  }

  let boundaryLabel = "";
  if (range.startDate && range.endDate) {
    boundaryLabel = `${formatDate(range.startDate)} to ${formatDate(range.endDate)}`;
  } else if (range.startDate) {
    boundaryLabel = `From ${formatDate(range.startDate)}`;
  } else {
    boundaryLabel = `Up to ${formatDate(range.endDate)}`;
  }

  return {
    ...range,
    presetLabel,
    label: range.preset === "custom" ? boundaryLabel : `${presetLabel}: ${boundaryLabel}`,
    summary: `Showing ${boundaryLabel}`,
    filenameDate: range.endDate || range.startDate || getTodayDate(),
  };
}

function renderReportFilters() {
  const descriptor = getReportDateRangeDescriptor();
  const range = normalizeReportDateRange();
  state.reportDateRange = range;

  elements.reportFilterPanels.forEach((panel) => {
    const startInput = panel.querySelector("[data-report-filter-start]");
    const endInput = panel.querySelector("[data-report-filter-end]");
    const summary = panel.querySelector("[data-report-filter-summary]");

    if (startInput instanceof HTMLInputElement) {
      startInput.value = range.startDate;
    }

    if (endInput instanceof HTMLInputElement) {
      endInput.value = range.endDate;
    }

    if (summary) {
      summary.textContent = descriptor.summary;
    }

    panel.querySelectorAll("[data-report-filter-preset]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.reportFilterPreset === range.preset);
    });
  });
}

function handleReportFilterAction(event) {
  const presetButton =
    event.type === "click" && event.target instanceof Element
      ? event.target.closest("[data-report-filter-preset]")
      : null;
  if (presetButton instanceof HTMLButtonElement) {
    state.reportDateRange = getReportDateRangeFromPreset(presetButton.dataset.reportFilterPreset || "");
    render();
    return;
  }

  const input =
    event.type === "change" && event.target instanceof HTMLInputElement
      ? event.target
      : null;
  if (!input || !input.matches("[data-report-filter-start], [data-report-filter-end]")) {
    return;
  }

  const panel = input.closest("[data-report-filter]");
  const startInput = panel?.querySelector("[data-report-filter-start]");
  const endInput = panel?.querySelector("[data-report-filter-end]");
  let startDate = startInput instanceof HTMLInputElement ? startInput.value : "";
  let endDate = endInput instanceof HTMLInputElement ? endInput.value : "";

  if (startDate && endDate && startDate > endDate) {
    if (input.matches("[data-report-filter-start]")) {
      endDate = startDate;
    } else {
      startDate = endDate;
    }
  }

  state.reportDateRange = normalizeReportDateRange({
    startDate,
    endDate,
  });
  render();
}

function isDateWithinReportRange(dateValue) {
  const { startDate, endDate } = normalizeReportDateRange();
  const date = String(dateValue || "").trim();

  if (!date) {
    return false;
  }

  if (startDate && date < startDate) {
    return false;
  }

  if (endDate && date > endDate) {
    return false;
  }

  return true;
}

function getReportJournalEntries({ includeSystemGenerated = true } = {}) {
  return state.journalEntries.filter((entry) => {
    if (!includeSystemGenerated && entry.systemGenerated) {
      return false;
    }

    return isDateWithinReportRange(entry.date);
  });
}

function confirmDestructiveAction({
  eyebrow = "Please Confirm",
  title = "Confirm Action",
  message = "",
  confirmLabel = "Confirm Delete",
} = {}) {
  if (
    !(elements.confirmationDialog instanceof HTMLDialogElement) ||
    typeof elements.confirmationDialog.showModal !== "function"
  ) {
    return Promise.resolve(window.confirm(message || title));
  }

  if (elements.confirmationDialog.open) {
    resolvePendingConfirmation(false);
    elements.confirmationDialog.close("cancel");
  }

  elements.confirmationDialogEyebrow.textContent = eyebrow;
  elements.confirmationDialogTitle.textContent = title;
  elements.confirmationDialogMessage.textContent = message;
  elements.confirmationConfirmButton.textContent = confirmLabel;
  elements.confirmationDialog.showModal();
  window.setTimeout(() => {
    elements.confirmationCancelButton.focus();
  }, 0);

  return new Promise((resolve) => {
    pendingConfirmationResolver = resolve;
  });
}

function resolvePendingConfirmation(confirmed) {
  const resolver = pendingConfirmationResolver;
  pendingConfirmationResolver = null;
  if (typeof resolver === "function") {
    resolver(confirmed);
  }
}

function cancelConfirmationDialog() {
  if (elements.confirmationDialog?.open) {
    elements.confirmationDialog.close("cancel");
  }
}

function handleConfirmationDialogCancel(event) {
  event.preventDefault();
  cancelConfirmationDialog();
}

function handleConfirmationDialogClose() {
  resolvePendingConfirmation(elements.confirmationDialog.returnValue === "confirm");
}

function handleConfirmationDialogBackdropClick(event) {
  if (event.target === elements.confirmationDialog) {
    cancelConfirmationDialog();
  }
}

async function bootApplication() {
  try {
    const session = await fetchCurrentSession();
    if (!session) {
      state.currentUser = null;
      state.companies = [];
      state.activeCompanyId = "";
      state.companySetup = getDefaultCompanySetup();
      state.companySetupMode = "edit";
      state.accounts = syncOpeningBalanceEquityAccount([]);
      state.journalEntries = syncSystemJournalEntry([]);
      state.invoices = [];
      state.editingInvoiceId = null;
      state.assistantMessages = [];
      state.setupBannerDismissed = false;
      state.companySwitcherOpen = false;
      state.reportDateRange = getDefaultReportDateRange();
      render();
      return;
    }

    state.currentUser = session.user;
    state.companies = Array.isArray(session.companies) ? session.companies.map(normalizeCompanyRecord) : [];
    state.activeCompanyId = session.activeCompanyId || "";
    startSectionLoading(workspaceStatusKeys);
    render();
    await initializeState();
    render();
  } catch (error) {
    if (state.currentUser) {
      applyWorkspaceLoadError(error);
      render();
      showToast("We couldn't load your workspace right now.", "error");
      return;
    }

    state.currentUser = null;
    state.companies = [];
    state.activeCompanyId = "";
    state.companySetup = getDefaultCompanySetup();
    state.companySetupMode = "edit";
    state.accounts = syncOpeningBalanceEquityAccount([]);
    state.journalEntries = syncSystemJournalEntry([]);
    state.invoices = [];
    state.editingInvoiceId = null;
    state.setupBannerDismissed = false;
    state.companySwitcherOpen = false;
    showAuthError(error.message);
    render();
  }
}

async function initializeState() {
  startSectionLoading(workspaceStatusKeys);
  try {
    const bootstrap = await apiFetch("/api/bootstrap");
    state.currentUser = bootstrap.user;
    state.companies = Array.isArray(bootstrap.companies)
      ? bootstrap.companies.map(normalizeCompanyRecord)
      : [];
    state.activeCompanyId = bootstrap.activeCompanyId || "";
    state.companySetup = normalizeCompanySetup(bootstrap.company);
    state.companySetupMode = "edit";
    state.accounts = syncOpeningBalanceEquityAccount(Array.isArray(bootstrap.accounts) ? bootstrap.accounts : []);
    state.journalEntries = syncSystemJournalEntry(
      Array.isArray(bootstrap.journalEntries) ? bootstrap.journalEntries : [],
    );
    state.invoices = Array.isArray(bootstrap.invoices) ? bootstrap.invoices.map(normalizeInvoiceRecord) : [];
    state.editingInvoiceId = null;
    state.assistantMessages = [];
    state.currentView = "dashboard";
    state.reportDateRange = getDefaultReportDateRange();
    state.mobileSidebarOpen = false;
    state.sidebarCollapsed = false;
    state.setupBannerDismissed = false;
    state.companySwitcherOpen = false;
    updateCurrencyFormatter();
    syncAssistantOnboardingMessage();
    await ensureLocationSelectionsLoaded();
    await syncCompanySetupFields();
    resetInvoiceForm();
    clearSectionErrors(workspaceStatusKeys);
  } catch (error) {
    applyWorkspaceLoadError(error);
    throw error;
  } finally {
    finishSectionLoading(workspaceStatusKeys);
    render();
  }
}

async function fetchCurrentSession() {
  try {
    const payload = await apiFetch("/auth/me");
    return {
      user: payload.user,
      company: payload.company,
      companies: payload.companies,
      activeCompanyId: payload.activeCompanyId || "",
    };
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    throw error;
  }
}

async function refreshWorkspaceData() {
  startSectionLoading(workspaceStatusKeys);
  render();
  try {
    const payload = await apiFetch("/api/bootstrap");
    state.currentUser = payload.user;
    state.companies = Array.isArray(payload.companies) ? payload.companies.map(normalizeCompanyRecord) : [];
    state.activeCompanyId = payload.activeCompanyId || "";
    state.companySetup = normalizeCompanySetup(payload.company);
    state.companySetupMode = "edit";
    state.accounts = syncOpeningBalanceEquityAccount(Array.isArray(payload.accounts) ? payload.accounts : []);
    state.journalEntries = syncSystemJournalEntry(
      Array.isArray(payload.journalEntries) ? payload.journalEntries : [],
    );
    state.invoices = Array.isArray(payload.invoices) ? payload.invoices.map(normalizeInvoiceRecord) : [];
    state.editingInvoiceId = null;
    state.companySwitcherOpen = false;
    updateCurrencyFormatter();
    await syncCompanySetupFields(payload.company);
    if (!state.editingInvoiceId) {
      resetInvoiceForm();
    }
    clearSectionErrors(workspaceStatusKeys);
  } catch (error) {
    applyWorkspaceLoadError(error);
    throw error;
  } finally {
    finishSectionLoading(workspaceStatusKeys);
    render();
  }
}

async function switchActiveCompany(companyId) {
  if (!companyId || companyId === state.activeCompanyId) {
    state.companySwitcherOpen = false;
    renderCompanySwitcher();
    return;
  }

  try {
    startSectionLoading(workspaceStatusKeys);
    render();
    const response = await apiFetch(`/api/companies/${companyId}/select`, { method: "POST" });
    state.activeCompanyId = response.activeCompanyId || companyId;
    state.companySetupMode = "edit";
    state.companySwitcherOpen = false;
    await refreshWorkspaceData();
    setActiveView("dashboard");
    showToast("Company switched successfully");
  } catch (error) {
    finishSectionLoading(workspaceStatusKeys);
    render();
    showToast(`Unable to switch company. ${error.message}`, "error");
  }
}

async function createAndSwitchCompany() {
  state.companySetupMode = "create";
  state.companySetup = getDefaultCompanySetup();
  state.setupBannerDismissed = false;
  state.onboardingStepIndex = 0;
  state.companySwitcherOpen = false;
  updateCurrencyFormatter();
  await syncCompanySetupFields(state.companySetup);
  render();
  setActiveView("company-setup");
  showToast("Enter the new company details, then save to create it.");
}

function handleCompanySwitcherAction(event) {
  const button = event.target instanceof Element ? event.target.closest("[data-company-action]") : null;
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const action = button.dataset.companyAction;
  if (action === "switch") {
    switchActiveCompany(button.dataset.companyId || "");
    return;
  }

  if (action === "create") {
    createAndSwitchCompany();
  }
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
  const companyData =
    company && typeof company === "object"
      ? company.company && typeof company.company === "object"
        ? company.company
        : company
      : {};
  const selectedCurrency = getCurrencyMeta(companyData?.currency) || getCurrencyMeta(fallback.currency);
  return {
    ...fallback,
    ...companyData,
    id: String(companyData?.id || fallback.id).trim(),
    companyName: String(companyData?.companyName || companyData?.name || fallback.companyName).trim(),
    industry: String(companyData?.industry || fallback.industry).trim(),
    businessType: String(companyData?.businessType || fallback.businessType).trim(),
    address: String(companyData?.address || fallback.address).trim(),
    phone: String(companyData?.phone || fallback.phone).trim(),
    email: String(companyData?.email || fallback.email).trim(),
    country: String(companyData?.country || fallback.country).trim(),
    stateProvince: String(companyData?.stateProvince || fallback.stateProvince).trim(),
    city: String(companyData?.city || fallback.city).trim(),
    financialYearStart: String(companyData?.financialYearStart || fallback.financialYearStart).trim(),
    currency: selectedCurrency?.code || fallback.currency,
  };
}

function normalizeCompanyRecord(company) {
  const normalized = normalizeCompanySetup(company);
  return {
    id: normalized.id,
    name: normalized.companyName,
    currency: normalized.currency,
    industry: normalized.industry,
  };
}

function normalizeInvoiceRecord(invoice) {
  const lineItems = Array.isArray(invoice?.lineItems)
    ? invoice.lineItems.map((line) => ({
        description: String(line?.description || "").trim(),
        quantity: Number(line?.quantity) || 0,
        unitPrice: Number(line?.unitPrice) || 0,
        amount: Number(line?.amount) || 0,
      }))
    : [];

  return {
    id: String(invoice?.id || "").trim(),
    invoiceNumber: String(invoice?.invoiceNumber || "").trim(),
    clientName: String(invoice?.clientName || "").trim(),
    clientEmail: String(invoice?.clientEmail || "").trim(),
    invoiceDate: String(invoice?.invoiceDate || "").trim(),
    dueDate: String(invoice?.dueDate || "").trim(),
    lineItems,
    subtotal: Number(invoice?.subtotal) || 0,
    taxPercentage: Number(invoice?.taxPercentage) || 0,
    totalAmount: Number(invoice?.totalAmount) || 0,
    status: String(invoice?.status || "Draft").trim() || "Draft",
  };
}

function showToast(message, tone = "success") {
  let toastRegion = document.querySelector("#toast-region");
  if (!toastRegion) {
    toastRegion = document.createElement("div");
    toastRegion.id = "toast-region";
    toastRegion.className = "toast-region";
    document.body.appendChild(toastRegion);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${tone}`;
  toast.textContent = message;
  toastRegion.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => {
      if (toast.parentElement === toastRegion) {
        toast.remove();
      }
    }, 220);
  }, 3000);
}

function getVisibleAccounts() {
  return state.accounts.filter((account) => !isOpeningBalanceEquityAccount(account));
}

function getVisibleJournalEntries() {
  return state.journalEntries.filter((entry) => !entry.systemGenerated);
}

function getActiveCompany() {
  return (
    state.companies.find((company) => company.id === state.activeCompanyId) ||
    state.companies.find((company) => company.id === state.companySetup.id) ||
    null
  );
}

function setSectionStatus(sectionKey, updates = {}) {
  state.requestStatus[sectionKey] = {
    ...state.requestStatus[sectionKey],
    ...updates,
  };
}

function startSectionLoading(sectionKeys) {
  sectionKeys.forEach((sectionKey) => {
    setSectionStatus(sectionKey, { loading: true, error: "" });
  });
}

function finishSectionLoading(sectionKeys) {
  sectionKeys.forEach((sectionKey) => {
    setSectionStatus(sectionKey, { loading: false });
  });
}

function clearSectionErrors(sectionKeys) {
  sectionKeys.forEach((sectionKey) => {
    setSectionStatus(sectionKey, { error: "" });
  });
}

function applyWorkspaceLoadError(error) {
  const message = getFriendlyLoadErrorMessage(error);
  setSectionStatus("dashboard", { error: `We couldn't load the dashboard right now. ${message}` });
  setSectionStatus("company", { error: `We couldn't load your company setup right now. ${message}` });
  setSectionStatus("accounts", { error: `We couldn't load your chart of accounts right now. ${message}` });
  setSectionStatus("journal", { error: `We couldn't load journal entries right now. ${message}` });
  setSectionStatus("ledger", { error: `We couldn't load the general ledger right now. ${message}` });
}

function getFriendlyLoadErrorMessage(error) {
  const fallbackMessage = "Please refresh and try again.";
  const rawMessage = String(error?.message || "").trim();
  if (!rawMessage) {
    return fallbackMessage;
  }

  return rawMessage.endsWith(".")
    ? `${rawMessage} Please refresh and try again.`
    : `${rawMessage}. Please refresh and try again.`;
}

function renderSectionFeedback(element, config = {}) {
  if (!element) {
    return;
  }

  const { visible = false, tone = "empty", title = "", message = "", showSpinner = false } = config;
  element.classList.toggle("hidden", !visible);
  element.classList.toggle("is-error", visible && tone === "error");
  element.classList.toggle("is-empty", visible && tone === "empty");

  if (!visible) {
    safeSetInnerHTML(element, "");
    return;
  }

  safeSetInnerHTML(
    element,
    `
      <div class="section-feedback-content">
        ${showSpinner ? '<span class="section-spinner" aria-hidden="true"></span>' : ""}
        <div class="section-feedback-copy">
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(message)}</p>
        </div>
      </div>
    `,
  );
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

async function ensureLocationSelectionsLoaded() {
  await loadCountries();
  if (state.companySetup.country) {
    await loadStatesForCountry(state.companySetup.country);
  }
}
function renderLocationOptions() {
  updateSelectOptions(elements.companyCountry, state.locationOptions.countries, "Select a country");

  const countryKey = normalizeString(state.companySetup.country);
  const states = state.locationOptions.statesByCountry.get(countryKey) || [];
  updateSelectOptions(elements.companyState, states, "Select a state / province");
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
  state.companies = [];
  state.activeCompanyId = "";
  state.accounts = [];
  state.journalEntries = [];
  state.companySetup = getDefaultCompanySetup();
  state.assistantMessages = [];
  state.authView = "login";
  state.reportDateRange = getDefaultReportDateRange();
  state.setupBannerDismissed = false;
  state.companySwitcherOpen = false;
  render();
}

function render() {
  renderAuthState();
  if (!state.currentUser) {
    return;
  }

  renderNavigation();
  renderBranding();
  renderCompanySwitcher();
  renderSetupBanners();
  renderReportFilters();
  renderDashboard();
  renderCompanySetup();
  renderInvoices();
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
  const activeCompany = getActiveCompany();
  if (elements.pageTitle) {
    elements.pageTitle.textContent = `${appDisplayName} ${viewTitle}`;
  }
  if (elements.headerCompanyIndicator) {
    elements.headerCompanyIndicator.textContent = activeCompany
      ? `Viewing books for ${activeCompany.name || "Untitled Company"}`
      : "No active company selected";
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
  state.companySwitcherOpen = false;
  if (isMobileViewport()) {
    state.mobileSidebarOpen = false;
  }
  render();
}

function toggleCompanySwitcher(event) {
  event.stopPropagation();
  state.companySwitcherOpen = !state.companySwitcherOpen;
  renderCompanySwitcher();
}

function handleDocumentClick(event) {
  if (!state.companySwitcherOpen) {
    return;
  }

  const target = event.target;
  if (
    target instanceof Element &&
    (target.closest("#company-switcher-button") || target.closest("#company-switcher-menu"))
  ) {
    return;
  }

  state.companySwitcherOpen = false;
  renderCompanySwitcher();
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
  const activeCompany = getActiveCompany();
  const companyName = state.companySetup.companyName.trim() || activeCompany?.name || "";
  const eyebrow = companyName ? `${companyName} Workspace` : defaultBrandEyebrow;

  document.title = appDisplayName;
  elements.brandNames.forEach((element) => {
    element.textContent = appDisplayName;
  });
  elements.brandEyebrows.forEach((element) => {
    element.textContent = eyebrow;
  });
}

function renderCompanySwitcher() {
  const activeCompany = getActiveCompany();
  if (elements.sidebarCompanyName) {
    elements.sidebarCompanyName.textContent = activeCompany?.name || "Select a company";
  }

  if (elements.companySwitcherButton) {
    elements.companySwitcherButton.setAttribute("aria-expanded", String(state.companySwitcherOpen));
  }

  if (!elements.companySwitcherMenu) {
    return;
  }

  safeSetInnerHTML(elements.companySwitcherMenu, "");
  elements.companySwitcherMenu.classList.toggle("hidden", !state.companySwitcherOpen);

  state.companies.forEach((company) => {
    const item = document.createElement("button");
    item.className = `company-switcher-item${company.id === state.activeCompanyId ? " is-active" : ""}`;
    item.type = "button";
    item.dataset.companyAction = "switch";
    item.dataset.companyId = company.id;
    safeSetInnerHTML(
      item,
      `
        <span class="company-switcher-item-label">${escapeHtml(company.name || "Untitled Company")}</span>
        <span class="company-switcher-item-meta">${escapeHtml(company.currency || "NGN")}</span>
      `,
    );
    elements.companySwitcherMenu.appendChild(item);
  });

  const addButton = document.createElement("button");
  addButton.className = "company-switcher-item";
  addButton.type = "button";
  addButton.dataset.companyAction = "create";
  safeSetInnerHTML(
    addButton,
    `
      <span class="company-switcher-item-label">Add New Company</span>
      <span class="company-switcher-item-meta">Start a fresh company setup flow</span>
    `,
  );
  elements.companySwitcherMenu.appendChild(addButton);
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
  const dashboardStatus = state.requestStatus.dashboard;
  if (dashboardStatus.loading) {
    elements.dashboardTransactions.classList.add("hidden");
    elements.dashboardEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.dashboardStatus, {
      visible: true,
      tone: "loading",
      title: "Loading dashboard",
      message: "Pulling your latest balances and activity.",
      showSpinner: true,
    });
    return;
  }

  if (dashboardStatus.error) {
    elements.dashboardTransactions.classList.add("hidden");
    elements.dashboardEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.dashboardStatus, {
      visible: true,
      tone: "error",
      title: "Dashboard unavailable",
      message: dashboardStatus.error,
    });
    return;
  }

  const cashFlow = buildCashFlowStatementReport();
  const incomeStatement = buildIncomeStatementReport();
  const monthlyNetIncome = buildCurrentMonthNetIncome();
  const accountsPayable = buildAccountsPayableBalance();
  const outstandingInvoices = getOutstandingInvoicesTotal();
  const overdueInvoices = getOverdueInvoicesCount();
  const recentTransactions = getVisibleJournalEntries()
    .slice()
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 6);

  elements.dashboardCashBalance.textContent = currencyFormatter.format(cashFlow.closingCash);
  elements.dashboardNetIncome.textContent = currencyFormatter.format(monthlyNetIncome);
  elements.dashboardNetIncome.classList.toggle("negative", monthlyNetIncome < 0);
  elements.dashboardTotalExpenses.textContent = currencyFormatter.format(incomeStatement.operatingExpenses);
  elements.dashboardAccountsPayable.textContent = currencyFormatter.format(accountsPayable);
  elements.dashboardOutstandingInvoices.textContent = currencyFormatter.format(outstandingInvoices);
  elements.dashboardOverdueInvoices.textContent = String(overdueInvoices);
  safeSetInnerHTML(elements.dashboardTransactions, "");
  elements.dashboardTransactions.classList.remove("hidden");
  renderSectionFeedback(elements.dashboardStatus, { visible: false });

  if (!recentTransactions.length) {
    elements.dashboardTransactions.classList.add("hidden");
    safeSetInnerHTML(
      elements.dashboardEmptyState,
      `
        <h3>No dashboard activity yet</h3>
        <p>No dashboard activity yet. Add accounts and journal entries to get started.</p>
      `,
    );
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

function getOutstandingInvoicesTotal() {
  return state.invoices
    .filter((invoice) => invoice.status === "Sent" || invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + (Number(invoice.totalAmount) || 0), 0);
}

function getOverdueInvoicesCount() {
  return state.invoices.filter((invoice) => invoice.status === "Overdue").length;
}

function renderCompanySetup() {
  const companyStatus = state.requestStatus.company;
  const onboardingSteps = getOnboardingSteps();
  const currentStep = onboardingSteps[state.onboardingStepIndex] || onboardingSteps[0];
  const selectedCurrency = resolveCurrencySelection(
    elements.currencySelect?.value || state.companySetup.currency,
  );

  elements.currencySelectionHint.textContent = selectedCurrency
    ? `Selected currency: ${selectedCurrency.code} ${selectedCurrency.symbol} · ${selectedCurrency.name}`
    : "Select a currency that matches your reporting preference.";

  elements.onboardingProgressBadge.textContent = `Step ${state.onboardingStepIndex + 1} of ${onboardingSteps.length}`;
  elements.onboardingSubtitle.textContent = currentStep
    ? currentStep.helper
    : "Complete your company setup details.";
  elements.companySetupForm.classList.toggle("hidden", companyStatus.loading || Boolean(companyStatus.error));

  if (companyStatus.loading) {
    renderSectionFeedback(elements.companySetupStatus, {
      visible: true,
      tone: "loading",
      title: "Loading company setup",
      message: "Fetching your company profile and preferences.",
      showSpinner: true,
    });
  } else if (companyStatus.error) {
    renderSectionFeedback(elements.companySetupStatus, {
      visible: true,
      tone: "error",
      title: "Company setup unavailable",
      message: companyStatus.error,
    });
  } else {
    renderSectionFeedback(elements.companySetupStatus, { visible: false });
  }

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

async function syncCompanySetupFields(companySource = state.companySetup) {
  if (!companySource || !elements.companySetupForm) {
    return;
  }

  const company = normalizeCompanySetup(companySource);
  state.companySetup = company;

  if (company.country) {
    await loadStatesForCountry(company.country);
  }

  if (elements.companyName) {
    elements.companyName.value = company.companyName || "";
  }
  if (elements.companyIndustry) {
    elements.companyIndustry.value = company.industry || "";
  }
  if (elements.companyBusinessType) {
    elements.companyBusinessType.value = company.businessType || "";
  }
  if (elements.companyAddress) {
    elements.companyAddress.value = company.address || "";
  }
  if (elements.companyPhone) {
    elements.companyPhone.value = company.phone || "";
  }
  if (elements.companyEmail) {
    elements.companyEmail.value = company.email || "";
  }
  renderLocationOptions();
  if (elements.companyCountry) {
    elements.companyCountry.value = company.country || "";
  }
  if (elements.companyState) {
    elements.companyState.value = company.stateProvince || "";
  }
  if (elements.companyCity) {
    elements.companyCity.value = company.city || "";
  }
  const selectedCurrency = getCurrencyMeta(company.currency);
  if (elements.currencySelect) {
    elements.currencySelect.value = selectedCurrency?.code || "";
  }
  handleCurrencySelectionInput();
  if (elements.financialYearStart) {
    elements.financialYearStart.value = company.financialYearStart || "";
  }
}

function clearCompanySetupFormFields() {
  if (!elements.companySetupForm) {
    return;
  }

  if (elements.companyName) {
    elements.companyName.value = "";
  }
  if (elements.companyIndustry) {
    elements.companyIndustry.value = "";
  }
  if (elements.companyBusinessType) {
    elements.companyBusinessType.value = "";
  }
  if (elements.companyAddress) {
    elements.companyAddress.value = "";
  }
  if (elements.companyPhone) {
    elements.companyPhone.value = "";
  }
  if (elements.companyEmail) {
    elements.companyEmail.value = "";
  }
  if (elements.currencySelect) {
    elements.currencySelect.value = "";
  }
  if (elements.companyCountry) {
    elements.companyCountry.value = "";
  }
  if (elements.companyState) {
    elements.companyState.value = "";
  }
  if (elements.companyCity) {
    elements.companyCity.value = "";
  }
  if (elements.financialYearStart) {
    elements.financialYearStart.value = "";
  }

  handleCurrencySelectionInput();
}

function readCompanySetupPayloadFromForm() {
  const companyNameInput = document.getElementById("company-name");
  const industryInput = document.getElementById("company-industry");
  const businessTypeInput = document.getElementById("company-business-type");
  const addressInput = document.getElementById("company-address");
  const phoneInput = document.getElementById("company-phone");
  const emailInput = document.getElementById("company-email");
  const currencyInput = document.getElementById("currency-select");
  const countryInput = document.getElementById("company-country");
  const stateInput = document.getElementById("company-state");
  const cityInput = document.getElementById("company-city");
  const financialYearStartInput = document.getElementById("financial-year-start");
  const selectedCurrency = resolveCurrencySelection(currencyInput?.value || "");

  return {
    companyNameInput,
    selectedCurrency,
    payload: {
      ...state.companySetup,
      companyName: companyNameInput?.value.trim() || "",
      industry: industryInput?.value.trim() || "",
      businessType: businessTypeInput?.value.trim() || "",
      address: addressInput?.value.trim() || "",
      phone: phoneInput?.value.trim() || "",
      email: emailInput?.value.trim() || "",
      currency: selectedCurrency?.code || "",
      country: countryInput?.value.trim() || "",
      stateProvince: stateInput?.value.trim() || "",
      city: cityInput?.value.trim() || "",
      financialYearStart: financialYearStartInput?.value || "",
    },
  };
}

async function handleCompanySetupSubmit(event) {
  event.preventDefault();
  const { selectedCurrency, payload } = readCompanySetupPayloadFromForm();
  const isCreatingCompany = state.companySetupMode === "create";
  if (!selectedCurrency) {
    showToast("Select a valid currency from the global currency list.", "error");
    elements.currencySelect.focus();
    return;
  }

  try {
    const response = await apiFetch(isCreatingCompany ? "/api/companies" : "/api/company", {
      method: isCreatingCompany ? "POST" : "PUT",
      body: JSON.stringify(payload),
    });
    state.activeCompanyId = response.activeCompanyId || state.activeCompanyId;
    state.companies = Array.isArray(response.companies)
      ? response.companies.map(normalizeCompanyRecord)
      : state.companies;
    state.companySetup = normalizeCompanySetup(response.company || response);
    state.companySetupMode = isCreatingCompany ? "create" : "edit";
    if (isCreatingCompany) {
      state.accounts = syncOpeningBalanceEquityAccount([]);
      state.journalEntries = syncSystemJournalEntry([]);
    }
    updateCurrencyFormatter();
    await syncCompanySetupFields(response.company || response);
    syncAssistantOnboardingMessage();
    render();
    showToast("Company setup saved successfully");
  } catch (error) {
    showToast(`Unable to save company setup. ${error.message}`, "error");
  }
}

async function resetCompanySetup() {
  const confirmed = await confirmDestructiveAction({
    eyebrow: "Reset Company Setup",
    title: "Reset Company Setup?",
    message:
      "Are you sure you want to reset? This will clear all unsaved changes to your company setup. Your previously saved company data will not be affected.",
    confirmLabel: "Confirm Reset",
  });

  if (!confirmed) {
    return;
  }

  clearCompanySetupFormFields();
  showToast("Company setup form cleared");
}

function renderInvoices() {
  if (!elements.invoiceForm) {
    return;
  }

  if (!elements.invoiceLineItems.children.length && !state.editingInvoiceId) {
    resetInvoiceForm();
  }

  renderInvoiceNumberPreview();
  renderInvoiceTotals();
  safeSetInnerHTML(elements.invoiceTableBody, "");

  if (!state.invoices.length) {
    elements.invoiceTableWrapper.classList.add("hidden");
    elements.invoiceEmptyState.classList.remove("hidden");
    return;
  }

  elements.invoiceTableWrapper.classList.remove("hidden");
  elements.invoiceEmptyState.classList.add("hidden");

  state.invoices
    .slice()
    .sort((left, right) => new Date(right.invoiceDate) - new Date(left.invoiceDate))
    .forEach((invoice) => {
      const row = document.createElement("tr");
      safeSetInnerHTML(
        row,
        `
          <td>
            <strong>${escapeHtml(invoice.invoiceNumber)}</strong>
          </td>
          <td>
            <strong>${escapeHtml(invoice.clientName)}</strong>
            <div class="ledger-note">${escapeHtml(invoice.clientEmail || "No email")}</div>
          </td>
          <td><span class="status-badge invoice-status-${escapeHtml(normalizeString(invoice.status))}">${escapeHtml(invoice.status)}</span></td>
          <td>${escapeHtml(formatDate(invoice.invoiceDate))}</td>
          <td>${escapeHtml(formatDate(invoice.dueDate))}</td>
          <td class="numeric">${escapeHtml(currencyFormatter.format(invoice.totalAmount))}</td>
          <td>
            <div class="table-actions">
              <button class="ghost-button" type="button" data-action="edit-invoice" data-id="${invoice.id}">Edit</button>
              <button class="ghost-button" type="button" data-action="mark-paid-invoice" data-id="${invoice.id}">Mark as Paid</button>
              <button class="ghost-button" type="button" data-action="export-invoice" data-id="${invoice.id}">Export PDF</button>
              <button class="ghost-button danger" type="button" data-action="delete-invoice" data-id="${invoice.id}">Delete</button>
            </div>
          </td>
        `,
      );
      elements.invoiceTableBody.appendChild(row);
    });
}

function renderInvoiceNumberPreview() {
  if (!elements.invoiceNumber) {
    return;
  }

  const editingInvoice = getEditingInvoice();
  elements.invoiceNumber.value = editingInvoice?.invoiceNumber || getNextInvoiceNumberPreview();
}

function getNextInvoiceNumberPreview() {
  const maxSequence = state.invoices.reduce((maxValue, invoice) => {
    const match = invoice.invoiceNumber.match(/(\d+)$/);
    return match ? Math.max(maxValue, Number(match[1])) : maxValue;
  }, 0);
  return `INV-${String(maxSequence + 1).padStart(4, "0")}`;
}

function createEmptyInvoiceLineItem() {
  return {
    description: "",
    quantity: 1,
    unitPrice: 0,
    amount: 0,
  };
}

function addInvoiceLineItemRow(line = createEmptyInvoiceLineItem()) {
  const row = document.createElement("div");
  row.className = "line-item-row invoice-line-row";
  safeSetInnerHTML(
    row,
    `
      <label class="full-span">
        <span>Description</span>
        <input class="invoice-line-description" type="text" value="${escapeHtml(line.description || "")}" />
      </label>
      <label>
        <span>Quantity</span>
        <input class="invoice-line-quantity" type="number" min="0" step="0.01" value="${escapeHtml(String(line.quantity ?? 1))}" />
      </label>
      <label>
        <span>Unit Price</span>
        <input class="invoice-line-unit-price" type="number" min="0" step="0.01" value="${escapeHtml(String(line.unitPrice ?? 0))}" />
      </label>
      <label>
        <span>Amount</span>
        <input class="invoice-line-amount" type="text" readonly value="${escapeHtml(currencyFormatter.format(Number(line.amount) || 0))}" />
      </label>
      <button class="line-remove-button" type="button">Remove</button>
    `,
  );
  elements.invoiceLineItems.appendChild(row);
  syncInvoiceLineAmount(row);
}

function handleInvoiceLineItemInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const row = target.closest(".invoice-line-row");
  if (!row) {
    return;
  }

  syncInvoiceLineAmount(row);
  renderInvoiceTotals();
}

function handleInvoiceLineItemClick(event) {
  const target = event.target instanceof Element ? event.target.closest(".line-remove-button") : null;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  target.closest(".invoice-line-row")?.remove();
  if (!elements.invoiceLineItems.children.length) {
    addInvoiceLineItemRow();
  }
  renderInvoiceTotals();
}

function syncInvoiceLineAmount(row) {
  const quantity = Number(row.querySelector(".invoice-line-quantity")?.value) || 0;
  const unitPrice = Number(row.querySelector(".invoice-line-unit-price")?.value) || 0;
  const amount = quantity * unitPrice;
  const amountInput = row.querySelector(".invoice-line-amount");
  if (amountInput instanceof HTMLInputElement) {
    amountInput.value = currencyFormatter.format(amount);
  }
}

function collectInvoiceLineItemsFromForm() {
  return [...elements.invoiceLineItems.querySelectorAll(".invoice-line-row")]
    .map((row) => ({
      description: row.querySelector(".invoice-line-description")?.value.trim() || "",
      quantity: Number(row.querySelector(".invoice-line-quantity")?.value) || 0,
      unitPrice: Number(row.querySelector(".invoice-line-unit-price")?.value) || 0,
    }))
    .filter((line) => line.description || line.quantity > 0 || line.unitPrice > 0)
    .map((line) => ({
      ...line,
      amount: line.quantity * line.unitPrice,
    }));
}

function renderInvoiceTotals() {
  const lineItems = collectInvoiceLineItemsFromForm();
  const subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);
  const taxPercentage = Number(elements.invoiceTaxPercentage.value) || 0;
  const totalAmount = subtotal + subtotal * (taxPercentage / 100);

  elements.invoiceSubtotal.value = currencyFormatter.format(subtotal);
  elements.invoiceTotalAmount.value = currencyFormatter.format(totalAmount);
}

function resetInvoiceForm() {
  if (!elements.invoiceForm) {
    return;
  }

  state.editingInvoiceId = null;
  elements.invoiceClientName.value = "";
  elements.invoiceClientEmail.value = "";
  elements.invoiceDate.value = getTodayDate();
  elements.invoiceDueDate.value = getTodayDate();
  elements.invoiceStatus.value = "Draft";
  elements.invoiceTaxPercentage.value = "0";
  safeSetInnerHTML(elements.invoiceLineItems, "");
  addInvoiceLineItemRow();
  renderInvoiceNumberPreview();
  renderInvoiceTotals();
  hideInvoiceError();
}

function getEditingInvoice() {
  return state.invoices.find((invoice) => invoice.id === state.editingInvoiceId) || null;
}

function showInvoiceError(message) {
  elements.invoiceFormError.textContent = message;
  elements.invoiceFormError.classList.remove("hidden");
}

function hideInvoiceError() {
  elements.invoiceFormError.textContent = "";
  elements.invoiceFormError.classList.add("hidden");
}

async function handleInvoiceSubmit(event) {
  event.preventDefault();
  hideInvoiceError();
  const isEditingInvoice = Boolean(state.editingInvoiceId);

  const lineItems = collectInvoiceLineItemsFromForm();
  const subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);
  const taxPercentage = Number(elements.invoiceTaxPercentage.value) || 0;
  const totalAmount = subtotal + subtotal * (taxPercentage / 100);
  const payload = {
    invoiceNumber: elements.invoiceNumber.value.trim(),
    clientName: elements.invoiceClientName.value.trim(),
    clientEmail: elements.invoiceClientEmail.value.trim(),
    invoiceDate: elements.invoiceDate.value,
    dueDate: elements.invoiceDueDate.value,
    lineItems,
    taxPercentage,
    status: elements.invoiceStatus.value,
    subtotal,
    totalAmount,
  };

  if (!payload.clientName || !payload.invoiceDate || !payload.dueDate || !lineItems.length) {
    showInvoiceError("Complete client details, invoice dates, and at least one line item.");
    return;
  }

  try {
    if (state.editingInvoiceId) {
      await apiFetch(`/api/invoices/${state.editingInvoiceId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/api/invoices", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await refreshWorkspaceData();
    setActiveView("invoices");
    resetInvoiceForm();
    showToast(isEditingInvoice ? "Invoice updated successfully" : "Invoice created successfully");
  } catch (error) {
    showInvoiceError(error.message);
    showToast(`Unable to save invoice. ${error.message}`, "error");
  }
}

function startEditingInvoice(invoice) {
  if (!invoice) {
    return;
  }

  state.editingInvoiceId = invoice.id;
  elements.invoiceClientName.value = invoice.clientName;
  elements.invoiceClientEmail.value = invoice.clientEmail;
  elements.invoiceDate.value = invoice.invoiceDate;
  elements.invoiceDueDate.value = invoice.dueDate;
  elements.invoiceStatus.value = invoice.status === "Overdue" ? "Sent" : invoice.status;
  elements.invoiceTaxPercentage.value = String(invoice.taxPercentage || 0);
  safeSetInnerHTML(elements.invoiceLineItems, "");
  invoice.lineItems.forEach((line) => addInvoiceLineItemRow(line));
  renderInvoiceNumberPreview();
  renderInvoiceTotals();
  hideInvoiceError();
  setActiveView("invoices");
}

async function handleInvoiceTableAction(event) {
  const button = event.target instanceof Element ? event.target.closest("[data-action]") : null;
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const invoice = state.invoices.find((item) => item.id === button.dataset.id);
  if (!invoice) {
    return;
  }

  const action = button.dataset.action;
  if (action === "edit-invoice") {
    startEditingInvoice(invoice);
    return;
  }

  if (action === "mark-paid-invoice") {
    try {
      await apiFetch(`/api/invoices/${invoice.id}/mark-paid`, { method: "POST" });
      await refreshWorkspaceData();
      setActiveView("invoices");
      showToast("Invoice marked as paid");
    } catch (error) {
      showToast(`Unable to mark invoice as paid. ${error.message}`, "error");
    }
    return;
  }

  if (action === "export-invoice") {
    exportInvoiceToPdf(invoice);
    return;
  }

  if (action === "delete-invoice") {
    const confirmed = await confirmDestructiveAction({
      eyebrow: "Delete Invoice",
      title: "Delete Invoice?",
      message: "Are you sure you want to delete this invoice?",
      confirmLabel: "Confirm Delete",
    });
    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
      await refreshWorkspaceData();
      if (state.editingInvoiceId === invoice.id) {
        resetInvoiceForm();
      }
      setActiveView("invoices");
      showToast("Invoice deleted successfully");
    } catch (error) {
      showToast(`Unable to delete invoice. ${error.message}`, "error");
    }
  }
}

function exportInvoiceToPdf(invoice) {
  const jsPDFConstructor = window.jspdf?.jsPDF;
  if (typeof jsPDFConstructor !== "function" || typeof jsPDFConstructor.API?.autoTable !== "function") {
    showToast("PDF export library failed to load. Refresh and try again.", "error");
    return;
  }

  const context = getPdfDocumentContext();
  const doc = new jsPDFConstructor({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });
  const marginX = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(appDisplayName, marginX, 34);
  doc.setFontSize(16);
  doc.text(`Invoice ${invoice.invoiceNumber}`, pageWidth - marginX, 34, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Company: ${context.companyName}`, marginX, 52);
  doc.text(`Workspace: ${context.workspaceName}`, marginX, 66);
  doc.text(`Client: ${invoice.clientName}`, marginX, 92);
  doc.text(`Status: ${invoice.status}`, pageWidth - marginX, 52, { align: "right" });
  doc.text(`Invoice Date: ${formatDate(invoice.invoiceDate)}`, pageWidth - marginX, 66, { align: "right" });
  doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, pageWidth - marginX, 80, { align: "right" });

  doc.autoTable({
    startY: 112,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: invoice.lineItems.map((line) => [
      line.description,
      String(line.quantity),
      formatPdfCurrency(line.unitPrice),
      formatPdfCurrency(line.amount),
    ]),
    foot: [
      ["Subtotal", "", "", formatPdfCurrency(invoice.subtotal)],
      ["Tax", "", "", `${invoice.taxPercentage}%`],
      ["Total", "", "", formatPdfCurrency(invoice.totalAmount)],
    ],
    margin: { left: marginX, right: marginX, bottom: 44 },
    columnStyles: buildNumericColumnStyles([1, 2, 3]),
    headStyles: { fillColor: [4, 120, 87], textColor: [255, 255, 255] },
    footStyles: { fillColor: [236, 253, 245], textColor: [6, 78, 59], fontStyle: "bold" },
  });

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated by LedgrAI", marginX, pageHeight - 20);
  doc.save(buildPdfFilename(`Invoice-${invoice.invoiceNumber}`, invoice.invoiceDate || getTodayDate()));
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

function handleStateSelectionInput() {
  const stateName = elements.companyState.value.trim();
  state.companySetup.stateProvince = stateName;
  state.companySetup.city = "";
  elements.companyCity.value = "";
  renderLocationOptions();
}

function handleCityInput() {
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
    id: "",
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
    invoices: "Invoices",
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

function exportSectionToPdf(reportKey) {
  const report = buildPrintableReport(reportKey);
  if (!report) {
    showToast("This report is not available for export.", "error");
    return;
  }

  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1200,height=900");
  if (!printWindow) {
    window.alert("Allow pop-ups to export this statement as PDF.");
    return;
  }

  const filename = buildPdfFilename(report.title, report.filenameDate);
  printWindow.document.write(buildPrintableReportDocument(report, filename));
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.document.title = filename;
    printWindow.print();
  };
}

function buildPrintableReport(reportKey) {
  const period = getPrintableReportPeriod(reportKey);
  const filteredEntries = getReportJournalEntries();

  if (reportKey === "trial-balance") {
    const report = buildTrialBalanceReport(filteredEntries);
    return {
      title: "Trial Balance",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      summaryHtml: buildPrintableSummaryGrid([
        { label: "Total Debits", value: currencyFormatter.format(report.totalDebits) },
        { label: "Total Credits", value: currencyFormatter.format(report.totalCredits) },
        { label: "Closing Debits", value: currencyFormatter.format(report.totalClosingDebits) },
        { label: "Closing Credits", value: currencyFormatter.format(report.totalClosingCredits) },
      ]),
      bodyHtml: buildPrintableTrialBalanceBody(report),
    };
  }

  if (reportKey === "income-statement") {
    const report = buildIncomeStatementReport(filteredEntries);
    return {
      title: "Income Statement",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      summaryHtml: buildPrintableSummaryGrid([
        { label: "Revenue", value: currencyFormatter.format(report.totalRevenue) },
        { label: "Gross Profit", value: currencyFormatter.format(report.grossProfit) },
        { label: "Operating Expenses", value: currencyFormatter.format(report.operatingExpenses) },
        { label: "Net Income", value: currencyFormatter.format(report.netIncome) },
      ]),
      bodyHtml: buildPrintableIncomeStatementBody(report),
    };
  }

  if (reportKey === "balance-sheet") {
    const report = buildBalanceSheetReport(filteredEntries);
    return {
      title: "Balance Sheet",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      summaryHtml: buildPrintableSummaryGrid([
        { label: "Total Assets", value: currencyFormatter.format(report.totalAssets) },
        { label: "Total Liabilities", value: currencyFormatter.format(report.totalLiabilities) },
        { label: "Total Equity", value: currencyFormatter.format(report.totalEquity) },
        { label: "Difference", value: currencyFormatter.format(report.difference) },
      ]),
      bodyHtml: buildPrintableBalanceSheetBody(report),
    };
  }

  if (reportKey === "cash-flow") {
    const report = buildCashFlowStatementReport(filteredEntries);
    return {
      title: "Cash Flow Statement",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      summaryHtml: buildPrintableSummaryGrid([
        { label: "Opening Cash", value: currencyFormatter.format(report.openingCash) },
        { label: "Net Movement", value: currencyFormatter.format(report.netCashMovement) },
        { label: "Closing Cash", value: currencyFormatter.format(report.closingCash) },
        { label: "Balance Check", value: currencyFormatter.format(report.balanceCheck) },
      ]),
      bodyHtml: buildPrintableCashFlowBody(report),
    };
  }

  if (reportKey === "ledger") {
    const visibleEntries = getReportJournalEntries({ includeSystemGenerated: false });
    const ledgers = buildGeneralLedger(filteredEntries).filter(
      (ledger) => ledger.lines.length > 1 || Math.abs(ledger.openingBalance) >= 0.005,
    );
    return {
      title: "General Ledger",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      summaryHtml: buildPrintableSummaryGrid([
        { label: "Accounts", value: String(ledgers.length) },
        { label: "Journal Entries", value: String(visibleEntries.length) },
        {
          label: "Posted Lines",
          value: String(visibleEntries.reduce((sum, entry) => sum + entry.lineItems.length, 0)),
        },
      ]),
      bodyHtml: buildPrintableLedgerBody(ledgers),
    };
  }

  return null;
}

function buildPrintableReportDocument(report, filename) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(filename)}</title>
        <style>
          :root {
            --brand: #047857;
            --brand-dark: #064e3b;
            --ink: #0f172a;
            --muted: #475569;
            --line: #d7dee7;
            --panel: #f8fafc;
          }
          * { box-sizing: border-box; }
          @page { size: A4; margin: 18mm 14mm 18mm; }
          body {
            margin: 0;
            color: var(--ink);
            font-family: Inter, Arial, sans-serif;
            font-size: 12px;
            line-height: 1.55;
            background: #ffffff;
          }
          .print-shell {
            display: grid;
            gap: 18px;
            padding-bottom: 20mm;
          }
          .print-header {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: flex-start;
            padding-bottom: 14px;
            border-bottom: 2px solid var(--brand);
          }
          .brand-lockup {
            display: flex;
            gap: 14px;
            align-items: center;
          }
          .brand-mark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--brand), var(--brand-dark));
            color: #ffffff;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.04em;
          }
          .brand-copy h1 {
            margin: 0 0 4px;
            font-size: 24px;
            line-height: 1.2;
          }
          .brand-copy p, .meta-block p, .company-meta p, .summary-card p, .report-note {
            margin: 0;
            color: var(--muted);
          }
          .meta-block {
            text-align: right;
          }
          .meta-block h2 {
            margin: 0 0 6px;
            font-size: 20px;
            line-height: 1.2;
          }
          .company-card, .summary-grid, .print-section {
            border: 1px solid var(--line);
            border-radius: 16px;
            background: #ffffff;
          }
          .company-card, .print-section {
            padding: 16px;
          }
          .company-card h3, .print-section h3 {
            margin: 0 0 8px;
            font-size: 15px;
          }
          .company-meta {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 18px;
          }
          .meta-label {
            display: block;
            margin-bottom: 2px;
            color: var(--muted);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            overflow: hidden;
          }
          .summary-card {
            padding: 14px 16px;
            background: var(--panel);
            border-right: 1px solid var(--line);
          }
          .summary-card:last-child {
            border-right: 0;
          }
          .summary-card strong {
            display: block;
            margin-top: 4px;
            font-size: 16px;
          }
          .report-table {
            width: 100%;
            border-collapse: collapse;
          }
          .report-table th, .report-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--line);
            vertical-align: top;
          }
          .report-table th {
            background: var(--panel);
            color: var(--muted);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-align: left;
          }
          .report-table td.numeric, .report-table th.numeric {
            text-align: right;
            white-space: nowrap;
          }
          .report-table tr.total-row td {
            font-weight: 800;
            background: #f0fdf4;
          }
          .report-table tr.section-row td {
            font-weight: 800;
            color: var(--brand-dark);
            background: #ecfdf5;
          }
          .report-section-stack {
            display: grid;
            gap: 14px;
          }
          .print-footer {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 6mm 14mm 0;
            border-top: 1px solid var(--line);
            background: #ffffff;
            color: var(--muted);
            font-size: 11px;
          }
          .print-page-number::after { content: counter(page); }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="print-shell">
          <header class="print-header">
            <div class="brand-lockup">
              <div class="brand-mark">LA</div>
              <div class="brand-copy">
                <h1>${escapeHtml(appDisplayName)}</h1>
                <p>AI accounting workspace</p>
              </div>
            </div>
            <div class="meta-block">
              <h2>${escapeHtml(report.title)}</h2>
              <p>${escapeHtml(report.periodLabel)}</p>
              <p>Generated ${escapeHtml(new Date().toLocaleString())}</p>
            </div>
          </header>
          ${buildPrintableCompanyCard()}
          ${report.summaryHtml}
          ${report.bodyHtml}
        </div>
        <footer class="print-footer">
          <span>Generated by LedgrAI</span>
          <span>Page <span class="print-page-number"></span></span>
        </footer>
      </body>
    </html>
  `;
}

function buildPrintableCompanyCard() {
  const company = state.companySetup;
  const activeCompany = getActiveCompany();
  const companyName = company.companyName || activeCompany?.name || "Unnamed Company";
  const companyLocation = [company.city, company.stateProvince, company.country].filter(Boolean).join(", ");
  const companyAddress = [company.address, companyLocation].filter(Boolean).join(", ");
  const currency = getCurrencyMeta(company.currency);

  return `
    <section class="company-card">
      <h3>${escapeHtml(companyName)}</h3>
      <div class="company-meta">
        <div>
          <span class="meta-label">Business Type</span>
          <p>${escapeHtml(company.businessType || "Not specified")}</p>
        </div>
        <div>
          <span class="meta-label">Industry</span>
          <p>${escapeHtml(company.industry || "Not specified")}</p>
        </div>
        <div>
          <span class="meta-label">Address</span>
          <p>${escapeHtml(companyAddress || "Not specified")}</p>
        </div>
        <div>
          <span class="meta-label">Contact</span>
          <p>${escapeHtml([company.phone, company.email].filter(Boolean).join(" | ") || "Not specified")}</p>
        </div>
        <div>
          <span class="meta-label">Reporting Currency</span>
          <p>${escapeHtml(currency ? `${currency.code} ${currency.symbol} | ${currency.name}` : company.currency || "NGN")}</p>
        </div>
        <div>
          <span class="meta-label">Financial Year Start</span>
          <p>${escapeHtml(company.financialYearStart ? formatDate(company.financialYearStart) : "Not specified")}</p>
        </div>
      </div>
    </section>
  `;
}

function buildPrintableSummaryGrid(items) {
  const rows = (Array.isArray(items) ? items : [])
    .filter((item) => item && item.label)
    .map(
      (item) => `
        <section class="summary-card">
          <p>${escapeHtml(item.label)}</p>
          <strong>${escapeHtml(item.value || "—")}</strong>
        </section>
      `,
    )
    .join("");

  return rows ? `<section class="summary-grid">${rows}</section>` : "";
}

function buildPrintableTrialBalanceBody(report) {
  return `
    <section class="print-section">
      <h3>Trial Balance</h3>
      <table class="report-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Account Name</th>
            <th>Type</th>
            <th class="numeric">Total Debits</th>
            <th class="numeric">Total Credits</th>
            <th class="numeric">Closing Debit</th>
            <th class="numeric">Closing Credit</th>
          </tr>
        </thead>
        <tbody>
          ${
            report.rows.length
              ? report.rows
                  .map(
                    (row) => `
                      <tr>
                        <td>${escapeHtml(row.account.code)}</td>
                        <td>${escapeHtml(row.account.name)}</td>
                        <td>${escapeHtml(row.account.type)}</td>
                        <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalDebits))}</td>
                        <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalCredits))}</td>
                        <td class="numeric">${escapeHtml(currencyFormatter.format(row.closingDebit))}</td>
                        <td class="numeric">${escapeHtml(currencyFormatter.format(row.closingCredit))}</td>
                      </tr>
                    `,
                  )
                  .join("")
              : '<tr><td colspan="7">No trial balance data available for this company.</td></tr>'
          }
          <tr class="total-row">
            <td colspan="3">Totals</td>
            <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalDebits))}</td>
            <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalCredits))}</td>
            <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingDebits))}</td>
            <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingCredits))}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `;
}

function buildPrintableIncomeStatementBody(report) {
  return `
    <section class="print-section">
      <h3>Income Statement</h3>
      <div class="report-section-stack">
        ${buildPrintableSectionTable("Revenue", report.revenueAccounts, "Revenue Total", report.totalRevenue)}
        ${buildPrintableSectionTable("Operating Expenses", report.expenseAccounts, "Operating Expenses Total", report.operatingExpenses)}
        <table class="report-table">
          <tbody>
            <tr class="total-row">
              <td>Gross Profit</td>
              <td class="numeric">${escapeHtml(currencyFormatter.format(report.grossProfit))}</td>
            </tr>
            <tr class="total-row">
              <td>Net Income / Loss</td>
              <td class="numeric">${escapeHtml(currencyFormatter.format(report.netIncome))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function buildPrintableBalanceSheetBody(report) {
  return `
    <section class="print-section">
      <h3>Balance Sheet</h3>
      <div class="report-section-stack">
        ${buildPrintableSectionTable("Assets", report.assetAccounts, "Total Assets", report.totalAssets)}
        ${buildPrintableSectionTable("Liabilities", report.liabilityAccounts, "Total Liabilities", report.totalLiabilities)}
        ${buildPrintableSectionTable(
          "Equity",
          [
            ...report.equityAccounts,
            {
              account: { name: "Retained Earnings" },
              amount: report.retainedEarnings,
            },
          ],
          "Total Equity",
          report.totalEquity,
        )}
      </div>
    </section>
  `;
}

function buildPrintableCashFlowBody(report) {
  return `
    <section class="print-section">
      <h3>Cash Flow Statement</h3>
      <div class="report-section-stack">
        ${buildPrintableLineItemTable("Operating Activities", report.operatingItems, "Net Cash from Operating Activities", report.operatingTotal)}
        ${buildPrintableLineItemTable("Investing Activities", report.investingItems, "Net Cash from Investing Activities", report.investingTotal)}
        ${buildPrintableLineItemTable("Financing Activities", report.financingItems, "Net Cash from Financing Activities", report.financingTotal)}
        <table class="report-table">
          <tbody>
            <tr class="total-row">
              <td>Net Cash Movement</td>
              <td class="numeric">${escapeHtml(currencyFormatter.format(report.netCashMovement))}</td>
            </tr>
            <tr class="total-row">
              <td>Closing Cash</td>
              <td class="numeric">${escapeHtml(currencyFormatter.format(report.closingCash))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function buildPrintableLedgerBody(ledgers) {
  if (!ledgers.length) {
    return `
      <section class="print-section">
        <h3>General Ledger</h3>
        <p>No ledger activity available for this company.</p>
      </section>
    `;
  }

  return `
    <div class="report-section-stack">
      ${ledgers
        .map(
          (ledger) => `
            <section class="print-section no-break">
              <h3>${escapeHtml(ledger.account.code)} - ${escapeHtml(ledger.account.name)}</h3>
              <p class="report-note">${escapeHtml(ledger.account.type)} account</p>
              <table class="report-table">
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
                          <td class="numeric">${escapeHtml(line.debit ? currencyFormatter.format(line.debit) : "—")}</td>
                          <td class="numeric">${escapeHtml(line.credit ? currencyFormatter.format(line.credit) : "—")}</td>
                          <td class="numeric">${escapeHtml(formatLedgerBalance(line.runningBalance, ledger.account.type))}</td>
                        </tr>
                      `,
                    )
                    .join("")}
                  <tr class="total-row">
                    <td colspan="4">Closing Balance</td>
                    <td class="numeric">${escapeHtml(formatLedgerBalance(ledger.closingBalance, ledger.account.type))}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildPrintableSectionTable(title, rows, totalLabel, totalAmount) {
  return `
    <table class="report-table">
      <tbody>
        <tr class="section-row">
          <td>${escapeHtml(title)}</td>
          <td class="numeric">Amount</td>
        </tr>
        ${
          Array.isArray(rows) && rows.length
            ? rows
                .map(
                  (row) => `
                    <tr>
                      <td>${escapeHtml(row.account?.name || "Untitled")}</td>
                      <td class="numeric">${escapeHtml(currencyFormatter.format(row.amount || 0))}</td>
                    </tr>
                  `,
                )
                .join("")
            : `<tr><td colspan="2">No data available.</td></tr>`
        }
        <tr class="total-row">
          <td>${escapeHtml(totalLabel)}</td>
          <td class="numeric">${escapeHtml(currencyFormatter.format(totalAmount || 0))}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function buildPrintableLineItemTable(title, rows, totalLabel, totalAmount) {
  return `
    <table class="report-table">
      <tbody>
        <tr class="section-row">
          <td>${escapeHtml(title)}</td>
          <td class="numeric">Amount</td>
        </tr>
        ${
          Array.isArray(rows) && rows.length
            ? rows
                .map(
                  (row) => `
                    <tr>
                      <td>${escapeHtml(row.label || "Untitled")}</td>
                      <td class="numeric">${escapeHtml(currencyFormatter.format(row.amount || 0))}</td>
                    </tr>
                  `,
                )
                .join("")
            : `<tr><td colspan="2">No data available.</td></tr>`
        }
        <tr class="total-row">
          <td>${escapeHtml(totalLabel)}</td>
          <td class="numeric">${escapeHtml(currencyFormatter.format(totalAmount || 0))}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function getPrintableReportPeriod(reportKey) {
  const descriptor = getReportDateRangeDescriptor();
  return {
    label: `Reporting Period: ${descriptor.label}`,
    filenameDate: descriptor.filenameDate,
  };
}

function exportSectionToPdf(reportKey) {
  const report = buildPdfReport(reportKey);
  if (!report) {
    showToast("This report is not available for export.", "error");
    return;
  }

  const jsPDFConstructor = window.jspdf?.jsPDF;
  if (typeof jsPDFConstructor !== "function" || typeof jsPDFConstructor.API?.autoTable !== "function") {
    showToast("PDF export library failed to load. Refresh and try again.", "error");
    return;
  }

  const context = getPdfDocumentContext();
  const doc = new jsPDFConstructor({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: true,
  });
  const filename = buildPdfFilename(report.title, report.filenameDate);
  const marginX = 40;
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerY = pageHeight - 20;
  let cursorY = 118;

  doc.setProperties({
    title: report.title,
    subject: `${report.title} generated by ${appDisplayName}`,
    author: appDisplayName,
    creator: appDisplayName,
  });

  const drawPageChrome = (pageNumber) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setPage(pageNumber);

    doc.setDrawColor(4, 120, 87);
    doc.setLineWidth(1.2);
    doc.line(marginX, 72, pageWidth - marginX, 72);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.setFontSize(18);
    doc.text(appDisplayName, marginX, 34);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(10);
    doc.text(`Company: ${context.companyName}`, marginX, 50);
    doc.text(`Workspace: ${context.workspaceName}`, marginX, 64);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text(report.title, pageWidth - marginX, 34, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(10);
    doc.text(report.periodLabel, pageWidth - marginX, 50, { align: "right" });
    doc.text(`Generated: ${context.generatedAt}`, pageWidth - marginX, 64, { align: "right" });

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.8);
    doc.line(marginX, footerY - 10, pageWidth - marginX, footerY - 10);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Generated by LedgrAI", marginX, footerY);
    doc.text(`Page ${pageNumber}`, pageWidth - marginX, footerY, { align: "right" });
  };

  const ensureSectionSpace = (height = 40) => {
    if (cursorY + height <= pageHeight - 60) {
      return;
    }
    doc.addPage();
    cursorY = 118;
  };

  drawPageChrome(1);

  report.tables.forEach((table) => {
    ensureSectionSpace(50);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(table.title, marginX, cursorY);

    doc.autoTable({
      startY: cursorY + 10,
      head: [table.columns],
      body: table.rows.length ? table.rows : [buildPdfEmptyRow(table.columns.length)],
      foot: table.footer ? [table.footer] : undefined,
      margin: { top: 84, right: marginX, bottom: 38, left: marginX },
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 6,
        lineColor: [226, 232, 240],
        lineWidth: 0.5,
        textColor: [15, 23, 42],
      },
      headStyles: {
        fillColor: [4, 120, 87],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      footStyles: {
        fillColor: [236, 253, 245],
        textColor: [6, 78, 59],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: table.columnStyles || {},
      pageBreak: "auto",
      rowPageBreak: "auto",
    });

    cursorY = doc.lastAutoTable.finalY + 18;
  });

  for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber += 1) {
    drawPageChrome(pageNumber);
  }

  doc.save(filename);
}

function buildPdfReport(reportKey) {
  const period = getPrintableReportPeriod(reportKey);
  const filteredEntries = getReportJournalEntries();

  if (reportKey === "trial-balance") {
    const report = buildTrialBalanceReport(filteredEntries);
    return {
      title: "Trial Balance",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      tables: [
        {
          title: "Trial Balance",
          columns: [
            "Code",
            "Account Name",
            "Type",
            "Total Debits",
            "Total Credits",
            "Closing Debit",
            "Closing Credit",
          ],
          rows: report.rows.map((row) => [
            row.account.code,
            row.account.name,
            row.account.type,
            formatPdfCurrency(row.totalDebits),
            formatPdfCurrency(row.totalCredits),
            row.closingDebit > 0 ? formatPdfCurrency(row.closingDebit) : "-",
            row.closingCredit > 0 ? formatPdfCurrency(row.closingCredit) : "-",
          ]),
          footer: [
            "Totals",
            "",
            "",
            formatPdfCurrency(report.totalDebits),
            formatPdfCurrency(report.totalCredits),
            formatPdfCurrency(report.totalClosingDebits),
            formatPdfCurrency(report.totalClosingCredits),
          ],
          columnStyles: buildNumericColumnStyles([3, 4, 5, 6]),
        },
      ],
    };
  }

  if (reportKey === "income-statement") {
    const report = buildIncomeStatementReport(filteredEntries);
    return {
      title: "Income Statement",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      tables: [
        buildPdfAmountTable("Revenue", report.revenueAccounts, "Revenue Total", report.totalRevenue),
        buildPdfAmountTable(
          "Operating Expenses",
          report.expenseAccounts,
          "Operating Expenses Total",
          report.operatingExpenses,
        ),
        {
          title: "Income Statement Summary",
          columns: ["Metric", "Amount"],
          rows: [
            ["Total Revenue", formatPdfCurrency(report.totalRevenue)],
            ["Gross Profit", formatPdfCurrency(report.grossProfit)],
            ["Operating Expenses", formatPdfCurrency(report.operatingExpenses)],
            [report.netIncome >= 0 ? "Net Income" : "Net Loss", formatPdfCurrency(report.netIncome)],
          ],
          columnStyles: buildNumericColumnStyles([1]),
        },
      ],
    };
  }

  if (reportKey === "balance-sheet") {
    const report = buildBalanceSheetReport(filteredEntries);
    return {
      title: "Balance Sheet",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      tables: [
        buildPdfBalanceSheetSectionTable("Current Assets", "currentAssets", report.currentAssetAccounts),
        buildPdfBalanceSheetSectionTable("Non-Current Assets", "nonCurrentAssets", report.nonCurrentAssetAccounts),
        buildPdfBalanceSheetSectionTable("Current Liabilities", "currentLiabilities", report.currentLiabilityAccounts),
        buildPdfBalanceSheetSectionTable(
          "Non-Current Liabilities",
          "nonCurrentLiabilities",
          report.nonCurrentLiabilityAccounts,
        ),
        buildPdfBalanceSheetSectionTable(
          "Equity",
          "equity",
          [
            ...report.equityAccounts,
            {
              account: { name: "Retained Earnings (Net Income)" },
              amount: report.retainedEarnings,
            },
          ],
        ),
        {
          title: "Balance Sheet Summary",
          columns: ["Metric", "Amount"],
          rows: [
            ["Total Assets", formatPdfCurrency(report.totalAssets)],
            ["Total Liabilities", formatPdfCurrency(report.totalLiabilities)],
            ["Total Equity", formatPdfCurrency(report.totalEquity)],
            [
              "Total Liabilities + Equity",
              formatPdfCurrency(report.totalLiabilities + report.totalEquity),
            ],
            ["Balance Difference", formatPdfCurrency(report.difference)],
            ["Status", report.isBalanced ? "Balanced" : "Not Balanced"],
          ],
          columnStyles: buildNumericColumnStyles([1]),
        },
      ],
    };
  }

  if (reportKey === "cash-flow") {
    const report = buildCashFlowStatementReport(filteredEntries);
    return {
      title: "Cash Flow Statement",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      tables: [
        buildPdfLineItemTable(
          "Operating Activities",
          report.operatingItems,
          "Net Cash From Operating Activities",
          report.operatingTotal,
        ),
        buildPdfLineItemTable(
          "Investing Activities",
          report.investingItems,
          "Net Cash From Investing Activities",
          report.investingTotal,
        ),
        buildPdfLineItemTable(
          "Financing Activities",
          report.financingItems,
          "Net Cash From Financing Activities",
          report.financingTotal,
        ),
        {
          title: "Cash Flow Summary",
          columns: ["Metric", "Amount"],
          rows: [
            ["Opening Cash Balance", formatPdfCurrency(report.openingCash)],
            ["Net Cash From Operating Activities", formatPdfCurrency(report.operatingTotal)],
            ["Net Cash From Investing Activities", formatPdfCurrency(report.investingTotal)],
            ["Net Cash From Financing Activities", formatPdfCurrency(report.financingTotal)],
            ["Net Cash Movement", formatPdfCurrency(report.netCashMovement)],
            ["Closing Cash Balance", formatPdfCurrency(report.closingCash)],
            ["Balance Check", formatPdfCurrency(report.balanceCheck)],
          ],
          columnStyles: buildNumericColumnStyles([1]),
        },
      ],
    };
  }

  if (reportKey === "ledger") {
    const ledgers = buildGeneralLedger(filteredEntries).filter(
      (ledger) => ledger.lines.length > 1 || Math.abs(ledger.openingBalance) >= 0.005,
    );
    return {
      title: "General Ledger",
      periodLabel: period.label,
      filenameDate: period.filenameDate,
      tables: ledgers.length
        ? ledgers.map((ledger) => ({
            title: `${ledger.account.code} - ${ledger.account.name}`,
            columns: ["Date", "Description", "Debit", "Credit", "Running Balance"],
            rows: ledger.lines.map((line) => [
              line.date,
              line.description,
              line.debit > 0 ? formatPdfCurrency(line.debit) : "-",
              line.credit > 0 ? formatPdfCurrency(line.credit) : "-",
              formatLedgerBalance(line.runningBalance, ledger.account.type),
            ]),
            footer: ["", "Closing Balance", "", "", formatLedgerBalance(ledger.closingBalance, ledger.account.type)],
            columnStyles: buildNumericColumnStyles([2, 3, 4]),
          }))
        : [
            {
              title: "General Ledger",
              columns: ["Message"],
              rows: [["No ledger activity available for this company."]],
            },
          ],
    };
  }

  return null;
}

function getPdfDocumentContext() {
  const company = state.companySetup;
  const activeCompany = getActiveCompany();

  return {
    companyName: company.companyName || activeCompany?.name || "Unnamed Company",
    workspaceName: activeCompany?.name || company.companyName || "No active workspace",
    generatedAt: new Date().toLocaleString(),
  };
}

function formatPdfCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function buildNumericColumnStyles(columnIndexes) {
  return (Array.isArray(columnIndexes) ? columnIndexes : []).reduce((styles, columnIndex) => {
    styles[columnIndex] = { halign: "right" };
    return styles;
  }, {});
}

function buildPdfEmptyRow(columnCount) {
  return [
    {
      content: "No transactions recorded for this period.",
      colSpan: Math.max(1, Number(columnCount) || 1),
      styles: {
        halign: "center",
        textColor: [100, 116, 139],
        fontStyle: "italic",
      },
    },
  ];
}

function buildPdfAmountTable(title, rows, totalLabel, totalAmount) {
  return {
    title,
    columns: ["Account", "Amount"],
    rows: Array.isArray(rows)
      ? rows.map((row) => [row.account?.name || "Untitled", formatPdfCurrency(row.amount || 0)])
      : [],
    footer: [totalLabel, formatPdfCurrency(totalAmount || 0)],
    columnStyles: buildNumericColumnStyles([1]),
  };
}

function buildPdfLineItemTable(title, rows, totalLabel, totalAmount) {
  return {
    title,
    columns: ["Line Item", "Amount"],
    rows: Array.isArray(rows)
      ? rows.map((row) => [row.label || "Untitled", formatPdfCurrency(row.amount || 0)])
      : [],
    footer: [totalLabel, formatPdfCurrency(totalAmount || 0)],
    columnStyles: buildNumericColumnStyles([1]),
  };
}

function buildPdfBalanceSheetSectionTable(title, sectionKey, rows) {
  const sectionRows = Array.isArray(rows) ? rows : [];
  const subtotal = sectionRows.reduce((sum, row) => sum + (row.amount || 0), 0);
  const expanded = Boolean(state.balanceSheetSections[sectionKey]);

  return {
    title: expanded ? title : `${title} (Collapsed in workspace)`,
    columns: ["Account", "Amount"],
    rows: expanded
      ? sectionRows.length
        ? sectionRows.map((row) => [row.account?.name || "Untitled", formatPdfCurrency(row.amount || 0)])
        : []
      : [["Section subtotal only is visible on screen.", formatPdfCurrency(subtotal)]],
    footer: [`${title} Total`, formatPdfCurrency(subtotal)],
    columnStyles: buildNumericColumnStyles([1]),
  };
}

function buildPdfFilename(reportTitle, dateValue) {
  const context = getPdfDocumentContext();
  const companyName = sanitizeFilenameSegment(context.companyName || "LedgrAI");
  const titleName = sanitizeFilenameSegment(reportTitle);
  const dateName = formatFilenameMonthYear(dateValue || getTodayDate());
  return `${companyName}-${titleName}-${dateName}.pdf`;
}

function sanitizeFilenameSegment(value) {
  const cleaned = String(value || "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim();
  if (!cleaned) {
    return "Report";
  }

  return cleaned
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function formatFilenameMonthYear(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Report-Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  })
    .format(date)
    .replace(/\s+/g, "-");
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
  const accountsStatus = state.requestStatus.accounts;
  if (accountsStatus.loading) {
    elements.accountsTableWrapper.classList.add("hidden");
    elements.accountsEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.accountsStatus, {
      visible: true,
      tone: "loading",
      title: "Loading accounts",
      message: "Fetching your chart of accounts.",
      showSpinner: true,
    });
    return;
  }

  if (accountsStatus.error) {
    elements.accountsTableWrapper.classList.add("hidden");
    elements.accountsEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.accountsStatus, {
      visible: true,
      tone: "error",
      title: "Accounts unavailable",
      message: accountsStatus.error,
    });
    return;
  }

  const visibleAccounts = getVisibleAccounts();
  elements.accountsTableWrapper.classList.remove("hidden");
  renderSectionFeedback(elements.accountsStatus, { visible: false });
  safeSetInnerHTML(elements.accountsTableBody, "");

  if (visibleAccounts.length === 0) {
    elements.accountsTableWrapper.classList.add("hidden");
    safeSetInnerHTML(
      elements.accountsEmptyState,
      `
        <h3>No accounts yet</h3>
        <p>No accounts yet. Add your first account to get started.</p>
      `,
    );
    elements.accountsEmptyState.classList.remove("hidden");
    return;
  }

  elements.accountsEmptyState.classList.add("hidden");

  const sortedAccounts = [...visibleAccounts].sort((left, right) => {
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
  const journalStatus = state.requestStatus.journal;
  if (journalStatus.loading) {
    elements.journalTableWrapper.classList.add("hidden");
    elements.journalEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.journalStatus, {
      visible: true,
      tone: "loading",
      title: "Loading journal entries",
      message: "Fetching your latest posted activity.",
      showSpinner: true,
    });
    return;
  }

  if (journalStatus.error) {
    elements.journalTableWrapper.classList.add("hidden");
    elements.journalEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.journalStatus, {
      visible: true,
      tone: "error",
      title: "Journal unavailable",
      message: journalStatus.error,
    });
    return;
  }

  const visibleEntries = getReportJournalEntries({ includeSystemGenerated: false });
  elements.journalTableWrapper.classList.remove("hidden");
  renderSectionFeedback(elements.journalStatus, { visible: false });
  safeSetInnerHTML(elements.journalTableBody, "");

  if (visibleEntries.length === 0) {
    elements.journalTableWrapper.classList.add("hidden");
    safeSetInnerHTML(
      elements.journalEmptyState,
      getVisibleJournalEntries().length
        ? `
            <h3>No journal entries for this period</h3>
            <p>No journal entries fall within the selected date range.</p>
          `
        : `
            <h3>No journal entries yet</h3>
            <p>No journal entries yet. Add your first journal entry to get started.</p>
          `,
    );
    elements.journalEmptyState.classList.remove("hidden");
    return;
  }

  elements.journalEmptyState.classList.add("hidden");

  const sortedEntries = [...visibleEntries].sort((left, right) => {
    return new Date(right.date) - new Date(left.date);
  });

  sortedEntries.forEach((entry) => {
    const totals = calculateLineTotals(entry.lineItems);
    const invoiceGenerated = entry.sourceType === "invoice";
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
              entry.systemGenerated || invoiceGenerated
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
        <span class="status-badge ${entry.systemGenerated || invoiceGenerated ? "balanced" : totals.balanced ? "balanced" : "unbalanced"}">
          ${entry.systemGenerated ? "System" : invoiceGenerated ? "Invoice" : totals.balanced ? "Balanced" : "Unbalanced"}
        </span>
      </td>
      <td>
        <div class="table-actions">
          ${
            entry.systemGenerated || invoiceGenerated
              ? `<span class="ledger-note">${invoiceGenerated ? "Managed from invoice" : "Managed automatically"}</span>`
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
  const visibleAccounts = getVisibleAccounts();
  const visibleEntries = getVisibleJournalEntries();
  const totalBalance = visibleAccounts.reduce(
    (sum, account) => sum + (Number(account.openingBalance) || 0),
    0,
  );
  const totalJournalLines = visibleEntries.reduce(
    (sum, entry) => sum + entry.lineItems.length,
    0,
  );

  elements.totalAccounts.textContent = String(visibleAccounts.length);
  elements.totalBalance.textContent = currencyFormatter.format(totalBalance);
  elements.totalJournalEntries.textContent = String(visibleEntries.length);
  elements.totalJournalLines.textContent = String(totalJournalLines);
}

function renderGeneralLedger() {
  const ledgerStatus = state.requestStatus.ledger;
  if (ledgerStatus.loading) {
    elements.ledgerList.classList.add("hidden");
    elements.ledgerEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.ledgerStatus, {
      visible: true,
      tone: "loading",
      title: "Loading general ledger",
      message: "Calculating running balances for each account.",
      showSpinner: true,
    });
    return;
  }

  if (ledgerStatus.error) {
    elements.ledgerList.classList.add("hidden");
    elements.ledgerEmptyState.classList.add("hidden");
    renderSectionFeedback(elements.ledgerStatus, {
      visible: true,
      tone: "error",
      title: "General ledger unavailable",
      message: ledgerStatus.error,
    });
    return;
  }

  const visibleAccounts = getVisibleAccounts();
  const filteredEntries = getReportJournalEntries();
  elements.ledgerList.classList.remove("hidden");
  renderSectionFeedback(elements.ledgerStatus, { visible: false });
  safeSetInnerHTML(elements.ledgerList, "");

  if (visibleAccounts.length === 0) {
    elements.ledgerList.classList.add("hidden");
    safeSetInnerHTML(
      elements.ledgerEmptyState,
      `
        <h3>No ledger activity yet</h3>
        <p>No ledger activity yet. Add accounts and journal entries to get started.</p>
      `,
    );
    elements.ledgerEmptyState.classList.remove("hidden");
    return;
  }

  elements.ledgerEmptyState.classList.add("hidden");

  const ledgers = buildGeneralLedger(filteredEntries).filter(
    (ledger) => ledger.lines.length > 1 || Math.abs(ledger.openingBalance) >= 0.005,
  );

  if (ledgers.length === 0) {
    elements.ledgerList.classList.add("hidden");
    safeSetInnerHTML(
      elements.ledgerEmptyState,
      `
        <h3>No ledger activity for this period</h3>
        <p>No transactions fall within the selected date range.</p>
      `,
    );
    elements.ledgerEmptyState.classList.remove("hidden");
    return;
  }

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

  const report = buildTrialBalanceReport(getReportJournalEntries());
  const hasReportData = report.rows.some((row) => {
    return row.totalDebits > 0 || row.totalCredits > 0 || row.closingDebit > 0 || row.closingCredit > 0;
  });

  if (state.accounts.length === 0) {
    elements.trialBalanceEmptyState.classList.remove("hidden");
    return;
  }

  if (!hasReportData) {
    safeSetInnerHTML(
      elements.trialBalanceEmptyState,
      `
        <h3>No trial balance data for this period</h3>
        <p>No balances fall within the selected date range.</p>
      `,
    );
    elements.trialBalanceEmptyState.classList.remove("hidden");
    return;
  }

  elements.trialBalanceEmptyState.classList.add("hidden");

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

  const report = buildIncomeStatementReport(getReportJournalEntries());

  if (report.revenueAccounts.length === 0 && report.expenseAccounts.length === 0) {
    safeSetInnerHTML(
      elements.incomeStatementEmptyState,
      `
        <h3>No income statement activity for this period</h3>
        <p>No revenue or expense transactions fall within the selected date range.</p>
      `,
    );
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

  const report = buildBalanceSheetReport(getReportJournalEntries());

  if (
    report.assetAccounts.length === 0 &&
    report.liabilityAccounts.length === 0 &&
    report.equityAccounts.length === 0 &&
    Math.abs(report.retainedEarnings) < 0.005
  ) {
    safeSetInnerHTML(
      elements.balanceSheetEmptyState,
      `
        <h3>No balance sheet data for this period</h3>
        <p>No balances fall within the selected date range.</p>
      `,
    );
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

  const report = buildCashFlowStatementReport(getReportJournalEntries());

  if (!report.hasCashAccounts) {
    safeSetInnerHTML(
      elements.cashFlowEmptyState,
      `
        <h3>No cash flow data for this period</h3>
        <p>Add a cash account and post transactions within the selected date range to generate this statement.</p>
      `,
    );
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
    showToast("Opening Balance Equity is system-managed and cannot be edited or deleted.", "error");
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
      showToast("This account is used in journal entries and cannot be deleted until those entries are updated.", "error");
      return;
    }

    const confirmed = await confirmDestructiveAction({
      eyebrow: "Delete Account",
      title: "Delete Account?",
      message: "Are you sure you want to delete this account? This action cannot be undone.",
      confirmLabel: "Confirm Delete",
    });
    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/api/accounts/${id}`, { method: "DELETE" });
      await refreshWorkspaceData();
      render();
      showToast("Account deleted successfully");
    } catch (error) {
      showToast(`Unable to delete account. ${error.message}`, "error");
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

  if ((entry?.systemGenerated || entry?.sourceType === "invoice") && action !== "cancel-journal-description") {
    showToast(
      entry?.sourceType === "invoice"
        ? "This journal entry is managed from an invoice and cannot be edited here."
        : "This opening balance entry is system-generated and cannot be edited or deleted.",
      "error",
    );
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
      showToast("Journal entry description cannot be empty.", "error");
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
      showToast("Journal entry updated successfully");
    } catch (error) {
      showToast(`Unable to update journal entry. ${error.message}`, "error");
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

    const confirmed = await confirmDestructiveAction({
      eyebrow: "Delete Journal Entry",
      title: "Delete Journal Entry?",
      message:
        "Are you sure you want to delete this journal entry? This will also remove any linked invoice journal entries.",
      confirmLabel: "Confirm Delete",
    });
    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/api/journal-entries/${id}`, { method: "DELETE" });
      await refreshWorkspaceData();
      render();
      showToast("Journal entry deleted successfully");
    } catch (error) {
      showToast(`Unable to delete journal entry. ${error.message}`, "error");
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
    const isEditingAccount = Boolean(state.editingAccountId);
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
    showToast(isEditingAccount ? "Account updated successfully" : "Account created successfully");
  } catch (error) {
    showAccountError(error.message);
    showToast(`Unable to save account. ${error.message}`, "error");
  }
}

function openJournalDialog(entry) {
  if (getVisibleAccounts().length === 0) {
    showToast("Add at least one account before recording a journal entry.", "error");
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
    const isEditingJournal = Boolean(state.editingJournalId);
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
    showToast(isEditingJournal ? "Journal entry updated successfully" : "Journal entry created successfully");
  } catch (error) {
    showJournalError(error.message);
    showToast(`Unable to save journal entry. ${error.message}`, "error");
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

function buildGeneralLedger(journalEntries = state.journalEntries) {
  const sortedAccounts = [...state.accounts].sort((left, right) =>
    left.code.localeCompare(right.code, undefined, { numeric: true }),
  );

  return sortedAccounts.map((account) => {
    const openingBalance = Number(account.openingBalance) || 0;
    let runningBalance = openingBalance;

    const transactions = journalEntries
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

function buildTrialBalanceReport(journalEntries = state.journalEntries) {
  const rows = [...state.accounts]
    .sort((left, right) => left.code.localeCompare(right.code, undefined, { numeric: true }))
    .map((account) => {
      const postingTotals = journalEntries
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

function buildIncomeStatementReport(journalEntries = state.journalEntries) {
  const accountSummaries = state.accounts.map((account) => {
    const postingTotals = getPostingTotalsForAccount(account.id, journalEntries);
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

function buildBalanceSheetReport(journalEntries = state.journalEntries) {
  const incomeStatement = buildIncomeStatementReport(journalEntries);
  const accountSummaries = state.accounts
    .map((account) => {
      const postingTotals = getPostingTotalsForAccount(account.id, journalEntries);
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

function buildCashFlowStatementReport(journalEntries = state.journalEntries) {
  const incomeStatement = buildIncomeStatementReport(journalEntries);
  const cashAccounts = state.accounts.filter((account) => isCashAccount(account));
  const hasCashAccounts = cashAccounts.length > 0;
  const openingCash = cashAccounts.reduce(
    (sum, account) => sum + (Number(account.openingBalance) || 0),
    0,
  );
  const cashNetChange = cashAccounts.reduce((sum, account) => {
    const postingTotals = getPostingTotalsForAccount(account.id, journalEntries);
    return sum + postingTotals.debits - postingTotals.credits;
  }, 0);
  const closingCash = openingCash + cashNetChange;

  const accountMovements = buildAccountMovementMap(journalEntries);
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

function getPostingTotalsForAccount(accountId, journalEntries = state.journalEntries) {
  return journalEntries
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

function buildAccountMovementMap(journalEntries = state.journalEntries) {
  return state.accounts.reduce((map, account) => {
    const postingTotals = getPostingTotalsForAccount(account.id, journalEntries);
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
  const activeCompany = getActiveCompany();

  return {
    generatedAt: new Date().toISOString(),
    appName: appDisplayName,
    activeCompany: activeCompany
      ? {
          id: activeCompany.id,
          name: activeCompany.name,
          currency: activeCompany.currency,
        }
      : null,
    companySetup: {
      id: state.companySetup.id,
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
