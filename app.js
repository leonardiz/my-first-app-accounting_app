const accountStorageKey = "chart-of-accounts-records";
const journalStorageKey = "chart-of-accounts-journal-entries";
const companySetupStorageKey = "ledgrai-company-setup";
const openingBalanceEquityCode = "3000";
const openingBalanceEquityName = "Opening Balance Equity";
const openingBalanceEquityType = "Equity";
const systemOpeningBalanceEntryKey = "system-opening-balance-equity";
const appDisplayName = "LedgrAI";
const defaultBrandEyebrow = "AI Accounting";

const defaultAccounts = [
  {
    id: crypto.randomUUID(),
    code: "1000",
    name: "Cash at Bank",
    type: "Asset",
    openingBalance: 25000,
  },
  {
    id: crypto.randomUUID(),
    code: "2000",
    name: "Accounts Payable",
    type: "Liability",
    openingBalance: 8200,
  },
  {
    id: crypto.randomUUID(),
    code: "4000",
    name: "Service Revenue",
    type: "Revenue",
    openingBalance: 12500,
  },
];

let currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
});

const state = {
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
  onboardingStepIndex: 0,
  balanceSheetSections: {
    currentAssets: true,
    nonCurrentAssets: true,
    currentLiabilities: true,
    nonCurrentLiabilities: true,
    equity: true,
  },
};

