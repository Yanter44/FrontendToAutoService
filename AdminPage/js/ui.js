window.ui = {
    useravatarletter: document.getElementById('useravatarletter'),
    username: document.getElementById('username'),
    userrole: document.getElementById('userrole'),

    Workspace: document.querySelector('.Workspace'),
    
    navLinks: document.querySelectorAll('[data-target]'),
    screens: document.querySelectorAll('[data-screen]'),

    //Applications
    ApplicationsSidebar: document.querySelector('.DetailsSidebar'),
    ApplicationsTableBody: document.querySelector('.ApplicationsTable tbody'),
    ApplicationsSearchSortInput: document.getElementById('ApplicationsSearchSortInput'),

    // Prompt
    BtnAddNewPrompt: document.querySelector('.BtnAddNewPrompt'),

    AddNewPromptModal: document.getElementById('AddNewPromptModal'),
    AddNewPromptCloseBtn: document.getElementById('AddNewPromptCloseBtn'),
    PromptSubmitBtn: document.getElementById('PromptSubmitBtn'),
    PromptTagInput: document.getElementById('PromptTagInput'),
    PromptDescriptionInput: document.getElementById('PromptDescriptionInput'),
    AddNewPromptModalOverlay: document.querySelector('.AddNewPromptModalOverlay'),
    
    RedactPromptModal: document.getElementById('RedactPromptModal'),
    RedactPromptModalOverlay: document.querySelector('.RedactPromptModalOverlay'),
    RedactPromptModalTagInput: document.getElementById('RedactPromptModalTagInput'),
    RedactPromptModalDescriptionInput: document.getElementById('RedactPromptModalDescriptionInput'),

    BtnSubmitRedactPrompt: document.querySelector('.BtnSubmitRedactPrompt'),


    DeletePromptModal: document.getElementById('DeletePromptModal'),
    DeletePromptModalOverlay: document.querySelector('.DeletePromptModalOverlay'),
    DeletePromptModalWarningContentSpan: document.querySelector('.DeletePromptModalWarningContentSpan'),
    BtnSubmitDeletePrompt: document.querySelector('.BtnSubmitDeletePrompt'),

    // Pto
    BtnAddNewPto: document.querySelector('.BtnAddNewPto'),
    AddNewPtoModal: document.getElementById('AddNewPtoModal'),
    AddNewPtoModalOverlay: document.querySelector('.AddNewPtoModalOverlay'),
    AddNewPtoSubmitButton: document.querySelector('.AddNewPtoSubmitButton'),
    PtoPricePolicyTableBody: document.querySelector('.PtoPricePolicyTableBody'),

    PtoNameInput: document.getElementById('PtoNameInput'),
    PtoRsaInput: document.getElementById('PtoRsaNumberInput'),
    PtoAddressInput: document.getElementById('PtoAddressInput'),
    PtoLatitudeInput: document.getElementById('PtoLatitudeInput'),
    PtoLongtitudeInput: document.getElementById('PtoLongtitudeInput'),
    PtoLoginInput: document.getElementById('PtoLoginInput'),
    PtoPasswordInput: document.getElementById('PtoPasswordInput'),
    PtoApiKeyInput: document.getElementById('PtoApiKeyInput'),

    RedactPtoModal: document.getElementById('RedactPtoModal'),
    RedactPtoModalOverlay: document.querySelector('.RedactPtoModalOverlay'),
    BtnSubmitRedactPto: document.querySelector('BtnSubmitRedactPto'),

    DeletePtoModal: document.getElementById('DeletePtoModal'),
    DeletePtoModalOverlay: document.querySelector('.DeletePtoModalOverlay'),
    DeletePtoModalWarningSpan: document.querySelector('.DeletePtoModalWarningSpan'),
    BtnSubmitDeletePto: document.querySelector('.BtnSubmitDeletePto'),

    PtoSidebar: document.querySelector('.DetailsPtoSidebar'),
    DetailsSidebarPtoData: document.getElementById('DetailsSidebarPtoData'),
    DetailsSidebarPricePolicyData: document.querySelector('.DetailsSidebarPricePolicyData'),
    PtoMainTableBody: document.querySelector('.PtoTable tbody'),

    // Requirements
    BtnAddNewPhotoRequirement: document.querySelector('.PhotoRequirementsAddButton'),
    BtnAddNewDocumentRequirement: document.querySelector('.DocumentRequirementsAddButton'),

    AddNewPhotoRequirementSubmitButton: document.querySelector('.AddNewPhotoRequirementSubmitButton'),
    AddNewDocumentRequirementSubmitButton: document.querySelector('.AddNewDocumentRequirementSubmitButton'),

    AddNewPhotoRequirementModal: document.getElementById('AddNewPhotoRequirementModal'),
    AddNewPhotoRequirementOverlay: document.querySelector('.AddNewPhotoRequirementOverlay'),

    AddNewDocumentRequirementModal: document.getElementById('AddNewDocumentRequirementModal'),
    AddNewDocumentRequirementOverlay: document.querySelector('.AddNewDocumentRequirementOverlay'),
    
    PhotoRequirementsTableBody: document.getElementById('PhotoRequirementsTableBody'),
    DocumentRequirementsTableBody: document.getElementById('DocumentRequirementsTableBody'),

    PhotoTypeRequirementInput: document.getElementById('PhotoTypeRequirementInput'),
    PhotoDisplayNameRequirementInput: document.getElementById('PhotoDisplayNameRequirementInput'),
    PhotoIsRequiredRequirementInput: document.getElementById('PhotoIsRequiredRequirementInput'),

    DocumentTypeRequirementInput: document.getElementById('DocumentTypeRequirementInput'),
    DocumentDisplayNameRequirementInput: document.getElementById('DocumentDisplayNameRequirementInput'),
    DocumentIsRequiredRequirementInput: document.getElementById('DocumentIsRequiredRequirementInput'),

    //Accruals/Deducts
    BtnAccrualToBalance: document.querySelector('.BtnAccrualToBalance'),
    AccrualBalanceModal: document.getElementById('AccrualBalanceModal'),
    AccrualBalanceOverlay: document.querySelector('.AccrualBalanceOverlay'),

    AccrualBalanceSelect: document.querySelector('.AccrualBalanceSelect'),
    CurrentAgentBalanceValue: document.querySelector('.AccrualModalCurrentAgentBalanceValue'),


    QuickAmountButtons: document.querySelectorAll('.QuickAmountButton'),
    AccrualBalanceCashInput: document.getElementById('AccrualBalanceCashInput'),
    AccrualBalanceCommentInput: document.getElementById('AccrualBalanceCommentInput'),

    AccrualBalanceSubmitButton: document.querySelector('.AccrualBalanceSubmitButton'),
    AccrualsTableBody: document.querySelector('.AccrualsTable tbody'),

    BtnDeductFromBalance: document.querySelector('.BtnDeductFromBalance'),
    DeductBalanceModal: document.getElementById('DeductBalanceModal'),

    DeductBalanceOverlay: document.querySelector('.DeductBalanceOverlay'),

    DeductBalanceSelect: document.querySelector('.DeductBalanceSelect'),
    DeductBalanceCashInput: document.getElementById('DeductBalanceCashInput'),
    DeductBalanceCommentInput: document.getElementById('DeductBalanceCommentInput'),

    DeductModalCurrentAgentBalanceValue: document.querySelector('.DeductModalCurrentAgentBalanceValue'),
    DeductModalQuickAmountButtons: document.querySelectorAll('.DeductModalQuickAmountButton'),

    DeductBalanceSubmitButton: document.querySelector('.DeductBalanceSubmitButton'),

    // ProfileDropDownMenu
    profileTrigger: document.getElementById('profileTrigger'), 
    profileDropdown: document.getElementById('profileDropdown'), 
    
    DropDownUseravatarletter: document.getElementById('DropDownAvatarLetter'),
    DropDownUsername: document.getElementById('DropDownUsername'),
    DropDownUserrole: document.getElementById('DropDownUserRole'),
    DropDownSignOutButton: document.querySelector('.SignOutButton'),

    //EditApplicationPhotoModal
    EditApplicationPhotoModal: document.getElementById('EditApplicationPhotoModal'),

    EditApplicationPhotoOverlay: document.querySelector('.EditApplicationPhotoOverlay'),

    EditApplicationPhotoOriginalPhotoHolder: document.querySelector('.EditApplicationPhotoOriginalPhotoHolder'),

    EditApplicationPhotoGeneratedPhotoResultHolder: document.querySelector('.EditApplicationPhotoGeneratedPhotoResultHolder'),
    EditApplicationPhotoNeuronNetworkSelect: document.querySelector('.EditApplicationPhotoNeuronNetworkSelect'),
    
    EditApplicationPhotoOverlay: document.querySelector('.EditApplicationPhotoOverlay'),
    EditApplicationPhotoTagsInput: document.getElementById('EditApplicationPhotoTagsInput'),

    BtnSubmitGeneratePhoto: document.querySelector('.BtnSubmitGeneratePhoto'), //GENERATE
    BtnSubmitGeneratedPhoto: document.querySelector('.BtnSubmitGeneratedPhoto'), //GENERAT-ED

    //UsersTable
    BtnsRedactUser: document.querySelectorAll('.BtnRedactUser'),
    BtnsDeleteUser: document.querySelectorAll('.BtnDeleteUser'),

    RedactUserModal: document.getElementById('RedactUserModal'),
    RedactUserModalOverlay: document.querySelector('.RedactUserModalOverlay'),
    RedactUserModalRoleSelect: document.querySelector('.RedactUserModalRoleSelect'),
    BtnSubmitRedactUser: document.querySelector('.BtnSubmitRedactUser'),

    DeleteUserModal: document.getElementById('DeleteUserModal'),
    DeleteUserModalOverlay: document.querySelector('.DeleteUserModalOverlay'),
    DeleteUserModalWarningContentSpan: document.querySelector('.DeleteUserModalWarningContentSpan'),
    BtnSubmitDeleteUser: document.querySelector('.BtnSubmitDeleteUser'),

    //RedactUserModal
    RedactUserModalDropdown: document.querySelector('.RedactUserModalDropdown'),
    RedactUserModalCurrentUserRoleName: document.getElementById('RedactUserModalCurrentUserRoleName'),
    RedactUserModalUserRegDate: document.getElementById('RedactUserModalUserRegDate'),
    RedactUserModalCurrentUserDebitLimit: document.getElementById('RedactUserModalCurrentUserDebitLimit'),
    RedactUserModalBtnSubmit: document.getElementById('RedactUserModalBtnSubmit'),
    
    //Notifications
    NotificationTrigger: document.getElementById('NotificationTrigger'),
    NotificationModalDropDown: document.getElementById('NotificationModalDropDown'),
    NotificationCountField: document.getElementById('NotificationCountField'),

    //Loader
    LoaderProgressBarProgressFill: document.querySelector('.LoaderProgressBarProgressFill'),
    LoaderLoadingProgressBarPercents: document.querySelector('.LoaderLoadingProgressBarPercents'),
};