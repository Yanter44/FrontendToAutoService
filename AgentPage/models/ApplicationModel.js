class ApplicationModel {
    constructor(data = {}) {
        this.vehicleCategoryId = data.vehicleCategoryId || 0;
        this.vin = data.vin || '';
        this.gosNumber = data.gosNumber || '';
        this.brand = data.brand || '';
        this.model = data.model || '';
        this.yearOfRelease = data.yearOfRelease || 0;
        this.fio = data.fio || '';
        this.email = data.email || '';
        this.phoneNumber = data.phoneNumber || '';
        this.ptoId = data.ptoId || 0;
        this.photos = data.photos || [];
        this.documents = data.documents || [];
    }

    static fromForm(ui, state) {
        return new ApplicationModel({
            vehicleCategoryId: Number(ui.CreateApplicationTsCategorySelect.value) || 0,
            vin: document.getElementById("CreateApplication-VinNumber")?.value?.trim() || "",
            gosNumber: document.getElementById("CreateApplication-GosNumber")?.value?.trim() || "",
            brand: document.getElementById("CreateApplication-CarBrand")?.value?.trim() || "",
            model: document.getElementById("CreateApplication-CarModel")?.value?.trim() || "",
            yearOfRelease: Number(document.getElementById("CreateApplication-CarYear")?.value) || 0,
            fio: document.getElementById("CreateApplication-FIO")?.value?.trim() || "",
            email: document.getElementById("CreateApplication-Email")?.value?.trim() || "",
            phoneNumber: document.getElementById("CreateApplication-PhoneNumber")?.value?.trim() || "",
            ptoId: Number(ui.CreateApplicationPtoSelect?.value) || 0,
            photos: state?.uploadedPhotosStorage?.slice() || [],
            documents: state?.uploadedDocsStorage?.slice() || []
        });
    }

    toFormData() {
        const formData = new FormData();
        
        const fields = [
            'vehicleCategoryId', 'vin', 'gosNumber', 'brand', 
            'model', 'yearOfRelease', 'fio', 'email', 'phoneNumber', 'ptoId'
        ];
        
        fields.forEach(field => {
            const value = this[field];
            if (value !== undefined && value !== null && value !== '') {
                formData.append(field, value);
            }
        });

        if (this.photos && this.photos.length) {
            this.photos.forEach(file => formData.append('photos', file));
        }
        
        if (this.documents && this.documents.length) {
            this.documents.forEach(file => formData.append('documents', file));
        }

        return formData;
    }

    validate() {
        const errors = [];
        
        if (!this.vin) errors.push('VIN номер обязателен для заполнения');
        if (!this.gosNumber) errors.push('Государственный номер обязателен для заполнения');
        if (!this.brand) errors.push('Марка автомобиля обязательна для заполнения');
        if (!this.model) errors.push('Модель автомобиля обязательна для заполнения');
        if (!this.yearOfRelease || this.yearOfRelease < 1900) {
            errors.push('Укажите корректный год выпуска');
        }
        if (!this.fio) errors.push('ФИО обязательно для заполнения');
        if (!this.email) errors.push('Email обязателен для заполнения');
        if (!this.phoneNumber) errors.push('Номер телефона обязателен для заполнения');
        if (!this.ptoId) errors.push('Выберите ПТО');
        
        return errors;
    }

    toJSON() {
        return {
            vehicleCategoryId: this.vehicleCategoryId,
            vin: this.vin,
            gosNumber: this.gosNumber,
            brand: this.brand,
            model: this.model,
            yearOfRelease: this.yearOfRelease,
            fio: this.fio,
            email: this.email,
            phoneNumber: this.phoneNumber,
            ptoId: this.ptoId,
            photos: this.photos.length,
            documents: this.documents.length
        };
    }

    clone() {
        return new ApplicationModel({
            ...this,
            photos: [...this.photos],
            documents: [...this.documents]
        });
    }
}