const elements = {
  appShell: document.querySelector(".app-shell"),
  sidebar: document.querySelector("#sidebar"),
  sidebarToggle: document.querySelector("#sidebar-toggle"),
  brandNames: [...document.querySelectorAll("[data-brand-name]")],
  brandEyebrows: [...document.querySelectorAll("[data-brand-eyebrow]")],
  pageTitle: document.querySelector("[data-page-title]"),
  navItems: [...document.querySelectorAll("[data-view-target]")],
  viewPanels: [...document.querySelectorAll("[data-view]")],
  companySetupForm: document.querySelector("#company-setup-form"),
  companyName: document.querySelector("#company-name"),
  companyIndustry: document.querySelector("#company-industry"),
  companyBusinessType: document.querySelector("#company-business-type"),
  companyAddress: document.querySelector("#company-address"),
  companyPhone: document.querySelector("#company-phone"),
  companyEmail: document.querySelector("#company-email"),
  currencyToggle: document.querySelector("#currency-toggle"),
  currencyOptions: [...document.querySelectorAll("[data-currency]")],
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
  incomeTotalRevenue: document.querySelector("#income-total-revenue"),
  incomeGrossProfit: document.querySelector("#income-gross-profit"),
  incomeOperatingExpenses: document.querySelector("#income-operating-expenses"),
  incomeNetIncome: document.querySelector("#income-net-income"),
  incomeRevenueList: document.querySelector("#income-revenue-list"),
  incomeExpenseList: document.querySelector("#income-expense-list"),
  incomeSummaryBody: document.querySelector("#income-summary-body"),
  incomeStatementEmptyState: document.querySelector("#income-statement-empty-state"),
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
elements.printTrialBalanceButton.addEventListener("click", () => window.print());
elements.companySetupForm.addEventListener("submit", handleCompanySetupSubmit);
elements.companySetupReset.addEventListener("click", resetCompanySetup);
elements.currencyToggle.addEventListener("click", handleCurrencyToggle);
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

initializeState();
render();

function initializeState() {
  state.companySetup = loadCompanySetup();
  state.accounts = loadAccounts();
  state.accounts = syncOpeningBalanceEquityAccount(state.accounts);
  state.journalEntries = syncSystemJournalEntry(loadJournalEntries());
  state.assistantMessages = [];
  state.currentView = isCompanySetupComplete() ? "chart" : "company-setup";
  state.mobileSidebarOpen = false;
  state.sidebarCollapsed = false;
  updateCurrencyFormatter();
  syncAssistantOnboardingMessage();
  saveAccounts();
  saveJournalEntries();
  saveCompanySetup();
}

function loadAccounts() {
  const storedAccounts = localStorage.getItem(accountStorageKey);

  if (!storedAccounts) {
    localStorage.setItem(accountStorageKey, JSON.stringify(defaultAccounts));
    return defaultAccounts;
  }

  try {
    const parsedAccounts = JSON.parse(storedAccounts);
    if (Array.isArray(parsedAccounts)) {
      return parsedAccounts;
    }
  } catch {}

  localStorage.setItem(accountStorageKey, JSON.stringify(defaultAccounts));
  return defaultAccounts;
}

function loadJournalEntries() {
  const storedEntries = localStorage.getItem(journalStorageKey);

  if (!storedEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(storedEntries);
    return Array.isArray(parsedEntries) ? parsedEntries : [];
  } catch {
    return [];
  }
}

function loadCompanySetup() {
  const fallback = getDefaultCompanySetup();
  const storedSetup = localStorage.getItem(companySetupStorageKey);

  if (!storedSetup) {
    return fallback;
  }

  try {
    const parsedSetup = JSON.parse(storedSetup);
    if (parsedSetup && typeof parsedSetup === "object") {
      return {
        ...fallback,
        ...parsedSetup,
      };
    }
  } catch {}

  return fallback;
}

function saveAccounts() {
  localStorage.setItem(accountStorageKey, JSON.stringify(state.accounts));
}

function saveJournalEntries() {
  localStorage.setItem(journalStorageKey, JSON.stringify(state.journalEntries));
}

function saveCompanySetup() {
  localStorage.setItem(companySetupStorageKey, JSON.stringify(state.companySetup));
}

function render() {
  renderNavigation();
  renderBranding();
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

function renderCompanySetup() {
  const onboardingSteps = getOnboardingSteps();
  const currentStep = onboardingSteps[state.onboardingStepIndex] || onboardingSteps[0];

  elements.companyName.value = state.companySetup.companyName;
  elements.companyIndustry.value = state.companySetup.industry;
  elements.companyBusinessType.value = state.companySetup.businessType;
  elements.companyAddress.value = state.companySetup.address;
  elements.companyPhone.value = state.companySetup.phone;
  elements.companyEmail.value = state.companySetup.email;
  elements.financialYearStart.value = state.companySetup.financialYearStart;

  elements.currencyOptions.forEach((option) => {
    option.classList.toggle("is-active", option.dataset.currency === state.companySetup.currency);
  });

  elements.onboardingProgressBadge.textContent = `Step ${state.onboardingStepIndex + 1} of ${onboardingSteps.length}`;
  elements.onboardingSubtitle.textContent = currentStep
    ? currentStep.helper
    : "Complete your company setup details.";
  elements.companySetupGuide.innerHTML = "";
  elements.onboardingStepList.innerHTML = "";

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
    item.innerHTML = `
      <span class="onboarding-step-number">${isComplete ? "✓" : index + 1}</span>
      <div class="onboarding-step-copy">
        <strong>${escapeHtml(step.title)}</strong>
        <span>${escapeHtml(step.helper)}</span>
      </div>
    `;
    elements.onboardingStepList.appendChild(item);
  });

  elements.onboardingPrevButton.disabled = state.onboardingStepIndex === 0;
  elements.onboardingNextButton.textContent =
    state.onboardingStepIndex === onboardingSteps.length - 1 ? "Finish Setup" : "Next Step";
}

function handleCompanySetupSubmit(event) {
  event.preventDefault();
  state.companySetup = {
    ...state.companySetup,
    companyName: elements.companyName.value.trim(),
    industry: elements.companyIndustry.value.trim(),
    businessType: elements.companyBusinessType.value.trim(),
    address: elements.companyAddress.value.trim(),
    phone: elements.companyPhone.value.trim(),
    email: elements.companyEmail.value.trim(),
    financialYearStart: elements.financialYearStart.value,
  };
  updateCurrencyFormatter();
  saveCompanySetup();
  syncAssistantOnboardingMessage();
  render();
}

function resetCompanySetup() {
  state.companySetup = getDefaultCompanySetup();
  state.onboardingStepIndex = 0;
  updateCurrencyFormatter();
  saveCompanySetup();
  render();
}

function handleCurrencyToggle(event) {
  const button = event.target.closest("[data-currency]");
  if (!button) {
    return;
  }

  state.companySetup.currency = button.dataset.currency;
  updateCurrencyFormatter();
  saveCompanySetup();
  render();
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
    setActiveView("chart");
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
      helper: "Capture the business type and address so setup is operationally complete.",
      message:
        "Step 2: Tell me the legal or operating business type and main address for the company profile.",
      isComplete: Boolean(state.companySetup.businessType && state.companySetup.address),
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
      helper: "Choose NGN or USD. All balances and reports will use this display currency.",
      message:
        "Step 4: Pick the base reporting currency. Use NGN for naira-led books or USD if the company reports in dollars.",
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
    financialYearStart: "",
  };
}

