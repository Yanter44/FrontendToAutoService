window.ui = {
    balance: document.getElementById('userbalance'),
    useravatarletter: document.getElementById('useravatarletter'),
    username: document.getElementById('username'),
    userrole: document.getElementById('userrole'),

    Workspace: document.querySelector('.Workspace'),

    navLinks: document.querySelectorAll('[data-target]'),
    screens: document.querySelectorAll('[data-screen]'),
    sidebar: document.querySelector('.DetailsSidebar'),

    //Applications
    BtnAddNewApplication: document.querySelector('.BtnAddNewApplication'),
    btnCancel: document.querySelector('.BtnSecondary'),
    ApplicationsTableBody: document.querySelector('.ApplicationsTable tbody'),

    CreateApplicationModal: document.querySelector('.CreateApplication'),
    CreateApplicationOpenAddPhotoModalBtn: document.querySelector('.PhotoUploadBtn'),

    CreateApplicationOpenAddDocumentModalButton: document.querySelector('.DocUploadBtn'),
    CreateApplicationCancelButton: document.querySelector('.CreateApplication-CancelButton'),
    CreateApplicationCreateButton: document.querySelector('.CreateApplication-CreateButton'),

    CreateApplicationModalUploadWrapper: document.querySelector('.CreateApplication-FormRow .UploadWrapper'),
    CreateApplicationModalDocsUploadWrapper: document.querySelector('.CreateApplication-FormRow .DocUploadWrapper'),
    CreateApplicationModalPhotosContainer: document.querySelector('.PhotosContainer'),

    CreateApplicationModalDocumentsContainer: document.querySelector('.DocsContainer'),
    CreateApplicationTsCategorySelect: document.getElementById('CreateApplication-TsCategorySelect'),
    CreateApplicationPtoSelect: document.getElementById('CreateApplication-PtoSelect'),

    AddTsDocumentModal: document.getElementById('AddTsDocumentModal'),
    AddTsDocumentCancelButton: document.querySelector('.AddTsDocumentModalCancelButton'),
    AddTsDocumentModalSaveButton: document.querySelector('.AddTsDocumentModalSaveButton'),
    AddTsDocumentModalOverlay: document.querySelector('.AddTsDocumentModalOverlay'),
    AddTsDocumentModalFileDropZone: document.querySelector('.AddTsDocumentModalFileDropZone'),
    AddTsDocumentModalDocumentTypeSelect: document.getElementById('AddTsDocumentModalDocumentTypeSelect'),

    AddTsPhotoModal: document.getElementById('AddTsPhotoModal'),
    AddTsPhotoCancelButton: document.querySelector('.AddTsPhotoCancelButton'),
    AddTsPhotoModalOverlay: document.querySelector('.AddTsPhotoModalOverlay'),
    AddTsPhotoSaveButton: document.querySelector('.AddTsPhotoSaveButton'),
    AddTsPhotoModalFileInput: document.getElementById('AddTsPhotoModalPhotoInput'),
    AddTsPhotoModalFileDropZone: document.querySelector('.AddTsPhotoModalFileDropZone'),
    AddTsPhotoModalPhotoTypeSelect: document.getElementById('AddTsPhotoModalPhotoTypeSelect'),

    //Finances
    FinancesHistoryTableBody: document.querySelector('.FinanceHistoryTable tbody'),
    AgentFinanceBalance: document.getElementById('AgentFinanceBalance'),
    AgentFinanceDebtLimit: document.getElementById('AgentFinanceDebtLimit'),
    AgentFinanceCurrentDebt: document.getElementById('AgentFinanceCurrentDebt'),
    
    //ProfileDropDownMenu
    profileTrigger: document.getElementById('profileTrigger'), 
    profileDropdown: document.getElementById('profileDropdown'), 
    
    DropDownUseravatarletter: document.getElementById('DropDownAvatarLetter'),
    DropDownUsername: document.getElementById('DropDownUsername'),
    DropDownUserrole: document.getElementById('DropDownUserRole'),
    DropDownSignOutButton: document.querySelector('.SignOutButton'),
    
    //Notifications
    NotificationTrigger: document.getElementById('NotificationTrigger'),
    NotificationModalDropDown: document.getElementById('NotificationModalDropDown'),
    NotificationModalBody: document.querySelector('.NotificationModalBody'),
    NotificationCountField: document.getElementById('NotificationCountField'),

    //Loader
    LoaderProgressBarProgressFill: document.querySelector('.LoaderProgressBarProgressFill'),
    LoaderLoadingProgressBarPercents: document.querySelector('.LoaderLoadingProgressBarPercents'),

};