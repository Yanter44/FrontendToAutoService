window.actions = {
<<<<<<< HEAD

=======
    createApplicationFormData: (model) => {
        const formData = new FormData();

        formData.append("VehicleCategoryId", model.vehicleCategoryId);
        formData.append("VIN", model.vin);
        formData.append("GosNumber", model.gosNumber);
        formData.append("Brand", model.brand);
        formData.append("Model", model.model);
        formData.append("YearOfRelease", model.yearOfRelease);

        formData.append("FIO", model.fio);
        formData.append("Email", model.email);
        formData.append("PhoneNumber", model.phoneNumber);
        formData.append("PtoId", model.ptoId);

        model.photos.forEach((item, index) => {
            formData.append(`VehiclePhotos[${index}].VehiclePhotoType`, item.type);
            formData.append(`VehiclePhotos[${index}].Photo`, item.file);
        });

        model.documents.forEach((item, index) => {
            formData.append(`DocumentFiles[${index}].Type`, item.type);
            formData.append(`DocumentFiles[${index}].Document`, item.file);
        });

        return formData;
    },
>>>>>>> 26b4badbb7705023b42224bb4cdc0c7ca2b00deb
};