function updateCurrencyFormatter() {
  currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: state.companySetup?.currency || "NGN",
  });
}

function isCompanySetupComplete() {
  return getOnboardingSteps().every((step) => step.isComplete);
}

function getViewTitle(viewName) {
  const titles = {
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
  elements.accountsTableBody.innerHTML = "";

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
    row.innerHTML = `
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
    `;
    elements.accountsTableBody.appendChild(row);
  });

  elements.accountsTableBody.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleAccountTableAction);
  });
}

function renderJournalTable() {
  elements.journalTableBody.innerHTML = "";

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
    row.innerHTML = `
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
    `;
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
  elements.ledgerList.innerHTML = "";

  if (state.accounts.length === 0) {
    elements.ledgerEmptyState.classList.remove("hidden");
    return;
  }

  elements.ledgerEmptyState.classList.add("hidden");

  const ledgers = buildGeneralLedger();

  ledgers.forEach((ledger) => {
    const card = document.createElement("article");
    card.className = "ledger-card";
    card.innerHTML = `
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
    `;
    elements.ledgerList.appendChild(card);
  });
}

function renderTrialBalance() {
  elements.trialBalanceTableBody.innerHTML = "";
  elements.trialBalanceTableFoot.innerHTML = "";

  if (state.accounts.length === 0) {
    elements.trialBalanceEmptyState.classList.remove("hidden");
    return;
  }

  elements.trialBalanceEmptyState.classList.add("hidden");

  const report = buildTrialBalanceReport();

  report.rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${escapeHtml(row.account.code)}</td>
      <td>${escapeHtml(row.account.name)}</td>
      <td>${escapeHtml(row.account.type)}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalDebits))}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(row.totalCredits))}</td>
      <td class="numeric">${escapeHtml(row.closingDebit > 0 ? currencyFormatter.format(row.closingDebit) : "-")}</td>
      <td class="numeric">${escapeHtml(row.closingCredit > 0 ? currencyFormatter.format(row.closingCredit) : "-")}</td>
    `;
    elements.trialBalanceTableBody.appendChild(tableRow);
  });

  const totalsRow = document.createElement("tr");
  totalsRow.innerHTML = `
    <td colspan="3">Grand Total</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalDebits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalCredits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingDebits))}</td>
    <td class="numeric">${escapeHtml(currencyFormatter.format(report.totalClosingCredits))}</td>
  `;
  elements.trialBalanceTableFoot.appendChild(totalsRow);

  const statusRow = document.createElement("tr");
  statusRow.innerHTML = `
    <td colspan="7">
      <div class="report-status">
        Trial balance totals are ${report.totalsBalanced ? "balanced" : "not balanced"}.
        Closing balances are ${report.closingBalanced ? "balanced" : "not balanced"}.
      </div>
    </td>
  `;
  elements.trialBalanceTableFoot.appendChild(statusRow);
}

function renderIncomeStatement() {
  elements.incomeRevenueList.innerHTML = "";
  elements.incomeExpenseList.innerHTML = "";
  elements.incomeSummaryBody.innerHTML = "";

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
    row.innerHTML = `
      <td>${escapeHtml(label)}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
    `;
    elements.incomeSummaryBody.appendChild(row);
  });
}

function renderBalanceSheet() {
  elements.balanceSheetAssetsList.innerHTML = "";
  elements.balanceSheetLiabilitiesList.innerHTML = "";
  elements.balanceSheetEquityList.innerHTML = "";
  elements.balanceSheetSummaryBody.innerHTML = "";

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
    row.innerHTML = `
      <td>${escapeHtml(label)}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
    `;
    elements.balanceSheetSummaryBody.appendChild(row);
  });

  elements.balanceSheetCheckStatus.textContent = report.isBalanced
    ? "Balance check confirmed: Total Assets equals Total Liabilities plus Equity."
    : "Balance check failed: Total Assets does not equal Total Liabilities plus Equity.";
  elements.balanceSheetCheckStatus.classList.toggle("is-balanced", report.isBalanced);
  elements.balanceSheetCheckStatus.classList.toggle("is-unbalanced", !report.isBalanced);
}

function renderCashFlowStatement() {
  elements.cashFlowOperatingList.innerHTML = "";
  elements.cashFlowInvestingList.innerHTML = "";
  elements.cashFlowFinancingList.innerHTML = "";
  elements.cashFlowSummaryBody.innerHTML = "";

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
    row.innerHTML = `
      <td>${escapeHtml(label)}</td>
      <td class="numeric">${escapeHtml(currencyFormatter.format(value))}</td>
    `;
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
  elements.assistantChat.innerHTML = "";

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
  elements.assistantStatus.textContent = "Sending financial context to Claude...";
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

function handleAccountTableAction(event) {
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

    state.accounts = state.accounts.filter((entry) => entry.id !== id);
    state.accounts = syncOpeningBalanceEquityAccount(state.accounts);
    state.journalEntries = syncSystemJournalEntry(state.journalEntries);
    saveAccounts();
    saveJournalEntries();
    render();
  }
}

function handleJournalTableAction(event) {
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

    state.journalEntries = state.journalEntries.map((item) =>
      item.id === id ? { ...item, description: nextDescription } : item,
    );
    state.editingJournalDescriptionId = null;
    saveJournalEntries();
    render();
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

    state.journalEntries = state.journalEntries.filter((item) => item.id !== id);
    state.journalEntries = syncSystemJournalEntry(state.journalEntries);
    saveJournalEntries();
    render();
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

function handleAccountSubmit(event) {
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

  if (state.editingAccountId) {
    state.accounts = state.accounts.map((account) =>
      account.id === state.editingAccountId ? { ...account, ...payload } : account,
    );
  } else {
    state.accounts = [
      ...state.accounts,
      {
        id: crypto.randomUUID(),
        ...payload,
      },
    ];
  }

  state.accounts = syncOpeningBalanceEquityAccount(state.accounts);
  state.journalEntries = syncSystemJournalEntry(state.journalEntries);
  saveAccounts();
  saveJournalEntries();
  render();
  closeAccountDialog();
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
  elements.lineItemsList.innerHTML = "";

  const lineItems = entry?.lineItems?.length
    ? entry.lineItems
    : [createEmptyLineItem(), createEmptyLineItem()];
  lineItems.forEach((line) => addLineItemRow(line));

  refreshJournalSummary();
  elements.journalDialog.showModal();
}

function closeJournalDialog() {
  elements.journalDialog.close();
}

function resetJournalForm() {
  state.editingJournalId = null;
  elements.journalForm.reset();
  elements.lineItemsList.innerHTML = "";
  hideJournalError();
  refreshJournalSummary();
}

function addLineItemRow(line = createEmptyLineItem()) {
  const row = document.createElement("div");
  row.className = "line-item-row";
  row.innerHTML = `
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
  `;
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

function handleJournalSubmit(event) {
  event.preventDefault();

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

  if (state.editingJournalId) {
    state.journalEntries = state.journalEntries.map((entry) =>
      entry.id === state.editingJournalId ? { ...entry, ...payload } : entry,
    );
  } else {
    state.journalEntries = [
      ...state.journalEntries,
      {
        id: crypto.randomUUID(),
        ...payload,
      },
    ];
  }

  state.journalEntries = syncSystemJournalEntry(state.journalEntries);
  saveJournalEntries();
  render();
  closeJournalDialog();
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
  section.innerHTML = `
    <button class="section-toggle" type="button" data-balance-toggle="${sectionKey}" aria-expanded="${expanded}">
      <span>${escapeHtml(label)}</span>
      <span>${escapeHtml(currencyFormatter.format(subtotal))} ${expanded ? "−" : "+"}</span>
    </button>
  `;

  const body = document.createElement("div");
  body.className = "balance-subsection-body";
  body.classList.toggle("collapsed", !expanded);

  if (rows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "statement-row muted-row";
    empty.innerHTML = "<span class=\"statement-label\">No accounts</span><strong>-</strong>";
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
  row.innerHTML = `
    <span class="statement-label">${escapeHtml(label)}</span>
    <strong>${escapeHtml(currencyFormatter.format(amount))}</strong>
  `;
  return row;
}

function renderSectionSubtotal(element, label, amount) {
  element.innerHTML = `
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(currencyFormatter.format(amount))}</strong>
  `;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
