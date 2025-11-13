-- Создание таблицы клиентов
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы мастеров
CREATE TABLE IF NOT EXISTS masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы услуг
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы записей
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    master_id INTEGER REFERENCES masters(id),
    service_id INTEGER REFERENCES services(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы рабочего расписания мастеров
CREATE TABLE IF NOT EXISTS master_schedules (
    id SERIAL PRIMARY KEY,
    master_id INTEGER REFERENCES masters(id),
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true
);

-- Вставка тестовых услуг
INSERT INTO services (name, description, price, duration_minutes) VALUES
('Мужская стрижка', 'Классическая мужская стрижка с укладкой', 1500.00, 45),
('Женская стрижка', 'Женская стрижка любой сложности', 2500.00, 60),
('Окрашивание', 'Полное окрашивание волос премиум красками', 4500.00, 120),
('Укладка', 'Профессиональная укладка волос', 1200.00, 30),
('Бритьё', 'Классическое бритьё опасной бритвой', 1000.00, 30),
('Уход за бородой', 'Моделирование и уход за бородой', 800.00, 25);

-- Вставка тестовых мастеров
INSERT INTO masters (name, email, phone, password_hash, specialization, bio) VALUES
('Анна Смирнова', 'anna@salon.ru', '+7 (999) 123-45-67', 'hash1', 'Колорист', 'Мастер окрашивания с опытом 10 лет'),
('Дмитрий Иванов', 'dmitry@salon.ru', '+7 (999) 234-56-78', 'hash2', 'Барбер', 'Специалист по мужским стрижкам и бороде'),
('Елена Петрова', 'elena@salon.ru', '+7 (999) 345-67-89', 'hash3', 'Стилист', 'Универсальный мастер женских и мужских стрижек');

-- Вставка расписания для мастеров (пн-пт 10:00-19:00)
INSERT INTO master_schedules (master_id, day_of_week, start_time, end_time, is_available) 
SELECT m.id, d, '10:00'::TIME, '19:00'::TIME, true
FROM masters m, generate_series(1, 5) d;