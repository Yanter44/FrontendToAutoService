window.actions = {
    submitNewPto: async () => {
        const pricePolicies = [];
        const rows = ui.PtoPricePolicyTableBody
            ? ui.PtoPricePolicyTableBody.querySelectorAll('.PtoPricePolicyTableRow')
            : [];

        rows.forEach(row => {
            const categoryId = parseInt(row.getAttribute('data-category-id'), 10);
            const input = row.querySelector('.PtoPricePolicyInput');
            const priceValue = input && input.value ? parseFloat(input.value) : 0;

            pricePolicies.push({
                vehicleCategoryId: categoryId,
                price: priceValue
            });
        });

        const ptoData = {
            name: ui.PtoNameInput.value.trim(),
            rsaNumber: ui.PtoRsaInput.value.trim(),
            address: ui.PtoAddressInput.value.trim(),
            latitude: ui.PtoLatitudeInput.value ? ui.PtoLatitudeInput.value.trim() : null,
            longitude: ui.PtoLongtitudeInput.value ? ui.PtoLongtitudeInput.value.trim() : null,
            login: ui.PtoLoginInput.value.trim(),
            password: ui.PtoPasswordInput.value.trim(),
            apiKey: ui.PtoApiKeyInput.value.trim(),
            pricePolicies
        };

        if (!ptoData.name || !ptoData.rsaNumber) {
            alert('Заполните обязательные поля: Название и Номер РСА');
            return;
        }

        const isSuccess = await ptoService.addNewPto(ptoData);

        if (isSuccess) {
            console.log('ПТО успешно добавлено');
            resetNewPtoForm();
            closeNewPtoModal();
        } else {
            alert('Не удалось добавить ПТО');
        }
    },
    submitNewNeuronNetwork: async () => {
        const model = {
            name: ui.NeuronNetworkNameInput.value.trim(),
            link: ui.NeuronNetworkLinkInput.value.trim(),
        };

        const isSuccess = await neuronNetworkService.addNewNeuronNetwork(model);

        if (isSuccess) {
            state.neuronNetworksResult = {
                items: [], page: 1, pageSize: 5, totalCount: 0, totalPages: 0
            };
            state.allNeuronNetworks = [];
        }

        return isSuccess;
    },
    submitNewPhotoRequirement: async () => {
        const photoType = ui.PhotoTypeRequirementInput.value.trim();
        const displayName = ui.PhotoDisplayNameRequirementInput.value.trim();
        const isRequire = ui.PhotoIsRequiredRequirementInput.value === 'true';

        if (!photoType || !displayName) {
            alert("Заполните все необходимые поля!");
            return;
        }

        const model = { photoType, displayName, isRequire };

        ui.AddNewPhotoRequirementSubmitButton.disabled = true;

        const newRequirement = await requirementService.addphotorequirement(model);

        if (newRequirement) {
            clearNewPhotoRequirementFields();
            closePhotoRequirementModal();
            state.photorequirements.push(newRequirement);
            renderPhotoRequirementsTable(state.photorequirements);
        }

        ui.AddNewPhotoRequirementSubmitButton.disabled = false;
    },

    submitNewDocumentRequirement: async () => {
        const documentType = ui.DocumentTypeRequirementInput.value.trim();
        const displayName = ui.DocumentDisplayNameRequirementInput.value.trim();
        const isRequire = ui.DocumentIsRequiredRequirementInput.value === 'true';

        if (!documentType || !displayName) {
            alert("Заполните все необходимые поля!");
            return;
        }

        const model = { documentType, displayName, isRequire };

        ui.AddNewDocumentRequirementSubmitButton.disabled = true;

        const newRequirement = await requirementService.adddocumentrequirement(model);

        if (newRequirement) {
            closeDocumentRequirementModal();
            state.documentrequirements.push(newRequirement);
            renderDocumentRequirementsTable(state.documentrequirements);
        }

        ui.AddNewDocumentRequirementSubmitButton.disabled = false;
    },

    submitNewPrompt: async () => {
        const tag = ui.PromptTagInput.value.trim();
        const description = ui.PromptDescriptionInput.value.trim();

        if (!tag || !description) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        const isSuccess = await promptService.addNewPrompt(tag, description);

        if (isSuccess) {
            console.log('Промпт успешно добавлен');
            closeNewPromptModal();
        }
    },

    submitNewCreditTransaction: async (model) => {
        const isSuccess = await paymentService.credit(model);

        if (isSuccess) {
            closeAccrualBalanceModal();
        }
    },

    submitNewDebitTransaction: async (model) => {
        const isSuccess = await paymentService.debit(model);

        if (isSuccess) {
            closeDeductBalanceModal();
        }
    },

    submitDeleteUser: async (userId) => {
        const model = {
            userId: userId,
        };
        const isSuccess = await userService.deleteUser(model);
    },

    submitDeletePrompt: async (promptId) => {
        const isSuccess = await promptService.deletePrompt(promptId);
    },

    submitRedactPrompt: async(model) => {
        const isSuccess = await promptService.redactPrompt(model);
    },
    
    submitDeletePto: async(ptoid) => {
        const isSuccess = await ptoService.deletePto(ptoid);
    },

    submitGeneratePhoto: async(model) => {
        const base64image = await neuronNetworkService.generatePhoto(model);
        console.log(base64image);
        return base64image;
    },
    submitGeneratedPhotoByAi: async(model) => {
        const result = await neuronNetworkService.confirmGeneratedPhotoByAI(model);
        console.log(result); 
    },
};