document.getElementById('uploadBtn').addEventListener('click', uploadFile);

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("يرجى اختيار ملف.");
        return;
    }

    const repo = "YOUR_USERNAME/YOUR_REPOSITORY"; // استبدل باسم المستخدم والمستودع الخاص بك
    const branch = "main"; // أو الفرع الذي تريده
    const token = "YOUR_GITHUB_TOKEN"; // استبدل برمز الوصول الخاص بك

    const filename = file.name;
    const url = `https://api.github.com/repos/${repo}/contents/${filename}`;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
        const data = reader.result.split(',')[1];
        const message = JSON.stringify({
            message: `رفع الملف: ${filename}`,
            branch: branch,
            content: data
        });

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: message
            });

            if (!response.ok) {
                throw new Error(`خطأ في الرفع: ${response.statusText}`);
            }

            const responseData = await response.json();
            document.getElementById('message').innerText = "تم رفع الملف بنجاح!";
        } catch (error) {
            console.error("فشل الرفع:", error);
            alert("فشل رفع الملف. يرجى المحاولة مرة أخرى.");
        }
    };

    reader.onerror = function (error) {
        console.error("خطأ في قراءة الملف:", error);
        alert("خطأ في قراءة الملف. يرجى المحاولة مرة أخرى.");
    };
}