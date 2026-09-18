window.cloudinaryService = {
    async requestSignature(file) {
        const response = await customFetch(`${config.API_BASE}/Cloudinary/GetUploadSignature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Не удалось получить подпись');
        }
        return await response.json();
    },

    async uploadFile(file) {
        try {
            const signatureData = await this.requestSignature(file);
            console.log('Signature data:', signatureData);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', signatureData.apiKey);
            formData.append('timestamp', signatureData.timestamp);
            formData.append('signature', signatureData.signature);
            formData.append('upload_preset', signatureData.uploadPreset); 
            
            const isImage = file.type.startsWith('image/');
            const resourceType = isImage ? 'image' : 'raw';
            const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${resourceType}/upload`;
            console.log('Upload URL:', uploadUrl);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                // Пытаемся получить тело ошибки
                let errorMsg = 'Ошибка загрузки файла';
                try {
                    const err = await response.json();
                    console.error('Cloudinary error response:', err);
                    errorMsg = err.error?.message || JSON.stringify(err);
                } catch (parseError) {
                    console.error('Не удалось распарсить ответ ошибки:', parseError);
                    // Если не удалось распарсить, пробуем прочитать как текст
                    try {
                        const text = await response.text();
                        console.error('Raw error response:', text);
                        errorMsg = text || errorMsg;
                    } catch (textError) {
                        console.error('Не удалось прочитать текст ошибки:', textError);
                    }
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            console.log('Upload success:', data);
            return {
                url: data.secure_url,
                publicId: data.public_id
            };
        } catch (error) {
            console.error('Ошибка в uploadFile:', error);
            throw error;
        }
    },

    async uploadMultiple(files, onProgress) {
        const results = [];
        let completed = 0;

        for (const file of files) {
            const result = await this.uploadFile(file);
            results.push({ ...result, fileName: file.name });
            completed++;
            if (onProgress) {
                onProgress(completed / files.length, file.name);
            }
        }
        return results;
    },

    validateFile(file, options = {}) {
        const { maxSizeMB = 10, allowedTypes = null } = options;
        if (allowedTypes && !allowedTypes.includes(file.type)) {
            throw new Error(`Тип файла "${file.type}" не поддерживается. Разрешены: ${allowedTypes.join(', ')}`);
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            throw new Error(`Файл "${file.name}" слишком большой (${(file.size / 1024 / 1024).toFixed(1)} MB). Максимум ${maxSizeMB} MB`);
        }
        return true;
    }
};