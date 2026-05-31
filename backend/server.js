const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'database.json');

// Настройки CORS, чтобы фронтенд мог спокойно общаться с бэкендом
app.use(cors());

// Увеличиваем лимит объема данных до 50mb, чтобы огромные фотки в Base64 не ломали сервер
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Роут 1: Получение всех данных из записной книжки (database.json)
app.get('/api/get-data', (req, res) => {
    // Проверяем, существует ли файл. Если нет — создаем пустую структуру
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = { students: [], teams: {} };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
        return res.json(initialData);
    }

    // Читаем файл базы данных
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Ошибка при чтении файла базы данных:", err);
            return res.status(500).json({ success: false, message: "Ошибка сервера при чтении данных" });
        }
        
        try {
            // Если файл абсолютно пустой, отправляем дефолтный шаблон
            if (!data.trim()) {
                return res.json({ students: [], teams: {} });
            }
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error("Ошибка парсинга JSON:", parseErr);
            res.status(500).json({ success: false, message: "Файл базы данных поврежден" });
        }
    });
});

// Роут 2: Безопасное сохранение данных на жесткий диск
app.post('/api/save-data', (req, res) => {
    const newData = req.body;
    
    // Записываем данные в файл с отступами в 2 пробела для красивого вида
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error("Ошибка при сохранении базы данных:", err);
            return res.status(500).json({ success: false, message: "Ошибка сохранения файла на сервере" });
        }
        console.log("📁 База данных успешно обновлена на диске в database.json!");
        
        // Возвращаем четкий ответ фронтенду, что всё прошло успешно
        res.json({ success: true, message: "Данные сохранены успешно" });
    });
});

// Запуск нашего бэкенд-сервера
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 СЕРВЕР ЗАПУЩЕН И ГОТОВ К РАБОТЕ!`);
    console.log(`📡 Адрес бэкенда -> http://localhost:${PORT}`);
    console.log(`📝 База данных привязана к: database.json`);
    console.log(`==================================================\n`);
});