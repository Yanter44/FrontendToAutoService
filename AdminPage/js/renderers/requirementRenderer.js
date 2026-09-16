const renderPhotoRequirementsTable = async (photoRequirements) => {
    if (!ui.PhotoRequirementsTableBody) return;
    ui.PhotoRequirementsTableBody.innerHTML = '';
    photoRequirements.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.requirementId = item.id; 
        row.innerHTML = `
            <td>${item.photoType}</td>
            <td>${item.displayName}</td>
            <td>
                <input type="checkbox" ${item.isRequire ? 'checked' : ''} disabled>
            </td>
            <td>
                <div class="PhotoRequirementActionsWrapper">
                    <button type="button" class="BtnRedactPhotoRequirement">
                        <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                    </button>

                    <button type="button" class="BtnDeletePhotoRequirement">
                        <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                    </button>
                 </div>
            </td>
                
        `;
        ui.PhotoRequirementsTableBody.appendChild(row);
    });
};

const renderDocumentRequirementsTable = async (documentRequirements) => {
    if (!ui.DocumentRequirementsTableBody) return;
    ui.DocumentRequirementsTableBody.innerHTML = '';
    documentRequirements.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.requirementId = item.id; 
        row.innerHTML = `
            <td>${item.documentType}</td>
            <td>${item.displayName}</td>
            <td>
                <input type="checkbox" ${item.isRequire ? 'checked' : ''} disabled>
            </td>
            <td>
                <div class="DocumentRequirementActionsWrapper">
                    <button type="button" class="BtnRedactDocumentRequirement">
                        <img src="/Assets/Images/redactt.png" class="BtnIcon" />
                    </button>
                    <button type="button" class="BtnDeleteDocumentRequirement">
                        <img src="/Assets/Images/remove.png"  class="BtnIcon" />
                    </button>
                </div>
            </td>
            `;
        ui.DocumentRequirementsTableBody.appendChild(row);
    });
};